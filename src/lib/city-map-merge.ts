import type {
  DashboardQueryResult,
  Plot,
  PlotStatusInfo,
  PlotProvenance,
} from "../types/city";

import type {
  InfinityPlot,
  InfinityFaction,
  InfinityPlotKind,
  InfinityPlotPolicy,
  InfinityPlotProvenance,
  InfinityPlotStatus,
  InfinityPlotStatusInfo,
  InfinityPlotTier,
  InfinityLayoutSource,
} from "../types/infinity";
import { CENTER_X, getCanonicalSideFromFaction } from "./infinity-layout";

export interface HydratedPlot extends InfinityPlot {
  syncStatus: "mock" | "partial" | "complete";
  subgraphData?: {
    plot: Plot;
    statusInfo?: PlotStatusInfo;
    provenance?: PlotProvenance;
  };
}

type MergeableDashboardData = Partial<DashboardQueryResult>;

type PlotMaps = ReturnType<typeof buildMaps>;

type HydrationOverlay = {
  subgraphPlot?: Plot;
  status?: PlotStatusInfo;
  provenance?: PlotProvenance;
  layoutSource?: InfinityLayoutSource;
};

function toSafeNumber(
  value: string | number | null | undefined
): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function normalizeText(value: string | null | undefined): string {
  return (value || "").trim().toLowerCase();
}

function normalizeKey(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toNumericSortKey(value: string | number | null | undefined): number {
  const normalized = normalizeKey(value);
  if (!normalized) return Number.POSITIVE_INFINITY;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : Number.POSITIVE_INFINITY;
}

function mapPlotKind(type: string | null | undefined): InfinityPlotKind {
  const value = normalizeText(type);

  if (value === "personal") return "personal-5x5";
  if (value === "community") return "community-25x25";
  if (value === "border" || value === "borderline") return "borderline-25x25";
  if (value === "nexus") return "nexus";

  return "personal-5x5";
}

function mapFaction(faction: string | null | undefined): InfinityFaction {
  const value = normalizeText(faction);

  if (value === "pi" || value === "inpinity") return "inpinity";
  if (value === "phi" || value === "inphinity") return "inphinity";
  if (value === "border" || value === "borderline") return "borderline";
  if (value === "community") return "community";

  return "neutral";
}

function mapStatus(status: string | null | undefined): InfinityPlotStatus {
  const value = normalizeText(status);

  if (value === "reserved") return "reserved";
  if (value === "active" || value === "owned") return "owned";
  if (
    value === "inactive" ||
    value === "overbuilt" ||
    value === "locked" ||
    value === "dormant" ||
    value === "decayed" ||
    value === "layereligible" ||
    value === "layer_eligible"
  ) {
    return "locked";
  }
  if (value === "community") return "community";
  if (value === "borderline") return "borderline";
  if (value === "nexus") return "nexus";

  return "free";
}

function getTier(
  distanceToNexus: number,
  plotKind: InfinityPlotKind
): InfinityPlotTier {
  if (plotKind === "nexus") return "nexus";
  if (distanceToNexus <= 120) return "inner";
  if (distanceToNexus <= 260) return "mid";
  return "outer";
}

function buildPolicy(
  plotKind: InfinityPlotKind,
  faction: InfinityFaction
): InfinityPlotPolicy {
  const isPersonal = plotKind === "personal-5x5";
  const isCommunity = plotKind === "community-25x25";
  const isBorderline = plotKind === "borderline-25x25";
  const isNexus = plotKind === "nexus";

  return {
    isPersonal,
    isCommunity,
    isBorderline,
    isNexus,
    reservable: isPersonal,
    purchasable: false,
    factionLocked:
      isPersonal && (faction === "inpinity" || faction === "inphinity"),
    sharedUse: isCommunity || isBorderline || isNexus,
  };
}

function buildProvenanceModel(
  prov?: PlotProvenance
): InfinityPlotProvenance | undefined {
  if (!prov) return undefined;

  const createdAt = toSafeNumber(prov.createdAt);
  const layerCount = toSafeNumber(prov.layerCount) || 0;
  const ownershipTransfers = toSafeNumber(prov.ownershipTransfers) || 0;
  const aetherUses = toSafeNumber(prov.aetherUses) || 0;
  const historicScore = toSafeNumber(prov.historicScore) || 0;
  const updatedAt = toSafeNumber(prov.updatedAtTimestamp);

  const now = Math.floor(Date.now() / 1000);
  const ageInDays = createdAt
    ? Math.max(0, Math.floor((now - createdAt) / 86400))
    : undefined;

  const legacyScore = Number(
    (
      historicScore * 1.15 +
      layerCount * 18 +
      ownershipTransfers * 9 +
      aetherUses * 6 +
      (ageInDays || 0) * 0.35
    ).toFixed(2)
  );

  const provenanceScore = Number(
    (
      historicScore * 1.35 +
      layerCount * 22 +
      ownershipTransfers * 7 +
      aetherUses * 10
    ).toFixed(2)
  );

  return {
    firstBuilder: prov.firstBuilder || undefined,
    createdAt,
    layerCount,
    ownershipTransfers,
    aetherUses,
    historicScore,
    originFaction: prov.originFaction || "unknown",
    genesisEra: prov.genesisEra || undefined,
    lastUpdated: updatedAt,
    legacyScore,
    provenanceScore,
    ageInDays,
    isHistoricCore:
      historicScore >= 100 || layerCount >= 3 || (ageInDays || 0) >= 180,
  };
}

function getInactivityLevel(
  days?: number
): InfinityPlotStatusInfo["inactivityLevel"] {
  if (days === undefined) return "fresh";
  if (days < 14) return "fresh";
  if (days < 45) return "watch";
  if (days < 90) return "warning";
  return "critical";
}

function getMaintenanceLevel(
  days?: number
): InfinityPlotStatusInfo["maintenanceLevel"] {
  if (days === undefined) return "maintained";
  if (days < 30) return "maintained";
  if (days < 75) return "due";
  return "overdue";
}

function buildStatusInfoModel(
  status?: PlotStatusInfo
): InfinityPlotStatusInfo | undefined {
  if (!status) return undefined;

  const lastActivityAt = toSafeNumber(status.lastActivityAt);
  const lastMaintenanceAt = toSafeNumber(status.lastMaintenanceAt);
  const updatedAt = toSafeNumber(status.updatedAtTimestamp);

  const now = Math.floor(Date.now() / 1000);

  const inactivityDays =
    lastActivityAt !== undefined
      ? Math.max(0, Math.floor((now - lastActivityAt) / 86400))
      : undefined;

  const maintenanceAgeDays =
    lastMaintenanceAt !== undefined
      ? Math.max(0, Math.floor((now - lastMaintenanceAt) / 86400))
      : undefined;

  const inactivityLevel = getInactivityLevel(inactivityDays);
  const maintenanceLevel = getMaintenanceLevel(maintenanceAgeDays);
  const layerEligible = !!status.layerEligible;

  return {
    lastActivityAt,
    lastMaintenanceAt,
    manualStatusOverride: status.manualStatusOverride || undefined,
    derivedStatus: status.derivedStatus || undefined,
    layerEligible,
    updatedAt,
    inactivityDays,
    maintenanceAgeDays,
    inactivityLevel,
    maintenanceLevel,
    canLayerUpgrade: layerEligible && inactivityLevel !== "fresh",
  };
}

function buildMaps(data: MergeableDashboardData) {
  const plots = data.plots || [];
  const statusInfos = data.plotStatusInfos || [];
  const provenances = data.plotProvenances || [];

  const plotsById = new Map<string, Plot>();
  const plotsByPlotId = new Map<string, Plot>();

  for (const plot of plots) {
    const id = normalizeKey(plot.id);
    const plotId = normalizeKey(plot.plotId);
    if (id) plotsById.set(id, plot);
    if (plotId) plotsByPlotId.set(plotId, plot);
  }

  const statusById = new Map<string, PlotStatusInfo>();
  const statusByPlotId = new Map<string, PlotStatusInfo>();

  for (const status of statusInfos) {
    const id = normalizeKey(status.plot?.id);
    const plotId = normalizeKey(status.plot?.plotId);
    if (id) statusById.set(id, status);
    if (plotId) statusByPlotId.set(plotId, status);
  }

  const provenanceById = new Map<string, PlotProvenance>();
  const provenanceByPlotId = new Map<string, PlotProvenance>();

  for (const prov of provenances) {
    const id = normalizeKey(prov.plot?.id);
    const plotId = normalizeKey(prov.plot?.plotId);
    if (id) provenanceById.set(id, prov);
    if (plotId) provenanceByPlotId.set(plotId, prov);
  }

  return {
    plotsById,
    plotsByPlotId,
    statusById,
    statusByPlotId,
    provenanceById,
    provenanceByPlotId,
  };
}

function getSyncStatus(
  overlay: Pick<HydrationOverlay, "subgraphPlot" | "status" | "provenance">
): HydratedPlot["syncStatus"] {
  if (overlay.subgraphPlot && (overlay.status || overlay.provenance)) {
    return overlay.status && overlay.provenance ? "complete" : "partial";
  }

  if (overlay.subgraphPlot) {
    return "partial";
  }

  return "mock";
}

function getPlotOverlayByBase(
  basePlot: InfinityPlot,
  maps: PlotMaps
): HydrationOverlay {
  const idKey = normalizeKey(basePlot.id);
  const plotIdKey = normalizeKey(basePlot.plotId || basePlot.index);

  const subgraphPlot =
    maps.plotsById.get(idKey) || maps.plotsByPlotId.get(plotIdKey);

  const status =
    maps.statusById.get(idKey) || maps.statusByPlotId.get(plotIdKey);

  const provenance =
    maps.provenanceById.get(idKey) || maps.provenanceByPlotId.get(plotIdKey);

  return {
    subgraphPlot,
    status,
    provenance,
    layoutSource: subgraphPlot ? "subgraph-index" : "mock",
  };
}

function buildHydratedPlot(
  basePlot: InfinityPlot,
  overlay: HydrationOverlay
): HydratedPlot {
  const subgraphPlot = overlay.subgraphPlot;
  const status = overlay.status;
  const provenance = overlay.provenance;

  const overlayKind = subgraphPlot
    ? mapPlotKind(subgraphPlot.plotType)
    : basePlot.plotKind;

  const overlayFaction = subgraphPlot
    ? mapFaction(subgraphPlot.faction)
    : basePlot.faction;

  const overlayStatus = mapStatus(
    status?.manualStatusOverride ||
      status?.derivedStatus ||
      subgraphPlot?.status ||
      basePlot.status
  );

  const provenanceModel =
    buildProvenanceModel(provenance) || basePlot.provenance;

  const statusInfoModel =
    buildStatusInfoModel(status) || basePlot.statusInfo;

  const tier = getTier(basePlot.distanceToNexus, overlayKind);
  const policy = buildPolicy(overlayKind, overlayFaction);
  const plotId = subgraphPlot ? normalizeKey(subgraphPlot.plotId) : basePlot.plotId;
  const numericPlotId = toSafeNumber(plotId);
  const expectedSide =
    overlayKind === "personal-5x5"
      ? getCanonicalSideFromFaction(overlayFaction)
      : null;

  let x = basePlot.x;
  let side = basePlot.side;
  let layoutState = basePlot.layoutState;
  let layoutNote = basePlot.layoutNote;
  let factionSideMismatch = false;

  if (overlayKind === "personal-5x5") {
    if (expectedSide && expectedSide !== basePlot.side) {
      x = CENTER_X - (basePlot.x - CENTER_X);
      side = expectedSide;
      factionSideMismatch = true;
      layoutState = "corrected";
      layoutNote = `Live faction ${overlayFaction} belongs on the ${expectedSide} side, so this synthetic slot was mirrored to keep faction placement stable.`;
    } else if (overlay.layoutSource === "canonical-faction" && expectedSide) {
      layoutState = "aligned";
      layoutNote = `Placed on the ${expectedSide} ${overlayFaction} side using deterministic personal slot assignment.`;
    } else {
      layoutState = "synthetic";
      layoutNote = "Personal plot is still using the synthetic infinity placeholder layout.";
    }
  }

  const hydrated: HydratedPlot = {
    ...basePlot,
    id:
      normalizeKey(subgraphPlot?.id) ||
      (plotId ? `plot-${plotId}` : basePlot.id),
    index:
      overlayKind === "personal-5x5" && numericPlotId !== undefined
        ? numericPlotId
        : basePlot.index,
    x,
    side,
    label:
      overlayKind === "personal-5x5" && plotId
        ? `Q${plotId}`
        : basePlot.label,
    plotId,
    plotKind: overlayKind,
    faction: overlayFaction,
    status: overlayStatus,
    width: toSafeNumber(subgraphPlot?.width) ?? basePlot.width,
    height: toSafeNumber(subgraphPlot?.height) ?? basePlot.height,
    owner: subgraphPlot?.owner?.id || basePlot.owner,
    ownerLabel: subgraphPlot?.owner?.id || basePlot.ownerLabel,
    createdAt: toSafeNumber(subgraphPlot?.createdAt) ?? basePlot.createdAt,
    exists: subgraphPlot ? !!subgraphPlot.exists : basePlot.exists,
    provenance: provenanceModel,
    statusInfo: statusInfoModel,
    tier,
    policy,
    layoutSource: overlay.layoutSource || "mock",
    layoutState,
    layoutNote,
    factionSideMismatch,
    lastTransferDaysAgo:
      provenanceModel?.lastUpdated !== undefined
        ? Math.max(
            0,
            Math.floor((Date.now() / 1000 - provenanceModel.lastUpdated) / 86400)
          )
        : basePlot.lastTransferDaysAgo,
    valueModel: {
      baseValue: basePlot.priceEstimate || 0,
      rarityMultiplier: 1,
      laneMultiplier: Number((1 + basePlot.lane * 0.12).toFixed(2)),
      nexusMultiplier: Number(
        (
          1 +
          Math.max(0, (240 - basePlot.distanceToNexus) / 240) * 0.35
        ).toFixed(2)
      ),
      historicalMultiplier: Number(
        (
          1 +
          Math.min(
            1.25,
            ((provenanceModel?.legacyScore || 0) +
              (provenanceModel?.provenanceScore || 0)) /
              1000
          )
        ).toFixed(2)
      ),
      finalEstimate: Math.round(
        (basePlot.priceEstimate || 0) *
          (1 + basePlot.lane * 0.12) *
          (1 + Math.max(0, (240 - basePlot.distanceToNexus) / 240) * 0.35) *
          (1 +
            Math.min(
              1.25,
              ((provenanceModel?.legacyScore || 0) +
                (provenanceModel?.provenanceScore || 0)) /
                1000
            ))
      ),
    },
    syncStatus: getSyncStatus(overlay),
    isFavorite: !!basePlot.isFavorite,
  };

  if (subgraphPlot) {
    hydrated.subgraphData = {
      plot: subgraphPlot,
      statusInfo: status,
      provenance,
    };
  }

  return hydrated;
}

function sortPersonalSlots(slots: InfinityPlot[]): InfinityPlot[] {
  return [...slots].sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });
}

function sortPersonalSubgraphPlots(plots: Plot[]): Plot[] {
  return [...plots].sort((a, b) => {
    const numericDelta = toNumericSortKey(a.plotId) - toNumericSortKey(b.plotId);
    if (numericDelta !== 0) return numericDelta;

    return normalizeKey(a.plotId).localeCompare(normalizeKey(b.plotId));
  });
}

function shiftFirst<T>(items: T[]): T | undefined {
  if (!items.length) return undefined;
  return items.shift();
}

function assignPersonalPlotsByFaction(
  basePlots: InfinityPlot[],
  maps: PlotMaps,
  subgraphData: MergeableDashboardData
): { hydrated: HydratedPlot[]; usedSlotIds: Set<string> } {
  const personalSlots = basePlots.filter((plot) => plot.plotKind === "personal-5x5");
  const leftSlots = sortPersonalSlots(
    personalSlots.filter((plot) => plot.side === "left")
  );
  const rightSlots = sortPersonalSlots(
    personalSlots.filter((plot) => plot.side === "right")
  );
  const fallbackSlots = sortPersonalSlots(personalSlots);
  const usedSlotIds = new Set<string>();

  const personalPlots = sortPersonalSubgraphPlots(
    (subgraphData.plots || []).filter(
      (plot) => mapPlotKind(plot.plotType) === "personal-5x5"
    )
  );

  const hydrated: HydratedPlot[] = [];

  for (const subgraphPlot of personalPlots) {
    const faction = mapFaction(subgraphPlot.faction);
    const expectedSide = getCanonicalSideFromFaction(faction);

    const takeNextSlot = () => {
      if (expectedSide === "left") {
        return shiftFirst(leftSlots) || shiftFirst(rightSlots) || shiftFirst(fallbackSlots);
      }

      if (expectedSide === "right") {
        return shiftFirst(rightSlots) || shiftFirst(leftSlots) || shiftFirst(fallbackSlots);
      }

      return shiftFirst(fallbackSlots) || shiftFirst(leftSlots) || shiftFirst(rightSlots);
    };

    const slot = takeNextSlot();
    if (!slot) continue;

    usedSlotIds.add(slot.id);

    const plotIdKey = normalizeKey(subgraphPlot.plotId);
    const plotKey = normalizeKey(subgraphPlot.id);

    hydrated.push(
      buildHydratedPlot(slot, {
        subgraphPlot,
        status:
          maps.statusById.get(plotKey) || maps.statusByPlotId.get(plotIdKey),
        provenance:
          maps.provenanceById.get(plotKey) ||
          maps.provenanceByPlotId.get(plotIdKey),
        layoutSource: "canonical-faction",
      })
    );
  }

  return { hydrated, usedSlotIds };
}

export function mergeMapData(
  data: MergeableDashboardData
): Partial<InfinityPlot>[] {
  if (!data?.plots?.length) return [];

  const maps = buildMaps(data);

  return data.plots.map((plot) => {
    const id = normalizeKey(plot.id);
    const plotId = normalizeKey(plot.plotId);

    const status =
      maps.statusById.get(id) || maps.statusByPlotId.get(plotId);
    const provenance =
      maps.provenanceById.get(id) || maps.provenanceByPlotId.get(plotId);

    const plotKind = mapPlotKind(plot.plotType);
    const faction = mapFaction(plot.faction);
    const finalStatus = mapStatus(
      status?.manualStatusOverride || status?.derivedStatus || plot.status
    );

    return {
      id,
      plotId,
      plotKind,
      faction,
      status: finalStatus,
      width: toSafeNumber(plot.width),
      height: toSafeNumber(plot.height),
      owner: plot.owner?.id,
      createdAt: toSafeNumber(plot.createdAt),
      exists: !!plot.exists,
      provenance: buildProvenanceModel(provenance),
      statusInfo: buildStatusInfoModel(status),
    } satisfies Partial<InfinityPlot>;
  });
}

export function hydratePlots(
  basePlots: InfinityPlot[],
  subgraphData: MergeableDashboardData
): HydratedPlot[] {
  if (!subgraphData?.plots?.length) {
    return basePlots.map((plot) => ({
      ...plot,
      tier: plot.tier || getTier(plot.distanceToNexus, plot.plotKind),
      policy: plot.policy || buildPolicy(plot.plotKind, plot.faction),
      syncStatus: "mock",
      layoutSource: "mock",
      layoutState: plot.plotKind === "personal-5x5" ? "synthetic" : plot.layoutState,
      layoutNote:
        plot.plotKind === "personal-5x5"
          ? plot.layoutNote || "Personal plot is still using the synthetic infinity placeholder layout."
          : plot.layoutNote,
      factionSideMismatch: false,
    }));
  }

  const maps = buildMaps(subgraphData);
  const { hydrated: personalHydrated, usedSlotIds } = assignPersonalPlotsByFaction(
    basePlots,
    maps,
    subgraphData
  );

  const remainingPlots = basePlots.filter(
    (plot) => plot.plotKind !== "personal-5x5" || !usedSlotIds.has(plot.id)
  );

  const remainderHydrated = remainingPlots.map((basePlot) =>
    buildHydratedPlot(basePlot, getPlotOverlayByBase(basePlot, maps))
  );

  return [...personalHydrated, ...remainderHydrated].sort((a, b) => {
    if (a.plotKind !== b.plotKind) {
      return a.plotKind.localeCompare(b.plotKind);
    }

    return a.index - b.index;
  });
}
