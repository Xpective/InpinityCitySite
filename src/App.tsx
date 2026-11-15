import { useCallback, useEffect, useMemo, useState } from "react";
import CityStats from "./components/city/CityStats";
import CityToolbar from "./components/city/CityToolbar";
import PlotDetails from "./components/city/PlotDetails";
import InfinityMap from "./components/city/InfinityMap";
import MintPreparationPanel from "./components/city/MintPreparationPanel";
import ItemInspectorPanel from "./components/inspector/ItemInspectorPanel";
import { CityHero } from "./components/hero/CityHero";
import { QubiqFlow } from "./components/qubiq/QubiqFlow";
import { CityTicker, type CityEvent, type CityAction } from "./components/ticker/CityTicker";
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

import type { QubiqStepId } from "./lib/theme";

import "./styles/global.css";
import "./styles/eternity-theme.css";
import "./styles/theme-unified.css";

// ============================================================
// TYPES
// ============================================================
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

type SelectedQubiqCell = { x: number; y: number };
type BuildPlotOption = { plotId: string; label: string };
type SelectableFaction = "inpinity" | "inphinity";

const NEXT_BUILD_OPTION_ID = "__next__";

// ============================================================
// 💎 IDEE 1: Dashboard-Cache (30s TTL)
// ============================================================
const DASHBOARD_CACHE_TTL_MS = 30_000;
let dashboardCache: { data: DashboardQueryResult; timestamp: number } | null = null;

async function fetchDashboardWithCache(
  queryFn: () => Promise<DashboardQueryResult>
): Promise<DashboardQueryResult> {
  const now = Date.now();
  if (dashboardCache && now - dashboardCache.timestamp < DASHBOARD_CACHE_TTL_MS) {
    return dashboardCache.data;
  }
  const data = await queryFn();
  dashboardCache = { data, timestamp: now };
  return data;
}

// ============================================================
// HELPERS
// ============================================================
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
    case "all": return true;
    case "favorites": return favoriteIds.includes(plot.id);
    case "historic-core": return !!plot.provenance?.isHistoricCore;
    case "maintenance-overdue": return plot.statusInfo?.maintenanceLevel === "overdue";
    case "layer-eligible": return !!plot.statusInfo?.layerEligible;
    case "borderline-only": return plot.policy.isBorderline;
    case "community-only": return plot.policy.isCommunity;
    case "nexus-only": return plot.policy.isNexus;
    default: return true;
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

function readStoredFlag(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === "1";
  } catch { return fallback; }
}

function writeStoredFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, value ? "1" : "0"); } catch {}
}

function readStoredFaction(key: string): SelectableFaction | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === "inpinity" || raw === "inphinity" ? raw : null;
  } catch { return null; }
}

function writeStoredFaction(key: string, value: SelectableFaction | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!value) { window.localStorage.removeItem(key); return; }
    window.localStorage.setItem(key, value);
  } catch {}
}

function isPlotVisibleForFaction(
  plot: InfinityPlot,
  myFaction: SelectableFaction | null
): boolean {
  if (plot.policy.isNexus) return true;
  if (plot.policy.isCommunity) return true;
  if (plot.policy.isBorderline) return true;
  if (!myFaction) return false;
  if (plot.faction === myFaction) return true;
  if (plot.faction === "neutral") return true;
  return false;
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jumpTarget, setJumpTarget] = useState("");
  const [showLabels, setShowLabels] = useState(() => readStoredFlag("inpinity-city.show-labels", true));
  const [heatmapMode, setHeatmapMode] = useState(() => readStoredFlag("inpinity-city.heatmap-mode", false));
  const [showAdvanced, setShowAdvanced] = useState(() => readStoredFlag("inpinity-city.advanced-mode", false));
  const [showInspector, setShowInspector] = useState(() => readStoredFlag("inpinity-city.inspector-mode", false));
  const [preferredFaction, setPreferredFaction] = useState<SelectableFaction | null>(() =>
    readStoredFaction("inpinity-city.preferred-faction")
  );

  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>("all");
  const [specialFilter, setSpecialFilter] = useState<SpecialFilter>("all");

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

  const [cityConfigSnapshot, setCityConfigSnapshot] = useState<CityConfigSnapshot | null>(null);
  const [resourceEligibility, setResourceEligibility] = useState<ResourceEligibility | null>(null);

  const [dashboard, setDashboard] = useState<DashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [reservedPlotId, setReservedPlotId] = useState<string | null>(null);
  const [activeBuildPlotId, setActiveBuildPlotId] = useState<string>(NEXT_BUILD_OPTION_ID);

  const [selectedQubiqCell, setSelectedQubiqCell] = useState<SelectedQubiqCell>({ x: 0, y: 0 });

  const [txStep, setTxStep] = useState<QubiqFlowStep>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [flowResult, setFlowResult] = useState<QubiqFlowResult | null>(null);
  const [flowBusy, setFlowBusy] = useState(false);

  // 💎 IDEE 4: Keyboard-Shortcut-Overlay
  const [showShortcuts, setShowShortcuts] = useState(false);

  // ============================================================
  // 💎 IDEE 4: Keyboard-Shortcut-Handler
  // ============================================================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "?") { e.preventDefault(); setShowShortcuts((v) => !v); }
      if (e.key === "Escape") setShowShortcuts(false);
      if (e.key.toLowerCase() === "a" && !e.ctrlKey && !e.metaKey) setShowAdvanced((v) => !v);
      if (e.key.toLowerCase() === "i" && !e.ctrlKey && !e.metaKey) setShowInspector((v) => !v);
      if (e.key.toLowerCase() === "l" && !e.ctrlKey && !e.metaKey) setShowLabels((v) => !v);
      if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey) setHeatmapMode((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // === Effects ===
  useEffect(() => setFavoriteIds(getFavoritePlotIds()), []);
  useEffect(() => writeStoredFlag("inpinity-city.show-labels", showLabels), [showLabels]);
  useEffect(() => writeStoredFlag("inpinity-city.heatmap-mode", heatmapMode), [heatmapMode]);
  useEffect(() => writeStoredFlag("inpinity-city.advanced-mode", showAdvanced), [showAdvanced]);
  useEffect(() => writeStoredFlag("inpinity-city.inspector-mode", showInspector), [showInspector]);
  useEffect(() => writeStoredFaction("inpinity-city.preferred-faction", preferredFaction), [preferredFaction]);

  // Dashboard (mit Cache)
  useEffect(() => {
    let cancelled = false;
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDashboardWithCache(async () => {
          return (await retry(
            async () => await requestGraphQL<DashboardQueryResult>(CITY_DASHBOARD_QUERY),
            { maxRetries: 3, baseDelay: 1000 }
          )) as DashboardQueryResult;
        });
        if (!cancelled) setDashboard(data);
      } catch (err) {
        if (!cancelled) {
          const appError = parseError(err, { query: "CITY_DASHBOARD_QUERY", retryCount });
          setError(appError);
          console.error("Dashboard error:", appError);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadDashboard();
    return () => { cancelled = true; };
  }, [retryCount]);

  // Wallet sync
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
      onAccountsChanged: () => void syncWalletState(),
      onChainChanged: () => void syncWalletState(),
      onDisconnect: () => void syncWalletState(),
    });
    return () => { cancelled = true; unsubscribe(); };
  }, []);

  // Registry
  useEffect(() => {
    let cancelled = false;
    async function loadWalletRegistryState() {
      if (!wallet.isConnected || !wallet.address) {
        setWallet((prev) => ({ ...prev, chosenFaction: null, hasCityKey: null }));
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
          setWallet((prev) => ({ ...prev, chosenFaction: null, hasCityKey: null }));
        }
      }
    }
    void loadWalletRegistryState();
    return () => { cancelled = true; };
  }, [wallet.isConnected, wallet.address, retryCount]);

  // City Keys
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
          if (prev && keys.some((item) => item.tokenId === prev)) return prev;
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
    return () => { cancelled = true; };
  }, [wallet.isConnected, wallet.address, retryCount]);

  // Preferred faction sync
  useEffect(() => {
    if (wallet.chosenFaction === "inpinity" || wallet.chosenFaction === "inphinity") {
      if (preferredFaction !== wallet.chosenFaction) setPreferredFaction(wallet.chosenFaction);
      return;
    }
    if (!preferredFaction && (selectedPlot?.faction === "inpinity" || selectedPlot?.faction === "inphinity")) {
      setPreferredFaction(selectedPlot.faction as SelectableFaction);
    }
  }, [wallet.chosenFaction, preferredFaction, selectedPlot?.faction]);

  const basePlots = useMemo(() => generateInfinityPlots(), []);
  const hydratedPlots = useMemo(() => hydratePlots(basePlots, dashboard || {}), [basePlots, dashboard]);

  const myFaction: SelectableFaction | null =
    (wallet.chosenFaction === "inpinity" || wallet.chosenFaction === "inphinity")
      ? wallet.chosenFaction
      : preferredFaction;

  const canShowMap = wallet.isConnected && !!myFaction;

  const factionScopedPlots = useMemo(() => {
    if (!canShowMap) return [];
    return hydratedPlots.filter((p) => isPlotVisibleForFaction(p, myFaction));
  }, [hydratedPlots, myFaction, canShowMap]);

  const buildPlotOptions = useMemo<BuildPlotOption[]>(() => {
    const walletAddress = normalizeAddress(wallet.address);
    const optionsMap = new Map<string, BuildPlotOption>();
    for (const plot of hydratedPlots) {
      const plotId = (plot.plotId || "").trim();
      if (!plotId) continue;
      const isReservedByFlow = reservedPlotId === plotId;
      const isOwnedByWallet = !!walletAddress && normalizeAddress(plot.owner) === walletAddress;
      if (!isReservedByFlow && !isOwnedByWallet) continue;
      optionsMap.set(plotId, { plotId, label: buildPlotOptionLabel(plot) });
    }
    if (reservedPlotId && !optionsMap.has(reservedPlotId)) {
      optionsMap.set(reservedPlotId, { plotId: reservedPlotId, label: `#${reservedPlotId} · active build` });
    }
    const existingOptions = Array.from(optionsMap.values()).sort((a, b) => {
      const aNum = Number(a.plotId);
      const bNum = Number(b.plotId);
      if (Number.isFinite(aNum) && Number.isFinite(bNum)) return aNum - bNum;
      return a.plotId.localeCompare(b.plotId);
    });
    return [
      { plotId: NEXT_BUILD_OPTION_ID, label: "Next personal plot / use current map selection" },
      ...existingOptions,
    ];
  }, [hydratedPlots, wallet.address, reservedPlotId]);

  useEffect(() => {
    if (activeBuildPlotId && buildPlotOptions.some((item) => item.plotId === activeBuildPlotId)) return;
    setActiveBuildPlotId(NEXT_BUILD_OPTION_ID);
  }, [buildPlotOptions, activeBuildPlotId]);

  const activePlotId = useMemo(() => {
    if (isExistingBuildPlotId(activeBuildPlotId)) return activeBuildPlotId;
    return null;
  }, [activeBuildPlotId]);

  const activeBuildPlot = useMemo(() => {
    if (!activePlotId) return null;
    return hydratedPlots.find((plot) => String(plot.plotId || "") === String(activePlotId)) || null;
  }, [hydratedPlots, activePlotId]);

  const livePlotProgress = useLivePlotProgress(activePlotId, selectedQubiqCell, retryCount);
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
          buildTargetPlot, balances, snapshot, livePlotProgress.qubiq
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
    return () => { cancelled = true; };
  }, [wallet.isConnected, wallet.address, buildTargetPlot, livePlotProgress.qubiq, retryCount]);

  const filteredPlots = useMemo(() => {
    const term = normalize(searchTerm);
    return factionScopedPlots.filter((plot) => {
      if (!matchesSearch(plot, term)) return false;
      if (!matchesAvailability(plot, availabilityFilter)) return false;
      if (!matchesSpecial(plot, specialFilter, favoriteIds)) return false;
      return true;
    });
  }, [factionScopedPlots, searchTerm, availabilityFilter, specialFilter, favoriteIds]);

  const eligibility = useMemo(
    () => getPlotEligibility(buildTargetPlot, wallet, resourceEligibility),
    [buildTargetPlot, wallet, resourceEligibility]
  );

  const flowTargetPlotId = useMemo(() => {
    if (!isExistingBuildPlotId(activeBuildPlotId)) return null;
    try { return BigInt(activeBuildPlotId); } catch { return null; }
  }, [activeBuildPlotId]);

  useEffect(() => {
    if (!selectedPlot) return;
    const refreshed = hydratedPlots.find((plot) => plot.id === selectedPlot.id);
    if (refreshed && refreshed !== selectedPlot) setSelectedPlot(refreshed);
  }, [hydratedPlots, selectedPlot]);

  const handleToggleFavorite = useCallback((id: string): void => {
    const next = toggleFavoritePlot(id);
    setFavoriteIds(next);
  }, []);

  const handleJumpToPlot = useCallback((rawValue: string): void => {
    const term = normalize(rawValue);
    if (!term) return;
    const found = hydratedPlots.find((plot) => {
      const label = normalize(plot.label);
      const plotId = normalize(plot.plotId || "");
      const owner = normalize(plot.owner || "");
      const ownerLabel = normalize(plot.ownerLabel || "");
      return (
        label === term || plotId === term || owner === term || ownerLabel === term ||
        label.includes(term) || plotId.includes(term) ||
        owner.includes(term) || ownerLabel.includes(term)
      );
    });
    if (found) {
      setSelectedPlot(found);
      if (found.plotId && buildPlotOptions.some((item) => item.plotId === found.plotId)) {
        setActiveBuildPlotId(found.plotId);
      }
      setSearchTerm(found.label);
    }
  }, [hydratedPlots, buildPlotOptions]);

  const handleRetry = useCallback((): void => {
    setRetryCount((prev) => prev + 1);
    setError(null);
  }, []);

  const handleConnectWallet = useCallback(async (): Promise<void> => {
    const ethereum = getInjectedEthereum();
    if (!ethereum) {
      alert("No injected wallet found. Please install MetaMask or another EVM wallet.");
      return;
    }
    try {
      await connectInjectedWallet();
      try { await switchToConfiguredChain(); }
      catch (switchError) { console.warn("Base chain switch failed:", switchError); }
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
  }, []);

  const handleChooseFaction = useCallback((faction: SelectableFaction): void => {
    setPreferredFaction(faction);
    writeStoredFaction("inpinity-city.preferred-faction", faction);
  }, []);

  const handleResetFaction = useCallback((): void => {
    setPreferredFaction(null);
    writeStoredFaction("inpinity-city.preferred-faction", null);
    setSelectedPlot(null);
  }, []);

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

  const handlePrepareQubiqContribution = useCallback(async (): Promise<void> => {
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
        cityKeyTokenId: selectedCityKeyTokenId ? BigInt(selectedCityKeyTokenId) : null,
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
      if (result.txHash) setTxHash(result.txHash);
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
      const message = err instanceof Error ? err.message : "Unexpected Qubiq preparation error.";
      setFlowResult({ ok: false, code: "unexpected_error", step: "error", message });
      setTxStep("error");
    } finally {
      setFlowBusy(false);
    }
  }, [wallet.address, wallet.chosenFaction, preferredFaction, flowTargetPlotId, selectedCityKeyTokenId, selectedQubiqCell, resourceEligibility, handleConnectWallet]);

  const currentQubiqStep: QubiqStepId = useMemo(() => {
    if (!wallet.isConnected) return "wallet";
    if (wallet.hasCityKey === false) return "key";
    if (!myFaction) return "faction";
    if (txStep === "validate" || txStep === "prepare") return "plot";
    if (txStep === "approve") return "approve";
    if (txStep === "contribute" || (livePlotProgress.qubiq?.visualState ?? "") === "in-progress") return "qubiq";
    if (livePlotProgress.completion?.isFullyCompleted) return "built";
    if (buildTargetPlot) return "plot";
    return "plot";
  }, [wallet.isConnected, wallet.hasCityKey, myFaction, txStep, livePlotProgress.qubiq?.visualState, livePlotProgress.completion?.isFullyCompleted, buildTargetPlot]);

  const completedQubiqSteps: QubiqStepId[] = useMemo(() => [
    ...(wallet.isConnected ? (["wallet"] as const) : []),
    ...(wallet.hasCityKey === true ? (["key"] as const) : []),
    ...(myFaction ? (["faction"] as const) : []),
    ...(buildTargetPlot ? (["plot"] as const) : []),
    ...((livePlotProgress.completion?.completedQubiqs ?? 0) > 0 ? (["approve", "qubiq"] as const) : []),
    ...(livePlotProgress.completion?.isFullyCompleted ? (["built"] as const) : []),
  ], [wallet.isConnected, wallet.hasCityKey, myFaction, buildTargetPlot, livePlotProgress.completion?.completedQubiqs, livePlotProgress.completion?.isFullyCompleted]);

  const cityEvents: CityEvent[] = useMemo(() => {
    const raw: any[] = (dashboard as any)?.recentActivity ?? [];
    if (!Array.isArray(raw) || raw.length === 0) {
      return factionScopedPlots
        .filter((p) => p.owner && p.status !== "free")
        .slice(0, 15)
        .map((p, idx) => ({
          id: `${p.id}-${idx}`,
          wallet: p.owner || "—",
          action: (p.status === "reserved" ? "reserve" : "build") as CityAction,
          plotId: p.plotId,
          metadata: p.faction ? `faction: ${p.faction}` : undefined,
          timestamp: Date.now() - idx * 60_000,
        }));
    }
    return raw.map((e, idx) => ({
      id: String(e.id ?? idx),
      wallet: e.owner ?? e.wallet ?? e.actor ?? "0x0",
      action: (e.type ?? e.action ?? "build") as CityAction,
      plotId: e.plotId ?? e.plot_id,
      metadata: e.metadata ?? e.note,
      timestamp: Number(e.timestamp ?? e.createdAt ?? Date.now() / 1000) * 1000,
    }));
  }, [dashboard, factionScopedPlots]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="page cityEternityTheme inpinity-theme">
      <nav className="siteNavBar" aria-label="Primary">
        <a className="siteNavBrand" href="https://inpinity.online/">
          <span className="siteNavBrandGlow" aria-hidden="true" />
          <span className="siteNavBrandLabel">Inpinity</span>
          <span className="siteNavBrandSub">City</span>
        </a>
        <div className="siteNavLinks">
          <a className="siteNavLink" href="https://inpinity.online/">Home</a>
          <a className="siteNavLink" href="https://inpinity.online/game">Game</a>
          <a className="siteNavLink" href="https://inpinity.online/map">Map</a>
          <a className="siteNavLink isActive" href="#" aria-current="page">City</a>
        </div>
      </nav>

      <div className="topBannerStrip" aria-hidden="true" />

      <CityHero
        walletAddress={wallet.address}
        hasCityKey={wallet.hasCityKey}
        hasFaction={!!myFaction}
        hasPlot={factionScopedPlots.some((p) => p.owner?.toLowerCase() === wallet.address?.toLowerCase())}
        faction={myFaction}
        onPrimaryAction={() => {
          if (!wallet.isConnected) return handleConnectWallet();
          if (!myFaction) return;
          document.getElementById("qubiq-terminal")?.scrollIntoView({ behavior: "smooth" });
        }}
        primaryActionLabel={
          !wallet.isConnected ? "Connect Wallet" : !myFaction ? "Choose Faction" : "Continue Building"
        }
        onSecondaryAction={wallet.isConnected && myFaction ? handleResetFaction : undefined}
        secondaryActionLabel={wallet.isConnected && myFaction ? "Change Faction" : undefined}
      />

      {wallet.isConnected && !myFaction && (
        <section className="panel themedPanel sectionWithDivider" style={{ textAlign: "center" }}>
          <h2>⚔️ Choose Your Faction</h2>
          <p className="sectionHelp" style={{ maxWidth: 620, margin: "0 auto 24px" }}>
            Your wallet will be permanently bound to one side of the ∞ city. This choice defines
            which plots you can see and build on.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
            <button
              className="ip-btn ip-btn--lg"
              onClick={() => handleChooseFaction("inpinity")}
              style={{
                background: "linear-gradient(135deg, #4a7bff, #2e4eb4)",
                color: "#fff", minWidth: 220, padding: "24px 32px",
                fontSize: 16, letterSpacing: 3, fontWeight: "bold",
              }}
            >
              ⚔ INPINITY
              <div style={{ fontSize: 9, opacity: 0.7, marginTop: 4 }}>BLUE SIDE</div>
            </button>
            <button
              className="ip-btn ip-btn--lg"
              onClick={() => handleChooseFaction("inphinity")}
              style={{
                background: "linear-gradient(135deg, #ff5858, #aa2e2e)",
                color: "#fff", minWidth: 220, padding: "24px 32px",
                fontSize: 16, letterSpacing: 3, fontWeight: "bold",
              }}
            >
              ⚔ INPHINITY
              <div style={{ fontSize: 9, opacity: 0.7, marginTop: 4 }}>RED SIDE</div>
            </button>
          </div>
        </section>
      )}

      {showAdvanced && (
        <section className="panel themedPanel sectionWithDivider">
          <h2>City Dashboard</h2>
          <ErrorBoundary onError={(e) => console.error("Dashboard ErrorBoundary:", e)} resetKeys={[dashboard]}>
            {loading && <LoadingSpinner text="Loading city data..." delayMs={800} />}
            {!loading && error && (
              <ErrorMessage error={error} onRetry={handleRetry} variant="card" showDetails={import.meta.env.DEV} />
            )}
            {!loading && !error && dashboardCounts && (
              <div className="cards">
                <div className="card"><div className="muted">Indexer Block</div><strong>{dashboardCounts.indexerBlock}</strong></div>
                <div className="card"><div className="muted">Weapon Definitions</div><strong>{dashboardCounts.weaponDefinitions}</strong></div>
                <div className="card"><div className="muted">Weapon Instances</div><strong>{dashboardCounts.weaponInstances}</strong></div>
                <div className="card"><div className="muted">Materia Definitions</div><strong>{dashboardCounts.materiaDefinitions}</strong></div>
                <div className="card"><div className="muted">Plots</div><strong>{dashboardCounts.plots}</strong></div>
                <div className="card"><div className="muted">Players</div><strong>{dashboardCounts.players}</strong></div>
                <div className="card"><div className="muted">Status Infos</div><strong>{dashboardCounts.plotStatusInfos}</strong></div>
                <div className="card"><div className="muted">Provenances</div><strong>{dashboardCounts.plotProvenances}</strong></div>
              </div>
            )}
          </ErrorBoundary>
        </section>
      )}

      {canShowMap && (
        <section className="panel themedPanel sectionWithDivider">
          <h2>Infinity City Map</h2>
          <p className="sectionHelp">
            Your{" "}
            <strong style={{ color: myFaction === "inpinity" ? "#4a7bff" : "#ff5858" }}>
              {prettyFaction(myFaction!)}
            </strong>{" "}
            side of the ∞ city. Nexus, Community and Borderline zones are always visible —
            plots from the other faction are hidden.
          </p>

          <CityToolbar
            plots={factionScopedPlots}
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
                onError={(e) => console.error("Map ErrorBoundary:", e)}
                resetKeys={[filteredPlots.length, showLabels, heatmapMode, availabilityFilter, specialFilter, favoriteIds.join(",")]}
              >
                <InfinityMap
                  plots={filteredPlots}
                  selectedPlot={selectedPlot}
                  onSelectPlot={(plot) => {
                    setSelectedPlot(plot);
                    if (plot.plotId && buildPlotOptions.some((item) => item.plotId === plot.plotId)) {
                      setActiveBuildPlotId(plot.plotId);
                    }
                  }}
                  showLabels={showLabels}
                  heatmapMode={heatmapMode}
                  walletAddress={wallet.address}
                  userFaction={myFaction}
                  isLoading={loading}
                  isDemoData={false}
                  onConnectWallet={handleConnectWallet}
                  onChooseFaction={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  onReservePlot={() => document.getElementById("qubiq-terminal")?.scrollIntoView({ behavior: "smooth" })}
                />
              </ErrorBoundary>

              <CityStats plots={filteredPlots} />
            </div>

            <aside className="cityMapSidebar">
              <PlotDetails plot={selectedPlot} onToggleFavorite={handleToggleFavorite} showAdvanced={showAdvanced} />

              <QubiqFlow
                currentStep={currentQubiqStep}
                completedSteps={completedQubiqSteps}
                qubiqProgress={livePlotProgress.completion?.completedQubiqs ?? 0}
                qubiqMax={25}
                onStepClick={(id) => {
                  if (id === "wallet" && !wallet.isConnected) return handleConnectWallet();
                  if (id === "faction" && !myFaction) return window.scrollTo({ top: 0, behavior: "smooth" });
                  if (id === "plot") return document.getElementById("city-map-capture")?.scrollIntoView({ behavior: "smooth" });
                }}
              />

              <div id="qubiq-terminal">
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
              </div>
            </aside>
          </div>
        </section>
      )}

      {showInspector && <ItemInspectorPanel walletAddress={wallet.address} showAdvanced={showAdvanced} />}

      {showAdvanced && (
        <section className="panel panelHint themedPanel">
          <h2>Implementation Notes</h2>
          <p>
            Personal plot numbering starts on the Inpinity side. Live personal plots are
            assigned by faction side before hydration, so Q-labels do not drift onto the
            opposite loop.
          </p>
          <p style={{ marginBottom: 0 }}>
            If you later add a canonical coordinate source from contracts or the subgraph,
            keep the current side-correction warnings as a safeguard instead of silently
            trusting synthetic slots.
          </p>
        </section>
      )}

      <div style={{ position: "fixed", top: 72, right: 16, display: "flex", gap: 6, zIndex: 15 }}>
        <button className="ip-btn ip-btn--ghost ip-btn--sm" onClick={() => setShowAdvanced((v) => !v)} style={{ fontSize: 10 }}>
          {showAdvanced ? "Hide Advanced" : "Advanced"}
        </button>
        <button className="ip-btn ip-btn--ghost ip-btn--sm" onClick={() => setShowInspector((v) => !v)} style={{ fontSize: 10 }}>
          {showInspector ? "Hide Inspector" : "Inspector"}
        </button>
        <button className="ip-btn ip-btn--ghost ip-btn--sm" onClick={() => setShowShortcuts((v) => !v)} style={{ fontSize: 10 }} title="Keyboard shortcuts (?)">
          ?
        </button>
      </div>

      {showAdvanced && canShowMap && (
        <section className="panel themedPanel">
          <h2>Diagnostics</h2>
          <div className="advancedInfoCard">
            <div><strong>Chain:</strong> {CONFIG.chainId}</div>
            <div><strong>Subgraph:</strong> {CONFIG.subgraphUrl}</div>
            <div><strong>CityRegistry:</strong> {CONFIG.cityRegistryAddress || "missing"}</div>
            <div><strong>CityLand:</strong> {CONFIG.cityLandAddress || "missing"}</div>
            <div><strong>CityConfig:</strong> {cityConfigSnapshot ? "loaded" : "loading / unavailable"}</div>
            <div><strong>Owned City Keys:</strong> {ownedCityKeys.length}</div>
            <div><strong>Wallet Faction:</strong> {wallet.chosenFaction || "not set"}</div>
            {(reservedPlotId || txHash || activeBuildPlotId) && (
              <>
                <div><strong>Reserved Plot ID:</strong> {reservedPlotId || "—"}</div>
                <div><strong>Selected Qubiq Cell:</strong> ({selectedQubiqCell.x}, {selectedQubiqCell.y})</div>
                <div><strong>Latest TX:</strong> {txHash || "—"}</div>
              </>
            )}
          </div>
        </section>
      )}

      {/* 💎 IDEE 4: Keyboard-Shortcut-Overlay */}
      {showShortcuts && (
        <div
          role="dialog"
          aria-label="Keyboard shortcuts"
          onClick={(e) => { if (e.target === e.currentTarget) setShowShortcuts(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div style={{
            background: "var(--color-bg-card, #0a0a14)",
            border: "2px solid var(--color-primary, #ffcc00)",
            borderRadius: 12, padding: 24, maxWidth: 500, width: "100%",
            boxShadow: "0 0 60px rgba(255,204,0,0.3)",
          }}>
            <h2 style={{
              color: "var(--color-primary, #ffcc00)",
              marginTop: 0, marginBottom: 16, fontSize: 16,
              letterSpacing: 2, textTransform: "uppercase",
            }}>
              ⌨️ Keyboard Shortcuts
            </h2>
            <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
              {[
                { key: "?", desc: "Toggle this panel" },
                { key: "A", desc: "Toggle advanced mode" },
                { key: "I", desc: "Toggle inspector" },
                { key: "L", desc: "Toggle plot labels" },
                { key: "H", desc: "Toggle heatmap" },
                { key: "ESC", desc: "Close panels" },
              ].map(({ key, desc }) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <kbd style={{
                    background: "rgba(255,204,0,0.15)",
                    border: "1px solid var(--color-primary, #ffcc00)",
                    color: "var(--color-primary, #ffcc00)",
                    padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                    fontFamily: "'Courier New', monospace",
                  }}>{key}</kbd>
                  <span style={{ color: "var(--color-text-dim, #888)" }}>{desc}</span>
                </div>
              ))}
            </div>
            <button
              className="ip-btn ip-btn--ghost ip-btn--sm"
              onClick={() => setShowShortcuts(false)}
              style={{ marginTop: 16, width: "100%", fontSize: 12 }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bottomFooterStrip" aria-hidden="true" style={{ paddingBottom: 44 }} />

      <CityTicker events={cityEvents} isLoading={loading} maxVisible={12} />
    </div>
  );
}