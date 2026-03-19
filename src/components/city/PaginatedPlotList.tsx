import { useMemo } from "react";
import { usePaginatedList } from "../../hooks/usePaginatedQuery";
import {
  PLOTS_PAGINATED_QUERY,
  PLOT_STATUS_INFOS_PAGINATED_QUERY,
  PLOT_PROVENANCES_PAGINATED_QUERY,
} from "../../lib/queries";
import { hydratePlots } from "../../lib/city-map-merge";
import { generateInfinityPlots } from "../../lib/infinity-layout";
import InfinityMap from "./InfinityMap";
import PaginationControls from "../common/PaginationControls";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import type { InfinityPlot } from "../../types/infinity";
import type {
  DashboardQueryResult,
  Plot,
  PlotProvenance,
  PlotStatusInfo,
} from "../../types/city";

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

interface Props {
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;

  onlyFavorites?: boolean;
  favoriteIds?: string[];
  pageSize?: number;

  searchTerm?: string;
  availabilityFilter?: AvailabilityFilter;
  specialFilter?: SpecialFilter;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
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

export default function PaginatedPlotList({
  selectedPlot,
  onSelectPlot,
  showLabels,
  heatmapMode,
  onlyFavorites = false,
  favoriteIds = [],
  pageSize = 50,
  searchTerm = "",
  availabilityFilter = "all",
  specialFilter = "all",
}: Props) {
  const basePlots = useMemo(() => generateInfinityPlots(), []);

  const plotsQuery = usePaginatedList<Plot>(
    PLOTS_PAGINATED_QUERY as any,
    {},
    { pageSize }
  );

  const statusInfosQuery = usePaginatedList<PlotStatusInfo>(
    PLOT_STATUS_INFOS_PAGINATED_QUERY as any,
    {},
    { pageSize: pageSize * 2 }
  );

  const provenancesQuery = usePaginatedList<PlotProvenance>(
    PLOT_PROVENANCES_PAGINATED_QUERY as any,
    {},
    { pageSize: pageSize * 2 }
  );

  const isLoading =
    plotsQuery.loading || statusInfosQuery.loading || provenancesQuery.loading;

  const hasError = !!(
    plotsQuery.error ||
    statusInfosQuery.error ||
    provenancesQuery.error
  );

  const error =
    plotsQuery.error || statusInfosQuery.error || provenancesQuery.error;

  const hydratedPlots = useMemo(() => {
    const dashboardData: Partial<DashboardQueryResult> = {
      plots: plotsQuery.data,
      plotStatusInfos: statusInfosQuery.data,
      plotProvenances: provenancesQuery.data,
    };

    return hydratePlots(basePlots, dashboardData).map((plot) => ({
      ...plot,
      isFavorite: favoriteIds.includes(plot.id),
    }));
  }, [
    basePlots,
    plotsQuery.data,
    statusInfosQuery.data,
    provenancesQuery.data,
    favoriteIds,
  ]);

  const visiblePlots = useMemo(() => {
    const term = normalize(searchTerm);

    return hydratedPlots.filter((plot) => {
      if (onlyFavorites && !favoriteIds.includes(plot.id)) return false;
      if (!matchesSearch(plot, term)) return false;
      if (!matchesAvailability(plot, availabilityFilter)) return false;
      if (!matchesSpecial(plot, specialFilter, favoriteIds)) return false;
      return true;
    });
  }, [
    hydratedPlots,
    onlyFavorites,
    favoriteIds,
    searchTerm,
    availabilityFilter,
    specialFilter,
  ]);

  const paginationInfo = useMemo(() => {
    const loadedCount = plotsQuery.data.length;
    const currentPage =
      loadedCount > 0 ? Math.max(1, Math.ceil(loadedCount / pageSize)) : 1;
    const loadedRangeStart = loadedCount > 0 ? 1 : 0;
    const loadedRangeEnd = loadedCount;

    return {
      currentPage,
      loadedCount,
      loadedRangeStart,
      loadedRangeEnd,
      filteredCount: visiblePlots.length,
    };
  }, [plotsQuery.data.length, pageSize, visiblePlots.length]);

  const handleRetry = (): void => {
    plotsQuery.reload();
    statusInfosQuery.reload();
    provenancesQuery.reload();
  };

  if (isLoading && visiblePlots.length === 0) {
    return <LoadingSpinner text="Lade Stadtpläne..." />;
  }

  if (hasError && visiblePlots.length === 0) {
    return (
      <ErrorMessage
        error={error}
        onRetry={handleRetry}
        variant="card"
        showDetails={import.meta.env.DEV}
      />
    );
  }

  return (
    <div>
      <div
        style={{
          marginBottom: 12,
          display: "grid",
          gap: 6,
          padding: 12,
          borderRadius: 12,
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <strong>Paginated Plot View</strong>
        <div>
          Loaded plots: {paginationInfo.loadedRangeStart}-{paginationInfo.loadedRangeEnd}
        </div>
        <div>Current loaded page: {paginationInfo.currentPage}</div>
        <div>Visible after filters: {paginationInfo.filteredCount}</div>
      </div>

      <InfinityMap
        plots={visiblePlots}
        selectedPlot={selectedPlot}
        onSelectPlot={onSelectPlot}
        showLabels={showLabels}
        heatmapMode={heatmapMode}
      />

      <PaginationControls
        currentPage={paginationInfo.currentPage}
        hasMore={plotsQuery.hasMore}
        isLoading={plotsQuery.loading}
        onLoadMore={plotsQuery.loadMore}
        onReload={handleRetry}
        itemCount={plotsQuery.data.length}
      />
    </div>
  );
}