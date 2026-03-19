import { useState, useCallback } from 'react';

export function usePaginatedQuery<TData = any>(_options: { query: string; variables?: any; pageSize?: number }) {
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      // Dummy – später implementieren
      setHasMore(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    setData([]);
    setError(null);
    setHasMore(true);
    await loadMore();
  }, [loadMore]);

  return { data, loading, error, hasMore, loadMore, reload };
}

export function usePaginatedList<TData = any>(query: string, variables?: any, options?: any) {
  return usePaginatedQuery<TData>({ query, variables, ...options });
}