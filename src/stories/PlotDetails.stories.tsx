import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PlotDetails from '../components/city/PlotDetails';
import { generateInfinityPlots } from '../lib/infinity-layout';

const mockPlots = generateInfinityPlots();
const mockPersonalPlot = mockPlots.find(p => p.plotKind === 'personal-5x5');
const mockCommunityPlot = mockPlots.find(p => p.plotKind === 'community-25x25');
const mockBorderlinePlot = mockPlots.find(p => p.plotKind === 'borderline-25x25');
const mockNexusPlot = mockPlots.find(p => p.plotKind === 'nexus');

const meta = {
  title: 'City/PlotDetails',
  component: PlotDetails,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/your-figma-url',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleFavorite: { action: 'toggled favorite' },
  },
  args: {
    onToggleFavorite: fn(),
  },
} satisfies Meta<typeof PlotDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// Leerer Zustand (kein Plot ausgewählt)
export const Empty: Story = {
  args: {
    plot: null,
  },
};

// Persönlicher Plot
export const PersonalPlot: Story = {
  args: {
    plot: mockPersonalPlot,
  },
};

// Community Plot
export const CommunityPlot: Story = {
  args: {
    plot: mockCommunityPlot,
  },
};

// Borderline Plot
export const BorderlinePlot: Story = {
  args: {
    plot: mockBorderlinePlot,
  },
};

// Nexus Plot
export const NexusPlot: Story = {
  args: {
    plot: mockNexusPlot,
  },
};

// Plot mit Besitzer
export const OwnedPlot: Story = {
  args: {
    plot: {
      ...mockPersonalPlot!,
      owner: '0x1234567890123456789012345678901234567890',
      ownerLabel: '0x1234...7890',
    },
  },
};

// Plot mit Provenance-Daten
export const PlotWithHistory: Story = {
  args: {
    plot: {
      ...mockCommunityPlot!,
      provenance: {
        firstBuilder: '0x1234...5678',
        createdAt: 1700000000,
        layerCount: 5,
        ownershipTransfers: 3,
        aetherUses: 7,
        historicScore: 1250,
        originFaction: 'inpinity',
        genesisEra: true,
        lastUpdated: 1700001000,
      },
    },
  },
};

// Plot mit Status-Info
export const PlotWithStatus: Story = {
  args: {
    plot: {
      ...mockPersonalPlot!,
      statusInfo: {
        lastActivityAt: 1700000500,
        lastMaintenanceAt: 1700000000,
        derivedStatus: 'active',
        layerEligible: true,
        updatedAt: 1700001000,
      },
    },
  },
};

// Favorisierter Plot
export const FavoritePlot: Story = {
  args: {
    plot: {
      ...mockPersonalPlot!,
      isFavorite: true,
    },
  },
};

// Plot mit allen Details
export const CompletePlot: Story = {
  args: {
    plot: {
      ...mockCommunityPlot!,
      owner: '0x1234567890123456789012345678901234567890',
      ownerLabel: '0x1234...7890',
      isFavorite: true,
      provenance: {
        firstBuilder: '0x1234...5678',
        createdAt: 1700000000,
        layerCount: 5,
        ownershipTransfers: 3,
        aetherUses: 7,
        historicScore: 1250,
        originFaction: 'inpinity',
        genesisEra: true,
        lastUpdated: 1700001000,
      },
      statusInfo: {
        lastActivityAt: 1700000500,
        lastMaintenanceAt: 1700000000,
        derivedStatus: 'active',
        layerEligible: true,
        updatedAt: 1700001000,
      },
    },
  },
};