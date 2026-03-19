import { useMemo, useState } from "react";
import "./styles/global.css";
import InfinityMap from "./components/city/InfinityMap";
import PlotDetails from "./components/city/PlotDetails";
import { buildInfinityPlots } from "./lib/infinity-layout";
import type { InfinityPlot } from "./types/infinity";

export default function App() {
  const plots = useMemo(() => buildInfinityPlots(), []);
  const [selectedPlot, setSelectedPlot] = useState<InfinityPlot | null>(null);

  const totalPlots = plots.length;
  const ownedPlots = plots.filter((p) => p.status === "owned").length;
  const reservedPlots = plots.filter((p) => p.status === "reserved").length;
  const freePlots = plots.filter((p) => p.status === "free").length;

  return (
    <div className="page">
      <section className="hero panel">
        <p className="eyebrow">INPINITY CITY</p>
        <h1>Infinity Qubiq Layout</h1>
        <p className="heroText">
          Die City wird als visuelle ∞-Struktur aufgebaut. Seltene und wertvolle
          Qubiqs liegen näher am Nexus der beiden Ringe, während äußere Bereiche
          kühler und grauer auslaufen.
        </p>
      </section>

      <section className="panel">
        <h2>Übersicht</h2>
        <div className="cards">
          <div className="statCard">
            <span className="statLabel">Total Plots</span>
            <strong>{totalPlots}</strong>
          </div>
          <div className="statCard">
            <span className="statLabel">Free</span>
            <strong>{freePlots}</strong>
          </div>
          <div className="statCard">
            <span className="statLabel">Reserved</span>
            <strong>{reservedPlots}</strong>
          </div>
          <div className="statCard">
            <span className="statLabel">Owned</span>
            <strong>{ownedPlots}</strong>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 20,
        }}
      >
        <InfinityMap
          plots={plots}
          selectedPlot={selectedPlot}
          onSelectPlot={setSelectedPlot}
        />
        <PlotDetails plot={selectedPlot} />
      </section>

      <section className="panel">
        <h2>Nächster Schritt</h2>
        <p style={{ marginBottom: 0 }}>
          Als Nächstes verbinden wir diese ∞-Visualisierung mit echten Plot-,
          Player- und Kaufdaten aus deinem City-Subgraph und anschließend mit dem
          Reserve-/Kauf-Flow.
        </p>
      </section>
    </div>
  );
}