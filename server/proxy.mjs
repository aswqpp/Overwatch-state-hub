import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const UPSTREAM = process.env.OVERFAST_UPSTREAM ?? 'https://overfast-api.tekrop.fr'
const PORT = Number(process.env.PROXY_PORT ?? 5174)
const TTL_MS = Number(process.env.PROXY_TTL_MS ?? 10 * 60 * 1000)
const ROUTE_PREFIX = '/api/overfast'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CACHE_DIR = join(__dirname, '..', '.cache', 'overfast')
await mkdir(CACHE_DIR, { recursive: true })

function cacheKey(method, pathname, search) {
  const params = new URLSearchParams(search)
  params.sort()
  const canonical = `${method} ${pathname}?${params.toString()}`
  return createHash('sha1').update(canonical).digest('hex')
}

async function readCache(key) {
  try {
    const raw = await readFile(join(CACHE_DIR, `${key}.json`), 'utf8')
    const entry = JSON.parse(raw)
    if (Date.now() - entry.storedAt > TTL_MS) return null
    return entry
  } catch {
    return null
  }
}

async function writeCacheEntry(key, entry) {
  await writeFile(join(CACHE_DIR, `${key}.json`), JSON.stringify(entry))
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    ...headers,
  })
  res.end(body)
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-headers': 'content-type',
    })
    res.end()
    return
  }

  if (req.method !== 'GET' || !req.url?.startsWith(ROUTE_PREFIX)) {
    send(res, 404, JSON.stringify({ error: 'not found' }))
    return
  }

  const url = new URL(req.url, `http://localhost:${PORT}`)
  const upstreamPath = url.pathname.slice(ROUTE_PREFIX.length) || '/'
  const key = cacheKey('GET', upstreamPath, url.search)

  const cached = await readCache(key)
  if (cached) {
    send(res, cached.status, cached.body, { 'x-proxy-cache': 'HIT' })
    return
  }

  const upstreamUrl = `${UPSTREAM}${upstreamPath}${url.search}`
  try {
    const upstreamRes = await fetch(upstreamUrl)
    const body = await upstreamRes.text()

    if (upstreamRes.ok) {
      await writeCacheEntry(key, {
        status: upstreamRes.status,
        body,
        storedAt: Date.now(),
      })
    }

    send(res, upstreamRes.status, body, { 'x-proxy-cache': 'MISS' })
  } catch (err) {
    send(res, 502, JSON.stringify({ error: 'upstream fetch failed', detail: String(err) }))
  }
}).listen(PORT, () => {
  console.log(`[overfast-proxy] listening on http://localhost:${PORT}${ROUTE_PREFIX} -> ${UPSTREAM} (ttl ${TTL_MS}ms)`)
})
