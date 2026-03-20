import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface AsyncDataOptions<T> {
  queryKey: string[];
  queryFn: (signal: AbortSignal) => Promise<T>;
  refetchInterval?: number;
  enabled?: boolean;
  retry?: number;
  staleTime?: number;
}

export interface AsyncDataResult<T> extends Omit<UseQueryResult<T, Error>, 'data' | 'error'> {
  data: T | undefined;
  error: Error | null;
  loading: boolean;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useAsyncData<T>({
  queryKey,
  queryFn,
  refetchInterval = 30000,
  enabled = true,
  retry = 2,
  staleTime = 1000 * 5,
}: AsyncDataOptions<T>): AsyncDataResult<T> {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const query = useQuery<T, Error>({
    queryKey,
    queryFn: async ({ signal }) => {
      try {
        const result = await queryFn(signal);
        setLastUpdated(new Date());
        return result;
      } catch (error) {
        console.error(`Query failed for ${queryKey.join('/')}:`, error);
        throw error instanceof Error ? error : new Error('Unknown error occurred');
      }
    },
    refetchInterval,
    enabled,
    retry,
    staleTime,
  });

  return {
    ...query,
    data: query.data,
    error: query.error || null,
    loading: query.isLoading || query.isRefetching,
    lastUpdated,
    refresh: query.refetch,
  };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
