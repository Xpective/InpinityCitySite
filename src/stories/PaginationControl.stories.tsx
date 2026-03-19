import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PaginationControls from '../components/common/PaginationControls';

const meta = {
  title: 'Common/PaginationControls',
  component: PaginationControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    hasMore: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    itemCount: { control: 'number' },
    totalEstimate: { control: 'number' },
  },
  args: {
    onLoadMore: fn(),
    onReload: fn(),
  },
} satisfies Meta<typeof PaginationControls>;

export default meta;
type Story = StoryObj<typeof meta>;

// Erste Seite, mehr verfügbar
export const FirstPage: Story = {
  args: {
    currentPage: 0,
    hasMore: true,
    isLoading: false,
    itemCount: 50,
  },
};

// Zweite Seite
export const SecondPage: Story = {
  args: {
    currentPage: 1,
    hasMore: true,
    isLoading: false,
    itemCount: 100,
  },
};

// Letzte Seite (keine weiteren)
export const LastPage: Story = {
  args: {
    currentPage: 5,
    hasMore: false,
    isLoading: false,
    itemCount: 250,
  },
};

// Lade-Zustand
export const Loading: Story = {
  args: {
    currentPage: 2,
    hasMore: true,
    isLoading: true,
    itemCount: 150,
  },
};

// Mit Gesamtschätzung
export const WithEstimate: Story = {
  args: {
    currentPage: 0,
    hasMore: true,
    isLoading: false,
    itemCount: 50,
    totalEstimate: 1000,
  },
};

// Ohne Reload-Button
export const WithoutReload: Story = {
  args: {
    currentPage: 0,
    hasMore: true,
    isLoading: false,
    itemCount: 50,
    onReload: undefined,
  },
};

// Komplett geladen
export const FullyLoaded: Story = {
  args: {
    currentPage: 10,
    hasMore: false,
    isLoading: false,
    itemCount: 500,
  },
};