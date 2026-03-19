import { Component, ErrorInfo, ReactNode } from 'react';
import { AppError, createAppError, getUserFriendlyErrorMessage, logError } from '../../lib/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: AppError, reset: () => void) => ReactNode);
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
}

interface State {
  error: AppError | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      error: createAppError(error.message, {
        severity: 'critical',
        category: 'unknown',
        originalError: error,
      }),
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const appError = createAppError(error.message, {
      severity: 'critical',
      category: 'unknown',
      originalError: error,
      context: { componentStack: errorInfo.componentStack },
    });

    logError(appError);
    this.setState({ errorInfo });

    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.state.error && this.props.resetKeys && prevProps.resetKeys) {
      const hasChanged = this.props.resetKeys.some(
        (key, i) => key !== prevProps.resetKeys?.[i]
      );
      if (hasChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({ error: null, errorInfo: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.reset);
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div
          style={{
            padding: '2rem',
            background: 'rgba(20, 25, 40, 0.95)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 100, 100, 0.3)',
            color: '#fff',
            maxWidth: '600px',
            margin: '2rem auto',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌆</div>
          <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>
            Stadtplan konnte nicht geladen werden
          </h2>
          <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
            {getUserFriendlyErrorMessage(error)}
          </p>
          <button
            onClick={this.reset}
            style={{
              padding: '0.75rem 1.5rem',
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
            🔄 Nochmal versuchen
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;