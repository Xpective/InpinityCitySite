import { useEffect, useState } from "react";
import {
  getPlotCompletionState,
  getQubiq,
  type PlotCompletionState,
  type QubiqReadState,
} from "../lib/city-land";

type State = {
  loading: boolean;
  error: string | null;
  completion: PlotCompletionState | null;
  qubiq: QubiqReadState | null;
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
        const qubiqPromise =
          cell != null
            ? getQubiq(normalizedPlotId, cell.x, cell.y)
            : Promise.resolve(null);

        const [completion, qubiq] = await Promise.all([
          completionPromise,
          qubiqPromise,
        ]);

        if (cancelled) return;

        setState({
          loading: false,
          error: null,
          completion,
          qubiq,
        });
      } catch (error) {
        if (cancelled) return;

        setState({
          loading: false,
          error: error instanceof Error ? error.message : "Live plot read failed.",
          completion: null,
          qubiq: null,
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