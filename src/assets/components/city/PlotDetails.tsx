import type { InfinityPlot } from "../../types/infinity";
import { getLaneWeight } from "../../lib/infinity-layout";

type Props = {
  plot: InfinityPlot | null;
};

function formatFaction(value: InfinityPlot["faction"]) {
  return value === "inpinity" ? "Inpinity / Pi" : "Inphinity / Phi";
}

function formatState(value: InfinityPlot["visualState"]) {
  if (value === "free") return "Frei";
  if (value === "reserved") return "Reserviert";
  return "Besetzt";
}

export default function PlotDetails({ plot }: Props) {
  if (!plot) {
    return (
      <section className="panel infinitySidePanel">
        <h2>Plot-Details</h2>
        <p className="muted">
          Klicke links auf eine Plot-Zelle in der ♾️-Map.
        </p>
      </section>
    );
  }

  return (
    <section className="panel infinitySidePanel">
      <h2>Plot-Details</h2>

      <div className="detailGrid">
        <div className="detailRow">
          <span>ID</span>
          <strong>{plot.plotId}</strong>
        </div>

        <div className="detailRow">
          <span>Label</span>
          <strong>{plot.label}</strong>
        </div>

        <div className="detailRow">
          <span>Faction</span>
          <strong>{formatFaction(plot.faction)}</strong>
        </div>

        <div className="detailRow">
          <span>Lane</span>
          <strong>{getLaneWeight(plot.lane)}</strong>
        </div>

        <div className="detailRow">
          <span>Status</span>
          <strong>{formatState(plot.visualState)}</strong>
        </div>

        <div className="detailRow">
          <span>Segment</span>
          <strong>{plot.segment + 1}</strong>
        </div>

        <div className="detailRow">
          <span>Distance to Nexus</span>
          <strong>{plot.distanceToNexus}</strong>
        </div>

        <div className="detailRow">
          <span>Rarity Score</span>
          <strong>{plot.rarityScore}</strong>
        </div>

        <div className="detailRow">
          <span>Koordinaten</span>
          <strong>
            {plot.x}, {plot.y}
          </strong>
        </div>
      </div>

      <div className="sideHint">
        Dieser Plot ist bereits für spätere Reservierung, Kauf, Preislogik,
        Materialbedarf und Gebäudewert vorbereitet.
      </div>
    </section>
  );
}
