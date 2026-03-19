import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePaginatedQuery, usePaginatedList } from './usePaginatedQuery';
import { requestGraphQL } from '../lib/graphql';

// Mock der GraphQL-Funktion
vi.mock('../lib/graphql', () => ({
  requestGraphQL: vi.fn(),
}));

describe('usePaginatedQuery', () => {
  const mockQuery = 'query Test { items { id } }';
  const mockVariables = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => 
      usePaginatedQuery({ query: mockQuery, variables: mockVariables })
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.state.page).toBe(0);
    expect(result.current.state.hasMore).toBe(true);
    expect(result.current.state.isLoading).toBe(true);
    expect(result.current.state.error).toBeNull();
  });

  it('should load initial data successfully', async () => {
    const mockData = { items: [{ id: '1' }, { id: '2' }] };
    vi.mocked(requestGraphQL).mockResolvedValueOnce({ test: mockData.items });

    const { result } = renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        pageSize: 2,
      })
    );

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.state.page).toBe(0);
    expect(result.current.state.hasMore).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('should load more data on loadMore call', async () => {
    vi.mocked(requestGraphQL)
      .mockResolvedValueOnce({ test: [{ id: '1' }, { id: '2' }] })
      .mockResolvedValueOnce({ test: [{ id: '3' }, { id: '4' }] });

    const { result } = renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        pageSize: 2,
      })
    );

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.data).toHaveLength(4);
    expect(result.current.state.page).toBe(1);
    expect(requestGraphQL).toHaveBeenCalledTimes(2);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Network error');
    vi.mocked(requestGraphQL).mockRejectedValueOnce(error);

    const { result } = renderHook(() => 
      usePaginatedQuery({ query: mockQuery, variables: mockVariables })
    );

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(result.current.state.error).toBeDefined();
    expect(result.current.state.error?.message).toBe('Network error');
    expect(result.current.data).toEqual([]);
  });

  it('should reload data on reload call', async () => {
    vi.mocked(requestGraphQL)
      .mockResolvedValueOnce({ test: [{ id: '1' }, { id: '2' }] })
      .mockResolvedValueOnce({ test: [{ id: '3' }, { id: '4' }] });

    const { result } = renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        pageSize: 2,
      })
    );

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    await act(async () => {
      await result.current.reload();
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].id).toBe('3');
    expect(result.current.state.page).toBe(0);
  });

  it('should reset data on reset call', async () => {
    vi.mocked(requestGraphQL).mockResolvedValueOnce({ test: [{ id: '1' }] });

    const { result } = renderHook(() => 
      usePaginatedQuery({ query: mockQuery, variables: mockVariables })
    );

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.state.page).toBe(0);
    expect(result.current.state.hasMore).toBe(true);
  });

  it('should apply transform function to data', async () => {
    const mockData = { items: [{ id: '1', name: 'test' }] };
    vi.mocked(requestGraphQL).mockResolvedValueOnce({ test: mockData.items });

    const transform = (item: any) => ({ ...item, transformed: true });

    const { result } = renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        transform,
      })
    );

    await waitFor(() => {
      expect(result.current.data[0].transformed).toBe(true);
    });
  });

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn();
    const mockData = { items: [{ id: '1' }] };
    vi.mocked(requestGraphQL).mockResolvedValueOnce({ test: mockData.items });

    renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        onSuccess,
      })
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData.items, 0);
    });
  });

  it('should call onError callback on failure', async () => {
    const onError = vi.fn();
    const error = new Error('Test error');
    vi.mocked(requestGraphQL).mockRejectedValueOnce(error);

    renderHook(() => 
      usePaginatedQuery({ 
        query: mockQuery, 
        variables: mockVariables,
        onError,
      })
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});

describe('usePaginatedList', () => {
  it('should be a convenience wrapper for usePaginatedQuery', () => {
    const { result } = renderHook(() => 
      usePaginatedList('test query', { filter: 'test' }, { pageSize: 10 })
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current.loadMore).toBe('function');
    expect(typeof result.current.reload).toBe('function');
  });
});