import { useQuery } from '@tanstack/react-query';
import {
  getLineStatus,
  getStationStatus,
  getPredictionSummary,
  getPredictionDetailed
} from './trackenet';

export function useLineStatus() {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['line-status'],
    queryFn: ({ signal }) => getLineStatus(false, signal),
    refetchInterval: 15000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}

export function useLineStatusIncidents() {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['line-status-incidents'],
    queryFn: ({ signal }) => getLineStatus(true, signal),
    refetchInterval: 15000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}

export function useStationStatus() {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['station-status'],
    queryFn: ({ signal }) => getStationStatus(false, signal),
    refetchInterval: 60000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}

export function useStationStatusIncidents() {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['station-status-incidents'],
    queryFn: ({ signal }) => getStationStatus(true, signal),
    refetchInterval: 60000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}

export function usePredictionSummary(lineCode) {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['prediction-summary', lineCode],
    queryFn: ({ signal }) => getPredictionSummary(lineCode, signal),
    enabled: !!lineCode,
    refetchInterval: 20000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}

export function usePredictionDetailed(lineCode, stationCode) {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['prediction-detailed', lineCode, stationCode],
    queryFn: ({ signal }) => getPredictionDetailed(lineCode, stationCode, signal),
    enabled: !!(lineCode && stationCode),
    refetchInterval: 15000,
  });
  return { data, error, loading: isLoading || isRefetching, lastUpdated: new Date(), refresh: refetch };
}
