import { useMemo, useState } from "react";
import "./styles/global.css";
import InfinityMap from "./components/city/InfinityMap";
import PlotDetails from "./components/city/PlotDetails";
import { buildInfinityPlots, filterPlots } from "./lib/infinity-layout";
import type { InfinityPlot, InfinityPlotStatus } from "./types/infinity";

type FilterValue = "all" | InfinityPlotStatus;

export default function App() {
  const plots = useMemo(() => buildInfinityPlots(), []);
  const [selectedPlot, setSelectedPlot] = useState<InfinityPlot | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const visiblePlots = useMemo(
    () => filterPlots(plots, activeFilter),
    [plots, activeFilter]
  );

  const totalPlots = plots.length;
  const personalPlots = plots.filter((p) => p.kind === "personal").length;
  const communityPlots = plots.filter((p) => p.kind === "community").length;
  const freePlots = plots.filter((p) => p.status === "free").length;
  const reservedPlots = plots.filter((p) => p.status === "reserved").length;
  const ownedPlots = plots.filter((p) => p.status === "owned").length;

  function setFilter(filter: FilterValue) {
    setActiveFilter(filter);
    if (selectedPlot && filter !== "all" && selectedPlot.status !== filter) {
      setSelectedPlot(null);
    }
  }

  return (
    <div className="page">
      <section className="hero panel">
        <p className="eyebrow">INPINITY CITY</p>
        <h1>Infinity Qubiq Layout</h1>
        <p className="heroText">
          Die City wird als visuelle ∞-Struktur aufgebaut: 5×5 Personal-Plots entlang
          der beiden Ringe und 25×25 Community-Plots nahe der beiden Nexus-Zentren.
          Wertvollere Flächen liegen näher am Zentrum, nach außen wird das Bild kühler
          und grauer.
        </p>
      </section>

      <section className="panel">
        <h2>Übersicht</h2>
        <div className="cards">
          <button className="statCard" onClick={() => setFilter("all")}>
            <span className="statLabel">Total</span>
            <strong>{totalPlots}</strong>
          </button>

          <div className="statCard">
            <span className="statLabel">5×5 Personal</span>
            <strong>{personalPlots}</strong>
          </div>

          <div className="statCard">
            <span className="statLabel">25×25 Community</span>
            <strong>{communityPlots}</strong>
          </div>

          <button className="statCard" onClick={() => setFilter("free")}>
            <span className="statLabel">Free</span>
            <strong>{freePlots}</strong>
          </button>

          <button className="statCard" onClick={() => setFilter("reserved")}>
            <span className="statLabel">Reserved</span>
            <strong>{reservedPlots}</strong>
          </button>

          <button className="statCard" onClick={() => setFilter("owned")}>
            <span className="statLabel">Owned</span>
            <strong>{ownedPlots}</strong>
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          <button onClick={() => setShowLabels((v) => !v)}>
            {showLabels ? "Labels ausblenden" : "Labels anzeigen"}
          </button>
          <button onClick={() => setFilter("community")}>Nur Community</button>
          <button onClick={() => setFilter("free")}>Nur freie Plots</button>
          <button onClick={() => setFilter("owned")}>Nur besetzte Plots</button>
          <button onClick={() => setFilter("all")}>Alle anzeigen</button>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(290px, 1fr)",
          gap: 20,
        }}
      >
        <InfinityMap
          plots={visiblePlots}
          selectedPlot={selectedPlot}
          onSelectPlot={setSelectedPlot}
          showLabels={showLabels}
          activeFilter={activeFilter}
        />
        <PlotDetails plot={selectedPlot} />
      </section>

      <section className="panel">
        <h2>Nächster Schritt</h2>
        <p style={{ marginBottom: 0 }}>
          Jetzt ist die ∞-City visuell auf die 5×5- und 25×25-Logik vorbereitet. Danach
          binden wir dieselbe Struktur an echte Plot-, Player- und Kaufdaten aus deinem
          Subgraph und anschließend an den Reserve-/Kauf-Flow.
        </p>
      </section>
    </div>
  );
}