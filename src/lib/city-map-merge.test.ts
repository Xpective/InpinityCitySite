import { describe, it, expect, beforeEach } from 'vitest';
import { mergeMapData, hydratePlots, type HydratedPlot } from './city-map-merge';
import { generateInfinityPlots } from './infinity-layout';
import type { DashboardQueryResult, Plot, PlotStatusInfo, PlotProvenance } from '../types/city';
import type { InfinityPlot } from '../types/infinity';

describe('city-map-merge', () => {
  // Mock-Daten für Tests
  const mockPlot: Plot = {
    id: 'plot-1',
    plotId: '1',
    plotType: 'personal',
    faction: 'pi',
    status: 'active',
    width: '16',
    height: '16',
    exists: true,
    createdAt: '1000000',
    owner: { id: '0x123' },
  };

  const mockStatusInfo: PlotStatusInfo = {
    id: 'status-1',
    plot: { id: 'plot-1', plotId: '1' },
    lastActivityAt: '2000000',
    lastMaintenanceAt: '1500000',
    manualStatusOverride: null,
    derivedStatus: 'active',
    layerEligible: true,
    updatedAtBlock: '1000',
    updatedAtTimestamp: '3000000',
  };

  const mockProvenance: PlotProvenance = {
    id: 'prov-1',
    plot: { id: 'plot-1', plotId: '1' },
    firstBuilder: '0x123',
    createdAt: '1000000',
    layerCount: '5',
    ownershipTransfers: '2',
    aetherUses: '3',
    historicScore: '1000',
    originFaction: 'pi',
    genesisEra: 'true',
    updatedAtBlock: '1000',
    updatedAtTimestamp: '3000000',
  };

  const mockDashboardData: DashboardQueryResult = {
    _meta: { block: { number: 1000 } },
    weaponDefinitions: [],
    weaponInstances: [],
    materiaDefinitions: [],
    plots: [mockPlot],
    players: [],
    plotStatusInfos: [mockStatusInfo],
    plotProvenances: [mockProvenance],
  };

  describe('mergeMapData', () => {
    it('should return empty array for empty data', () => {
      const result = mergeMapData({} as DashboardQueryResult);
      expect(result).toEqual([]);
    });

    it('should merge plot data correctly', () => {
      const result = mergeMapData(mockDashboardData);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'plot-1',
        plotId: '1',
        plotKind: 'personal-5x5',
        faction: 'inpinity',
        status: 'owned',
        width: 16,
        height: 16,
        owner: '0x123',
        createdAt: 1000000,
        exists: true,
        provenance: {
          firstBuilder: '0x123',
          createdAt: 1000000,
          layerCount: 5,
          ownershipTransfers: 2,
          aetherUses: 3,
          historicScore: 1000,
          originFaction: 'pi',
          genesisEra: true,
          lastUpdated: 3000000,
        },
        statusInfo: {
          lastActivityAt: 2000000,
          lastMaintenanceAt: 1500000,
          manualStatusOverride: undefined,
          derivedStatus: 'owned',
          layerEligible: true,
          updatedAt: 3000000,
        },
      });
    });

    it('should handle missing status info', () => {
      const dataWithoutStatus = {
        ...mockDashboardData,
        plotStatusInfos: [],
      };
      
      const result = mergeMapData(dataWithoutStatus);
      
      expect(result[0]).not.toHaveProperty('statusInfo');
    });

    it('should handle missing provenance', () => {
      const dataWithoutProvenance = {
        ...mockDashboardData,
        plotProvenances: [],
      };
      
      const result = mergeMapData(dataWithoutProvenance);
      
      expect(result[0]).not.toHaveProperty('provenance');
    });

    it('should map different plot types correctly', () => {
      const testCases = [
        { type: 'personal', expected: 'personal-5x5' },
        { type: 'community', expected: 'community-25x25' },
        { type: 'border', expected: 'borderline-25x25' },
        { type: 'nexus', expected: 'nexus' },
        { type: 'unknown', expected: 'personal-5x5' },
      ];

      testCases.forEach(({ type, expected }) => {
        const plot = { ...mockPlot, plotType: type };
        const data = { ...mockDashboardData, plots: [plot] };
        
        const result = mergeMapData(data);
        expect(result[0].plotKind).toBe(expected);
      });
    });

    it('should map factions correctly', () => {
      const testCases = [
        { faction: 'pi', expected: 'inpinity' },
        { faction: 'phi', expected: 'inphinity' },
        { faction: 'community', expected: 'community' },
        { faction: 'unknown', expected: 'neutral' },
      ];

      testCases.forEach(({ faction, expected }) => {
        const plot = { ...mockPlot, faction };
        const data = { ...mockDashboardData, plots: [plot] };
        
        const result = mergeMapData(data);
        expect(result[0].faction).toBe(expected);
      });
    });

    it('should map status correctly', () => {
      const testCases = [
        { status: 'reserved', expected: 'reserved' },
        { status: 'active', expected: 'owned' },
        { status: 'inactive', expected: 'locked' },
        { status: 'overbuilt', expected: 'locked' },
        { status: 'unknown', expected: 'free' },
      ];

      testCases.forEach(({ status, expected }) => {
        const plot = { ...mockPlot, status };
        const data = { ...mockDashboardData, plots: [plot] };
        
        const result = mergeMapData(data);
        expect(result[0].status).toBe(expected);
      });
    });
  });

  describe('hydratePlots', () => {
    let basePlots: InfinityPlot[];

    beforeEach(() => {
      basePlots = generateInfinityPlots();
    });

    it('should return base plots with mock status when no data', () => {
      const result = hydratePlots(basePlots, {});
      
      expect(result).toHaveLength(basePlots.length);
      result.forEach(plot => {
        expect(plot.syncStatus).toBe('mock');
        expect(plot.subgraphData).toBeUndefined();
      });
    });

    it('should hydrate plots with subgraph data', () => {
      const result = hydratePlots(basePlots, mockDashboardData);
      
      const hydratedPlot = result.find(p => p.id === 'plot-1');
      expect(hydratedPlot).toBeDefined();
      expect(hydratedPlot?.syncStatus).toBe('complete');
      expect(hydratedPlot?.subgraphData).toBeDefined();
      expect(hydratedPlot?.subgraphData?.plot).toEqual(mockPlot);
      expect(hydratedPlot?.subgraphData?.statusInfo).toEqual(mockStatusInfo);
      expect(hydratedPlot?.subgraphData?.provenance).toEqual(mockProvenance);
    });

    it('should set partial status when only plot exists', () => {
      const data = {
        ...mockDashboardData,
        plotStatusInfos: [],
        plotProvenances: [],
      };
      
      const result = hydratePlots(basePlots, data);
      
      const hydratedPlot = result.find(p => p.id === 'plot-1');
      expect(hydratedPlot?.syncStatus).toBe('partial');
    });

    it('should preserve favorite status', () => {
      const plotsWithFavs = basePlots.map(p => ({
        ...p,
        isFavorite: p.id === 'plot-1',
      }));
      
      const result = hydratePlots(plotsWithFavs, mockDashboardData);
      
      const hydratedPlot = result.find(p => p.id === 'plot-1');
      expect(hydratedPlot?.isFavorite).toBe(true);
    });

    it('should handle partial data correctly', () => {
      const dataWithoutProvenance = {
        ...mockDashboardData,
        plotProvenances: [],
      };
      
      const result = hydratePlots(basePlots, dataWithoutProvenance);
      
      const hydratedPlot = result.find(p => p.id === 'plot-1');
      expect(hydratedPlot?.syncStatus).toBe('partial');
      expect(hydratedPlot?.provenance).toBeUndefined();
      expect(hydratedPlot?.statusInfo).toBeDefined();
    });
  });
});