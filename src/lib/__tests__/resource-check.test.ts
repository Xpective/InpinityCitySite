import { describe, expect, it } from "vitest";
import {
  evaluateResourceEligibility,
  getRequiredResourcesForContribution,
} from "../resource-check";
import type { CityConfigSnapshot } from "../city-config";
import type { QubiqReadState } from "../city-land";
import type { InfinityPlot } from "../src/types/infinity";

const snapshot: CityConfigSnapshot = {
  resourceTokenAddress: "0x71E76a6065197acdd1a4d6B736712F80D1Fd3D8b",
  qubiqCosts: {
    oilCost: 100n,
    lemonsCost: 50n,
    ironCost: 25n,
  },
  thresholds: {
    dormantDays: 30n,
    decayedDays: 90n,
    layerEligibleDays: 14n,
  },
};

const personalPlot: InfinityPlot = {
  id: "plot-1",
  index: 1,
  x: 0,
  y: 0,
  width: 5,
  height: 5,
  lane: 1,
  side: "left",
  distanceToNexus: 2,
  rarity: "common",
  faction: "inpinity",
  status: "owned",
  label: "Plot 1",
  plotKind: "personal-5x5",
  priceEstimate: 0,
  tier: "outer",
  policy: {
    isPersonal: true,
    isCommunity: false,
    isBorderline: false,
    isNexus: false,
    reservable: true,
    purchasable: true,
    factionLocked: true,
    sharedUse: false,
  },
  plotId: "123",
};

const selectedQubiq: QubiqReadState = {
  plotId: 123n,
  x: 1,
  y: 2,
  oilDeposited: 80n,
  lemonsDeposited: 10n,
  ironDeposited: 25n,
  completed: false,
  usedAether: false,
  lastContributor: null,
  completedAt: null,
  oilRequired: 100n,
  lemonsRequired: 50n,
  ironRequired: 25n,
  oilRemaining: 20n,
  lemonsRemaining: 40n,
  ironRemaining: 0n,
  completionPercent: 20,
  visualState: "in-progress",
};

describe("resource-check", () => {
  it("falls back to the default single-cell costs when no live qubiq is selected", () => {
    expect(getRequiredResourcesForContribution(personalPlot, snapshot)).toEqual({
      oil: 100n,
      lemons: 50n,
      iron: 25n,
    });
  });

  it("uses the live remaining amount for the selected qubiq cell", () => {
    expect(
      getRequiredResourcesForContribution(personalPlot, snapshot, selectedQubiq)
    ).toEqual({
      oil: 20n,
      lemons: 40n,
      iron: 0n,
    });
  });

  it("evaluates balances against the live remaining amount", () => {
    const eligibility = evaluateResourceEligibility(
      personalPlot,
      {
        oil: 20n,
        lemons: 40n,
        iron: 0n,
      },
      snapshot,
      selectedQubiq
    );

    expect(eligibility.ready).toBe(true);
    expect(eligibility.required).toEqual({
      oil: 20n,
      lemons: 40n,
      iron: 0n,
    });
    expect(eligibility.missing).toEqual({
      oil: 0n,
      lemons: 0n,
      iron: 0n,
    });
  });
});
