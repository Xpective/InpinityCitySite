import type { InfinityPlot } from "../../types/infinity";

type Props = {
  plots: InfinityPlot[];
};

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

const RARITY_COLORS: Record<string, string> = {
  bronze: "#cd7f32",
  silver: "#c0c0c0",
  gold: "#ffcc00",
  platinum: "#e5e4e2",
  diamond: "#b9f2ff",
};

export default function CityStats({ plots }: Props) {
  // === Compute all stats ===
  const personal = plots.filter((p) => p.policy.isPersonal).length;
  const community = plots.filter((p) => p.policy.isCommunity).length;
  const borderline = plots.filter((p) => p.policy.isBorderline).length;
  const nexus = plots.filter((p) => p.policy.isNexus).length;

  const free = plots.filter((p) => p.status === "free").length;
  const owned = plots.filter((p) => p.status === "owned").length;
  const reserved = plots.filter((p) => p.status === "reserved").length;
  const locked = plots.filter((p) => p.status === "locked").length;

  const legacyCore = plots.filter((p) => p.provenance?.isHistoricCore).length;
  const layerEligible = plots.filter((p) => p.statusInfo?.layerEligible).length;

  const critical = plots.filter((p) => p.statusInfo?.inactivityLevel === "critical").length;
  const overdue = plots.filter((p) => p.statusInfo?.maintenanceLevel === "overdue").length;

  const tierCounts = countBy(plots.map((p) => p.tier));
  const rarityCounts = countBy(plots.map((p) => p.rarity));

  const maxTier = Math.max(...Object.values(tierCounts), 1);
  const maxRarity = Math.max(...Object.values(rarityCounts), 1);

  // === Empty state (no plots) ===
  if (plots.length === 0) {
    return (
      <section className="panel themedPanel">
        <h2>City Stats</h2>
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "var(--color-text-dim, #888)",
            fontSize: 12,
          }}
        >
          📊 No plots visible yet. Reserve a plot to see live city statistics.
        </div>
      </section>
    );
  }

  const StatCard = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number | string;
    color?: string;
  }) => (
    <div
      style={{
        padding: 12,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border, #333)",
        borderRadius: 4,
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div
        style={{
          color: "var(--color-text-dim, #888)",
          fontSize: 9,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: color || "var(--color-primary, #ffcc00)",
          fontSize: 20,
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        {value}
      </div>
    </div>
  );

  const MiniBar = ({
    label,
    value,
    max,
    color,
  }: {
    label: string;
    value: number;
    max: number;
    color: string;
  }) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 40px",
          gap: 8,
          alignItems: "center",
          marginBottom: 6,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
        }}
      >
        <div style={{ color: "var(--color-text-dim, #888)", letterSpacing: "0.5px" }}>
          {label}
        </div>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            color: "var(--color-text, #e0e0e0)",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          {value}
        </div>
      </div>
    );
  };

  return (
    <section className="panel themedPanel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h2 style={{ margin: 0 }}>City Stats</h2>
        <span style={{ fontSize: 10, color: "var(--color-text-dim)", letterSpacing: "1px" }}>
          {plots.length} plots visible
        </span>
      </div>

      {/* === PRIMARY STATS === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <StatCard label="Personal" value={personal} color="var(--color-primary, #ffcc00)" />
        <StatCard label="Community" value={community} color="#ff3b30" />
        <StatCard label="Borderline" value={borderline} color="#59ff2b" />
        <StatCard label="Nexus" value={nexus} color="#ffd700" />
        <StatCard label="Free" value={free} color="var(--color-text-dim, #888)" />
        <StatCard label="Reserved" value={reserved} color="#ffaa33" />
        <StatCard label="Owned" value={owned} color="var(--color-success, #00ff88)" />
        <StatCard label="Locked" value={locked} color="var(--color-text-faint, #666)" />
      </div>

      {/* === HEALTH ALERTS (nur wenn relevant) === */}
      {(critical > 0 || overdue > 0) && (
        <div
          style={{
            padding: 10,
            background: "rgba(255,51,51,0.08)",
            borderLeft: "3px solid var(--color-danger, #ff3333)",
            borderRadius: 4,
            marginBottom: 16,
            fontSize: 11,
            color: "var(--color-danger, #ff3333)",
            fontFamily: "'Courier New', monospace",
          }}
        >
          ⚠ {critical > 0 && <span><strong>{critical}</strong> critical inactivity</span>}
          {critical > 0 && overdue > 0 && " · "}
          {overdue > 0 && <span><strong>{overdue}</strong> maintenance overdue</span>}
        </div>
      )}

      {/* === SPECIAL STATS === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <StatCard label="Legacy Core" value={legacyCore} color="#c8b4ff" />
        <StatCard label="Layer Eligible" value={layerEligible} color="var(--color-info, #00e5ff)" />
      </div>

      {/* === RARITY DISTRIBUTION === */}
      {Object.keys(rarityCounts).length > 0 && (
        <div
          style={{
            padding: 14,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--color-border, #333)",
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 10,
              fontSize: 11,
              color: "var(--color-primary, #ffcc00)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Rarity Distribution
          </h3>
          {Object.entries(rarityCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([label, value]) => (
              <MiniBar
                key={label}
                label={label.toUpperCase()}
                value={value}
                max={maxRarity}
                color={RARITY_COLORS[label.toLowerCase()] || "var(--color-primary, #ffcc00)"}
              />
            ))}
        </div>
      )}

      {/* === TIER DISTRIBUTION === */}
      {Object.keys(tierCounts).length > 0 && (
        <div
          style={{
            padding: 14,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--color-border, #333)",
            borderRadius: 4,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 10,
              fontSize: 11,
              color: "var(--color-primary, #ffcc00)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Tier Distribution
          </h3>
          {Object.entries(tierCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([label, value]) => (
              <MiniBar
                key={label}
                label={label.toUpperCase()}
                value={value}
                max={maxTier}
                color="var(--color-primary, #ffcc00)"
              />
            ))}
        </div>
      )}
    </section>
  );
}