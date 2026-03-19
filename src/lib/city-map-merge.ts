import { DashboardQueryResult, Plot, PlotStatusInfo, PlotProvenance } from '../types/city';
import type { InfinityPlot, InfinityFaction, InfinityPlotStatus, InfinityPlotKind } from '../types/infinity';

/**
 * Kombiniert Subgraph-Daten (Plots, StatusInfos, Provenances) zu einem einheitlichen
 * InfinityPlot-Array für die Kartenanzeige.
 */
export function mergeMapData(data: DashboardQueryResult): Partial<InfinityPlot>[] {
  if (!data) return [];

  const plots = data.plots || [];
  const statusInfos = data.plotStatusInfos || [];
  const provenances = data.plotProvenances || [];

  // Lookup-Maps
  const statusMap = new Map<string, PlotStatusInfo>();
  for (const info of statusInfos) {
    const plotId = info.plot?.id;
    if (plotId) statusMap.set(plotId, info);
  }

  const provenanceMap = new Map<string, PlotProvenance>();
  for (const prov of provenances) {
    const plotId = prov.plot?.id;
    if (plotId) provenanceMap.set(plotId, prov);
  }

  return plots.map((plot: Plot): Partial<InfinityPlot> => {
    const plotId = plot.id;
    const status = statusMap.get(plotId);
    const provenance = provenanceMap.get(plotId);

    const base: Partial<InfinityPlot> = {
      id: plotId,
      plotId: plot.plotId.toString(),
      plotKind: mapPlotKind(plot.plotType),
      faction: mapFaction(plot.faction),
      status: mapStatus(plot.status),
      width: Number(plot.width),
      height: Number(plot.height),
      owner: plot.owner?.id,
      createdAt: plot.createdAt ? Number(plot.createdAt) : undefined,
      exists: plot.exists,
    };

    if (provenance) {
      base.provenance = {
        firstBuilder: provenance.firstBuilder ?? undefined,
        createdAt: provenance.createdAt ? Number(provenance.createdAt) : undefined,
        layerCount: Number(provenance.layerCount ?? 0),
        ownershipTransfers: Number(provenance.ownershipTransfers ?? 0),
        aetherUses: Number(provenance.aetherUses ?? 0),
        historicScore: Number(provenance.historicScore ?? 0),
        originFaction: provenance.originFaction || 'unknown',
        genesisEra: !!provenance.genesisEra,
        lastUpdated: provenance.updatedAtTimestamp ? Number(provenance.updatedAtTimestamp) : undefined,
      };
    }

    if (status) {
      base.statusInfo = {
        lastActivityAt: status.lastActivityAt ? Number(status.lastActivityAt) : undefined,
        lastMaintenanceAt: status.lastMaintenanceAt ? Number(status.lastMaintenanceAt) : undefined,
        manualStatusOverride: status.manualStatusOverride ?? undefined,
        derivedStatus: status.derivedStatus || base.status || 'unknown',
        layerEligible: !!status.layerEligible,
        updatedAt: status.updatedAtTimestamp ? Number(status.updatedAtTimestamp) : undefined,
      };
    }

    return base;
  });
}

function mapPlotKind(type: string): InfinityPlotKind {
  switch (type) {
    case 'personal': return 'personal-5x5';
    case 'community': return 'community-25x25';
    case 'border': return 'borderline-25x25';
    case 'nexus': return 'nexus';
    default: return 'personal-5x5';
  }
}

function mapFaction(faction: string): InfinityFaction {
  switch (faction) {
    case 'pi': return 'inpinity';
    case 'phi': return 'inphinity';
    case 'community': return 'community';
    default: return 'neutral';
  }
}

function mapStatus(status: string): InfinityPlotStatus {
  switch (status) {
    case 'reserved': return 'reserved';
    case 'active': return 'owned';
    case 'inactive': return 'locked';
    case 'overbuilt': return 'locked';
    default: return 'free';
  }
}