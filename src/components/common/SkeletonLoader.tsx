import React from 'react';

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Basis-Skeleton-Komponente für Loading States
 */
export default function SkeletonLoader({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
  style = {},
}: SkeletonLoaderProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #2a3040 25%, #3a4050 50%, #2a3040 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </div>
  );
}