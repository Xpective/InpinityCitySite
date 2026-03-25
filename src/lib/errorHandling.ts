// src/lib/errorHandling.ts
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

export function parseError(error: unknown, context?: Record<string, unknown>): AppError {
  // Einfache Implementierung
  if (error instanceof Error) {
    return createAppError(error.message, {
      severity: 'error',
      category: 'unknown',
      originalError: error,
      context,
    });
  }
  return createAppError('Ein unbekannter Fehler ist aufgetreten', {
    severity: 'error',
    category: 'unknown',
    originalError: error,
    context,
  });
}


export async function retry<T>(
  fn: () => Promise<T>,
  config: { maxRetries?: number; baseDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000 } = config;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, baseDelay * (i + 1)));
    }
  }

  throw new Error("Retry failed");
}

export function getUserFriendlyErrorMessage(error: AppError): string {
  switch (error.category) {
    case 'network':
      return 'Netzwerkfehler - Bitte überprüfe deine Internetverbindung.';
    case 'graphql':
      return 'Datenfehler - Die Stadtkarte konnte nicht geladen werden.';
    default:
      return 'Ein Fehler ist aufgetreten.';
  }
}

export function logError(error: AppError): void {
  console.error(error);
}