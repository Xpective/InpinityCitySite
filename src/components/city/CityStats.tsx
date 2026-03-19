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
  const personal = plots.filter((p) => p.plotKind === "personal-5x5").length;
  const community = plots.filter((p) => p.plotKind === "community-25x25").length;
  const borderline = plots.filter((p) => p.plotKind === "borderline-25x25").length;
  const free = plots.filter((p) => p.status === "free").length;
  const owned = plots.filter((p) => p.status === "owned").length;
  const reserved = plots.filter((p) => p.status === "reserved").length;

  const rarityCounts = countBy(plots.map((p) => p.rarity));
  const max = Math.max(...Object.values(rarityCounts), 1);

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
          <div className="statLabel">Free / Reserved / Owned</div>
          <div className="statValue">
            {free} / {reserved} / {owned}
          </div>
        </div>
      </div>

      <div className="miniChart">
        {Object.entries(rarityCounts).map(([label, value]) => (
          <div className="miniBarRow" key={label}>
            <div className="miniBarLabel">{label}</div>
            <div className="miniBarTrack">
              <div className="miniBarFill" style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <div className="miniBarValue">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}