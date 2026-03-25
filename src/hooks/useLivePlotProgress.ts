import { useEffect, useMemo, useState } from "react";

import {
  getAllPlotQubiqStates,
  getPlotCompletionState,
  getQubiq,
  type PlotCompletionState,
  type PlotQubiqMap,
  type QubiqReadState,
} from "../lib/city-land";

type InternalState = {
  plotLoading: boolean;
  cellLoading: boolean;
  plotError: string | null;
  cellError: string | null;
  completion: PlotCompletionState | null;
  qubiq: QubiqReadState | null;
  allQubiqs: PlotQubiqMap;
};

type State = {
  loading: boolean;
  error: string | null;
  completion: PlotCompletionState | null;
  qubiq: QubiqReadState | null;
  allQubiqs: PlotQubiqMap;
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

const INITIAL_STATE: InternalState = {
  plotLoading: false,
  cellLoading: false,
  plotError: null,
  cellError: null,
  completion: null,
  qubiq: null,
  allQubiqs: emptyQubiqMap(),
};

export function useLivePlotProgress(
  plotId?: string | null,
  cell?: { x: number; y: number } | null,
  refreshKey?: number
): State {
  const [state, setState] = useState<InternalState>(INITIAL_STATE);

  useEffect(() => {
    let cancelled = false;

    async function loadPlot() {
      const normalizedPlotId = normalizePlotId(plotId);

      if (normalizedPlotId == null) {
        setState(INITIAL_STATE);
        return;
      }

      setState((prev) => ({
        ...prev,
        plotLoading: true,
        plotError: null,
      }));

      try {
        const [completion, allQubiqs] = await Promise.all([
          getPlotCompletionState(normalizedPlotId),
          getAllPlotQubiqStates(normalizedPlotId),
        ]);

        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          plotLoading: false,
          plotError: null,
          completion,
          allQubiqs,
        }));
      } catch (error) {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          plotLoading: false,
          plotError:
            error instanceof Error ? error.message : "Live plot read failed.",
          completion: null,
          allQubiqs: emptyQubiqMap(),
        }));
      }
    }

    void loadPlot();

    return () => {
      cancelled = true;
    };
  }, [plotId, refreshKey]);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedQubiq() {
      const normalizedPlotId = normalizePlotId(plotId);

      if (normalizedPlotId == null || cell == null) {
        setState((prev) => ({
          ...prev,
          cellLoading: false,
          cellError: null,
          qubiq: null,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        cellLoading: true,
        cellError: null,
      }));

      try {
        const qubiq = await getQubiq(normalizedPlotId, cell.x, cell.y);

        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          cellLoading: false,
          cellError: null,
          qubiq,
        }));
      } catch (error) {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          cellLoading: false,
          cellError:
            error instanceof Error ? error.message : "Live Qubiq read failed.",
          qubiq: null,
        }));
      }
    }

    void loadSelectedQubiq();

    return () => {
      cancelled = true;
    };
  }, [plotId, cell?.x, cell?.y, refreshKey]);

  return useMemo(
    () => ({
      loading: state.plotLoading || state.cellLoading,
      error: state.plotError || state.cellError,
      completion: state.completion,
      qubiq: state.qubiq,
      allQubiqs: state.allQubiqs,
    }),
    [state]
  );
}
