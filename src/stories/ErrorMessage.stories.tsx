import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ErrorMessage from '../components/common/ErrorMessage';
import { createAppError } from '../lib/errorHandling';

const meta = {
  title: 'Common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'card', 'toast'],
    },
  },
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// String-Fehler als Card
export const StringErrorCard: Story = {
  args: {
    error: 'Ein Fehler ist aufgetreten',
    variant: 'card',
  },
};

// AppError als Card
export const AppErrorCard: Story = {
  args: {
    error: createAppError('Network error', { 
      severity: 'critical',
      category: 'network',
    }),
    variant: 'card',
  },
};

// Inline-Variante
export const InlineError: Story = {
  args: {
    error: createAppError('Validation fehlgeschlagen', {
      severity: 'warning',
      category: 'validation',
    }),
    variant: 'inline',
  },
};

// Toast-Variante
export const ToastError: Story = {
  args: {
    error: createAppError('Zeitüberschreitung', {
      severity: 'error',
      category: 'graphql',
    }),
    variant: 'toast',
  },
};

// Mit Retry-Button
export const WithRetry: Story = {
  args: {
    error: createAppError('Netzwerkfehler', {
      severity: 'error',
      category: 'network',
      retryable: true,
    }),
    variant: 'card',
    onRetry: fn(),
  },
};

// Mit technischen Details
export const WithDetails: Story = {
  args: {
    error: createAppError('GraphQL Fehler', {
      severity: 'error',
      category: 'graphql',
      context: { query: 'GetPlots', variables: { first: 50 } },
    }),
    variant: 'card',
    showDetails: true,
  },
};

// Verschiedene Severities
export const ErrorSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
      <ErrorMessage 
        error={createAppError('Info Nachricht', { severity: 'info' })} 
        variant="card"
      />
      <ErrorMessage 
        error={createAppError('Warnung', { severity: 'warning' })} 
        variant="card"
      />
      <ErrorMessage 
        error={createAppError('Fehler', { severity: 'error' })} 
        variant="card"
      />
      <ErrorMessage 
        error={createAppError('Kritischer Fehler', { severity: 'critical' })} 
        variant="card"
      />
    </div>
  ),
};