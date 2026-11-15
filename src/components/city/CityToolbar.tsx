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

  const activeFilterCount = [
    availabilityFilter !== "all" ? 1 : 0,
    specialFilter !== "all" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const inputStyle = {
    padding: "10px 12px",
    background: "rgba(0,0,0,0.6)",
    border: "1px solid var(--color-border, #333)",
    color: "var(--color-text, #e0e0e0)",
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    borderRadius: 4,
    outline: "none",
    width: "100%",
    letterSpacing: "0.5px",
  } as const;

  return (
    <section className="panel themedPanel">
      {/* === HEADER === */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>City Toolbar</h2>
          <div
            style={{
              color: "var(--color-text-dim, #888)",
              fontSize: 11,
              marginTop: 4,
              letterSpacing: "0.5px",
            }}
          >
            Search plots fast, filter when needed, inspect on click.
          </div>
        </div>
        <div
          style={{
            padding: "5px 12px",
            background: "rgba(255,204,0,0.1)",
            border: "1px solid var(--color-primary, #ffcc00)",
            borderRadius: 999,
            color: "var(--color-primary, #ffcc00)",
            fontSize: 10,
            fontWeight: "bold",
            letterSpacing: "1px",
            fontFamily: "'Courier New', monospace",
          }}
        >
          {plots.length} VISIBLE
        </div>
      </div>

      {/* === SEARCH + JUMP === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="🔍 Search plot / ID / owner…"
          style={inputStyle}
          aria-label="Search plots by label, plot id or owner"
        />

        <div style={{ display: "flex", gap: 6 }}>
          <input
            value={jumpTarget}
            onChange={(e) => onJumpTargetChange(e.target.value)}
            placeholder="Jump to…"
            style={{ ...inputStyle, width: 140 }}
            aria-label="Jump to a plot by label or plot id"
            onKeyDown={(e) => {
              if (e.key === "Enter") onJumpToPlot(jumpTarget);
            }}
          />
          <button
            className="ip-btn ip-btn--sm"
            onClick={() => onJumpToPlot(jumpTarget)}
            aria-label="Jump to the selected plot"
            style={{ fontSize: 11, padding: "10px 16px" }}
          >
            Jump
          </button>
        </div>
      </div>

      {/* === QUICK MATCHES === */}
      {quickMatches.length > 0 && (
        <div
          style={{
            padding: 10,
            background: "rgba(255,204,0,0.05)",
            borderLeft: "3px solid var(--color-primary, #ffcc00)",
            borderRadius: 4,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "var(--color-primary, #ffcc00)",
              letterSpacing: "2px",
              fontWeight: "bold",
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            Quick Matches
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {quickMatches.map((plot) => (
              <button
                key={plot.id}
                onClick={() => onJumpToPlot(plot.plotId || plot.label)}
                style={{
                  padding: "5px 10px",
                  background: "rgba(255,204,0,0.15)",
                  border: "1px solid var(--color-primary, #ffcc00)",
                  color: "var(--color-primary, #ffcc00)",
                  borderRadius: 999,
                  fontSize: 10,
                  fontFamily: "'Courier New', monospace",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                }}
              >
                {plot.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* === FILTER TOGGLE === */}
      <button
        className="ip-btn ip-btn--ghost"
        onClick={onToggleAdvanced}
        style={{
          width: "100%",
          marginBottom: showAdvanced ? 10 : 0,
          fontSize: 11,
          padding: "10px 12px",
          justifyContent: "space-between",
        }}
      >
        <span>
          {showAdvanced ? "▼ Filters & Tools" : "▶ Filters & Tools"}
          {activeFilterCount > 0 && (
            <span
              style={{
                marginLeft: 8,
                padding: "2px 8px",
                background: "var(--color-primary, #ffcc00)",
                color: "#000",
                borderRadius: 999,
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {activeFilterCount} ACTIVE
            </span>
          )}
        </span>
        <span style={{ opacity: 0.5 }}>{showAdvanced ? "Hide" : "Show"}</span>
      </button>

      {/* === FILTERS + ACTIONS === */}
      {showAdvanced && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Filter Selects */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 6,
            }}
          >
            <select
              value={availabilityFilter}
              onChange={(e) => onAvailabilityFilterChange(e.target.value as AvailabilityFilter)}
              style={inputStyle}
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
              onChange={(e) => onSpecialFilterChange(e.target.value as SpecialFilter)}
              style={inputStyle}
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

          {/* Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button
              className={`ip-chip ${showLabels ? "ip-chip--active" : ""}`}
              onClick={onToggleLabels}
              style={{ fontSize: 11 }}
            >
              {showLabels ? "✓ Labels On" : "○ Labels Off"}
            </button>
            <button
              className={`ip-chip ${heatmapMode ? "ip-chip--active" : ""}`}
              onClick={onToggleHeatmap}
              style={{ fontSize: 11 }}
            >
              {heatmapMode ? "🔥 Heatmap On" : "○ Heatmap Off"}
            </button>
            <button
              className="ip-chip"
              onClick={onExportPng}
              style={{ fontSize: 11 }}
            >
              ⬇ Export SVG
            </button>
          </div>
        </div>
      )}
    </section>
  );
}