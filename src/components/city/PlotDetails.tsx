import type { InfinityPlot } from "../../types/infinity";
import { getLaneWeight, getPlotKindLabel } from "../../lib/infinity-layout";

type PlotDetailsProps = {
  plot: InfinityPlot | null;
};

function pretty(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function PlotDetails({ plot }: PlotDetailsProps) {
  if (!plot) {
    return (
      <div
        style={{
          padding: 20,
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(15,23,42,0.65)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Plot Details</h3>
        <p style={{ marginBottom: 0, opacity: 0.8 }}>
          Wähle links einen Plot in der ∞-City aus.
        </p>
      </div>
    );
  }

  const laneWeight = getLaneWeight(plot.distanceToNexus);

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(15,23,42,0.65)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>
        {plot.label} · {pretty(plot.rarity)}
      </h3>

      <div style={{ display: "grid", gap: 8 }}>
        <div>Status: {pretty(plot.status)}</div>
        <div>Typ: {getPlotKindLabel(plot.kind)}</div>
        <div>Faction: {pretty(plot.faction)}</div>
        <div>Side: {pretty(plot.side)}</div>
        <div>Lane: {plot.lane}</div>
        <div>Nexus Weight: {laneWeight}</div>
        <div>Distance to Nexus: {plot.distanceToNexus}</div>
        <div>Grid Size: {plot.widthUnits}×{plot.heightUnits}</div>
        <div>Position: {plot.x.toFixed(1)} / {plot.y.toFixed(1)}</div>
        {plot.ownerLabel ? <div>Owner: {plot.ownerLabel}</div> : null}
      </div>
    </div>
  );
}