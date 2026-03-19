import SkeletonLoader from '../common/SkeletonLoader';

interface PlotSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
}

export default function PlotSkeleton({ count = 6, layout = 'grid' }: PlotSkeletonProps) {
  if (layout === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(20, 25, 40, 0.5)',
              borderRadius: '8px',
            }}
          >
            <SkeletonLoader width="60px" height="60px" borderRadius="8px" />
            <div style={{ flex: 1 }}>
              <SkeletonLoader width="120px" height="20px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonLoader width="80px" height="16px" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            background: 'rgba(20, 25, 40, 0.5)',
            borderRadius: '8px',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <SkeletonLoader width="100%" height="60%" borderRadius="4px" />
          <SkeletonLoader width="70%" height="16px" />
          <SkeletonLoader width="50%" height="12px" />
        </div>
      ))}
    </div>
  );
}