interface PaginationControlsProps {
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  onReload?: () => void;
  itemCount?: number;
  totalEstimate?: number;
  className?: string;
}

export default function PaginationControls({
  currentPage: _currentPage,
  hasMore,
  isLoading,
  onLoadMore,
  onReload,
  itemCount,
  totalEstimate,
  className = '',
}: PaginationControlsProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: 'rgba(20, 25, 40, 0.5)',
        borderRadius: '8px',
        marginTop: '1rem',
      }}
    >
      <div style={{ color: '#aaa', fontSize: '0.9rem' }}>
        {itemCount !== undefined && (
          <span>
            {itemCount} Elemente geladen
            {totalEstimate && ` (ca. ${totalEstimate} insgesamt)`}
          </span>
        )}
        {isLoading && <span style={{ marginLeft: '1rem', color: '#f5c46e' }}>⏳ Lade...</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onReload && (
          <button
            onClick={onReload}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#fff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            🔄 Neu laden
          </button>
        )}

        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ⬇️ Mehr laden
          </button>
        )}

        {!hasMore && itemCount && itemCount > 0 && (
          <span style={{ color: '#4caf50', fontSize: '0.9rem' }}>
            ✅ Alle {itemCount} Elemente geladen
          </span>
        )}
      </div>
    </div>
  );
}