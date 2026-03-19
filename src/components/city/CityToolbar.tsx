type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    onJump: () => void;
    showLabels: boolean;
    onToggleLabels: () => void;
    heatmapMode: boolean;
    onToggleHeatmap: () => void;
    onlyFavorites: boolean;
    onToggleFavoritesOnly: () => void;
    onScreenshot: () => void;
  };
  
  export default function CityToolbar({
    search,
    onSearchChange,
    onJump,
    showLabels,
    onToggleLabels,
    heatmapMode,
    onToggleHeatmap,
    onlyFavorites,
    onToggleFavoritesOnly,
    onScreenshot,
  }: Props) {
    return (
      <div className="toolbar">
        <div className="toolbarRow">
          <input
            className="toolbarInput"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search plot label or owner"
          />
          <button className="toolbarButton" onClick={onJump}>
            Jump
          </button>
          <button className="toolbarButton" onClick={onScreenshot}>
            Save PNG
          </button>
        </div>
  
        <div className="toolbarRow">
          <button className={`toolbarButton ${showLabels ? "active" : ""}`} onClick={onToggleLabels}>
            Labels
          </button>
          <button className={`toolbarButton ${heatmapMode ? "active" : ""}`} onClick={onToggleHeatmap}>
            Nexus Heatmap
          </button>
          <button className={`toolbarButton ${onlyFavorites ? "active" : ""}`} onClick={onToggleFavoritesOnly}>
            Favorites Only
          </button>
        </div>
      </div>
    );
  }