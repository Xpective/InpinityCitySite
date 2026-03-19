import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullPage?: boolean;
}

/**
 * Einheitlicher Loading-Spinner für die gesamte App
 */
export default function LoadingSpinner({
  size = 'medium',
  color = '#f5c46e',
  text,
  fullPage = false,
}: LoadingSpinnerProps) {
  const sizes = {
    small: { spinner: 20, text: '0.9rem', container: '40px' },
    medium: { spinner: 40, text: '1rem', container: '80px' },
    large: { spinner: 60, text: '1.2rem', container: '120px' },
  };

  const spinnerStyle: React.CSSProperties = {
    width: sizes[size].spinner,
    height: sizes[size].spinner,
    border: `3px solid ${color}20`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle: React.CSSProperties = fullPage
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 14, 26, 0.9)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
      };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
      {text && (
        <p style={{ color: '#fff', fontSize: sizes[size].text, margin: 0 }}>
          {text}
        </p>
      )}
    </div>
  );
}