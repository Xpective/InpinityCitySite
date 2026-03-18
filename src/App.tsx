import { useEffect, useState } from "react";
import "./styles/global.css";
import { CONFIG } from "./lib/config";
import { requestGraphQL } from "./lib/graphql";
import { DASHBOARD_QUERY } from "./lib/queries";
import type { DashboardQueryResult } from "./types/city";

function shortAddress(value: string | null | undefined): string {
  if (!value) return "—";
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export default function App() {
  const [data, setData] = useState<DashboardQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const result = await requestGraphQL<DashboardQueryResult>(DASHBOARD_QUERY);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">INPINITY CITY</p>
        <h1>Reserve your Qubiq</h1>
        <p className="heroText">
          Explore city data, inspect crafting assets, and prepare the purchase flow
          for Qubiqs on Inpinity City.
        </p>
      </section>

      <section className="panel">
        <h2>Projekt-Konfiguration</h2>
        <div className="list">
          <div className="listItem">Chain ID: {CONFIG.chainId}</div>
          <div className="listItem">Subgraph Proxy: {CONFIG.subgraphUrl || "nicht gesetzt"}</div>
          <div className="listItem">CityRegistry: {CONFIG.cityRegistryAddress || "folgt"}</div>
          <div className="listItem">CityLand: {CONFIG.cityLandAddress || "folgt"}</div>
          <div className="listItem">CityConfig: {CONFIG.cityConfigAddress || "folgt"}</div>
          <div className="listItem">CityStatus: {CONFIG.cityStatusAddress || "folgt"}</div>
        </div>
      </section>

      <section className="panel">
        <h2>City Dashboard</h2>

        {loading && <p>Lade Daten...</p>}

        {error && (
          <pre className="errorBox">{error}</pre>
        )}

        {!loading && !error && data && (
          <>
            <div className="cards">
              <div className="card">
                <div className="cardLabel">Indexer Block</div>
                <div className="cardValue">{data._meta?.block?.number || "—"}</div>
              </div>
              <div className="card">
                <div className="cardLabel">Weapon Definitions</div>
                <div className="cardValue">{data.weaponDefinitions.length}</div>
              </div>
              <div className="card">
                <div className="cardLabel">Weapon Instances</div>
                <div className="cardValue">{data.weaponInstances.length}</div>
              </div>
              <div className="card">
                <div className="cardLabel">Materia Definitions</div>
                <div className="cardValue">{data.materiaDefinitions.length}</div>
              </div>
              <div className="card">
                <div className="cardLabel">Plots</div>
                <div className="cardValue">{data.plots.length}</div>
              </div>
              <div className="card">
                <div className="cardLabel">Players</div>
                <div className="cardValue">{data.players.length}</div>
              </div>
            </div>

            <div className="gridSection">
              <h3>Weapon Definitions</h3>
              <div className="list">
                {data.weaponDefinitions.map((weapon) => (
                  <div className="listItem" key={weapon.id}>
                    <strong>{weapon.name}</strong> · ID {weapon.weaponDefinitionId} · Tech{" "}
                    {weapon.techTier} · Damage {weapon.minDamage}-{weapon.maxDamage} ·
                    Slots E/M {weapon.enchantmentSlots}/{weapon.materiaSlots} ·{" "}
                    {weapon.enabled ? "aktiv" : "inaktiv"}
                  </div>
                ))}
              </div>
            </div>

            <div className="gridSection">
              <h3>Weapon Instances</h3>
              <div className="list">
                {data.weaponInstances.map((item) => (
                  <div className="listItem" key={item.id}>
                    <strong>Token #{item.tokenId}</strong> · {item.weaponDefinition?.name || "—"} ·
                    Rarity {item.rarityTier} · Upgrade {item.upgradeLevel} · Durability{" "}
                    {item.durability} · Plot {item.originPlotId || "—"} · Owner{" "}
                    {shortAddress(item.owner?.id)}
                  </div>
                ))}
              </div>
            </div>

            <div className="gridSection">
              <h3>Materia Definitions</h3>
              <div className="list">
                {data.materiaDefinitions.map((materia) => (
                  <div className="listItem" key={materia.id}>
                    <strong>{materia.name}</strong> · ID {materia.materiaId} · Element{" "}
                    {materia.elementLabel} · Kategorie {materia.categoryLabel} · Max Level{" "}
                    {materia.maxLevel} · {materia.enabled ? "aktiv" : "inaktiv"}
                  </div>
                ))}
              </div>
            </div>

            <div className="gridSection">
              <h3>Plots</h3>
              <div className="list">
                {data.plots.map((plot) => (
                  <div className="listItem" key={plot.id}>
                    <strong>Plot #{plot.plotId}</strong> · Typ {plot.plotType} · Fraktion{" "}
                    {plot.faction} · Status {plot.status} · Größe {plot.width}x{plot.height} ·
                    Owner {shortAddress(plot.owner?.id)}
                  </div>
                ))}
              </div>
            </div>

            <div className="gridSection">
              <h3>Players</h3>
              <div className="list">
                {data.players.map((player) => (
                  <div className="listItem" key={player.id}>
                    <strong>{shortAddress(player.id)}</strong> · Faction {player.faction} ·
                    City Key {player.cityKeyTokenId || "—"} · Personal Plots{" "}
                    {player.personalPlotCount} · Crafted Weapons {player.craftedWeapons}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <section className="panel">
        <h2>Qubiq-Kauf Vorbereitung</h2>
        <p>
          Als Nächstes ergänzen wir Wallet Connect, Plot-Auswahl, Preislogik,
          Reservierung und später den echten Kauf-Flow.
        </p>

        <div className="buttonRow">
          <button disabled>Wallet verbinden</button>
          <button disabled>Qubiq vorbereiten</button>
          <button disabled>Plot prüfen</button>
        </div>
      </section>

      <section className="panel">
        <h2>Nächste Ausbaustufe</h2>
        <div className="list">
          <div className="listItem">1. Plot-Auswahl mit echten freien Plots bauen</div>
          <div className="listItem">2. Wallet Connect einbauen</div>
          <div className="listItem">3. Reserve-/Kauf-Flow an Contracts hängen</div>
          <div className="listItem">4. Material- und Preislogik für Qubiq anzeigen</div>
        </div>
      </section>
    </div>
  );
}