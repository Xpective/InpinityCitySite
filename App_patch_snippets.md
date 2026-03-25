# App.tsx patch snippets

Diese Bundle-Datei ersetzt **nicht** blind die komplette `App.tsx`, weil dein lokaler Stand bereits von mehreren vorherigen Fixes abweicht. Für `App.tsx` ist deshalb die sichere Variante: **die folgenden Snippets in deinen aktuellen Stand übernehmen**.

## 1) Zusätzlichen CSS-Import ergänzen

Direkt unter dem bestehenden Import

```ts
import "./styles/global.css";
```

zusätzlich:

```ts
import "./styles/city-ui-upgrade.css";
```

## 2) UI-Zustand für reduzierte Diagnose ergänzen

Neben den anderen `useState`-Hooks ergänzen:

```ts
const [showDiagnostics, setShowDiagnostics] = useState(false);
```

Und zwei kleine `useEffect`s ergänzen:

```ts
useEffect(() => {
  try {
    setShowDiagnostics(localStorage.getItem("inpinity-city-show-diagnostics") === "1");
  } catch {
    // ignore storage errors
  }
}, []);

useEffect(() => {
  try {
    localStorage.setItem("inpinity-city-show-diagnostics", showDiagnostics ? "1" : "0");
  } catch {
    // ignore storage errors
  }
}, [showDiagnostics]);
```

## 3) Mismatch-Zähler ergänzen

Unter deinen bestehenden `useMemo`s ergänzen:

```ts
const layoutMismatchCount = useMemo(() => {
  return hydratedPlots.filter((plot) => plot.layoutMismatch).length;
}, [hydratedPlots]);

const effectiveMapSelectedPlot = activeBuildPlot || selectedPlot;
```

## 4) Hero-Bereich entschlacken

Im Hero-Bereich die vielen Diagnose-Karten standardmäßig ausblenden.

Unterhalb des Einleitungstexts eine Button-Zeile ergänzen:

```tsx
<div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
  <button
    type="button"
    className="toolbarButton"
    onClick={() => setShowDiagnostics((prev) => !prev)}
    aria-pressed={showDiagnostics}
  >
    {showDiagnostics ? "Hide Diagnostics" : "Show Diagnostics"}
  </button>
</div>
```

Die große Card-Sammlung danach in zwei Teile aufteilen:

- **immer sichtbar**: `Chain ID`, `City Key`, `Owned City Keys`, `Wallet Faction`, `Flow Step`
- **nur bei `showDiagnostics`**: `Subgraph Proxy`, `CityRegistry`, `CityLand`, `CityConfig` usw.

Und direkt unter den Karten einen Warnhinweis ergänzen:

```tsx
{layoutMismatchCount > 0 && (
  <div className="cityInlineAlert cityInlineAlert--warn" style={{ marginTop: 14 }}>
    {layoutMismatchCount} plot{layoutMismatchCount === 1 ? "" : "s"} currently show a
    canonical layout mismatch between map slot and live faction payload.
  </div>
)}
```

Den Block mit `Reserved Plot ID / Active Build Plot ID / Selected Qubiq Cell / Latest TX`
bitte ebenfalls nur noch unter `showDiagnostics` rendern:

```tsx
{showDiagnostics && (reservedPlotId || txHash || activeBuildPlotId) && (...)}
```

## 5) Dashboard nur noch optional anzeigen

Den gesamten Abschnitt

```tsx
<section className="panel">
  <h2>City Dashboard</h2>
  ...
</section>
```

mit

```tsx
{showDiagnostics && (
  <section className="panel">
    ...
  </section>
)}
```

wrappen.

## 6) InfinityMap-Layout auf responsive Klassen umstellen

Ersetze in der Map-Sektion den aktuellen Inline-Grid-Container durch:

```tsx
<div className="cityMapLayout">
  <div className="cityMapPrimary">
    <ErrorBoundary
      onError={(caughtError) => console.error("Map ErrorBoundary:", caughtError)}
      resetKeys={[
        filteredPlots.length,
        showLabels,
        heatmapMode,
        availabilityFilter,
        specialFilter,
        favoriteIds.join(","),
      ]}
    >
      <InfinityMap
        plots={filteredPlots}
        selectedPlot={effectiveMapSelectedPlot}
        onSelectPlot={(plot) => {
          setSelectedPlot(plot);

          if (plot.plotId && buildPlotOptions.some((item) => item.plotId === plot.plotId)) {
            setActiveBuildPlotId(plot.plotId);
          }
        }}
        showLabels={showLabels}
        heatmapMode={heatmapMode}
      />
    </ErrorBoundary>

    <CityStats plots={filteredPlots} />
  </div>

  <aside className="cityMapSidebar">
    <PlotDetails
      plot={effectiveSelectedPlot}
      onToggleFavorite={handleToggleFavorite}
    />

    <MintPreparationPanel
      plot={effectiveSelectedPlot}
      wallet={wallet}
      eligibility={eligibility}
      resourceEligibility={resourceEligibility}
      onConnectWallet={handleConnectWallet}
      onPrepareContribution={handlePrepareQubiqContribution}
      flowBusy={flowBusy}
      flowStep={txStep}
      flowResult={flowResult}
      selectedQubiqCell={selectedQubiqCell}
      onSelectQubiqCell={setSelectedQubiqCell}
      reservedPlotId={reservedPlotId}
      txHash={txHash}
      liveCompletion={livePlotProgress.completion}
      liveQubiq={livePlotProgress.qubiq}
      liveAllQubiqs={livePlotProgress.allQubiqs}
      liveLoading={livePlotProgress.loading}
      liveError={livePlotProgress.error}
      ownedCityKeys={ownedCityKeys}
      selectedCityKeyTokenId={selectedCityKeyTokenId}
      onSelectCityKeyTokenId={setSelectedCityKeyTokenId}
      buildPlotOptions={buildPlotOptions}
      activeBuildPlotId={activeBuildPlotId}
      onSelectActiveBuildPlotId={setActiveBuildPlotId}
    />
  </aside>
</div>
```

Das bringt genau dein gewünschtes Verhalten: **Map → Rarity/Stats → Sidepanel** auf Mobile.

## 7) Abschluss-Sektion ausblenden

Die Sektion

```tsx
<section className="panel">
  <h2>Marriage phase: mock layout + live subgraph</h2>
  ...
</section>
```

bitte entweder komplett entfernen oder ebenfalls nur unter `showDiagnostics` anzeigen.
