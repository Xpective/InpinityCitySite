import { useEffect, useState } from "react";
import "./styles/global.css";
import { CONFIG } from "./lib/config";
import { requestGraphQL } from "./lib/graphql";
import { DASHBOARD_QUERY } from "./lib/queries";
import type { DashboardQueryResult } from "./types/city";

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
        const message = err instanceof Error ? err.message : "Unbekannter Fehler";
        setError(message);
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
          <div className="listItem"><strong>Chain ID:</strong> {CONFIG.chainId}</div>
          <div className="listItem"><strong>Subgraph Proxy:</strong> {CONFIG.subgraphUrl || "nicht gesetzt"}</div>
          <div className="listItem"><strong>CityRegistry:</strong> {CONFIG.cityRegistryAddress || "folgt"}</div>
          <div className="listItem"><strong>CityLand:</strong> {CONFIG.cityLandAddress || "folgt"}</div>
          <div className="listItem"><strong>CityConfig:</strong> {CONFIG.cityConfigAddress || "folgt"}</div>
          <div className="listItem"><strong>CityStatus:</strong> {CONFIG.cityStatusAddress || "folgt"}</div>
        </div>
      </section>

      <section className="panel">
        <h2>City Dashboard</h2>

        {loading && <p>Lade Daten…</p>}

        {error && (
          <pre className="errorBox">{error}</pre>
        )}

        {data && (
          <>
            <div className="statsGrid">
              <div className="statCard">
                <div className="statLabel">Indexed Block</div>
                <div className="statValue">{data._meta?.block?.number ?? "-"}</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Weapon Definitions</div>
                <div className="statValue">{data.weaponDefinitions.length}</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Materia Definitions</div>
                <div className="statValue">{data.materiaDefinitions.length}</div>
              </div>
              <div className="statCard">
                <div className="statLabel">Materia Item Definitions</div>
                <div className="statValue">{data.materiaItemDefinitions.length}</div>
              </div>
            </div>

            <div className="cards">
              <section className="panel inset">
                <h3>Weapons</h3>
                <div className="list">
                  {data.weaponDefinitions.map((item) => (
                    <div className="listItem" key={item.id}>
                      <strong>{item.name}</strong><br />
                      ID: {item.weaponDefinitionId} · Category: {item.category} · Rarity: {item.rarityTier}
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel inset">
                <h3>Materia</h3>
                <div className="list">
                  {data.materiaDefinitions.map((item) => (
                    <div className="listItem" key={item.id}>
                      <strong>{item.name}</strong><br />
                      ID: {item.materiaId} · Element: {item.elementLabel} · Category: {item.categoryLabel} · MaxLevel: {item.maxLevel}
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel inset">
                <h3>Enchantment Items</h3>
                <div className="list">
                  {data.enchantmentItemDefinitions.map((item) => (
                    <div className="listItem" key={item.id}>
                      <strong>Item #{item.itemId}</strong><br />
                      EnchantmentDef: {item.enchantmentDefinitionId} · Level: {item.level} · Rarity: {item.rarityTier}
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel inset">
                <h3>Materia Items</h3>
                <div className="list">
                  {data.materiaItemDefinitions.map((item) => (
                    <div className="listItem" key={item.id}>
                      <strong>Item #{item.itemId}</strong><br />
                      MateriaDef: {item.materiaDefinitionId} · Level: {item.level} · Rarity: {item.rarityTier}
                    </div>
                  ))}
                </div>
              </section>
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
          <div className="listItem">1. Plot-Queries exakt aus Introspection ableiten</div>
          <div className="listItem">2. Wallet Connect einbauen</div>
          <div className="listItem">3. Qubiq-Reserve-UI bauen</div>
          <div className="listItem">4. Cloudflare Deploy + Domain Routing</div>
        </div>
      </section>
    </div>
  );
}
