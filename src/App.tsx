import { useMemo, useState } from "react";
import "./styles/global.css";
import { CONFIG } from "./lib/config";
import InfinityMap from "./components/city/InfinityMap";
import PlotDetails from "./components/city/PlotDetails";
import {
  generateInfinityPlots,
  getInfinityMapStats,
} from "./lib/infinity-layout";
import type { InfinityPlot } from "./types/infinity";

export default function App() {
  const plots = useMemo(() => generateInfinityPlots(), []);
  const stats = useMemo(() => getInfinityMapStats(plots), [plots]);

  const [selectedPlot, setSelectedPlot] = useState<InfinityPlot | null>(plots[0] ?? null);

  return (
    <div className="page">
      <section className="heroPanel">
        <div className="heroText">
          <p className="eyebrow">INPINITY CITY</p>
          <h1>Reserve your Qubiq</h1>
          <p className="heroLead">
            Explore the Infinity-shaped City, inspect Nexus proximity, and
            prepare the future reserve and purchase flow for your Qubiqs.
          </p>
        </div>
      </section>

      <section className="panel">
        <h2>Projekt-Konfiguration</h2>
        <div className="configGrid">
          <div className="configRow">
            <span>Chain ID</span>
            <strong>{CONFIG.chainId}</strong>
          </div>
          <div className="configRow">
            <span>Subgraph Proxy</span>
            <strong>{CONFIG.subgraphUrl || "folgt"}</strong>
          </div>
          <div className="configRow">
            <span>CityRegistry</span>
            <strong>{CONFIG.cityRegistryAddress || "folgt"}</strong>
          </div>
          <div className="configRow">
            <span>CityLand</span>
            <strong>{CONFIG.cityLandAddress || "folgt"}</strong>
          </div>
          <div className="configRow">
            <span>CityConfig</span>
            <strong>{CONFIG.cityConfigAddress || "folgt"}</strong>
          </div>
          <div className="configRow">
            <span>CityStatus</span>
            <strong>{CONFIG.cityStatusAddress || "folgt"}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Infinity City Dashboard</h2>
        <div className="cards">
          <div className="statCard">
            <span>Total Plots</span>
            <strong>{stats.totalPlots}</strong>
          </div>
          <div className="statCard">
            <span>Free</span>
            <strong>{stats.freePlots}</strong>
          </div>
          <div className="statCard">
            <span>Reserved</span>
            <strong>{stats.reservedPlots}</strong>
          </div>
          <div className="statCard">
            <span>Occupied</span>
            <strong>{stats.occupiedPlots}</strong>
          </div>
        </div>
      </section>

      <div className="cityLayoutGrid">
        <InfinityMap
          plots={plots}
          selectedPlotId={selectedPlot?.id ?? null}
          onSelectPlot={setSelectedPlot}
        />

        <PlotDetails plot={selectedPlot} />
      </div>

      <section className="panel">
        <h2>Qubiq-Kauf Vorbereitung</h2>
        <p className="muted">
          Als Nächstes hängen wir auf diese Infinity-Struktur echte freie Plots,
          Wallet Connect, Reservierung, Kauf, Materialbedarf und Preislogik.
        </p>

        <div className="buttonRow">
          <button disabled>Wallet verbinden</button>
          <button disabled>Qubiq reservieren</button>
          <button disabled>Plot kaufen</button>
        </div>
      </section>

      <section className="panel">
        <h2>Nächste Ausbaustufe</h2>
        <div className="list">
          <div className="listItem">1. Echte freie Plots aus Subgraph/Contract einblenden</div>
          <div className="listItem">2. Nexus-Distanz in Preislogik umsetzen</div>
          <div className="listItem">3. Rarity-/Farbverlauf mit echter Wertlogik koppeln</div>
          <div className="listItem">4. Reserve-/Kauf-Flow an Wallet + Contracts hängen</div>
        </div>
      </section>
    </div>
  );
}
