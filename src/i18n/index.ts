import { useUIStore } from '@/stores/uiStore'
import type { Language } from '@/types'

// ─── Hero name dictionary (ported from ASWQPP-OW__6_.html line 333-334) ──────
export const HERO_NAME_KO: Record<string, string> = {
  ana: '아나', ashe: '애쉬', baptiste: '바티스트', bastion: '바스티온',
  brigitte: '브리기테', cassidy: '캐시디', dva: 'D.Va', doomfist: '둠피스트',
  echo: '에코', genji: '겐지', hanzo: '한조', hazard: '해저드',
  illari: '일라리', junker_queen: '정커퀸', junkrat: '정크랫',
  kiriko: '키리코', lifeweaver: '라이프위버', lucio: '루시우',
  mauga: '마우가', mccree: '맥크리', mei: '메이', mercy: '메르시',
  moira: '모이라', orisa: '오리사', pharah: '파라', ramattra: '라마트라',
  reaper: '리퍼', reinhardt: '라인하르트', roadhog: '로드호그',
  sigma: '시그마', sojourn: '소전', soldier_76: '솔저: 76',
  sombra: '솜브라', symmetra: '시메트라', torbjorn: '토르비욘',
  tracer: '트레이서', venture: '벤처', widowmaker: '위도우메이커',
  winston: '윈스턴', wrecking_ball: '레킹볼', zarya: '자리야',
  zenyatta: '젠야타', juno: '주노', support: '서포터',
}

export const HERO_NAME_JA: Record<string, string> = {
  ana: 'アナ', ashe: 'アッシュ', baptiste: 'バティスト', bastion: 'バスティオン',
  brigitte: 'ブリギッテ', cassidy: 'キャシディ', dva: 'D.Va', doomfist: 'ドゥームフィスト',
  echo: 'エコー', genji: 'ゲンジ', hanzo: 'ハンゾウ', hazard: 'ハザード',
  illari: 'イラリ', junker_queen: 'ジャンカークイーン', junkrat: 'ジャンクラット',
  kiriko: 'キリコ', lifeweaver: 'ライフウィーバー', lucio: 'ルシオ',
  mauga: 'マウガ', mei: 'メイ', mercy: 'マーシー', moira: 'モイラ',
  orisa: 'オリーサ', pharah: 'ファラ', ramattra: 'ラマトラ',
  reaper: 'リーパー', reinhardt: 'ラインハルト', roadhog: 'ロードホッグ',
  sigma: 'シグマ', sojourn: 'ソジョーン', soldier_76: 'ソルジャー76',
  sombra: 'ソンブラ', symmetra: 'シンメトラ', torbjorn: 'トールビョーン',
  tracer: 'トレーサー', venture: 'ベンチャー', widowmaker: 'ウィドウメイカー',
  winston: 'ウィンストン', wrecking_ball: 'レッキングボール', zarya: 'ザリア',
  zenyatta: 'ゼニヤッタ', juno: 'ジュノ',
}

// ─── Map name dictionary (ported from line 338-339) ──────────────────────────
export const MAP_NAME_KO: Record<string, string> = {
  blizzard_world: '블리자드 월드', busan: '부산', circuit_royal: '서킷 로얄',
  colosseo: '콜로세오', dorado: '도라도', eichenwalde: '아이헨발데',
  esperanca: '에스페란사', hanamura: '하나무라', havana: '아바나',
  hollywood: '할리우드', horizon_lunar_colony: '호라이즌 달 기지',
  ilios: '일리오스', junkertown: '정크타운', kings_row: '킹스 로우',
  lijiang_tower: '리장 타워', malevento: '말레벤토', midtown: '미드타운',
  monte_carlo: '몬테 카를로', nepal: '네팔', new_queen_street: '뉴 퀸 스트리트',
  numbani: '눔바니', oasis: '오아시스', paraiso: '파라이소',
  paris: '파리', petra: '페트라', rialto: '리알토',
  route_66: '루트 66', shambali: '샴발리', suravasa: '수라바사',
  throne_of_anubis: '아누비스의 옥좌', watchpoint_gibraltar: '워치포인트: 지브롤터',
}

// ─── UI text strings ──────────────────────────────────────────────────────────
const strings = {
  ko: {
    siteName: 'Overwatch Meta Hub',
    home: '홈',
    map: '맵 메타',
    heroes: '영웅 DB',
    timeline: '타임라인',
    forecast: '예측',
    patch: '패치노트',
    tierlist: '티어리스트',
    settings: '설정',

    region: '지역',
    platform: '플랫폼',
    rank: '티어',
    regionAsia: '아시아',
    regionEurope: '유럽',
    regionAmericas: '아메리카',
    platformPc: 'PC',
    platformConsole: '콘솔',
    rankAll: '전체',
    bronze: '브론즈',
    silver: '실버',
    gold: '골드',
    platinum: '플래티넘',
    diamond: '다이아몬드',
    master: '마스터',
    grandmaster: '그랜드마스터',

    kpiHeroCount: '분석 영웅 수',
    kpiBest: '최고 메타지수',
    kpiWorst: '최저 메타지수',
    kpiConcentration: '메타 집중도',
    top3Share: '상위 3명이 전체의',
    heroRanking: '영웅 랭킹',
    rank_col: '순위',
    hero: '영웅',
    role: '역할',
    pickrate: '픽률',
    winrate: '승률',
    metaScore: '메타지수',
    tier: '등급',
    all: '전체',
    tank: '탱커',
    damage: '딜러',
    support: '서포터',
    search: '영웅 검색...',
    roleDistribution: '역할별 픽률',
    top10Meta: '상위 10 메타지수',
    loading: '데이터 불러오는 중...',
    error: '데이터를 불러올 수 없습니다',
    retry: '다시 시도',
    noData: '데이터 없음',
    serverBasis: '서버 기준',
    competitive: '경쟁전',
    dataSource: '데이터: OverFast API (비공식)',
    disclaimer: 'OverFast API는 비공식 서비스로 중단될 수 있습니다.',
  },
  en: {
    siteName: 'Overwatch Meta Hub',
    home: 'Home',
    map: 'Map Meta',
    heroes: 'Hero DB',
    timeline: 'Timeline',
    forecast: 'Forecast',
    patch: 'Patch Notes',
    tierlist: 'Tier List',
    settings: 'Settings',

    region: 'Region',
    platform: 'Platform',
    rank: 'Rank',
    regionAsia: 'Asia',
    regionEurope: 'Europe',
    regionAmericas: 'Americas',
    platformPc: 'PC',
    platformConsole: 'Console',
    rankAll: 'All Ranks',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond',
    master: 'Master',
    grandmaster: 'Grandmaster',

    kpiHeroCount: 'Heroes Analyzed',
    kpiBest: 'Top Meta Score',
    kpiWorst: 'Lowest Meta Score',
    kpiConcentration: 'Meta Concentration',
    top3Share: 'Top 3 heroes hold',
    heroRanking: 'Hero Rankings',
    rank_col: 'Rank',
    hero: 'Hero',
    role: 'Role',
    pickrate: 'Pick Rate',
    winrate: 'Win Rate',
    metaScore: 'Meta Score',
    tier: 'Tier',
    all: 'All',
    tank: 'Tank',
    damage: 'Damage',
    support: 'Support',
    search: 'Search heroes...',
    roleDistribution: 'Role Pick Share',
    top10Meta: 'Top 10 Meta Score',
    loading: 'Loading data...',
    error: 'Failed to load data',
    retry: 'Retry',
    noData: 'No Data',
    serverBasis: 'Server Basis',
    competitive: 'Competitive',
    dataSource: 'Data: OverFast API (unofficial)',
    disclaimer: 'OverFast API is an unofficial service and may be unavailable.',
  },
  ja: {
    siteName: 'Overwatch Meta Hub',
    home: 'ホーム',
    map: 'マップメタ',
    heroes: 'ヒーローDB',
    timeline: 'タイムライン',
    forecast: '予測',
    patch: 'パッチノート',
    tierlist: 'ティアリスト',
    settings: '設定',

    region: 'リージョン',
    platform: 'プラットフォーム',
    rank: 'ランク',
    regionAsia: 'アジア',
    regionEurope: 'ヨーロッパ',
    regionAmericas: 'アメリカ',
    platformPc: 'PC',
    platformConsole: 'コンソール',
    rankAll: '全ランク',
    bronze: 'ブロンズ',
    silver: 'シルバー',
    gold: 'ゴールド',
    platinum: 'プラチナ',
    diamond: 'ダイヤモンド',
    master: 'マスター',
    grandmaster: 'グランドマスター',

    kpiHeroCount: '分析ヒーロー数',
    kpiBest: '最高メタスコア',
    kpiWorst: '最低メタスコア',
    kpiConcentration: 'メタ集中度',
    top3Share: 'トップ3が占める割合',
    heroRanking: 'ヒーローランキング',
    rank_col: '順位',
    hero: 'ヒーロー',
    role: 'ロール',
    pickrate: 'ピック率',
    winrate: '勝率',
    metaScore: 'メタスコア',
    tier: 'ティア',
    all: '全て',
    tank: 'タンク',
    damage: 'ダメージ',
    support: 'サポート',
    search: 'ヒーローを検索...',
    roleDistribution: 'ロール別ピック率',
    top10Meta: 'トップ10メタスコア',
    loading: 'データを読み込み中...',
    error: 'データを読み込めません',
    retry: '再試行',
    noData: 'データなし',
    serverBasis: 'サーバー基準',
    competitive: 'コンペティティブ',
    dataSource: 'データ: OverFast API（非公式）',
    disclaimer: 'OverFast APIは非公式サービスのため、中断される場合があります。',
  },
} as const

type StringKey = keyof (typeof strings)['ko']

export function useT() {
  const lang = useUIStore((s) => s.language) as Language
  return (key: StringKey) => strings[lang][key] ?? strings.ko[key]
}

export function getHeroName(key: string, lang: Language): string {
  if (lang === 'ko') return HERO_NAME_KO[key] ?? key
  if (lang === 'ja') return HERO_NAME_JA[key] ?? key
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function getMapName(key: string, lang: Language): string {
  if (lang === 'ko') return MAP_NAME_KO[key] ?? key
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
