import { useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import PlotDetails from "./components/city/PlotDetails";
import { getFavoritePlotIds, toggleFavoritePlot } from "./lib/favorites";
import { requestGraphQL } from "./lib/graphql";
import { CITY_DASHBOARD_QUERY } from "./lib/queries";

// NEUE IMPORTS
import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorMessage from "./components/common/ErrorMessage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PaginatedPlotList from "./components/city/PaginatedPlotList";
import { parseError, retry, type AppError } from "./lib/errorHandling";

import "./styles/global.css";

// GENERIERTE TYPEN
import type { CityDashboardQuery } from "./types/generated/graphql";
import type { InfinityPlot } from "./types/infinity";
import { generateInfinityPlots } from "./lib/infinity-layout";

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

  const [dashboard, setDashboard] = useState<CityDashboardQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setFavoriteIds(getFavoritePlotIds());
  }, []);

  useEffect(() => {
    let cancelled = false;
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = await retry(
          async () => {
            return await requestGraphQL<CityDashboardQuery>(CITY_DASHBOARD_QUERY);
          },
          {
            maxRetries: 3,
            baseDelay: 1000,
          }
        );

        if (!cancelled && mounted) {
          setDashboard(data);
        }
      } catch (err) {
        if (!cancelled && mounted) {
          const appError = parseError(err, { 
            query: 'CITY_DASHBOARD_QUERY',
            retryCount,
          });
          setError(appError);
          console.error('Dashboard Fehler:', appError);
        }
      } finally {
        if (!cancelled && mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
      mounted = false;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
  };

  const dashboardCounts = useMemo(() => {
    if (!dashboard) return null;
    return {
      indexerBlock: dashboard._meta?.block?.number || 0,
      weaponDefinitions: dashboard.weaponDefinitions?.length || 0,
      weaponInstances: dashboard.weaponInstances?.length || 0,
      materiaDefinitions: dashboard.materiaDefinitions?.length || 0,
      plots: dashboard.plots?.length || 0,
      players: dashboard.players?.length || 0,
    };
  }, [dashboard]);

  const basePlots = useMemo(() => {
    return generateInfinityPlots();
  }, []);

  function handleJump(): void {
    const term = search.trim().toLowerCase();
    if (!term) return;

    alert('Die Suche wird in der paginierten Version bald verfügbar sein!');
  }

  function handleToggleFavorite(id: string): void {
    setFavoriteIds(toggleFavoritePlot(id));
  }

  useEffect(() => {
    function onKeyDown(_e: KeyboardEvent) {
      // Keyboard-Navigation vorerst deaktiviert
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

        <ErrorBoundary
          onError={(error) => console.error('Dashboard ErrorBoundary:', error)}
          resetKeys={[dashboard]}
        >
          {loading && (
            <>
              <LoadingSpinner text="Lade Stadt-Daten..." />
            </>
          )}

          {!loading && error && (
            <ErrorMessage 
              error={error} 
              onRetry={handleRetry}
              variant="card"
              showDetails={import.meta.env.DEV}
            />
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
        </ErrorBoundary>
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
              <ErrorBoundary
                onError={(error) => console.error('Map ErrorBoundary:', error)}
                resetKeys={[onlyFavorites, favoriteIds]}
              >
                <PaginatedPlotList
                  selectedPlot={selectedPlot}
                  onSelectPlot={setSelectedPlot}
                  showLabels={showLabels}
                  heatmapMode={heatmapMode}
                  onlyFavorites={onlyFavorites}
                  favoriteIds={favoriteIds}
                  pageSize={50}
                />
              </ErrorBoundary>
            </div>

            <CityStats plots={basePlots} />
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