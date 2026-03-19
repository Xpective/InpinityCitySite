import { useMemo } from 'react';
import { usePaginatedList } from '../../hooks/usePaginatedQuery';
import { PLOTS_PAGINATED_QUERY, PLOT_STATUS_INFOS_PAGINATED_QUERY, PLOT_PROVENANCES_PAGINATED_QUERY } from '../../lib/queries';
import { mergeMapData } from '../../lib/city-map-merge';
import { generateInfinityPlots } from '../../lib/infinity-layout';
import InfinityMap from './InfinityMap';
import PaginationControls from '../common/PaginationControls';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import type { InfinityPlot } from '../../types/infinity';
import type { Plot, PlotStatusInfo, PlotProvenance } from '../../types/city';

interface Props {
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;
  onlyFavorites?: boolean;
  favoriteIds?: string[];
  pageSize?: number;
}

export default function PaginatedPlotList({
  selectedPlot,
  onSelectPlot,
  showLabels,
  heatmapMode,
  onlyFavorites = false,
  favoriteIds = [],
  pageSize = 50,
}: Props) {
  const basePlots = useMemo(() => generateInfinityPlots(), []);

  const plotsQuery = usePaginatedList<Plot>(PLOTS_PAGINATED_QUERY as any, {}, { pageSize });
  const statusInfosQuery = usePaginatedList<PlotStatusInfo>(PLOT_STATUS_INFOS_PAGINATED_QUERY as any, {}, { pageSize: pageSize * 2 });
  const provenancesQuery = usePaginatedList<PlotProvenance>(PLOT_PROVENANCES_PAGINATED_QUERY as any, {}, { pageSize: pageSize * 2 });

  const isLoading = plotsQuery.loading || statusInfosQuery.loading || provenancesQuery.loading;
  const hasError = !!(plotsQuery.error || statusInfosQuery.error || provenancesQuery.error);
  const error = plotsQuery.error || statusInfosQuery.error || provenancesQuery.error;

  const mergedPlots = useMemo(() => {
    if (!plotsQuery.data.length) return [];

    const dashboardData = {
      plots: plotsQuery.data,
      plotStatusInfos: statusInfosQuery.data,
      plotProvenances: provenancesQuery.data,
      _meta: { block: { number: 0 } },
      weaponDefinitions: [],
      weaponInstances: [],
      materiaDefinitions: [],
      players: [],
    };

    const merged = mergeMapData(dashboardData as any);
    const mergedMap = new Map(merged.map(p => [p.id, p]));

    return basePlots
      .map((plot) => {
        const mergedData = mergedMap.get(plot.id);
        if (mergedData) {
          return {
            ...plot,
            ...mergedData,
            isFavorite: favoriteIds.includes(plot.id),
          };
        }
        return {
          ...plot,
          isFavorite: favoriteIds.includes(plot.id),
        };
      })
      .filter(plot => !onlyFavorites || favoriteIds.includes(plot.id));
  }, [basePlots, plotsQuery.data, statusInfosQuery.data, provenancesQuery.data, favoriteIds, onlyFavorites]);

  const handleRetry = () => {
    plotsQuery.reload();
    statusInfosQuery.reload();
    provenancesQuery.reload();
  };

  if (isLoading && mergedPlots.length === 0) {
    return <LoadingSpinner text="Lade Stadtpläne..." />;
  }

  if (hasError && mergedPlots.length === 0) {
    return <ErrorMessage error={error} onRetry={handleRetry} variant="card" showDetails={import.meta.env.DEV} />;
  }

  return (
    <div>
      <InfinityMap
        plots={mergedPlots}
        selectedPlot={selectedPlot}
        onSelectPlot={onSelectPlot}
        showLabels={showLabels}
        heatmapMode={heatmapMode}
      />
      <PaginationControls
        currentPage={0}
        hasMore={plotsQuery.hasMore}
        isLoading={plotsQuery.loading}
        onLoadMore={plotsQuery.loadMore}
        onReload={plotsQuery.reload}
        itemCount={plotsQuery.data.length}
      />
    </div>
  );
}