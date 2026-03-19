import { useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import InfinityMap from "./components/city/InfinityMap";
import PlotDetails from "./components/city/PlotDetails";
import { getFavoritePlotIds, toggleFavoritePlot } from "./lib/favorites";
import { TEXT } from "./lib/i18n";
import { generateInfinityPlots } from "./lib/infinity-layout";
import "./styles/global.css";
import type { InfinityPlot } from "./types/infinity";

function downloadMapPng(): void {
  const svg = document.querySelector("#city-map-capture svg") as SVGElement | null;
  if (!svg) return;

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "inpinity-city-map.svg";
  link.click();

  URL.revokeObjectURL(url);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [showLabels, setShowLabels] = useState(true);
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<InfinityPlot | null>(null);

  useEffect(() => {
    setFavoriteIds(getFavoritePlotIds());
  }, []);

  const plots = useMemo(() => {
    return generateInfinityPlots().map((plot) => ({
      ...plot,
      isFavorite: favoriteIds.includes(plot.id),
    }));
  }, [favoriteIds]);

  const visiblePlots = useMemo(() => {
    if (!onlyFavorites) return plots;
    return plots.filter((plot) => favoriteIds.includes(plot.id));
  }, [plots, onlyFavorites, favoriteIds]);

  function handleJump(): void {
    const term = search.trim().toLowerCase();
    if (!term) return;

    const found = plots.find((plot) => {
      return (
        plot.label.toLowerCase().includes(term) ||
        plot.id.toLowerCase().includes(term) ||
        (plot.ownerLabel || "").toLowerCase().includes(term)
      );
    });

    if (found) {
      setSelectedPlot(found);
    }
  }

  function handleToggleFavorite(id: string): void {
    setFavoriteIds(toggleFavoritePlot(id));
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!plots.length) return;

      const currentIndex = selectedPlot
        ? plots.findIndex((p) => p.id === selectedPlot.id)
        : -1;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const next = plots[(currentIndex + 1 + plots.length) % plots.length];
        setSelectedPlot(next);
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const next = plots[(currentIndex - 1 + plots.length) % plots.length];
        setSelectedPlot(next);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [plots, selectedPlot]);

  return (
    <div className="page">
      <header className="hero panel">
        <h1>{TEXT.title}</h1>
        <p className="subtitle">{TEXT.subtitle}</p>

        <div className="configGrid">
          <div>
            <strong>Chain ID:</strong> 8453
          </div>
          <div>
            <strong>Subgraph Proxy:</strong> https://api.city.inpinity.online/graphql
          </div>
          <div>
            <strong>CityRegistry:</strong> follows
          </div>
          <div>
            <strong>CityLand:</strong> follows
          </div>
          <div>
            <strong>CityConfig:</strong> follows
          </div>
          <div>
            <strong>CityStatus:</strong> follows
          </div>
        </div>
      </header>

      <section className="panel">
        <h2>{TEXT.cityVisionTitle}</h2>
        <p>{TEXT.cityVisionText}</p>
      </section>

      <CityStats plots={plots} />

      <section className="panel">
        <h2>{TEXT.mapTitle}</h2>

        <CityToolbar
          search={search}
          onSearchChange={setSearch}
          onJump={handleJump}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((v) => !v)}
          heatmapMode={heatmapMode}
          onToggleHeatmap={() => setHeatmapMode((v) => !v)}
          onlyFavorites={onlyFavorites}
          onToggleFavoritesOnly={() => setOnlyFavorites((v) => !v)}
          onScreenshot={downloadMapPng}
        />

        <InfinityMap
          plots={visiblePlots}
          selectedPlot={selectedPlot}
          onSelectPlot={setSelectedPlot}
          showLabels={showLabels}
          heatmapMode={heatmapMode}
        />
      </section>

      <section className="panel splitPanel">
        <PlotDetails plot={selectedPlot} onToggleFavorite={handleToggleFavorite} />

        <div className="detailsCard">
          <h3 style={{ marginTop: 0 }}>Qubiq Purchase Preparation</h3>
          <div className="detailsGrid">
            <div>Multiple central 25x25 plots reserved for Borderline and Community.</div>
            <div>Outer rings host many personal 5x5 qubiq plots.</div>
            <div>Left and right factions remain visually complementary.</div>
            <div>Gold toward the nexus stays as the shared premium center.</div>
            <div>Next: real free-plot data, reserve flow, price logic, wallet connection.</div>
          </div>

          <div className="buttonRow">
            <button disabled>{TEXT.buttons.wallet}</button>
            <button disabled>{TEXT.buttons.prepare}</button>
            <button disabled>{TEXT.buttons.inspect}</button>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>{TEXT.nextTitle}</h2>
        <p style={{ marginBottom: 0 }}>{TEXT.nextText}</p>
      </section>
    </div>
  );
}