import type { Meta, StoryObj } from '@storybook/react';
import CityStats from '../components/city/CityStats';
import { generateInfinityPlots } from '../lib/infinity-layout';

const mockPlots = generateInfinityPlots();

const meta = {
  title: 'City/CityStats',
  component: CityStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CityStats>;

export default meta;
type Story = StoryObj<typeof meta>;

// Standard-Statistiken
export const Default: Story = {
  args: {
    plots: mockPlots,
  },
};

// Leere Statistiken
export const Empty: Story = {
  args: {
    plots: [],
  },
};

// Nur persönliche Plots
export const OnlyPersonal: Story = {
  args: {
    plots: mockPlots.filter(p => p.plotKind === 'personal-5x5'),
  },
};

// Nur Community Plots
export const OnlyCommunity: Story = {
  args: {
    plots: mockPlots.filter(p => p.plotKind === 'community-25x25'),
  },
};

// Nur Borderline Plots
export const OnlyBorderline: Story = {
  args: {
    plots: mockPlots.filter(p => p.plotKind === 'borderline-25x25'),
  },
};

// Nur Nexus Plots
export const OnlyNexus: Story = {
  args: {
    plots: mockPlots.filter(p => p.plotKind === 'nexus'),
  },
};

// Viele Plots (Performance-Test)
export const ManyPlots: Story = {
  args: {
    plots: mockPlots,
  },
};

// Mit verschiedenen Status-Farben
export const WithStatusColors: Story = {
  args: {
    plots: mockPlots.map((p, i) => ({
      ...p,
      status: i % 3 === 0 ? 'owned' : i % 3 === 1 ? 'reserved' : 'free',
    })),
  },
};