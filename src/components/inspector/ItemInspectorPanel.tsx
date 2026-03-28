import { useMemo, useState } from "react";
import {
  inspectEntity,
  type InspectorKind,
  type InspectorResult,
} from "../../lib/item-inspector";

type Props = {
  walletAddress?: string | null;
  showAdvanced?: boolean;
};

type InspectorTab = {
  key: InspectorKind;
  label: string;
  placeholder: string;
  helper: string;
};

const INSPECTOR_TABS: InspectorTab[] = [
  {
    key: "weapon",
    label: "Weapons",
    placeholder: "Weapon token id",
    helper: "Inspect a crafted weapon by token id.",
  },
  {
    key: "recipe",
    label: "Recipes",
    placeholder: "Recipe id",
    helper: "Inspect recipe output, gating and 10-slot resource costs.",
  },
  {
    key: "blueprint",
    label: "Blueprints",
    placeholder: "Blueprint id",
    helper: "Inspect faction/district locks and wallet balance.",
  },
  {
    key: "component",
    label: "Components",
    placeholder: "Component id",
    helper: "Inspect component metadata and wallet balance.",
  },
  {
    key: "materia",
    label: "Materia",
    placeholder: "Materia id",
    helper: "Inspect materia metadata and whether bonuses exist for level 1.",
  },
  {
    key: "enchantment",
    label: "Enchantments",
    placeholder: "Enchantment id",
    helper: "Inspect enchantment metadata and bonus availability.",
  },
  {
    key: "materia-item",
    label: "Materia Items",
    placeholder: "Materia item id",
    helper: "Inspect a mintable materia item and linked definition.",
  },
  {
    key: "enchantment-item",
    label: "Enchantment Items",
    placeholder: "Enchantment item id",
    helper: "Inspect a mintable enchantment item and linked definition.",
  },
];

export default function ItemInspectorPanel({
  walletAddress,
  showAdvanced = false,
}: Props) {
  const [activeTab, setActiveTab] = useState<InspectorKind>("weapon");
  const [lookupId, setLookupId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InspectorResult | null>(null);

  const activeTabConfig = useMemo(() => {
    return INSPECTOR_TABS.find((tab) => tab.key === activeTab) ?? INSPECTOR_TABS[0];
  }, [activeTab]);

  async function handleInspect(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const next = await inspectEntity({
        kind: activeTab,
        id: lookupId,
        walletAddress,
      });
      setResult(next);
    } catch (inspectError) {
      setResult(null);
      setError(
        inspectError instanceof Error
          ? inspectError.message
          : "Inspector read failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <div className="toolbarHeader">
        <div>
          <h2 style={{ margin: 0 }}>Inspector Mode</h2>
          <div className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
            Read-only lookup for live item and recipe contracts. Keep this hidden until
            you actually need to inspect an id.
          </div>
        </div>

        <div className="toolbarStatusPill">Read only</div>
      </div>

      <details className="detailSection" open={showAdvanced}>
        <summary className="detailSectionSummary">How to use Inspector Mode</summary>
        <div className="infoNote" style={{ marginTop: 12 }}>
          Use this panel for concrete ids only: a weapon token id, a recipe id, or an
          item definition id. It is intentionally separate from the build terminal so
          the city flow stays compact.
        </div>
      </details>

      <div className="inspectorTabs">
        {INSPECTOR_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`toolbarButton ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.key);
              setResult(null);
              setError(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="inspectorControls">
        <div>
          <strong>{activeTabConfig.label}</strong>
          <div className="muted" style={{ marginTop: 6 }}>{activeTabConfig.helper}</div>
        </div>

        <div className="toolbarInlineAction inspectorActionBar">
          <input
            value={lookupId}
            onChange={(event) => setLookupId(event.target.value)}
            placeholder={activeTabConfig.placeholder}
            className="toolbarInput"
            aria-label={`${activeTabConfig.label} id`}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void handleInspect();
              }
            }}
          />
          <button
            type="button"
            className="toolbarButton"
            onClick={() => void handleInspect()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Inspect"}
          </button>
        </div>
      </div>

      {walletAddress && (
        <div className="infoNote">
          Wallet-aware fields such as balances and recipe discovery will use the
          connected wallet when available.
        </div>
      )}

      {error && (
        <div className="infoNote" style={{ marginTop: 12 }}>
          <strong>Inspector error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="inspectorResultCard">
          <div className="detailsHeader">
            <div>
              <h3 style={{ margin: 0 }}>{result.title}</h3>
              {result.subtitle && (
                <div className="muted" style={{ marginTop: 6 }}>{result.subtitle}</div>
              )}
            </div>
            <div className="toolbarStatusPill">Live contract read</div>
          </div>

          <div className="inspectorFieldsGrid">
            {result.fields.map((field) => (
              <div key={`${field.label}-${field.value}`} className="inspectorFieldCard">
                <div className="muted">{field.label}</div>
                <strong>{field.value}</strong>
              </div>
            ))}
          </div>

          {!!result.notes?.length && (
            <details className="detailSection" open={showAdvanced}>
              <summary className="detailSectionSummary">Inspector notes</summary>
              <div className="infoNote" style={{ marginTop: 12 }}>
                {result.notes.map((note, index) => (
                  <div key={`${note}-${index}`}>• {note}</div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
