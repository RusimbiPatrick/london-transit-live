export const API_CONFIG = {
  BASE_URL: 'https://api.tfl.gov.uk',
  DEFAULT_RETRY: 2,
  DEFAULT_STALE_TIME: 1000 * 5, // 5 seconds
  REFRESH_INTERVALS: {
    LINE_STATUS: 15000, // 15 seconds
    STATION_STATUS: 60000, // 1 minute
    ARRIVALS: 15000, // 15 seconds
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

export const STATUS_CONFIG = {
  GS: { 
    id: 'GS' as const, 
    label: 'Good Service', 
    priority: 4,
    color: 'success',
    description: 'Running normally'
  },
  MD: { 
    id: 'MD' as const, 
    label: 'Minor Delays', 
    priority: 3,
    color: 'warning',
    description: 'Some delays'
  },
  SD: { 
    id: 'SD' as const, 
    label: 'Severe Delays', 
    priority: 1,
    color: 'danger',
    description: 'Major disruptions'
  },
  PS: { 
    id: 'PS' as const, 
    label: 'Part Suspended', 
    priority: 2,
    color: 'danger',
    description: 'Partial closure'
  },
  CS: { 
    id: 'CS' as const, 
    label: 'Part Closed', 
    priority: 0,
    color: 'danger',
    description: 'Partial closure'
  },
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 150,
  MOBILE_BREAKPOINT: 768,
  DESKTOP_BREAKPOINT: 1024,
  MAX_ARRIVALS_PER_PLATFORM: 5,
} as const;

export const TFL_LINE_COLORS = {
  Bakerloo: '#B36305',
  Central: '#E32017',
  Circle: '#FFD300',
  District: '#00782A',
  'Hammersmith & City': '#F3A9BB',
  Jubilee: '#A0A5A9',
  Metropolitan: '#9B0056',
  Northern: '#111111',
  Piccadilly: '#003688',
  Victoria: '#0098D4',
  'Waterloo & City': '#95CDBA',
  DLR: '#00A4A7',
  'London Overground': '#EE7C0E',
  Tramlink: '#84B817',
  Tram: '#84B817',
  'Elizabeth line': '#60399E',
} as const;

export const TFL_LINE_MAPPINGS = {
  'B': 'bakerloo',
  'C': 'central',
  'D': 'district',
  'H': 'hammersmith-city',
  'J': 'jubilee',
  'M': 'metropolitan',
  'N': 'northern',
  'P': 'piccadilly',
  'V': 'victoria',
  'W': 'waterloo-city',
} as const;

export const TFL_STATION_MAPPINGS = {
  'OXC': '940GZZLUOXC',
  'VIC': '940GZZLUVIC',
  'KXX': '940GZZLUKSX',
  'WLO': '940GZZLUWLO',
  'LBG': '940GZZLULNB',
  'PAD': '940GZZLUPAC',
  'BDS': '940GZZLUBND',
  'GPK': '940GZZLUGPK',
  'LSQ': '940GZZLULSQ',
  'TCR': '940GZZLUTCR',
  'CHX': '940GZZLUCHX',
  'MGT': '940GZZLUMGT',
  'BNK': '940GZZLUBAK',
  'SVS': '940GZZLUSVS',
  'FPK': '940GZZLUFPK',
  'EUS': '940GZZLUEUS',
  'CWF': '940GZZLUCYF',
  'STF': '940GZZLUSTF',
} as const;
