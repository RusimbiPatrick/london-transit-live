export type StatusId = 'GS' | 'MD' | 'SD' | 'PS' | 'CS';

export interface LineStatus {
  id: string;
  lineId: string;
  lineName: string;
  statusId: StatusId;
  statusDescription: string;
  statusDetails: string;
  isActive: boolean;
  branches: Branch[];
}

export interface Branch {
  stationFrom?: string;
  stationTo?: string;
  statusDescription: string;
}

export interface StationStatus {
  id: string;
  stationName: string;
  statusId: StatusId;
  statusDescription: string;
  statusDetails: string;
  isActive: boolean;
}

export interface Train {
  id: string;
  secondsTo: number;
  timeTo: string;
  destination: string;
  location: string;
}

export interface Platform {
  name: string;
  code: string;
  trains: Train[];
}

export interface Station {
  code: string;
  name: string;
  platforms: Platform[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
  lastUpdated: Date;
  refresh: () => void;
}

export interface Line {
  code: string;
  name: string;
}

export interface StationInfo {
  code: string;
  name: string;
}
