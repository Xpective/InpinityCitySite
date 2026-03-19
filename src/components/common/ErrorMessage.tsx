import { AppError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface ErrorMessageProps {
  error: AppError | Error | string | null;
  onRetry?: () => void;
  variant?: 'inline' | 'card' | 'toast';
  className?: string;
  showDetails?: boolean;
}

export default function ErrorMessage({
  error,
  onRetry,
  variant = 'card',
  className = '',
  showDetails = false,
}: ErrorMessageProps) {
  if (!error) return null;

  const appError: AppError = (() => {
    if (typeof error === 'string') {
      return {
        name: 'Error',
        message: error,
        severity: 'error',
        category: 'unknown',
        retryable: true,
        timestamp: Date.now(),
      } as AppError;
    }
    if (error instanceof Error && !('severity' in error)) {
      return {
        name: error.name,
        message: error.message,
        severity: 'error',
        category: 'unknown',
        retryable: true,
        timestamp: Date.now(),
        originalError: error,
      } as AppError;
    }
    return error as AppError;
  })();

  const userMessage = getUserFriendlyErrorMessage(appError);
  const severityColors = {
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', text: '#93c5fd' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', text: '#fcd34d' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#fca5a5' },
    critical: { bg: 'rgba(139, 92, 246, 0.1)', border: '#8b5cf6', text: '#c4b5fd' },
  };

  const colors = severityColors[appError.severity] || severityColors.error;

  if (variant === 'inline') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: colors.bg,
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          color: colors.text,
          fontSize: '0.9rem',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>
          {appError.severity === 'critical' ? '🚨' : 
           appError.severity === 'warning' ? '⚠️' : '❌'}
        </span>
        <span style={{ flex: 1 }}>{userMessage}</span>
        {onRetry && appError.retryable && (
          <button
            onClick={onRetry}
            style={{
              background: 'none',
              border: 'none',
              color: colors.text,
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Wiederholen
          </button>
        )}
      </div>
    );
  }

  if (variant === 'toast') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease',
        }}
      >
        <div
          style={{
            padding: '1rem 1.5rem',
            background: colors.bg,
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            color: colors.text,
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>
              {appError.severity === 'critical' ? '🚨' : 
               appError.severity === 'warning' ? '⚠️' : '❌'}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: '600' }}>{userMessage}</p>
              {showDetails && appError.message !== userMessage && (
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                  {appError.message}
                </p>
              )}
            </div>
            {onRetry && appError.retryable && (
              <button
                onClick={onRetry}
                style={{
                  padding: '0.5rem 1rem',
                  background: colors.border,
                  border: 'none',
                  borderRadius: '6px',
                  color: '#1a1f2e',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Wiederholen
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        padding: '2rem',
        background: colors.bg,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        textAlign: 'center',
        maxWidth: '500px',
        margin: '2rem auto',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {appError.severity === 'critical' ? '🌋' : 
         appError.severity === 'warning' ? '⚠️' : '❌'}
      </div>
      <h3 style={{ color: colors.text, marginBottom: '0.5rem' }}>
        {appError.severity === 'critical' ? 'Kritischer Fehler' : 'Ein Fehler ist aufgetreten'}
      </h3>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>{userMessage}</p>
      {showDetails && appError.message !== userMessage && (
        <details style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <summary style={{ color: colors.text, cursor: 'pointer' }}>
            Technische Details
          </summary>
          <pre
            style={{
              marginTop: '0.5rem',
              padding: '1rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#ccc',
              overflow: 'auto',
            }}
          >
            {appError.message}
            {appError.context && `\n\nContext: ${JSON.stringify(appError.context, null, 2)}`}
          </pre>
        </details>
      )}
      {onRetry && appError.retryable && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          🔄 Erneut versuchen
        </button>
      )}
    </div>
  );
}