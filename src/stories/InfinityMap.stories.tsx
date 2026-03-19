import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import InfinityMap from '../components/city/InfinityMap';
import { generateInfinityPlots } from '../lib/infinity-layout';

// Mock-Daten für verschiedene Story-Zustände
const mockPlots = generateInfinityPlots().slice(0, 50); // Erste 50 Plots für Übersichtlichkeit
const mockSelectedPlot = mockPlots[24]; // Mittleren Plot auswählen

const meta = {
  title: 'City/InfinityMap',
  component: InfinityMap,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/your-figma-url', // Hier Figma-Link einfügen
    },
  },
  tags: ['autodocs'],
  argTypes: {
    heatmapMode: {
      control: 'boolean',
      description: 'Heatmap-Modus aktivieren/deaktivieren',
    },
    showLabels: {
      control: 'boolean',
      description: 'Plot-Labels anzeigen/verstecken',
    },
  },
} satisfies Meta<typeof InfinityMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Grundlegende Story mit Standard-Einstellungen
export const Default: Story = {
  args: {
    plots: mockPlots,
    selectedPlot: null,
    onSelectPlot: (plot) => console.log('Selected plot:', plot.id),
    showLabels: true,
    heatmapMode: false,
  },
};

// Story mit ausgewähltem Plot
export const WithSelectedPlot: Story = {
  args: {
    ...Default.args,
    selectedPlot: mockSelectedPlot,
  },
};

// Story ohne Labels
export const WithoutLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};

// Story im Heatmap-Modus
export const HeatmapMode: Story = {
  args: {
    ...Default.args,
    heatmapMode: true,
  },
};

// Story mit vielen Plots (Performance-Test)
export const ManyPlots: Story = {
  args: {
    ...Default.args,
    plots: generateInfinityPlots(), // Alle Plots (ca. 250)
  },
};

// Interaktions-Test: Plot auswählen
export const InteractiveSelect: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Ersten Plot finden und klicken
    const firstPlot = canvas.getByText('Q1'); // Erstes Plot-Label
    await userEvent.click(firstPlot);
    
    // Überprüfen ob onSelectPlot aufgerufen wurde (via console.log)
    // In echtem Test würden wir hier einen Mock verwenden
  },
};

// Responsive Story für mobile Ansicht
export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Story mit verschiedenen Heatmap-Intensitäten
export const HeatmapIntensity: Story = {
  args: {
    ...Default.args,
    heatmapMode: true,
  },
  render: (args) => (
    <div>
      <InfinityMap {...args} />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', color: 'white' }}>
        <div>⬅️ Inpinity (wärmer = höhere Aktivität)</div>
        <div>➡️ Inphinity (kühler = niedrigere Aktivität)</div>
      </div>
    </div>
  ),
};