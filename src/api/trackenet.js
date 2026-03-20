const BASE_URL = 'https://api.tfl.gov.uk';

async function fetchJson(endpoint, signal) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  const appKey = import.meta.env.VITE_TFL_APP_KEY;
  if (appKey) {
    url.searchParams.append('app_key', appKey);
  }
  
  const response = await fetch(url.toString(), { signal });
  if (!response.ok) {
    throw new Error(`TfL API Error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

function mapSeverityToId(severity) {
  if (severity === 10) return 'GS';
  if (severity === 9) return 'MD';
  if (severity === 8 || severity === 6) return 'SD';
  if (severity === 5 || severity === 4 || severity === 3) return 'PS';
  if (severity === 2 || severity === 1 || severity === 20) return 'CS';
  return 'GS'; // Default
}

export async function getLineStatus(incidentsOnly = false, signal) {
  const data = await fetchJson('/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status', signal);
  
  let statuses = data.map(line => {
    const status = line.lineStatuses[0];
    return {
      id: line.id,
      lineId: line.id,
      lineName: line.name,
      statusId: mapSeverityToId(status.statusSeverity),
      statusDescription: status.statusSeverityDescription,
      statusDetails: status.reason || '',
      isActive: true,
      branches: [] // Unified API doesn't provide branches in the same way, we can leave it empty
    };
  });

  if (incidentsOnly) {
    statuses = statuses.filter(s => s.statusId !== 'GS');
  }

  return statuses;
}

export async function getStationStatus(incidentsOnly = false, signal) {
  // The Unified API doesn't have a direct equivalent for StationStatus that matches TrackerNet perfectly.
  // We can use StopPoint/Mode/tube/Disruption
  const data = await fetchJson('/StopPoint/Mode/tube,dlr,overground,elizabeth-line/Disruption', signal);
  
  let statuses = data.map((disruption, index) => {
    return {
      id: `disruption-${index}`,
      stationName: disruption.commonName || disruption.stationAt || 'Unknown Station',
      statusId: 'MD', // Treat as minor delays/disruption
      statusDescription: disruption.type || 'Disruption',
      statusDetails: disruption.description,
      isActive: true
    };
  });

  // If not incidentsOnly, we would normally return all stations with Good Service.
  // Since we can't easily get all stations, we'll just return the disruptions.
  return statuses;
}

export async function getPredictionDetailed(lineCode, stationCode, signal) {
  // Unified API Arrivals: /Line/{id}/Arrivals/{stopPointId}
  // But we only have lineCode (e.g., 'V') and stationCode (e.g., 'OXC').
  // We need to map these to Unified API IDs.
  // Actually, the user's component uses TUBE_LINES and COMMON_STATIONS.
  // Let's map them.
  const lineMap = {
    'B': 'bakerloo', 'C': 'central', 'D': 'district', 'H': 'hammersmith-city',
    'J': 'jubilee', 'M': 'metropolitan', 'N': 'northern', 'P': 'piccadilly',
    'V': 'victoria', 'W': 'waterloo-city'
  };
  
  const stationMap = {
    'OXC': '940GZZLUOXC', 'VIC': '940GZZLUVIC', 'KXX': '940GZZLUKSX',
    'WLO': '940GZZLUWLO', 'LBG': '940GZZLULNB', 'PAD': '940GZZLUPAC',
    'BDS': '940GZZLUBND', 'GPK': '940GZZLUGPK', 'LSQ': '940GZZLULSQ',
    'TCR': '940GZZLUTCR', 'CHX': '940GZZLUCHX', 'MGT': '940GZZLUMGT',
    'BNK': '940GZZLUBAK', 'SVS': '940GZZLUSVS', 'FPK': '940GZZLUFPK',
    'EUS': '940GZZLUEUS', 'CWF': '940GZZLUCYF', 'STF': '940GZZLUSTF'
  };

  const lineId = lineMap[lineCode];
  const stopPointId = stationMap[stationCode];

  if (!lineId || !stopPointId) return [];

  const data = await fetchJson(`/Line/${lineId}/Arrivals/${stopPointId}`, signal);
  
  // Group by platform
  const platformsMap = {};
  data.forEach(arrival => {
    const platformName = arrival.platformName;
    if (!platformsMap[platformName]) {
      platformsMap[platformName] = [];
    }
    platformsMap[platformName].push({
      id: arrival.id,
      secondsTo: arrival.timeToStation,
      timeTo: Math.floor(arrival.timeToStation / 60) + ':00',
      destination: arrival.destinationName,
      location: arrival.currentLocation
    });
  });

  const platforms = Object.keys(platformsMap).map(name => {
    // Sort trains by timeToStation
    const trains = platformsMap[name].sort((a, b) => a.secondsTo - b.secondsTo);
    return {
      name: name,
      code: name,
      trains: trains
    };
  });

  return [{
    code: stationCode,
    name: data.length > 0 ? data[0].stationName : 'Station',
    platforms: platforms
  }];
}

export async function getPredictionSummary(lineCode, signal) {
  return []; // Not used in the app currently
}
