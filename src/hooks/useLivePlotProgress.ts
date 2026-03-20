import { useEffect, useState } from "react";
import {
  getAllPlotQubiqStates,
  getPlotCompletionState,
  getQubiq,
  type PlotCompletionState,
  type PlotQubiqMap,
  type QubiqReadState,
} from "../lib/city-land";

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

export function useLivePlotProgress(
  plotId?: string | null,
  cell?: { x: number; y: number } | null,
  refreshKey?: number
): State {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    completion: null,
    qubiq: null,
    allQubiqs: emptyQubiqMap(),
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const normalizedPlotId = normalizePlotId(plotId);

      if (normalizedPlotId == null) {
        setState({
          loading: false,
          error: null,
          completion: null,
          qubiq: null,
          allQubiqs: emptyQubiqMap(),
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const completionPromise = getPlotCompletionState(normalizedPlotId);
        const allQubiqsPromise = getAllPlotQubiqStates(normalizedPlotId);
        const qubiqPromise =
          cell != null
            ? getQubiq(normalizedPlotId, cell.x, cell.y)
            : Promise.resolve(null);

        const [completion, allQubiqs, qubiq] = await Promise.all([
          completionPromise,
          allQubiqsPromise,
          qubiqPromise,
        ]);

        if (cancelled) return;

        setState({
          loading: false,
          error: null,
          completion,
          qubiq,
          allQubiqs,
        });
      } catch (error) {
        if (cancelled) return;

        setState({
          loading: false,
          error: error instanceof Error ? error.message : "Live plot read failed.",
          completion: null,
          qubiq: null,
          allQubiqs: emptyQubiqMap(),
        });
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [plotId, cell?.x, cell?.y, refreshKey]);

  return state;
}