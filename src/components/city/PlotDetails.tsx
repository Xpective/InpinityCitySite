import { isFavoritePlot } from "../../lib/favorites";
import { getLaneWeight } from "../../lib/infinity-layout";
import type { InfinityPlot } from "../../types/infinity";

type Props = {
  plot: InfinityPlot | null;
  onToggleFavorite: (id: string) => void;
};

function pretty(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function PlotDetails({ plot, onToggleFavorite }: Props) {
  if (!plot) {
    return (
      <div className="detailsCard">
        <h3 style={{ marginTop: 0 }}>Plot Details</h3>
        <div>Select a plot on the map.</div>
      </div>
    );
  }

  const favorite = isFavoritePlot(plot.id);
  const laneWeight = getLaneWeight(plot.lane);

  return (
    <div className="detailsCard">
      <div className="detailsHeader">
        <h3 style={{ margin: 0 }}>
          {plot.label} · {pretty(plot.rarity)}
        </h3>
        <button className="toolbarButton active" onClick={() => onToggleFavorite(plot.id)}>
          {favorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>

      <div className="detailsGrid">
        <div>Status: {pretty(plot.status)}</div>
        <div>Faction: {pretty(plot.faction)}</div>
        <div>Kind: {pretty(plot.plotKind)}</div>
        <div>Side: {pretty(plot.side)}</div>
        <div>Lane: {plot.lane}</div>
        <div>Nexus Weight: {laneWeight}</div>
        <div>Distance to Nexus: {plot.distanceToNexus}</div>
        <div>Position: {plot.x.toFixed(1)} / {plot.y.toFixed(1)}</div>
        <div>Estimated Value: {plot.priceEstimate} PIT</div>
        <div>Owner: {plot.ownerLabel || "—"}</div>
        <div>Last Transfer: {plot.lastTransferDaysAgo != null ? `${plot.lastTransferDaysAgo} days ago` : "—"}</div>
      </div>
    </div>
  );
}