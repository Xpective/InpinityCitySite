import type { InfinityPlot } from "../../types/infinity";

type Props = {
  plots: InfinityPlot[];
};

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

export default function CityStats({ plots }: Props) {
  const personal = plots.filter((p) => p.policy.isPersonal).length;
  const community = plots.filter((p) => p.policy.isCommunity).length;
  const borderline = plots.filter((p) => p.policy.isBorderline).length;
  const nexus = plots.filter((p) => p.policy.isNexus).length;

  const free = plots.filter((p) => p.status === "free").length;
  const owned = plots.filter((p) => p.status === "owned").length;
  const reserved = plots.filter((p) => p.status === "reserved").length;
  const locked = plots.filter((p) => p.status === "locked").length;

  const sharedUse = plots.filter((p) => p.policy.sharedUse).length;
  const factionLocked = plots.filter((p) => p.policy.factionLocked).length;

  const legacyCore = plots.filter((p) => p.provenance?.isHistoricCore).length;
  const layerEligible = plots.filter((p) => p.statusInfo?.layerEligible).length;
  const canLayerUpgrade = plots.filter((p) => p.statusInfo?.canLayerUpgrade).length;

  const warning = plots.filter((p) => p.statusInfo?.inactivityLevel === "warning").length;
  const critical = plots.filter((p) => p.statusInfo?.inactivityLevel === "critical").length;
  const overdue = plots.filter((p) => p.statusInfo?.maintenanceLevel === "overdue").length;
  const correctedPlacement = plots.filter((p) => p.layoutState === "corrected" || p.factionSideMismatch).length;

  const tierCounts = countBy(plots.map((p) => p.tier));
  const rarityCounts = countBy(plots.map((p) => p.rarity));

  const maxTier = Math.max(...Object.values(tierCounts), 1);
  const maxRarity = Math.max(...Object.values(rarityCounts), 1);

  return (
    <section className="panel">
      <h2>City Stats</h2>

      <div className="statsGrid">
        <div className="statCard">
          <div className="statLabel">Personal 5x5</div>
          <div className="statValue">{personal}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Community 25x25</div>
          <div className="statValue">{community}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Borderline 25x25</div>
          <div className="statValue">{borderline}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Nexus</div>
          <div className="statValue">{nexus}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Free / Reserved / Owned</div>
          <div className="statValue">
            {free} / {reserved} / {owned}
          </div>
        </div>

        <div className="statCard">
          <div className="statLabel">Locked</div>
          <div className="statValue">{locked}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Shared Use</div>
          <div className="statValue">{sharedUse}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Faction Locked</div>
          <div className="statValue">{factionLocked}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Legacy Core</div>
          <div className="statValue">{legacyCore}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Layer Eligible</div>
          <div className="statValue">{layerEligible}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Can Layer Upgrade</div>
          <div className="statValue">{canLayerUpgrade}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Critical / Overdue</div>
          <div className="statValue">
            {critical} / {overdue}
          </div>
        </div>

        <div className="statCard">
          <div className="statLabel">Activity Warning</div>
          <div className="statValue">{warning}</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Faction Side Fixes</div>
          <div className="statValue">{correctedPlacement}</div>
        </div>
      </div>

      <div className="miniChart" style={{ marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>Rarity Distribution</h3>
        {Object.entries(rarityCounts).map(([label, value]) => (
          <div className="miniBarRow" key={label}>
            <div className="miniBarLabel">{label}</div>
            <div className="miniBarTrack">
              <div className="miniBarFill" style={{ width: `${(value / maxRarity) * 100}%` }} />
            </div>
            <div className="miniBarValue">{value}</div>
          </div>
        ))}
      </div>

      <div className="miniChart" style={{ marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>Tier Distribution</h3>
        {Object.entries(tierCounts).map(([label, value]) => (
          <div className="miniBarRow" key={label}>
            <div className="miniBarLabel">{label}</div>
            <div className="miniBarTrack">
              <div className="miniBarFill" style={{ width: `${(value / maxTier) * 100}%` }} />
            </div>
            <div className="miniBarValue">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}