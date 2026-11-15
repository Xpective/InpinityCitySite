import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  colors,
  fontSize,
  letterSpacing,
  spacing,
  transition,
} from "../../lib/theme";

// ============================================================
// TYPES
// ============================================================
export type CityAction =
  | "reserve"
  | "qubiq"
  | "build"
  | "claim"
  | "mint"
  | "transfer";

export interface CityEvent {
  id: string;
  wallet: string;
  action: CityAction;
  plotId?: number | string;
  metadata?: string;
  timestamp: number;
}

type Props = {
  events: CityEvent[];
  maxVisible?: number;
  isLoading?: boolean;
  // NEU (optional):
  onEventClick?: (event: CityEvent) => void;
  filterFaction?: "inpinity" | "inphinity" | null;
  userWallet?: string | null;
  soundEnabled?: boolean;
};

type ActionFilter = "all" | CityAction;

// ============================================================
// CONSTANTS
// ============================================================
const ACTION_STYLES: Record<
  CityAction,
  { color: string; label: string; icon: string }
> = {
  reserve: { color: colors.info, label: "reserved", icon: "🏙️" },
  qubiq: { color: colors.primary, label: "contributed Qubiq to", icon: "⚡" },
  build: { color: colors.success, label: "built on", icon: "🏗️" },
  claim: { color: colors.successDim, label: "claimed", icon: "💰" },
  mint: { color: colors.primaryDim, label: "minted", icon: "✨" },
  transfer: { color: colors.partner, label: "transferred", icon: "↔️" },
};

const FILTER_OPTIONS: Array<{ value: ActionFilter; label: string; icon: string }> = [
  { value: "all", label: "All", icon: "◉" },
  { value: "qubiq", label: "Qubiq", icon: "⚡" },
  { value: "reserve", label: "Reserve", icon: "🏙️" },
  { value: "build", label: "Build", icon: "🏗️" },
  { value: "mint", label: "Mint", icon: "✨" },
  { value: "transfer", label: "Transfer", icon: "↔️" },
];

// ============================================================
// HELPERS
// ============================================================
function shortAddr(addr?: string | null): string {
  if (!addr) return "—";
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

function timeAgo(ts: number, now: number): string {
  const s = Math.floor((now - ts) / 1000);
  if (s < 0) return "in " + formatDuration(-s);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function formatDuration(s: number): string {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function isReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function playBeep(freq: number, duration = 0.05) {
  if (typeof window === "undefined" || isReducedMotion()) return;
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* ignore */
  }
}

// ============================================================
// COMPONENT
// ============================================================
export function CityTicker({
  events,
  maxVisible = 12,
  isLoading = false,
  onEventClick,
  filterFaction = null,
  userWallet = null,
  soundEnabled = false,
}: Props) {
  const [now, setNow] = useState(() => Date.now());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [actionFilter, setActionFilter] = useState<ActionFilter>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newEventIds, setNewEventIds] = useState<Set<string>>(new Set());

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevEventIdsRef = useRef<Set<string>>(new Set());

  // ============================================================
  // TIME-UPDATE
  // ============================================================
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // FILTERED EVENTS
  // ============================================================
  const filteredEvents = useMemo(() => {
    let list = events;

    // Filter by faction (metadata-based if provided)
    if (filterFaction) {
      list = list.filter((e) => {
        if (!e.metadata) return true; // keep unknowns
        return e.metadata.toLowerCase().includes(filterFaction);
      });
    }

    // Filter by action
    if (actionFilter !== "all") {
      list = list.filter((e) => e.action === actionFilter);
    }

    return list.slice(0, maxVisible);
  }, [events, actionFilter, maxVisible, filterFaction]);

  // ============================================================
  // NEW EVENT DETECTION
  // ============================================================
  useEffect(() => {
    const currentIds = new Set(events.map((e) => e.id));
    const newIds = new Set<string>();

    for (const id of currentIds) {
      if (!prevEventIdsRef.current.has(id)) {
        newIds.add(id);
      }
    }

    if (newIds.size > 0) {
      setNewEventIds(newIds);
      if (soundEnabled) playBeep(600, 0.04);

      const t = setTimeout(() => setNewEventIds(new Set()), 3000);
      prevEventIdsRef.current = currentIds;
      return () => clearTimeout(t);
    }

    prevEventIdsRef.current = currentIds;
  }, [events, soundEnabled]);

  // ============================================================
  // AUTO-SCROLL (MARQUEE)
  // ============================================================
  useEffect(() => {
    if (isPaused || isCollapsed || isReducedMotion()) return;
    const el = scrollRef.current;
    if (!el) return;
    if (filteredEvents.length <= 4) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const max = scrollWidth - clientWidth;
      if (max <= 0) return;
      if (scrollLeft >= max - 2) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [filteredEvents.length, isPaused, isCollapsed]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleEventClick = useCallback(
    (event: CityEvent) => {
      if (!onEventClick) return;
      if (soundEnabled) playBeep(680, 0.04);
      onEventClick(event);
    },
    [onEventClick, soundEnabled]
  );

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // ============================================================
  // EMPTY / LOADING
  // ============================================================
  if (isLoading || events.length === 0) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          background: colors.bgElevated,
          borderTop: `1px solid ${colors.borderSoft}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize.sm,
          color: colors.textFaint,
          fontFamily: "'Courier New', monospace",
          letterSpacing: letterSpacing.wide,
          zIndex: 100,
        }}
        role="status"
        aria-live="polite"
      >
        {isLoading ? "⏳ Loading city activity…" : "📡 Waiting for city events…"}
      </div>
    );
  }

  // ============================================================
  // COLLAPSED MODE
  // ============================================================
  if (isCollapsed) {
    return (
      <div
        onClick={toggleCollapsed}
        role="button"
        tabIndex={0}
        aria-label="Expand activity ticker"
        aria-expanded={false}
        style={{
          position: "fixed",
          bottom: 12,
          right: 12,
          width: 44,
          height: 44,
          background: colors.bgElevated,
          border: `1.5px solid ${colors.info}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: `0 0 20px rgba(0,229,255,0.35)`,
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleCollapsed();
          }
        }}
      >
        <span
          style={{
            fontSize: 18,
            animation: isReducedMotion() ? "none" : "ip-pulse 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          📡
        </span>
      </div>
    );
  }

  // ============================================================
  // MAIN
  // ============================================================
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.bgElevated,
        borderTop: `1px solid ${colors.info}`,
        zIndex: 100,
        fontFamily: "'Courier New', monospace",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="complementary"
      aria-label="Live city activity ticker"
    >
      {/* Filter-Menu (ausklappbar) */}
      {showFilterMenu && (
        <div
          style={{
            padding: spacing[2],
            borderBottom: `1px solid ${colors.borderSoft}`,
            display: "flex",
            gap: spacing[1],
            flexWrap: "wrap",
          }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setActionFilter(opt.value);
                setShowFilterMenu(false);
              }}
              className={`ip-chip ${actionFilter === opt.value ? "ip-chip--active" : ""}`}
              style={{ fontSize: fontSize.xs, padding: `${spacing[1]} ${spacing[2]}` }}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Main-Row */}
      <div
        style={{
          height: 34,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* LIVE-Indicator */}
        <div
          style={{
            padding: `0 ${spacing[3]}`,
            background: colors.info,
            color: "#000",
            fontSize: fontSize.xs,
            fontWeight: "bold",
            letterSpacing: letterSpacing.wide,
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: spacing[1],
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#000",
              animation: isReducedMotion() ? "none" : "ip-pulse 1.5s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          LIVE
        </div>

        {/* Filter-Button */}
        <button
          onClick={() => setShowFilterMenu((v) => !v)}
          aria-label="Filter events by action"
          aria-expanded={showFilterMenu}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderRight: `1px solid ${colors.borderSoft}`,
            color: colors.textDim,
            padding: `0 ${spacing[3]}`,
            height: "100%",
            cursor: "pointer",
            fontSize: fontSize.xs,
            letterSpacing: letterSpacing.base,
            fontFamily: "'Courier New', monospace",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {actionFilter === "all" ? "Filter" : FILTER_OPTIONS.find((o) => o.value === actionFilter)?.label}
          <span style={{ fontSize: 8 }}>▾</span>
        </button>

        {/* Events */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            gap: spacing[4],
            padding: `0 ${spacing[3]}`,
            position: "relative",
          }}
        >
          {filteredEvents.length === 0 && (
            <div
              style={{
                padding: `0 ${spacing[4]}`,
                fontSize: fontSize.sm,
                color: colors.textFaint,
                letterSpacing: letterSpacing.base,
                display: "flex",
                alignItems: "center",
              }}
            >
              No events match this filter
            </div>
          )}
          {filteredEvents.map((event) => {
            const style = ACTION_STYLES[event.action] || ACTION_STYLES.build;
            const isHovered = hoveredId === event.id;
            const isNew = newEventIds.has(event.id);
            const isMine = userWallet && event.wallet.toLowerCase() === userWallet.toLowerCase();
            const clickable = !!onEventClick;

            return (
              <button
                key={event.id}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleEventClick(event)}
                disabled={!clickable}
                aria-label={`${shortAddr(event.wallet)} ${style.label} ${event.plotId ? `Plot #${event.plotId}` : ""} ${timeAgo(event.timestamp, now)}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing[1],
                  fontSize: fontSize.sm,
                  color: colors.textDim,
                  whiteSpace: "nowrap",
                  cursor: clickable ? "pointer" : "default",
                  padding: `0 ${spacing[2]}`,
                  height: "100%",
                  background: isNew ? "rgba(0,229,255,0.08)" : "none",
                  border: "none",
                  borderBottom: isHovered ? `2px solid ${style.color}` : "2px solid transparent",
                  transition: `all ${transition.fast}`,
                  fontFamily: "'Courier New', monospace",
                  opacity: isNew ? 1 : 0.85,
                }}
              >
                {isNew && (
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: colors.info,
                      boxShadow: `0 0 6px ${colors.info}`,
                      animation: isReducedMotion() ? "none" : "ip-pulse 1s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                )}
                <span style={{ fontSize: "11px" }} aria-hidden="true">{style.icon}</span>
                <span
                  style={{
                    color: isMine ? colors.info : colors.text,
                    fontWeight: isMine ? "bold" : "normal",
                  }}
                >
                  {isMine ? "YOU" : shortAddr(event.wallet)}
                </span>
                <span style={{ color: colors.textDim }}>{style.label}</span>
                {event.plotId != null && (
                  <strong style={{ color: style.color }}>Plot #{event.plotId}</strong>
                )}
                {event.metadata && (
                  <span style={{ color: colors.textFaint, fontSize: fontSize.xs }}>
                    ({event.metadata})
                  </span>
                )}
                <span style={{ color: colors.textFaint, marginLeft: spacing[1] }}>
                  · {timeAgo(event.timestamp, now)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collapse-Button */}
        <button
          onClick={toggleCollapsed}
          aria-label="Collapse activity ticker"
          aria-expanded={true}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderLeft: `1px solid ${colors.borderSoft}`,
            color: colors.textDim,
            padding: `0 ${spacing[3]}`,
            height: "100%",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'Courier New', monospace",
            flexShrink: 0,
          }}
        >
          ✕
        </button>

        {/* Fade-Gradient */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 0,
            bottom: 0,
            width: 40,
            background: `linear-gradient(90deg, transparent, ${colors.bgElevated})`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default CityTicker;