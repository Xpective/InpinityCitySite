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
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
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
  showAdvanced,
  onToggleAdvanced,
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
      <div className="toolbarHeader">
        <div>
          <h2 style={{ margin: 0 }}>City Toolbar</h2>
          <div className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
            Search plots fast, then open filters and tools only when you need them.
          </div>
        </div>

        <div className="toolbarStatusPill">Visible plots: {plots.length}</div>
      </div>

      <div className="toolbarStack">
        <div className="toolbarRow toolbarRowPrimary">
          <input
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Search Q42, plotId, owner..."
            className="toolbarInput"
            aria-label="Search plots by label, plot id or owner"
          />

          <div className="toolbarJumpGroup">
            <input
              value={jumpTarget}
              onChange={(e) => onJumpTargetChange(e.target.value)}
              placeholder="Jump to Q42 / plotId"
              className="toolbarInput"
              aria-label="Jump to a plot by label or plot id"
            />
            <button
              type="button"
              className="toolbarButton"
              onClick={() => onJumpToPlot(jumpTarget)}
              aria-label="Jump to the selected plot"
            >
              Jump
            </button>
          </div>
        </div>

        <details className="toolbarDetails" open={showAdvanced}>
          <summary className="toolbarDetailsSummary">
            Filters, view options and advanced tools
          </summary>

          <div className="toolbarStack toolbarDetailsBody">
            <div className="toolbarFilterGrid">
              <select
                value={availabilityFilter}
                onChange={(e) =>
                  onAvailabilityFilterChange(e.target.value as AvailabilityFilter)
                }
                className="toolbarInput"
                aria-label="Filter plots by availability"
              >
                <option value="all">All availability</option>
                <option value="free">Free only</option>
                <option value="reserved">Reserved only</option>
                <option value="owned">Owned only</option>
                <option value="locked">Locked only</option>
              </select>

              <select
                value={specialFilter}
                onChange={(e) =>
                  onSpecialFilterChange(e.target.value as SpecialFilter)
                }
                className="toolbarInput"
                aria-label="Filter plots by special category"
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

            <div className="toolbarRow">
              <button
                type="button"
                className={`toolbarButton ${showLabels ? "active" : ""}`}
                onClick={onToggleLabels}
              >
                {showLabels ? "Hide Labels" : "Show Labels"}
              </button>

              <button
                type="button"
                className={`toolbarButton ${heatmapMode ? "active" : ""}`}
                onClick={onToggleHeatmap}
              >
                {heatmapMode ? "Heatmap On" : "Heatmap Off"}
              </button>

              <button type="button" className="toolbarButton" onClick={onExportPng}>
                Export SVG
              </button>

              <button
                type="button"
                className={`toolbarButton ${showAdvanced ? "active" : ""}`}
                onClick={onToggleAdvanced}
              >
                {showAdvanced ? "Advanced Visible" : "Advanced Hidden"}
              </button>
            </div>

            {!!quickMatches.length && (
              <div className="toolbarQuickMatches">
                <strong>Quick Matches</strong>
                {quickMatches.map((plot) => (
                  <button
                    key={plot.id}
                    type="button"
                    className="toolbarButton toolbarQuickMatchButton"
                    onClick={() => onJumpToPlot(plot.plotId || plot.label)}
                  >
                    {plot.label} · {plot.plotKind} · {plot.ownerLabel || plot.owner || "no owner"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
