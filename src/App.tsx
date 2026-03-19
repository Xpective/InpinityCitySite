import { useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import InfinityMap from "./components/city/InfinityMap";
import PlotDetails from "./components/city/PlotDetails";
import { getFavoritePlotIds, toggleFavoritePlot } from "./lib/favorites";
import { requestGraphQL } from "./lib/graphql";
import { CITY_DASHBOARD_QUERY } from "./lib/queries";
import { buildDashboardCounts, mergeCityDataIntoPlots } from "./lib/city-map-merge";
import { generateInfinityPlots } from "./lib/infinity-layout";
import "./styles/global.css";
import type { CityDashboardQueryResult } from "./types/city";
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

  const [dashboard, setDashboard] = useState<CityDashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setFavoriteIds(getFavoritePlotIds());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await requestGraphQL<CityDashboardQueryResult>(CITY_DASHBOARD_QUERY);

        if (!cancelled) {
          setDashboard(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const plots = useMemo(() => {
    const basePlots = generateInfinityPlots().map((plot) => ({
      ...plot,
      isFavorite: favoriteIds.includes(plot.id),
    }));

    const merged = dashboard ? mergeCityDataIntoPlots(basePlots, dashboard) : basePlots;

    return merged.map((plot) => ({
      ...plot,
      isFavorite: favoriteIds.includes(plot.id),
    }));
  }, [dashboard, favoriteIds]);

  const visiblePlots = useMemo(() => {
    if (!onlyFavorites) return plots;
    return plots.filter((plot) => favoriteIds.includes(plot.id));
  }, [plots, onlyFavorites, favoriteIds]);

  const dashboardCounts = useMemo(() => {
    return dashboard ? buildDashboardCounts(dashboard) : null;
  }, [dashboard]);

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
      <section className="hero panel">
        <div className="eyebrow">INPINITY CITY</div>
        <h1>Reserve your Qubiq</h1>
        <p>
          Explore city data, inspect crafting assets, and prepare the purchase flow
          for Qubiqs on Inpinity City.
        </p>

        <div className="cards">
          <div className="card">
            <div className="muted">Chain ID</div>
            <strong>8453</strong>
          </div>
          <div className="card">
            <div className="muted">Subgraph Proxy</div>
            <strong>https://api.city.inpinity.online/graphql</strong>
          </div>
          <div className="card">
            <div className="muted">CityRegistry</div>
            <strong>follows</strong>
          </div>
          <div className="card">
            <div className="muted">CityLand</div>
            <strong>follows</strong>
          </div>
          <div className="card">
            <div className="muted">CityConfig</div>
            <strong>follows</strong>
          </div>
          <div className="card">
            <div className="muted">CityStatus</div>
            <strong>follows</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>City Dashboard</h2>

        {loading && <p>Loading city dashboard…</p>}

        {!loading && error && (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              background: "rgba(10,14,26,0.65)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            {error}
          </pre>
        )}

        {!loading && !error && dashboardCounts && (
          <div className="cards">
            <div className="card">
              <div className="muted">Indexer Block</div>
              <strong>{dashboardCounts.indexerBlock}</strong>
            </div>
            <div className="card">
              <div className="muted">Weapon Definitions</div>
              <strong>{dashboardCounts.weaponDefinitions}</strong>
            </div>
            <div className="card">
              <div className="muted">Weapon Instances</div>
              <strong>{dashboardCounts.weaponInstances}</strong>
            </div>
            <div className="card">
              <div className="muted">Materia Definitions</div>
              <strong>{dashboardCounts.materiaDefinitions}</strong>
            </div>
            <div className="card">
              <div className="muted">Plots</div>
              <strong>{dashboardCounts.plots}</strong>
            </div>
            <div className="card">
              <div className="muted">Players</div>
              <strong>{dashboardCounts.players}</strong>
            </div>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Infinity City Map</h2>

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.7fr) minmax(320px, 0.8fr)",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div>
            <div id="city-map-capture">
              <InfinityMap
                plots={visiblePlots}
                selectedPlot={selectedPlot}
                onSelectPlot={setSelectedPlot}
                showLabels={showLabels}
                heatmapMode={heatmapMode}
              />
            </div>

            <CityStats plots={plots} />
          </div>

          <PlotDetails
            plot={selectedPlot}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </section>

      <section className="panel">
        <h2>Marriage phase: mock layout + live subgraph</h2>
        <p>
          The ∞ layout stays visual-first. Real subgraph data is now prepared to
          bind players, plots, ownership and plot history onto the existing city map
          without enabling wallet connection or buying yet.
        </p>
        <p style={{ marginBottom: 0 }}>
          Next step: bind real plot IDs to the exact left/right/borderline/community
          buckets and then overlay live ownership, status and history on top.
        </p>
      </section>
    </div>
  );
}