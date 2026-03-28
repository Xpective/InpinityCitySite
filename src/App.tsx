import { useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import PlotDetails from "./components/city/PlotDetails";
import InfinityMap from "./components/city/InfinityMap";
import MintPreparationPanel from "./components/city/MintPreparationPanel";
import ItemInspectorPanel from "./components/inspector/ItemInspectorPanel";
import { useLivePlotProgress } from "./hooks/useLivePlotProgress";

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
import { CONFIG } from "./lib/config";
import {
  connectInjectedWallet,
  getInjectedEthereum,
  readInjectedWalletState,
  subscribeWalletEvents,
  switchToConfiguredChain,
} from "./lib/evm-wallet";
import {
  runQubiqContributionFlow,
  type QubiqFlowResult,
  type QubiqFlowStep,
} from "./lib/city-qubiq-flow";
import { readRegistryState } from "./lib/city-registry";
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
};

type SelectableFaction = "inpinity" | "inphinity";

const NEXT_BUILD_OPTION_ID = "__next__";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeAddress(value?: string | null): string {
  return (value || "").trim().toLowerCase();
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

function buildPlotOptionLabel(plot: InfinityPlot): string {
  const idPart = plot.plotId ? `#${plot.plotId}` : plot.label;
  const factionPart = plot.faction ? ` · ${plot.faction}` : "";
  const statusPart = plot.status ? ` · ${plot.status}` : "";
  return `${idPart}${factionPart}${statusPart}`;
}

function prettyFaction(value: SelectableFaction): string {
  return value === "inpinity" ? "Inpinity" : "Inphinity";
}

function isExistingBuildPlotId(plotId: string): boolean {
  return !!plotId && plotId !== NEXT_BUILD_OPTION_ID;
}

function shortAddress(value?: string | null): string {
  if (!value) return "—";
  return value.length > 10 ? `${value.slice(0, 6)}...${value.slice(-4)}` : value;
}

function readStoredFlag(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === "1";
  } catch {
    return fallback;
  }
}

function writeStoredFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // ignore storage failures
  }
}

function readStoredFaction(key: string): SelectableFaction | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === "inpinity" || raw === "inphinity" ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredFaction(key: string, value: SelectableFaction | null): void {
  if (typeof window === "undefined") return;

  try {
    if (!value) {
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage failures
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jumpTarget, setJumpTarget] = useState("");
  const [showLabels, setShowLabels] = useState(() =>
    readStoredFlag("inpinity-city.show-labels", true)
  );
  const [heatmapMode, setHeatmapMode] = useState(() =>
    readStoredFlag("inpinity-city.heatmap-mode", false)
  );
  const [showAdvanced, setShowAdvanced] = useState(() =>
    readStoredFlag("inpinity-city.advanced-mode", false)
  );
  const [showInspector, setShowInspector] = useState(() =>
    readStoredFlag("inpinity-city.inspector-mode", false)
  );
  const [preferredFaction, setPreferredFaction] = useState<SelectableFaction | null>(() =>
    readStoredFaction("inpinity-city.preferred-faction")
  );

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
  const [resourceEligibility, setResourceEligibility] =
    useState<ResourceEligibility | null>(null);

  const [dashboard, setDashboard] = useState<DashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [reservedPlotId, setReservedPlotId] = useState<string | null>(null);
  const [activeBuildPlotId, setActiveBuildPlotId] = useState<string>(NEXT_BUILD_OPTION_ID);

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
    writeStoredFlag("inpinity-city.show-labels", showLabels);
  }, [showLabels]);

  useEffect(() => {
    writeStoredFlag("inpinity-city.heatmap-mode", heatmapMode);
  }, [heatmapMode]);

  useEffect(() => {
    writeStoredFlag("inpinity-city.advanced-mode", showAdvanced);
  }, [showAdvanced]);

  useEffect(() => {
    writeStoredFlag("inpinity-city.inspector-mode", showInspector);
  }, [showInspector]);

  useEffect(() => {
    writeStoredFaction("inpinity-city.preferred-faction", preferredFaction);
  }, [preferredFaction]);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = (await retry(
          async () => {
            return await requestGraphQL<DashboardQueryResult>(CITY_DASHBOARD_QUERY);
          },
          {
            maxRetries: 3,
            baseDelay: 1000,
          }
        )) as DashboardQueryResult;

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

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  useEffect(() => {
    let cancelled = false;

    async function syncWalletState() {
      try {
        const next = await readInjectedWalletState();

        if (cancelled) return;

        setWallet((prev) => ({
          ...prev,
          isConnected: next.isConnected,
          address: next.address,
          chainId: next.chainId,
          chosenFaction: next.isConnected ? prev.chosenFaction : null,
          hasCityKey: next.isConnected ? prev.hasCityKey : null,
        }));
      } catch (walletError) {
        console.warn("Wallet sync failed:", walletError);
      }
    }

    void syncWalletState();

    const unsubscribe = subscribeWalletEvents({
      onAccountsChanged: () => {
        void syncWalletState();
      },
      onChainChanged: () => {
        void syncWalletState();
      },
      onDisconnect: () => {
        void syncWalletState();
      },
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

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

    void loadWalletRegistryState();

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

    void loadOwnedKeys();

    return () => {
      cancelled = true;
    };
  }, [wallet.isConnected, wallet.address, retryCount]);

  useEffect(() => {
    if (wallet.chosenFaction === "inpinity" || wallet.chosenFaction === "inphinity") {
      if (preferredFaction !== wallet.chosenFaction) {
        setPreferredFaction(wallet.chosenFaction);
      }
      return;
    }

    if (
      !preferredFaction &&
      (selectedPlot?.faction === "inpinity" || selectedPlot?.faction === "inphinity")
    ) {
      setPreferredFaction(selectedPlot.faction as SelectableFaction);
    }
  }, [wallet.chosenFaction, preferredFaction, selectedPlot?.faction]);

  const basePlots = useMemo(() => {
    return generateInfinityPlots();
  }, []);

  const hydratedPlots = useMemo(() => {
    return hydratePlots(basePlots, dashboard || {});
  }, [basePlots, dashboard]);

  const buildPlotOptions = useMemo<BuildPlotOption[]>(() => {
    const walletAddress = normalizeAddress(wallet.address);
    const optionsMap = new Map<string, BuildPlotOption>();

    for (const plot of hydratedPlots) {
      const plotId = (plot.plotId || "").trim();
      if (!plotId) continue;

      const isReservedByFlow = reservedPlotId === plotId;
      const isOwnedByWallet =
        !!walletAddress &&
        normalizeAddress(plot.owner) === walletAddress;

      if (!isReservedByFlow && !isOwnedByWallet) {
        continue;
      }

      optionsMap.set(plotId, {
        plotId,
        label: buildPlotOptionLabel(plot),
      });
    }

    if (reservedPlotId && !optionsMap.has(reservedPlotId)) {
      optionsMap.set(reservedPlotId, {
        plotId: reservedPlotId,
        label: `#${reservedPlotId} · active build`,
      });
    }

    const existingOptions = Array.from(optionsMap.values()).sort((a, b) => {
      const aNum = Number(a.plotId);
      const bNum = Number(b.plotId);

      if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
        return aNum - bNum;
      }

      return a.plotId.localeCompare(b.plotId);
    });

    return [
      {
        plotId: NEXT_BUILD_OPTION_ID,
        label: "Next personal plot / use current map selection",
      },
      ...existingOptions,
    ];
  }, [hydratedPlots, wallet.address, reservedPlotId]);

  useEffect(() => {
    if (
      activeBuildPlotId &&
      buildPlotOptions.some((item) => item.plotId === activeBuildPlotId)
    ) {
      return;
    }

    setActiveBuildPlotId(NEXT_BUILD_OPTION_ID);
  }, [buildPlotOptions, activeBuildPlotId]);

  const activePlotId = useMemo(() => {
    if (isExistingBuildPlotId(activeBuildPlotId)) {
      return activeBuildPlotId;
    }

    return null;
  }, [activeBuildPlotId]);

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

  const buildMode = isExistingBuildPlotId(activeBuildPlotId) ? "existing" : "next";
  const buildTargetPlot = activeBuildPlot ?? selectedPlot;

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

        const evaluated = evaluateResourceEligibility(
          buildTargetPlot,
          balances,
          snapshot,
          livePlotProgress.qubiq
        );

        setResourceEligibility(evaluated);
      } catch (err) {
        console.warn("Resource check failed:", err);
        if (!cancelled) {
          setCityConfigSnapshot(null);
          setResourceEligibility(null);
        }
      }
    }

    void loadResourceState();

    return () => {
      cancelled = true;
    };
  }, [
    wallet.isConnected,
    wallet.address,
    buildTargetPlot,
    livePlotProgress.qubiq,
    retryCount,
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

  const eligibility = useMemo(() => {
    return getPlotEligibility(buildTargetPlot, wallet, resourceEligibility);
  }, [buildTargetPlot, wallet, resourceEligibility]);

  const flowTargetPlotId = useMemo(() => {
    if (!isExistingBuildPlotId(activeBuildPlotId)) {
      return null;
    }

    try {
      return BigInt(activeBuildPlotId);
    } catch {
      return null;
    }
  }, [activeBuildPlotId]);

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
      await connectInjectedWallet();

      try {
        await switchToConfiguredChain();
      } catch (switchError) {
        console.warn("Base chain switch failed:", switchError);
      }

      const next = await readInjectedWalletState();

      setWallet((prev) => ({
        ...prev,
        isConnected: next.isConnected,
        address: next.address,
        chainId: next.chainId,
      }));
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

  const selectedPlotSummary = selectedPlot?.label || "No plot selected";
  const selectedSideSummary = selectedPlot
    ? `${selectedPlot.faction} · ${selectedPlot.side}`
    : "—";
  const factionChoiceSummary =
    wallet.chosenFaction && wallet.chosenFaction !== "none"
      ? `${prettyFaction(wallet.chosenFaction)} locked`
      : preferredFaction
      ? `${prettyFaction(preferredFaction)} planned`
      : "not chosen";
  const buildTargetSummary =
    buildMode === "existing"
      ? buildTargetPlot?.label || activeBuildPlotId || "—"
      : "next personal plot";

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
      const result = await runQubiqContributionFlow({
        walletAddress: wallet.address,
        slotIndex: null,
        plotId: flowTargetPlotId,
        cityKeyTokenId: selectedCityKeyTokenId
          ? BigInt(selectedCityKeyTokenId)
          : null,
        desiredFaction:
          wallet.chosenFaction && wallet.chosenFaction !== "none"
            ? wallet.chosenFaction
            : preferredFaction,
        qubiqX: selectedQubiqCell.x,
        qubiqY: selectedQubiqCell.y,
        resourceEligibility,
        onStepChange: setTxStep,
        onTxHash: setTxHash,
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
        <p className="subtitle">
          Explore city data, inspect plots and continue the Qubiq build flow without
          exposing every helper panel by default.
        </p>

        <div className="heroActionRow">
          <button
            type="button"
            className={`toolbarButton ${showAdvanced ? "active" : ""}`}
            onClick={() => setShowAdvanced((value) => !value)}
          >
            {showAdvanced ? "Hide Advanced" : "Show Advanced"}
          </button>

          <button
            type="button"
            className={`toolbarButton ${showInspector ? "active" : ""}`}
            onClick={() => setShowInspector((value) => !value)}
          >
            {showInspector ? "Hide Inspector" : "Show Inspector"}
          </button>

          {!wallet.isConnected && (
            <button type="button" className="toolbarButton" onClick={handleConnectWallet}>
              Connect Wallet
            </button>
          )}

          <div className="heroTip">
            Mobile keeps the map first, stats second and the build terminal below.
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <div className="muted">Wallet</div>
            <strong>{wallet.isConnected ? shortAddress(wallet.address) : "not connected"}</strong>
          </div>
          <div className="card">
            <div className="muted">Selected Plot</div>
            <strong>{selectedPlotSummary}</strong>
          </div>
          <div className="card">
            <div className="muted">Faction Choice</div>
            <strong>{factionChoiceSummary}</strong>
          </div>
          <div className="card">
            <div className="muted">Selected Side</div>
            <strong>{selectedSideSummary}</strong>
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
            <div className="muted">Build Target</div>
            <strong>{buildTargetSummary}</strong>
          </div>
          <div className="card">
            <div className="muted">Flow</div>
            <strong>{txStep}</strong>
          </div>
        </div>

        {showAdvanced && (
          <div className="advancedInfoCard">
            <div>
              <strong>Chain:</strong> {CONFIG.chainId}
            </div>
            <div>
              <strong>Subgraph:</strong> {CONFIG.subgraphUrl}
            </div>
            <div>
              <strong>CityRegistry:</strong> {CONFIG.cityRegistryAddress || "missing"}
            </div>
            <div>
              <strong>CityLand:</strong> {CONFIG.cityLandAddress || "missing"}
            </div>
            <div>
              <strong>CityConfig:</strong> {cityConfigSnapshot ? "loaded" : "loading / unavailable"}
            </div>
            <div>
              <strong>Owned City Keys:</strong> {ownedCityKeys.length}
            </div>
            <div>
              <strong>Wallet Faction:</strong> {wallet.chosenFaction || "not set / unknown"}
            </div>
            {(reservedPlotId || txHash || activeBuildPlotId) && (
              <>
                <div>
                  <strong>Reserved Plot ID:</strong> {reservedPlotId || "—"}
                </div>
                <div>
                  <strong>Selected Qubiq Cell:</strong> ({selectedQubiqCell.x}, {selectedQubiqCell.y})
                </div>
                <div>
                  <strong>Latest TX:</strong> {txHash || "—"}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {showAdvanced && (
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
      )}

      <section className="panel">
        <h2>Infinity City Map</h2>
        <p className="sectionHelp">
          Map first, rarity and city stats second, build details afterwards. Advanced
          mode keeps helper and diagnostics available without crowding the default UI.
        </p>

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
          showAdvanced={showAdvanced}
          onToggleAdvanced={() => setShowAdvanced((value) => !value)}
        />

        <div className="cityMapLayout">
          <div className="cityMapPrimary">
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
                advancedMode={showAdvanced}
              />
            </ErrorBoundary>

            <CityStats plots={filteredPlots} />
          </div>

          <aside className="cityMapSidebar">
            <PlotDetails
              plot={selectedPlot}
              onToggleFavorite={handleToggleFavorite}
              showAdvanced={showAdvanced}
            />

            <MintPreparationPanel
              plot={buildTargetPlot}
              viewedPlot={selectedPlot}
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
              buildMode={buildMode}
              preferredFaction={preferredFaction}
              onSelectPreferredFaction={(faction) => setPreferredFaction(faction)}
              showAdvanced={showAdvanced}
            />
          </aside>
        </div>
      </section>

      {showInspector && (
        <ItemInspectorPanel
          walletAddress={wallet.address}
          showAdvanced={showAdvanced}
        />
      )}

      {showAdvanced && (
        <section className="panel panelHint">
          <h2>Implementation Notes</h2>
          <p>
            Personal plot numbering now starts on the Inpinity side and live personal
            plots are assigned by faction side before hydration so Q-labels do not drift
            onto the opposite loop.
          </p>
          <p style={{ marginBottom: 0 }}>
            If you later add a canonical coordinate source from contracts or the
            subgraph, keep the current side-correction warnings as a safeguard instead
            of silently trusting synthetic slots.
          </p>
        </section>
      )}
    </div>
  );
}