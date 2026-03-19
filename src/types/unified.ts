// src/types/unified.ts
import { InfinityPlot } from './infinity';
import { Plot, PlotStatusInfo, PlotProvenance } from './city';

export interface HydratedPlot extends InfinityPlot {
  // Alle Felder aus beiden Welten, optional gemacht
  subgraphData?: {
    plot: Plot;
    statusInfo?: PlotStatusInfo;
    provenance?: PlotProvenance;
  };
  syncStatus: 'mock' | 'partial' | 'complete';
}

// Nutze diesen Typ in der ganzen App