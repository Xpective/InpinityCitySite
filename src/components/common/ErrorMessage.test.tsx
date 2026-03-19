import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import { createAppError } from '../../lib/errorHandling';

describe('ErrorMessage', () => {
  it('should not render when error is null', () => {
    const { container } = render(<ErrorMessage error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render string error as card variant', () => {
    render(<ErrorMessage error="Test error" />);
    
    expect(screen.getByText('Ein Fehler ist aufgetreten')).toBeInTheDocument();
    expect(screen.getByText('❌ Ein Fehler ist aufgetreten - Unser Team wurde benachrichtigt.')).toBeInTheDocument();
  });

  it('should render Error object', () => {
    const error = new Error('Test error');
    render(<ErrorMessage error={error} />);
    
    expect(screen.getByText('Ein Fehler ist aufgetreten')).toBeInTheDocument();
  });

  it('should render AppError with correct severity', () => {
    const error = createAppError('Network error', { severity: 'critical', category: 'network' });
    render(<ErrorMessage error={error} />);
    
    expect(screen.getByText('Kritischer Fehler')).toBeInTheDocument();
    expect(screen.getByText('🌐 Netzwerkfehler - Bitte überprüfe deine Internetverbindung.')).toBeInTheDocument();
  });

  it('should render inline variant correctly', () => {
    const error = createAppError('Test error');
    render(<ErrorMessage error={error} variant="inline" />);
    
    expect(screen.getByText('❌')).toBeInTheDocument();
    expect(screen.getByText('❌ Ein Fehler ist aufgetreten - Unser Team wurde benachrichtigt.')).toBeInTheDocument();
  });

  it('should render toast variant correctly', () => {
    const error = createAppError('Test error');
    render(<ErrorMessage error={error} variant="toast" />);
    
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('should show retry button when onRetry provided and error retryable', () => {
    const onRetry = vi.fn();
    const error = createAppError('Test error', { retryable: true });
    
    render(<ErrorMessage error={error} onRetry={onRetry} variant="inline" />);
    
    const retryButton = screen.getByText('Wiederholen');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when error not retryable', () => {
    const onRetry = vi.fn();
    const error = createAppError('Test error', { retryable: false });
    
    render(<ErrorMessage error={error} onRetry={onRetry} variant="inline" />);
    
    expect(screen.queryByText('Wiederholen')).toBeNull();
  });

  it('should show technical details in card variant when showDetails is true', () => {
    const error = createAppError('Test error', { context: { test: true } });
    render(<ErrorMessage error={error} showDetails={true} variant="card" />);
    
    expect(screen.getByText('Technische Details')).toBeInTheDocument();
  });

  it('should not show technical details in inline variant', () => {
    const error = createAppError('Test error');
    render(<ErrorMessage error={error} showDetails={true} variant="inline" />);
    
    expect(screen.queryByText('Technische Details')).toBeNull();
  });
});