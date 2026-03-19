import type { InfinityPlot, InfinityRarity, InfinityPlotStatus } from "../types/infinity";
import type {
  CityDashboardQueryResult,
  CityPlayer,
  CityPlot,
  PlotProvenance,
  PlotStatusInfo,
} from "../types/city";

function normalize(value: string | null | undefined): string {
  return (value || "").trim().toLowerCase();
}

function parseNum(value: string | null | undefined, fallback = 0): number {
  const n = Number(value ?? fallback);
  return Number.isFinite(n) ? n : fallback;
}

function mapRarityFromPlot(plot: InfinityPlot): InfinityRarity {
  return plot.rarity;
}

function mapStatus(raw: string | null | undefined, fallback: InfinityPlotStatus): InfinityPlotStatus {
  const value = normalize(raw);

  if (value === "owned" || value === "active" || value === "occupied") return "owned";
  if (value === "reserved" || value === "pending") return "reserved";
  if (value === "free" || value === "available") return "free";
  if (value === "locked") return "locked";

  return fallback;
}

function findPlayerByOwner(players: CityPlayer[], owner: string | null | undefined): CityPlayer | null {
  const key = normalize(owner);
  if (!key) return null;
  return players.find((p) => normalize(p.id) === key) || null;
}

function buildStatusMap(items: PlotStatusInfo[]): Map<string, PlotStatusInfo> {
  const map = new Map<string, PlotStatusInfo>();
  for (const item of items) {
    map.set(String(item.id), item);
  }
  return map;
}

function buildProvenanceMap(items: PlotProvenance[]): Map<string, PlotProvenance> {
  const map = new Map<string, PlotProvenance>();
  for (const item of items) {
    map.set(String(item.plotId), item);
  }
  return map;
}

function daysAgoFromTimestamp(value: string | null | undefined): number | undefined {
  const ts = Number(value);
  if (!Number.isFinite(ts) || ts <= 0) return undefined;

  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, now - ts);
  return Math.floor(diff / 86400);
}

function getPersonalPlots(plots: InfinityPlot[]): InfinityPlot[] {
  return plots.filter((plot) => plot.plotKind === "personal-5x5");
}

export function mergeCityDataIntoPlots(
  mockPlots: InfinityPlot[],
  data: CityDashboardQueryResult
): InfinityPlot[] {
  const personalPlots = getPersonalPlots(mockPlots);
  const statusMap = buildStatusMap(data.plotStatusInfos || []);
  const provenanceMap = buildProvenanceMap(data.plotProvenances || []);
  const realPlots = [...(data.plots || [])].sort((a, b) => parseNum(a.plotId) - parseNum(b.plotId));

  const mappedPersonal = new Map<string, InfinityPlot>();
  const usedMockIds = new Set<string>();

  for (let i = 0; i < realPlots.length && i < personalPlots.length; i += 1) {
    const realPlot: CityPlot = realPlots[i];
    const baseMock = personalPlots[i];
    const statusInfo = statusMap.get(String(realPlot.plotId));
    const provenance = provenanceMap.get(String(realPlot.plotId));
    const owner = realPlot.owner?.id || provenance?.currentOwner || null;
    const player = findPlayerByOwner(data.players || [], owner);

    const merged: InfinityPlot = {
      ...baseMock,
      id: `real-plot-${realPlot.plotId}`,
      index: parseNum(realPlot.plotId, baseMock.index),
      label: `Q${realPlot.plotId}`,
      status: mapStatus(
        statusInfo?.currentStatus || realPlot.status,
        owner ? "owned" : baseMock.status
      ),
      ownerLabel: owner || undefined,
      lastTransferDaysAgo: daysAgoFromTimestamp(provenance?.lastTransferAt),
      rarity: mapRarityFromPlot(baseMock),
      isFavorite: baseMock.isFavorite,
      priceEstimate: baseMock.priceEstimate,
      faction:
        normalize(realPlot.faction) === "inpinity"
          ? "inpinity"
          : normalize(realPlot.faction) === "inphinity"
          ? "inphinity"
          : baseMock.faction,
      plotKind: "personal-5x5",
    };

    if (player?.faction) {
      const f = normalize(player.faction);
      if (f === "inpinity" || f === "inphinity") {
        merged.faction = f;
      }
    }

    mappedPersonal.set(baseMock.id, merged);
    usedMockIds.add(baseMock.id);
  }

  return mockPlots.map((plot) => {
    if (mappedPersonal.has(plot.id)) {
      const existing = mappedPersonal.get(plot.id)!;
      return {
        ...existing,
        isFavorite: plot.isFavorite,
      };
    }

    if (plot.plotKind !== "personal-5x5") {
      return plot;
    }

    if (usedMockIds.has(plot.id)) {
      return plot;
    }

    return {
      ...plot,
      status: plot.status,
    };
  });
}

export function buildDashboardCounts(data: CityDashboardQueryResult) {
  return {
    indexerBlock: data._meta?.block?.number || "—",
    players: data.players?.length || 0,
    plots: data.plots?.length || 0,
    weaponDefinitions: data.weaponDefinitions?.length || 0,
    weaponInstances: data.weaponInstances?.length || 0,
    materiaDefinitions: data.materiaDefinitions?.length || 0,
  };
}