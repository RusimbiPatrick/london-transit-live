export const LINE_COLORS = {
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
};

const TONE_MAP = {
  GS: {
    badge: 'border-[#BEE4D0] bg-[#F2FBF6] text-[#0F8A4A]',
    panel: 'border-[#DDE4EC] bg-white',
    detail: 'border-[#E6EBF1] bg-[#F8FAFC] text-[#51606F]',
    statusText: 'text-[#0F8A4A]',
  },
  MD: {
    badge: 'border-[#F5D69A] bg-[#FFF8EB] text-[#B36B00]',
    panel: 'border-[#EAD9B0] bg-white',
    detail: 'border-[#F2E6C6] bg-[#FFF9EF] text-[#6E5A26]',
    statusText: 'text-[#B36B00]',
  },
  SD: {
    badge: 'border-[#F2C1BD] bg-[#FFF4F3] text-[#C53127]',
    panel: 'border-[#E7C2BE] bg-white',
    detail: 'border-[#F1D2CF] bg-[#FFF6F5] text-[#7C3A35]',
    statusText: 'text-[#C53127]',
  },
  PS: {
    badge: 'border-[#F2C1BD] bg-[#FFF4F3] text-[#C53127]',
    panel: 'border-[#E7C2BE] bg-white',
    detail: 'border-[#F1D2CF] bg-[#FFF6F5] text-[#7C3A35]',
    statusText: 'text-[#C53127]',
  },
  CS: {
    badge: 'border-[#F2C1BD] bg-[#FFF4F3] text-[#C53127]',
    panel: 'border-[#E7C2BE] bg-white',
    detail: 'border-[#F1D2CF] bg-[#FFF6F5] text-[#7C3A35]',
    statusText: 'text-[#C53127]',
  },
  default: {
    badge: 'border-[#D7E0EA] bg-[#F7F9FC] text-[#334155]',
    panel: 'border-[#DDE4EC] bg-white',
    detail: 'border-[#E6EBF1] bg-[#F8FAFC] text-[#51606F]',
    statusText: 'text-[#334155]',
  },
};

export function getLineColorHex(lineName) {
  return LINE_COLORS[lineName] || '#1C3F94';
}

export function getToneClasses(statusId) {
  return TONE_MAP[statusId] || TONE_MAP.default;
}

export function getStatusPriority(statusId) {
  if (statusId === 'CS') return 0;
  if (statusId === 'SD') return 1;
  if (statusId === 'PS') return 2;
  if (statusId === 'MD') return 3;
  return 4;
}

export function formatLastUpdated(lastUpdated, loading = false) {
  if (loading && !lastUpdated) return 'Loading live data';
  if (loading) return 'Refreshing…';
  if (!lastUpdated) return 'Awaiting first poll';
  return `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
