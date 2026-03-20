import { API_CONFIG, TFL_LINE_MAPPINGS, TFL_STATION_MAPPINGS } from '../constants';
import { LineStatus, StationStatus, Station, Train, Platform, StatusId } from '../types';
import { getApiConfig } from '../utils/env';

const { baseUrl, appKey, timeout } = getApiConfig();

async function fetchJson(endpoint: string, signal?: AbortSignal): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const url = new URL(`${baseUrl}${endpoint}`);
    if (appKey) {
      url.searchParams.append('app_key', appKey);
    }
    
    const response = await fetch(url.toString(), { 
      signal: signal || controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`TfL API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function mapSeverityToId(severity: number): StatusId {
  if (severity === 10) return 'GS';
  if (severity === 9) return 'MD';
  if (severity === 8 || severity === 6) return 'SD';
  if (severity === 5 || severity === 4 || severity === 3) return 'PS';
  if (severity === 2 || severity === 1 || severity === 20) return 'CS';
  return 'GS'; // Default
}

export async function getLineStatus(incidentsOnly = false, signal?: AbortSignal): Promise<LineStatus[]> {
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

export async function getStationStatus(incidentsOnly = false, signal?: AbortSignal): Promise<StationStatus[]> {
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

export async function getPredictionDetailed(lineCode: string, stationCode: string, signal?: AbortSignal): Promise<Station[]> {
  // Unified API Arrivals: /Line/{id}/Arrivals/{stopPointId}
  // But we only have lineCode (e.g., 'V') and stationCode (e.g., 'OXC').
  // We need to map these to Unified API IDs.
  // Actually, the user's component uses TUBE_LINES and COMMON_STATIONS.
  // Let's map them.
  const lineId = TFL_LINE_MAPPINGS[lineCode as keyof typeof TFL_LINE_MAPPINGS];
  const stopPointId = TFL_STATION_MAPPINGS[stationCode as keyof typeof TFL_STATION_MAPPINGS];

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
