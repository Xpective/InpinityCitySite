import { useMemo } from "react";
import type { InfinityPlot } from "../../types/infinity";

type AvailabilityFilter = "all" | "free" | "reserved" | "owned" | "locked";
type SpecialFilter =
  | "all"
  | "favorites"
  | "historic-core"
  | "maintenance-overdue"
  | "layer-eligible"
  | "borderline-only"
  | "community-only"
  | "nexus-only";

type Props = {
  plots: InfinityPlot[];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;

  jumpTarget: string;
  onJumpTargetChange: (value: string) => void;
  onJumpToPlot: (value: string) => void;

  showLabels: boolean;
  onToggleLabels: () => void;

  heatmapMode: boolean;
  onToggleHeatmap: () => void;

  availabilityFilter: AvailabilityFilter;
  onAvailabilityFilterChange: (value: AvailabilityFilter) => void;

  specialFilter: SpecialFilter;
  onSpecialFilterChange: (value: SpecialFilter) => void;

  onExportPng: () => void;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export default function CityToolbar({
  plots,
  searchTerm,
  onSearchTermChange,
  jumpTarget,
  onJumpTargetChange,
  onJumpToPlot,
  showLabels,
  onToggleLabels,
  heatmapMode,
  onToggleHeatmap,
  availabilityFilter,
  onAvailabilityFilterChange,
  specialFilter,
  onSpecialFilterChange,
  onExportPng,
}: Props) {
  const quickMatches = useMemo(() => {
    const term = normalize(searchTerm);
    if (!term) return [];

    return plots
      .filter((plot) => {
        const label = normalize(plot.label);
        const plotId = normalize(plot.plotId || "");
        const owner = normalize(plot.owner || plot.ownerLabel || "");
        return label.includes(term) || plotId.includes(term) || owner.includes(term);
      })
      .slice(0, 6);
  }, [plots, searchTerm]);

  return (
    <section className="panel">
      <h2>City Toolbar</h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 8,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <input
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Search Q42, plotId, owner..."
            className="toolbarInput"
          />

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={jumpTarget}
              onChange={(e) => onJumpTargetChange(e.target.value)}
              placeholder="Jump to Q42 / plotId"
              className="toolbarInput"
            />
            <button className="toolbarButton" onClick={() => onJumpToPlot(jumpTarget)}>
              Jump
            </button>
          </div>

          <select
            value={availabilityFilter}
            onChange={(e) => onAvailabilityFilterChange(e.target.value as AvailabilityFilter)}
            className="toolbarInput"
          >
            <option value="all">All availability</option>
            <option value="free">Free only</option>
            <option value="reserved">Reserved only</option>
            <option value="owned">Owned only</option>
            <option value="locked">Locked only</option>
          </select>

          <select
            value={specialFilter}
            onChange={(e) => onSpecialFilterChange(e.target.value as SpecialFilter)}
            className="toolbarInput"
          >
            <option value="all">All plots</option>
            <option value="favorites">Favorites</option>
            <option value="historic-core">Historic core</option>
            <option value="maintenance-overdue">Maintenance overdue</option>
            <option value="layer-eligible">Layer eligible</option>
            <option value="borderline-only">Borderline only</option>
            <option value="community-only">Community only</option>
            <option value="nexus-only">Nexus only</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className={`toolbarButton ${showLabels ? "active" : ""}`}
            onClick={onToggleLabels}
          >
            {showLabels ? "Hide Labels" : "Show Labels"}
          </button>

          <button
            className={`toolbarButton ${heatmapMode ? "active" : ""}`}
            onClick={onToggleHeatmap}
          >
            {heatmapMode ? "Heatmap On" : "Heatmap Off"}
          </button>

          <button className="toolbarButton" onClick={onExportPng}>
            Export PNG
          </button>
        </div>

        {!!quickMatches.length && (
          <div
            style={{
              display: "grid",
              gap: 6,
              padding: 10,
              borderRadius: 12,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <strong>Quick Matches</strong>
            {quickMatches.map((plot) => (
              <button
                key={plot.id}
                className="toolbarButton"
                style={{ justifyContent: "flex-start" }}
                onClick={() => onJumpToPlot(plot.plotId || plot.label)}
              >
                {plot.label} · {plot.plotKind} · {plot.ownerLabel || plot.owner || "no owner"}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}