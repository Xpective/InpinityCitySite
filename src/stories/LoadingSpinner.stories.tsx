import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const meta = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: { control: 'color' },
    text: { control: 'text' },
    fullPage: { control: 'boolean' },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Kleiner Spinner
export const Small: Story = {
  args: {
    size: 'small',
  },
};

// Mittlerer Spinner
export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

// Großer Spinner
export const Large: Story = {
  args: {
    size: 'large',
  },
};

// Mit Text
export const WithText: Story = {
  args: {
    size: 'medium',
    text: 'Lade Daten...',
  },
};

// Mit benutzerdefinierter Farbe
export const CustomColor: Story = {
  args: {
    size: 'medium',
    color: '#ff6b6b',
    text: 'Custom Color',
  },
};

// Full-Page Spinner
export const FullPage: Story = {
  args: {
    size: 'large',
    text: 'Lade Anwendung...',
    fullPage: true,
  },
};

// Mehrere Spinner nebeneinander
export const SpinnerCollection: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <LoadingSpinner size="small" />
      <LoadingSpinner size="medium" />
      <LoadingSpinner size="large" />
      <LoadingSpinner size="medium" color="#ff6b6b" />
    </div>
  ),
};