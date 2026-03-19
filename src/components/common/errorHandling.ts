/**
 * Zentrale Error-Handling Utilities für die Inpinity City App
 */

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorCategory = 'network' | 'graphql' | 'validation' | 'unknown';

export interface AppError extends Error {
  severity: ErrorSeverity;
  category: ErrorCategory;
  retryable: boolean;
  timestamp: number;
  originalError?: unknown;
  context?: Record<string, unknown>;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

/**
 * Erstellt einen strukturierten AppError
 */
export function createAppError(
  message: string,
  options: {
    severity?: ErrorSeverity;
    category?: ErrorCategory;
    retryable?: boolean;
    originalError?: unknown;
    context?: Record<string, unknown>;
  } = {}
): AppError {
  const error = new Error(message) as AppError;
  error.severity = options.severity || 'error';
  error.category = options.category || 'unknown';
  error.retryable = options.retryable ?? true;
  error.timestamp = Date.now();
  error.originalError = options.originalError;
  error.context = options.context;
  return error;
}

/**
 * Parst Fehler aus verschiedenen Quellen zu einem AppError
 */
export function parseError(error: unknown, context?: Record<string, unknown>): AppError {
  // GraphQL-Fehler
  if (error && typeof error === 'object' && 'errors' in error) {
    const gqlError = error as { errors: Array<{ message: string }> };
    return createAppError(
      gqlError.errors[0]?.message || 'GraphQL Fehler',
      {
        severity: 'error',
        category: 'graphql',
        retryable: true,
        originalError: error,
        context,
      }
    );
  }

  // Network-Fehler
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return createAppError(
      'Netzwerkverbindung fehlgeschlagen',
      {
        severity: 'critical',
        category: 'network',
        retryable: true,
        originalError: error,
        context,
      }
    );
  }

  // Standard-Fehler
  if (error instanceof Error) {
    return createAppError(
      error.message,
      {
        severity: 'error',
        category: 'unknown',
        retryable: true,
        originalError: error,
        context,
      }
    );
  }

  // Unbekannter Fehler
  return createAppError(
    'Ein unbekannter Fehler ist aufgetreten',
    {
      severity: 'error',
      category: 'unknown',
      retryable: false,
      originalError: error,
      context,
    }
  );
}

/**
 * Retry-Logik mit exponentiell steigender Wartezeit
 */
export async function retry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, baseDelay, maxDelay, backoffFactor } = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        break;
      }

      // Exponentielle Backoff-Berechnung
      const delay = Math.min(
        baseDelay * Math.pow(backoffFactor, attempt - 1),
        maxDelay
      );

      console.warn(
        `Versuch ${attempt} fehlgeschlagen. Nächster Versuch in ${delay}ms...`,
        error
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Retry fehlgeschlagen');
}

/**
 * Zeigt benutzerfreundliche Fehlermeldungen basierend auf Fehlerkategorie
 */
export function getUserFriendlyErrorMessage(error: AppError): string {
  switch (error.category) {
    case 'network':
      return '🌐 Netzwerkfehler - Bitte überprüfe deine Internetverbindung.';
    
    case 'graphql':
      if (error.message.includes('timeout')) {
        return '⏱️ Der Server antwortet nicht - Bitte versuche es später erneut.';
      }
      return '📊 Datenfehler - Die Stadtkarte konnte nicht geladen werden.';
    
    case 'validation':
      return '⚠️ Ungültige Eingabe - Bitte überprüfe deine Angaben.';
    
    case 'unknown':
    default:
      return '❌ Ein Fehler ist aufgetreten - Unser Team wurde benachrichtigt.';
  }
}

/**
 * Loggt Fehler für Monitoring (später für Punkt 20 Analytics)
 */
export function logError(error: AppError): void {
  console.error(
    `[${new Date(error.timestamp).toISOString()}] ${error.severity.toUpperCase()} - ${error.category}: ${error.message}`,
    {
      context: error.context,
      originalError: error.originalError,
    }
  );
  
  // Hier könnte später ein API-Call zu einem Logging-Service erfolgen
}