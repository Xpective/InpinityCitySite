import { useCallback, useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import PlotDetails from "./components/city/PlotDetails";
import InfinityMap from "./components/city/InfinityMap";
import MintPreparationPanel from "./components/city/MintPreparationPanel";
import { useLivePlotProgress } from "./hooks/useLivePlotProgress";

import { CONFIG, shortConfigAddress } from "./lib/config";
import { getFavoritePlotIds, toggleFavoritePlot } from "./lib/favorites";
import { requestGraphQL } from "./lib/graphql";
import { CITY_DASHBOARD_QUERY } from "./lib/queries";
import { generateInfinityPlots } from "./lib/infinity-layout";
import { hydratePlots } from "./lib/city-map-merge";
import { getPlotEligibility, type WalletState } from "./lib/eligibility";
import {
  evaluateResourceEligibility,
  readWalletResourceBalances,
  type ResourceBalances,
  type ResourceEligibility,
} from "./lib/resource-check";
import type { CityConfigSnapshot } from "./lib/city-config";
import {
  runQubiqContributionFlow,
  type QubiqFlowResult,
  type QubiqFlowStep,
} from "./lib/city-qubiq-flow";
import { readPersonalPlots, readRegistryState } from "./lib/city-registry";
import {
  readOwnedCityKeys,
  type CityKeyOption,
} from "./lib/city-key";

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

type SelectedQubiqCell = {
  x: number;
  y: number;
};

type BuildPlotOption = {
  plotId: string;
  label: string;
  slotIndex?: number;
};

type WalletPersonalPlot = {
  slotIndex: number;
  plotId: string;
};

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeAddress(value?: string | null): string {
  return (value || "").trim().toLowerCase();
}

function getInjectedEthereum(): EthereumProvider | null {
  return (window as Window & {
    ethereum?: EthereumProvider;
  }).ethereum ?? null;
}

function downloadMapPng(): void {
  void (async () => {
    const svg = document.querySelector("#city-map-capture svg") as SVGSVGElement | null;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    try {
      const image = new Image();
      const imageLoaded = new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("SVG render failed."));
      });

      image.src = url;
      await imageLoaded;

      const rect = svg.getBoundingClientRect();
      const viewBoxWidth = svg.viewBox?.baseVal?.width || 0;
      const viewBoxHeight = svg.viewBox?.baseVal?.height || 0;
      const rawWidth = Number(svg.getAttribute("width")) || 0;
      const rawHeight = Number(svg.getAttribute("height")) || 0;
      const width = Math.max(1, Math.ceil(rect.width || viewBoxWidth || rawWidth || 1600));
      const height = Math.max(1, Math.ceil(rect.height || viewBoxHeight || rawHeight || 900));
      const scale = window.devicePixelRatio > 1 ? 2 : 1;

      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas export is not available in this browser.");
      }

      ctx.scale(scale, scale);
      ctx.drawImage(image, 0, 0, width, height);

      const pngBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!pngBlob) {
        throw new Error("PNG export failed.");
      }

      const pngUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "inpinity-city-map.png";
      link.click();
      URL.revokeObjectURL(pngUrl);
    } catch (error) {
      console.warn("Map export failed:", error);
    } finally {
      URL.revokeObjectURL(url);
    }
  })();
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

function buildPlotOptionLabel(plot: InfinityPlot, slotIndex?: number): string {
  const slotPart = typeof slotIndex === "number" ? `Slot ${slotIndex} · ` : "";
  const idPart = plot.plotId ? `#${plot.plotId}` : plot.label;
  const factionPart = plot.faction ? ` · ${plot.faction}` : "";
  const statusPart = plot.status ? ` · ${plot.status}` : "";
  return `${slotPart}${idPart}${factionPart}${statusPart}`;
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
    chosenFaction: null,
    hasCityKey: null,
  });

  const [ownedCityKeys, setOwnedCityKeys] = useState<CityKeyOption[]>([]);
  const [selectedCityKeyTokenId, setSelectedCityKeyTokenId] = useState<string>("");

  const [cityConfigSnapshot, setCityConfigSnapshot] =
    useState<CityConfigSnapshot | null>(null);
  const [resourceBalances, setResourceBalances] =
    useState<ResourceBalances | null>(null);
  const [walletPersonalPlots, setWalletPersonalPlots] =
    useState<WalletPersonalPlot[]>([]);

  const [dashboard, setDashboard] = useState<DashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [reservedPlotId, setReservedPlotId] = useState<string | null>(null);
  const [activeBuildPlotId, setActiveBuildPlotId] = useState<string>("");

  const [selectedQubiqCell, setSelectedQubiqCell] = useState<SelectedQubiqCell>({
    x: 0,
    y: 0,
  });

  const [txStep, setTxStep] = useState<QubiqFlowStep>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [flowResult, setFlowResult] = useState<QubiqFlowResult | null>(null);
  const [flowBusy, setFlowBusy] = useState(false);

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

  const syncWalletState = useCallback(async () => {
    const ethereum = getInjectedEthereum();
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
        setWallet((prev) => ({
          ...prev,
          isConnected: true,
          address: accounts[0],
          chainId,
        }));
      } else {
        setWallet({
          isConnected: false,
          address: null,
          chainId,
          chosenFaction: null,
          hasCityKey: null,
        });
      }
    } catch (walletError) {
      console.warn("Wallet sync failed:", walletError);
    }
  }, []);

  useEffect(() => {
    const ethereum = getInjectedEthereum();
    void syncWalletState();

    if (!ethereum?.on || !ethereum.removeListener) {
      return;
    }

    const handleAccountsChanged = () => {
      setReservedPlotId(null);
      setActiveBuildPlotId("");
      setFlowResult(null);
      setTxHash(null);
      setTxStep("idle");
      setSelectedCityKeyTokenId("");
      void syncWalletState();
      setRetryCount((prev) => prev + 1);
    };

    const handleChainChanged = () => {
      void syncWalletState();
      setRetryCount((prev) => prev + 1);
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
      ethereum.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [syncWalletState]);

  useEffect(() => {
    let cancelled = false;

    async function loadWalletRegistryState() {
      if (!wallet.isConnected || !wallet.address) {
        setWallet((prev) => ({
          ...prev,
          chosenFaction: null,
          hasCityKey: null,
        }));
        return;
      }

      try {
        const registry = await readRegistryState(wallet.address);
        if (cancelled) return;

        setWallet((prev) => ({
          ...prev,
          chosenFaction: registry.chosenFaction,
          hasCityKey: registry.hasCityKey,
        }));
      } catch (err) {
        console.warn("Registry state read failed:", err);
        if (!cancelled) {
          setWallet((prev) => ({
            ...prev,
            chosenFaction: null,
            hasCityKey: null,
          }));
        }
      }
    }

    loadWalletRegistryState();

    return () => {
      cancelled = true;
    };
  }, [wallet.isConnected, wallet.address, retryCount]);

  useEffect(() => {
    let cancelled = false;

    async function loadOwnedKeys() {
      if (!wallet.isConnected || !wallet.address) {
        setOwnedCityKeys([]);
        setSelectedCityKeyTokenId("");
        return;
      }

      try {
        const keys = await readOwnedCityKeys(wallet.address);
        if (cancelled) return;

        setOwnedCityKeys(keys);
        setSelectedCityKeyTokenId((prev) => {
          if (prev && keys.some((item) => item.tokenId === prev)) {
            return prev;
          }
          return keys[0]?.tokenId || "";
        });
      } catch (err) {
        console.warn("City key NFT read failed:", err);
        if (!cancelled) {
          setOwnedCityKeys([]);
          setSelectedCityKeyTokenId("");
        }
      }
    }

    loadOwnedKeys();

    return () => {
      cancelled = true;
    };
  }, [wallet.isConnected, wallet.address, retryCount]);

  useEffect(() => {
    let cancelled = false;

    async function loadWalletPersonalPlots() {
      if (!wallet.isConnected || !wallet.address) {
        setWalletPersonalPlots([]);
        return;
      }

      try {
        const slots = await readPersonalPlots(wallet.address);
        if (cancelled) return;

        setWalletPersonalPlots(
          slots
            .filter((slot) => slot.occupied && slot.plotId != null)
            .map((slot) => ({
              slotIndex: slot.slotIndex,
              plotId: slot.plotId!.toString(),
            }))
        );
      } catch (err) {
        console.warn("Personal plot slot read failed:", err);
        if (!cancelled) {
          setWalletPersonalPlots([]);
        }
      }
    }

    loadWalletPersonalPlots();

    return () => {
      cancelled = true;
    };
  }, [wallet.isConnected, wallet.address, retryCount]);

  const basePlots = useMemo(() => {
    return generateInfinityPlots();
  }, []);

  const hydratedPlots = useMemo(() => {
    return hydratePlots(basePlots, dashboard || {});
  }, [basePlots, dashboard]);

  const buildPlotOptions = useMemo<BuildPlotOption[]>(() => {
    const optionsMap = new Map<string, BuildPlotOption>();

    for (const slot of walletPersonalPlots) {
      const plotId = slot.plotId.trim();
      if (!plotId) continue;

      const hydratedPlot =
        hydratedPlots.find((plot) => String(plot.plotId || "") === plotId) || null;

      optionsMap.set(plotId, {
        plotId,
        slotIndex: slot.slotIndex,
        label: hydratedPlot
          ? buildPlotOptionLabel(hydratedPlot, slot.slotIndex)
          : `Slot ${slot.slotIndex} · #${plotId}`,
      });
    }

    if (reservedPlotId && !optionsMap.has(reservedPlotId)) {
      optionsMap.set(reservedPlotId, {
        plotId: reservedPlotId,
        label: `Active build · #${reservedPlotId}`,
      });
    }

    return Array.from(optionsMap.values()).sort((a, b) => {
      const slotA = typeof a.slotIndex === "number" ? a.slotIndex : Number.MAX_SAFE_INTEGER;
      const slotB = typeof b.slotIndex === "number" ? b.slotIndex : Number.MAX_SAFE_INTEGER;
      if (slotA !== slotB) return slotA - slotB;
      return a.plotId.localeCompare(b.plotId, undefined, { numeric: true });
    });
  }, [walletPersonalPlots, hydratedPlots, reservedPlotId]);

  useEffect(() => {
    if (
      activeBuildPlotId &&
      buildPlotOptions.some((item) => item.plotId === activeBuildPlotId)
    ) {
      return;
    }

    if (
      reservedPlotId &&
      buildPlotOptions.some((item) => item.plotId === reservedPlotId)
    ) {
      setActiveBuildPlotId(reservedPlotId);
      return;
    }

    setActiveBuildPlotId(buildPlotOptions[0]?.plotId || "");
  }, [reservedPlotId, buildPlotOptions, activeBuildPlotId]);

  const activePlotId = useMemo(() => {
    if (activeBuildPlotId) return activeBuildPlotId;
    if (reservedPlotId) return reservedPlotId;
    if (selectedPlot?.plotId) return selectedPlot.plotId;
    return null;
  }, [activeBuildPlotId, reservedPlotId, selectedPlot]);

  const activeBuildPlot = useMemo(() => {
    if (!activePlotId) return null;
    return (
      hydratedPlots.find((plot) => String(plot.plotId || "") === String(activePlotId)) ||
      null
    );
  }, [hydratedPlots, activePlotId]);

  const livePlotProgress = useLivePlotProgress(
    activePlotId,
    selectedQubiqCell,
    retryCount
  );

  useEffect(() => {
    let cancelled = false;

    async function loadResourceState() {
      if (!wallet.isConnected || !wallet.address) {
        setCityConfigSnapshot(null);
        setResourceBalances(null);
        return;
      }

      try {
        const { snapshot, balances } = await readWalletResourceBalances(wallet.address);

        if (cancelled) return;

        setCityConfigSnapshot(snapshot);
        setResourceBalances(balances);
      } catch (err) {
        console.warn("Resource check failed:", err);
        if (!cancelled) {
          setCityConfigSnapshot(null);
          setResourceBalances(null);
        }
      }
    }

    loadResourceState();

    return () => {
      cancelled = true;
    };
  }, [wallet.isConnected, wallet.address, retryCount]);

  const resourceEligibility = useMemo<ResourceEligibility | null>(() => {
    if (!resourceBalances || !cityConfigSnapshot) {
      return null;
    }

    return evaluateResourceEligibility(
      activeBuildPlot || selectedPlot,
      resourceBalances,
      cityConfigSnapshot,
      livePlotProgress.qubiq
    );
  }, [
    activeBuildPlot,
    selectedPlot,
    resourceBalances,
    cityConfigSnapshot,
    livePlotProgress.qubiq,
  ]);

  const filteredPlots = useMemo(() => {
    const term = normalize(searchTerm);

    return hydratedPlots.filter((plot) => {
      if (!matchesSearch(plot, term)) return false;
      if (!matchesAvailability(plot, availabilityFilter)) return false;
      if (!matchesSpecial(plot, specialFilter, favoriteIds)) return false;
      return true;
    });
  }, [hydratedPlots, searchTerm, availabilityFilter, specialFilter, favoriteIds]);

  const effectiveSelectedPlot = activeBuildPlot || selectedPlot;

  const eligibility = useMemo(() => {
    return getPlotEligibility(effectiveSelectedPlot, wallet, resourceEligibility);
  }, [effectiveSelectedPlot, wallet, resourceEligibility]);

  useEffect(() => {
    if (!selectedPlot) return;

    const refreshed = hydratedPlots.find((plot) => plot.id === selectedPlot.id);
    if (refreshed && refreshed !== selectedPlot) {
      setSelectedPlot(refreshed);
    }
  }, [hydratedPlots, selectedPlot]);

  useEffect(() => {
    if (wallet.isConnected && wallet.address) {
      return;
    }

    setReservedPlotId(null);
    setActiveBuildPlotId("");
    setFlowResult(null);
    setTxHash(null);
    setTxStep("idle");
  }, [wallet.isConnected, wallet.address]);

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

      if (
        found.plotId &&
        buildPlotOptions.some((item) => item.plotId === found.plotId)
      ) {
        setActiveBuildPlotId(found.plotId);
      }

      setSearchTerm(found.label);
    }
  }

  const handleRetry = (): void => {
    setRetryCount((prev) => prev + 1);
    setError(null);
  };

  const handleConnectWallet = async (): Promise<void> => {
    const ethereum = getInjectedEthereum();

    if (!ethereum) {
      alert("No injected wallet found. Please install MetaMask or another EVM wallet.");
      return;
    }

    try {
      await ethereum.request({
        method: "eth_requestAccounts",
      });
      await syncWalletState();
      setRetryCount((prev) => prev + 1);
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

  async function handlePrepareQubiqContribution(): Promise<void> {
    if (!wallet.address) {
      await handleConnectWallet();
      return;
    }

    setFlowBusy(true);
    setTxStep("validate");
    setTxHash(null);
    setFlowResult(null);

    try {
      const targetBuildPlotId =
        activeBuildPlotId ||
        reservedPlotId ||
        (effectiveSelectedPlot?.plotId &&
        buildPlotOptions.some((item) => item.plotId === effectiveSelectedPlot.plotId)
          ? effectiveSelectedPlot.plotId
          : null);

      const result = await runQubiqContributionFlow({
        walletAddress: wallet.address,
        targetPlotId: targetBuildPlotId,
        cityKeyTokenId: selectedCityKeyTokenId
          ? BigInt(selectedCityKeyTokenId)
          : null,
        desiredFaction:
          wallet.chosenFaction && wallet.chosenFaction !== "none"
            ? wallet.chosenFaction
            : effectiveSelectedPlot?.faction === "inphinity"
            ? "inphinity"
            : "inpinity",
        qubiqX: selectedQubiqCell.x,
        qubiqY: selectedQubiqCell.y,
        resourceEligibility,
        autoSwitchChain: true,
      });

      setFlowResult(result);
      setTxStep(result.step);

      if (result.txHash) {
        setTxHash(result.txHash);
      }

      if (result.plotId != null) {
        const nextPlotId = result.plotId.toString();
        setReservedPlotId(nextPlotId);
        setActiveBuildPlotId(nextPlotId);
      }

      if (
        result.code === "reservation_sent" ||
        result.code === "approval_sent" ||
        result.code === "contribution_sent" ||
        result.code === "ok"
      ) {
        setRetryCount((prev) => prev + 1);
      }

      if (result.code === "contribution_sent") {
        setTxStep("done");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected Qubiq preparation error.";

      setFlowResult({
        ok: false,
        code: "unexpected_error",
        step: "error",
        message,
      });
      setTxStep("error");
    } finally {
      setFlowBusy(false);
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
            <strong>{CONFIG.chainId}</strong>
          </div>
          <div className="card">
            <div className="muted">Subgraph Proxy</div>
            <strong>{CONFIG.subgraphUrl}</strong>
          </div>
          <div className="card">
            <div className="muted">CityRegistry</div>
            <strong>{shortConfigAddress(CONFIG.cityRegistryAddress)}</strong>
          </div>
          <div className="card">
            <div className="muted">CityLand</div>
            <strong>{shortConfigAddress(CONFIG.cityLandAddress)}</strong>
          </div>
          <div className="card">
            <div className="muted">CityConfig</div>
            <strong>{cityConfigSnapshot ? "loaded" : "loading / unavailable"}</strong>
          </div>
          <div className="card">
            <div className="muted">CityValidation</div>
            <strong>{shortConfigAddress(CONFIG.cityValidationAddress)}</strong>
          </div>
          <div className="card">
            <div className="muted">City Key</div>
            <strong>
              {wallet.hasCityKey == null
                ? "unknown"
                : wallet.hasCityKey
                ? "set"
                : "not set"}
            </strong>
          </div>
          <div className="card">
            <div className="muted">Owned City Keys</div>
            <strong>{ownedCityKeys.length}</strong>
          </div>
          <div className="card">
            <div className="muted">Wallet Faction</div>
            <strong>{wallet.chosenFaction || "not set / unknown"}</strong>
          </div>
          <div className="card">
            <div className="muted">Flow Step</div>
            <strong>{txStep}</strong>
          </div>
        </div>

        {(reservedPlotId || txHash || activeBuildPlotId) && (
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 12,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <strong>Reserved Plot ID:</strong> {reservedPlotId || "—"}
            </div>
            <div>
              <strong>Active Build Plot ID:</strong> {activeBuildPlotId || "—"}
            </div>
            <div>
              <strong>Selected Qubiq Cell:</strong> ({selectedQubiqCell.x},{" "}
              {selectedQubiqCell.y})
            </div>
            <div>
              <strong>Latest TX:</strong> {txHash || "—"}
            </div>
          </div>
        )}
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
                onSelectPlot={(plot) => {
                  setSelectedPlot(plot);

                  if (
                    plot.plotId &&
                    buildPlotOptions.some((item) => item.plotId === plot.plotId)
                  ) {
                    setActiveBuildPlotId(plot.plotId);
                  }
                }}
                showLabels={showLabels}
                heatmapMode={heatmapMode}
              />
            </ErrorBoundary>

            <CityStats plots={filteredPlots} />
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <PlotDetails
              plot={effectiveSelectedPlot}
              onToggleFavorite={handleToggleFavorite}
            />

            <MintPreparationPanel
              plot={effectiveSelectedPlot}
              wallet={wallet}
              eligibility={eligibility}
              resourceEligibility={resourceEligibility}
              onConnectWallet={handleConnectWallet}
              onPrepareContribution={handlePrepareQubiqContribution}
              flowBusy={flowBusy}
              flowStep={txStep}
              flowResult={flowResult}
              selectedQubiqCell={selectedQubiqCell}
              onSelectQubiqCell={setSelectedQubiqCell}
              reservedPlotId={reservedPlotId}
              txHash={txHash}
              liveCompletion={livePlotProgress.completion}
              liveQubiq={livePlotProgress.qubiq}
              liveAllQubiqs={livePlotProgress.allQubiqs}
              liveLoading={livePlotProgress.loading}
              liveError={livePlotProgress.error}
              ownedCityKeys={ownedCityKeys}
              selectedCityKeyTokenId={selectedCityKeyTokenId}
              onSelectCityKeyTokenId={setSelectedCityKeyTokenId}
              buildPlotOptions={buildPlotOptions}
              activeBuildPlotId={activeBuildPlotId}
              onSelectActiveBuildPlotId={setActiveBuildPlotId}
            />
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Marriage phase: mock layout + live subgraph</h2>
        <p>
          The ∞ layout stays visual-first. Real subgraph data is now bound onto the
          city vision through the merge layer, while registry/land flow is prepared
          for real reservation and Qubiq contribution.
        </p>
        <p style={{ marginBottom: 0 }}>
          Next step: upgrade MintPreparationPanel into a real build terminal with
          action sections, approval state, flow messaging, active build plot
          selection, and Qubiq cell control.
        </p>
      </section>
    </div>
  );
}