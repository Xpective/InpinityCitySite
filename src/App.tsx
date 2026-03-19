import { useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import PlotDetails from "./components/city/PlotDetails";
import InfinityMap from "./components/city/InfinityMap";
import MintPreparationPanel from "./components/city/MintPreparationPanel";

import { getFavoritePlotIds, toggleFavoritePlot } from "./lib/favorites";
import { requestGraphQL } from "./lib/graphql";
import { CITY_DASHBOARD_QUERY } from "./lib/queries";
import { generateInfinityPlots } from "./lib/infinity-layout";
import { hydratePlots } from "./lib/city-map-merge";
import { getPlotEligibility, type WalletState } from "./lib/eligibility";
import {
  evaluateResourceEligibility,
  readWalletResourceBalances,
  type ResourceEligibility,
} from "./lib/resource-check";
import type { CityConfigSnapshot } from "./lib/city-config";

import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorMessage from "./components/common/ErrorMessage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { parseError, retry, type AppError } from "./lib/errorHandling";

import type { DashboardQueryResult } from "./types/city";
import type { InfinityPlot } from "./types/infinity";

import "./styles/global.css";

type AvailabilityFilter = "all" | "free" | "reserved" | "owned" | "locked";
type SpecialFilter =
  | "all"
  | "favorites"
  | "historic-core"
  | "maintenance-overdue"
  | "layer-eligible"
  | "borderline-only"
  | "community-only"
  | "nexus-only";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

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

function matchesSearch(plot: InfinityPlot, term: string): boolean {
  if (!term) return true;

  const label = normalize(plot.label);
  const plotId = normalize(plot.plotId || "");
  const owner = normalize(plot.owner || "");
  const ownerLabel = normalize(plot.ownerLabel || "");

  return (
    label.includes(term) ||
    plotId.includes(term) ||
    owner.includes(term) ||
    ownerLabel.includes(term)
  );
}

function matchesAvailability(plot: InfinityPlot, filter: AvailabilityFilter): boolean {
  if (filter === "all") return true;
  return plot.status === filter;
}

function matchesSpecial(
  plot: InfinityPlot,
  filter: SpecialFilter,
  favoriteIds: string[]
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "favorites":
      return favoriteIds.includes(plot.id);
    case "historic-core":
      return !!plot.provenance?.isHistoricCore;
    case "maintenance-overdue":
      return plot.statusInfo?.maintenanceLevel === "overdue";
    case "layer-eligible":
      return !!plot.statusInfo?.layerEligible;
    case "borderline-only":
      return plot.policy.isBorderline;
    case "community-only":
      return plot.policy.isCommunity;
    case "nexus-only":
      return plot.policy.isNexus;
    default:
      return true;
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jumpTarget, setJumpTarget] = useState("");
  const [showLabels, setShowLabels] = useState(true);
  const [heatmapMode, setHeatmapMode] = useState(false);

  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");
  const [specialFilter, setSpecialFilter] =
    useState<SpecialFilter>("all");

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<InfinityPlot | null>(null);

  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
  });

  const [cityConfigSnapshot, setCityConfigSnapshot] = useState<CityConfigSnapshot | null>(null);
  const [resourceEligibility, setResourceEligibility] = useState<ResourceEligibility | null>(null);

  const [dashboard, setDashboard] = useState<DashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setFavoriteIds(getFavoritePlotIds());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = await retry(
          async () => {
            return await requestGraphQL<DashboardQueryResult>(CITY_DASHBOARD_QUERY);
          },
          {
            maxRetries: 3,
            baseDelay: 1000,
          }
        );

        if (!cancelled) {
          setDashboard(data);
        }
      } catch (err) {
        if (!cancelled) {
          const appError = parseError(err, {
            query: "CITY_DASHBOARD_QUERY",
            retryCount,
          });
          setError(appError);
          console.error("Dashboard Fehler:", appError);
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
  }, [retryCount]);

  useEffect(() => {
    async function syncWalletState() {
      const ethereum = (window as Window & {
        ethereum?: {
          request: (args: { method: string }) => Promise<unknown>;
        };
      }).ethereum;

      if (!ethereum) return;

      try {
        const accounts = (await ethereum.request({
          method: "eth_accounts",
        })) as string[];

        const chainIdHex = (await ethereum.request({
          method: "eth_chainId",
        })) as string;

        const chainId = parseInt(chainIdHex, 16);

        if (accounts?.length) {
          setWallet({
            isConnected: true,
            address: accounts[0],
            chainId,
          });
        } else {
          setWallet({
            isConnected: false,
            address: null,
            chainId,
          });
        }
      } catch (walletError) {
        console.warn("Wallet sync failed:", walletError);
      }
    }

    syncWalletState();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadResourceState() {
      if (!wallet.isConnected || !wallet.address) {
        setCityConfigSnapshot(null);
        setResourceEligibility(null);
        return;
      }

      try {
        const { snapshot, balances } = await readWalletResourceBalances(wallet.address);

        if (cancelled) return;

        setCityConfigSnapshot(snapshot);

        const evaluated = evaluateResourceEligibility(selectedPlot, balances, snapshot);
        setResourceEligibility(evaluated);
      } catch (err) {
        console.warn("Resource check failed:", err);
        if (!cancelled) {
          setCityConfigSnapshot(null);
          setResourceEligibility(null);
        }
      }
    }

    loadResourceState();

    return () => {
      cancelled = true;
    };
  }, [wallet, selectedPlot]);

  const handleRetry = (): void => {
    setRetryCount((prev) => prev + 1);
    setError(null);
  };

  const handleConnectWallet = async (): Promise<void> => {
    const ethereum = (window as Window & {
      ethereum?: {
        request: (args: { method: string }) => Promise<unknown>;
      };
    }).ethereum;

    if (!ethereum) {
      alert("No injected wallet found. Please install MetaMask or another EVM wallet.");
      return;
    }

    try {
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      const chainIdHex = (await ethereum.request({
        method: "eth_chainId",
      })) as string;

      const chainId = parseInt(chainIdHex, 16);

      setWallet({
        isConnected: !!accounts?.length,
        address: accounts?.[0] || null,
        chainId,
      });
    } catch (walletError) {
      console.error("Wallet connect failed:", walletError);
    }
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
      plotStatusInfos: dashboard.plotStatusInfos?.length || 0,
      plotProvenances: dashboard.plotProvenances?.length || 0,
    };
  }, [dashboard]);

  const basePlots = useMemo(() => {
    return generateInfinityPlots();
  }, []);

  const hydratedPlots = useMemo(() => {
    return hydratePlots(basePlots, dashboard || {});
  }, [basePlots, dashboard]);

  const filteredPlots = useMemo(() => {
    const term = normalize(searchTerm);

    return hydratedPlots.filter((plot) => {
      if (!matchesSearch(plot, term)) return false;
      if (!matchesAvailability(plot, availabilityFilter)) return false;
      if (!matchesSpecial(plot, specialFilter, favoriteIds)) return false;
      return true;
    });
  }, [hydratedPlots, searchTerm, availabilityFilter, specialFilter, favoriteIds]);

  const eligibility = useMemo(() => {
    return getPlotEligibility(selectedPlot, wallet, resourceEligibility);
  }, [selectedPlot, wallet, resourceEligibility]);

  useEffect(() => {
    if (!selectedPlot) return;

    const refreshed = hydratedPlots.find((plot) => plot.id === selectedPlot.id);
    if (refreshed && refreshed !== selectedPlot) {
      setSelectedPlot(refreshed);
    }
  }, [hydratedPlots, selectedPlot]);

  function handleToggleFavorite(id: string): void {
    const next = toggleFavoritePlot(id);
    setFavoriteIds(next);
  }

  function handleJumpToPlot(rawValue: string): void {
    const term = normalize(rawValue);
    if (!term) return;

    const found = hydratedPlots.find((plot) => {
      const label = normalize(plot.label);
      const plotId = normalize(plot.plotId || "");
      const owner = normalize(plot.owner || "");
      const ownerLabel = normalize(plot.ownerLabel || "");

      return (
        label === term ||
        plotId === term ||
        owner === term ||
        ownerLabel === term ||
        label.includes(term) ||
        plotId.includes(term) ||
        owner.includes(term) ||
        ownerLabel.includes(term)
      );
    });

    if (found) {
      setSelectedPlot(found);
      setSearchTerm(found.label);
    }
  }

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
            <strong>{cityConfigSnapshot ? "loaded" : "follows"}</strong>
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
          onError={(caughtError) => console.error("Dashboard ErrorBoundary:", caughtError)}
          resetKeys={[dashboard]}
        >
          {loading && <LoadingSpinner text="Loading city data..." />}

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
              <div className="card">
                <div className="muted">Status Infos</div>
                <strong>{dashboardCounts.plotStatusInfos}</strong>
              </div>
              <div className="card">
                <div className="muted">Provenances</div>
                <strong>{dashboardCounts.plotProvenances}</strong>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </section>

      <section className="panel">
        <h2>Infinity City Map</h2>

        <CityToolbar
          plots={hydratedPlots}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          jumpTarget={jumpTarget}
          onJumpTargetChange={setJumpTarget}
          onJumpToPlot={handleJumpToPlot}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((v) => !v)}
          heatmapMode={heatmapMode}
          onToggleHeatmap={() => setHeatmapMode((v) => !v)}
          availabilityFilter={availabilityFilter}
          onAvailabilityFilterChange={setAvailabilityFilter}
          specialFilter={specialFilter}
          onSpecialFilterChange={setSpecialFilter}
          onExportPng={downloadMapPng}
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
            <ErrorBoundary
              onError={(caughtError) => console.error("Map ErrorBoundary:", caughtError)}
              resetKeys={[
                filteredPlots.length,
                showLabels,
                heatmapMode,
                availabilityFilter,
                specialFilter,
                favoriteIds.join(","),
              ]}
            >
              <InfinityMap
                plots={filteredPlots}
                selectedPlot={selectedPlot}
                onSelectPlot={setSelectedPlot}
                showLabels={showLabels}
                heatmapMode={heatmapMode}
              />
            </ErrorBoundary>

            <CityStats plots={filteredPlots} />
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <PlotDetails
              plot={selectedPlot}
              onToggleFavorite={handleToggleFavorite}
            />

            <MintPreparationPanel
              plot={selectedPlot}
              wallet={wallet}
              eligibility={eligibility}
              resourceEligibility={resourceEligibility}
              onConnectWallet={handleConnectWallet}
            />
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Marriage phase: mock layout + live subgraph</h2>
        <p>
          The ∞ layout stays visual-first. Real subgraph data is now bound onto the
          city vision through the merge layer, without enabling final minting yet.
        </p>
        <p style={{ marginBottom: 0 }}>
          Next step: activate deeper resource checks from farming, then wire the
          real reservation flow before finally enabling mint.
        </p>
      </section>
    </div>
  );
}