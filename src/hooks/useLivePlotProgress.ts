import { useEffect, useMemo, useState } from "react";
import {
  getAllPlotQubiqStates,
  getPlotCompletionState,
  getQubiq,
  type PlotCompletionState,
  type PlotQubiqMap,
  type QubiqReadState,
} from "../src/lib/city-land";

type State = {
  loading: boolean;
  error: string | null;
  completion: PlotCompletionState | null;
  qubiq: QubiqReadState | null;
  allQubiqs: PlotQubiqMap;
};

type InternalState = State & {
  loadingPlot: boolean;
  loadingCell: boolean;
};

function normalizePlotId(plotId: string | null | undefined): bigint | null {
  if (!plotId) return null;

  const trimmed = plotId.trim();
  if (!trimmed) return null;

  try {
    return BigInt(trimmed);
  } catch {
    return null;
  }
}

function emptyQubiqMap(): PlotQubiqMap {
  const map: PlotQubiqMap = {};

  for (let index = 0; index < 25; index += 1) {
    const x = index % 5;
    const y = Math.floor(index / 5);
    map[`${x},${y}`] = null;
  }

  return map;
}

function createEmptyState(): InternalState {
  return {
    loading: false,
    loadingPlot: false,
    loadingCell: false,
    error: null,
    completion: null,
    qubiq: null,
    allQubiqs: emptyQubiqMap(),
  };
}

export function useLivePlotProgress(
  plotId?: string | null,
  cell?: { x: number; y: number } | null,
  refreshKey?: number
): State {
  const [state, setState] = useState<InternalState>(createEmptyState);
  const normalizedPlotId = useMemo(() => normalizePlotId(plotId), [plotId]);

  useEffect(() => {
    let cancelled = false;

    async function loadPlotState() {
      if (normalizedPlotId == null) {
        setState(createEmptyState());
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        loadingPlot: true,
        error: null,
        completion: null,
        allQubiqs: emptyQubiqMap(),
      }));

      try {
        const [completion, allQubiqs] = await Promise.all([
          getPlotCompletionState(normalizedPlotId),
          getAllPlotQubiqStates(normalizedPlotId),
        ]);

        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          loadingPlot: false,
          loading: prev.loadingCell,
          error: null,
          completion,
          allQubiqs,
          qubiq:
            cell != null
              ? allQubiqs[`${cell.x},${cell.y}`] ?? prev.qubiq
              : null,
        }));
      } catch (error) {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          loadingPlot: false,
          loading: prev.loadingCell,
          error: error instanceof Error ? error.message : "Live plot read failed.",
          completion: null,
          allQubiqs: emptyQubiqMap(),
          qubiq: null,
        }));
      }
    }

    loadPlotState();

    return () => {
      cancelled = true;
    };
  }, [normalizedPlotId, refreshKey]);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedCell() {
      if (normalizedPlotId == null || cell == null) {
        setState((prev) => ({
          ...prev,
          qubiq: null,
          loadingCell: false,
          loading: prev.loadingPlot,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        qubiq: prev.allQubiqs[`${cell.x},${cell.y}`] ?? null,
        loadingCell: true,
        loading: true,
        error: null,
      }));

      try {
        const qubiq = await getQubiq(normalizedPlotId, cell.x, cell.y);

        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          loadingCell: false,
          loading: prev.loadingPlot,
          error: null,
          qubiq,
          allQubiqs: {
            ...prev.allQubiqs,
            [`${cell.x},${cell.y}`]: qubiq,
          },
        }));
      } catch (error) {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          loadingCell: false,
          loading: prev.loadingPlot,
          error: error instanceof Error ? error.message : "Live Qubiq read failed.",
          qubiq: null,
        }));
      }
    }

    loadSelectedCell();

    return () => {
      cancelled = true;
    };
  }, [normalizedPlotId, cell?.x, cell?.y, refreshKey]);

  return {
    loading: state.loading,
    error: state.error,
    completion: state.completion,
    qubiq: state.qubiq,
    allQubiqs: state.allQubiqs,
  };
}
