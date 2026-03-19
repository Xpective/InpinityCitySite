import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import CityToolbar from '../components/city/CityToolbar';

const meta = {
  title: 'City/CityToolbar',
  component: CityToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    search: { control: 'text' },
    showLabels: { control: 'boolean' },
    heatmapMode: { control: 'boolean' },
    onlyFavorites: { control: 'boolean' },
  },
  args: {
    onSearchChange: fn(),
    onJump: fn(),
    onToggleLabels: fn(),
    onToggleHeatmap: fn(),
    onToggleFavoritesOnly: fn(),
    onScreenshot: fn(),
  },
} satisfies Meta<typeof CityToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Standard-Toolbar
export const Default: Story = {
  args: {
    search: '',
    showLabels: true,
    heatmapMode: false,
    onlyFavorites: false,
  },
};

// Mit Suchbegriff
export const WithSearch: Story = {
  args: {
    ...Default.args,
    search: 'Q123',
  },
};

// Labels ausgeblendet
export const LabelsHidden: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};

// Heatmap-Modus aktiv
export const HeatmapActive: Story = {
  args: {
    ...Default.args,
    heatmapMode: true,
  },
};

// Nur Favorites
export const FavoritesOnly: Story = {
  args: {
    ...Default.args,
    onlyFavorites: true,
  },
};

// Alle Modi aktiv
export const AllModesActive: Story = {
  args: {
    ...Default.args,
    showLabels: false,
    heatmapMode: true,
    onlyFavorites: true,
  },
};

// Interaktive Story mit State
export const Interactive: Story = {
  render: function Render(args) {
    const [search, setSearch] = useState('');
    const [showLabels, setShowLabels] = useState(true);
    const [heatmapMode, setHeatmapMode] = useState(false);
    const [onlyFavorites, setOnlyFavorites] = useState(false);

    return (
      <CityToolbar
        {...args}
        search={search}
        onSearchChange={setSearch}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels(!showLabels)}
        heatmapMode={heatmapMode}
        onToggleHeatmap={() => setHeatmapMode(!heatmapMode)}
        onlyFavorites={onlyFavorites}
        onToggleFavoritesOnly={() => setOnlyFavorites(!onlyFavorites)}
      />
    );
  },
};