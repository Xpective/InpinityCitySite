import { useCallback, useEffect, useRef, useState } from "react";
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
type Props = {
  walletAddress?: string | null;
  hasCityKey?: boolean | null;
  hasFaction?: boolean;
  hasPlot?: boolean;
  faction?: "inpinity" | "inphinity" | null;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  // NEU (optional, brechen nichts):
  isLoading?: boolean;
  isDemoData?: boolean;
  liveStats?: {
    totalPlots?: number;
    activeBuilders?: number;
    totalQubiq?: number;
  };
  onTertiaryAction?: () => void;
  tertiaryActionLabel?: string;
  disabled?: boolean;
};

type HeroState = "loading" | "disconnected" | "no-key" | "no-faction" | "no-plot" | "ready";

// ============================================================
// HELPERS
// ============================================================
function resolveHeroState(
  isLoading: boolean,
  walletAddress: string | null | undefined,
  hasCityKey: boolean | null | undefined,
  hasFaction: boolean,
  hasPlot: boolean
): HeroState {
  if (isLoading) return "loading";
  if (!walletAddress) return "disconnected";
  if (hasCityKey === false) return "no-key";
  if (!hasFaction) return "no-faction";
  if (!hasPlot) return "no-plot";
  return "ready";
}

function shortAddr(addr?: string | null): string {
  if (!addr) return "";
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function formatCount(n?: number): string {
  if (n == null) return "—";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}

function playHeroSound(faction: "inpinity" | "inphinity" | null) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = faction === "inphinity" ? 220 : faction === "inpinity" ? 330 : 440;
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    /* ignore */
  }
}

function haptic(pattern: number | number[] = 10) {
  if (typeof navigator === "undefined") return;
  if (prefersReducedMotion()) return;
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

// ============================================================
// COMPONENT
// ============================================================
export function CityHero({
  walletAddress,
  hasCityKey,
  hasFaction = false,
  hasPlot = false,
  faction = null,
  onPrimaryAction,
  primaryActionLabel,
  onSecondaryAction,
  secondaryActionLabel,
  isLoading = false,
  isDemoData = false,
  liveStats,
  onTertiaryAction,
  tertiaryActionLabel,
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [isVisible, setIsVisible] = useState(true);

  // ============================================================
  // SCROLL PROGRESS (throttled, respects reduced motion)
  // ============================================================
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalScroll = Math.max(1, rect.height - viewportH);
      const raw = -rect.top / totalScroll;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // ============================================================
  // INTERSECTION OBSERVER (pause animation when off-screen)
  // ============================================================
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ============================================================
  // AUTO-FOCUS PRIMARY CTA
  // ============================================================
  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => {
      primaryBtnRef.current?.focus({ preventScroll: true });
    }, 500);
    return () => clearTimeout(t);
  }, [isLoading]);

  const heroState = resolveHeroState(
    isLoading,
    walletAddress,
    hasCityKey,
    hasFaction,
    hasPlot
  );

  // ============================================================
  // DYNAMIC COPY
  // ============================================================
  const copy = (() => {
    switch (heroState) {
      case "loading":
        return {
          eyebrow: "INPINITY CITY",
          title: "Loading the city…",
          subtitle: "Connecting to Base and reading on-chain state. This takes a moment.",
          primary: null as string | null,
          secondary: null as string | null,
        };
      case "disconnected":
        return {
          eyebrow: "INPINITY CITY · QUIBIQ PROTOCOL",
          title: "The city awaits.",
          subtitle:
            "Connect your wallet on Base, choose your faction, and reserve your first Qubiq plot. Your journey begins at the Nexus.",
          primary: primaryActionLabel ?? "Connect Wallet",
          secondary: null as string | null,
        };
      case "no-key":
        return {
          eyebrow: "STEP 1 · CITY KEY REQUIRED",
          title: "Your key opens the gates.",
          subtitle:
            "Every builder needs a City Key. Mint or select an Inpinity NFT to unlock your place in the ∞ city.",
          primary: primaryActionLabel ?? "Mint City Key",
          secondary: null as string | null,
        };
      case "no-faction":
        return {
          eyebrow: "STEP 2 · CHOOSE FACTION",
          title: "Pick your side.",
          subtitle:
            "Inpinity or Inphinity — your choice defines which side of the ∞ city you build on. This lock is permanent.",
          primary: primaryActionLabel ?? "Choose Faction",
          secondary: null as string | null,
        };
      case "no-plot":
        return {
          eyebrow: faction ? `STEP 3 · ${faction.toUpperCase()} BUILDER` : "STEP 3 · RESERVE PLOT",
          title: `Welcome, ${shortAddr(walletAddress)}.`,
          subtitle:
            "You're locked in. Reserve your first personal plot in the Nexus and start contributing Qubiq to build.",
          primary: primaryActionLabel ?? "Reserve First Plot",
          secondary: secondaryActionLabel ?? null,
        };
      case "ready":
        return {
          eyebrow: faction ? `ACTIVE · ${faction.toUpperCase()} SIDE` : "ACTIVE BUILDER",
          title: `Welcome back, ${shortAddr(walletAddress)}.`,
          subtitle:
            "Your plots are on the map. Continue contributing Qubiq, upgrade layers, or start a new build.",
          primary: primaryActionLabel ?? "Continue Building",
          secondary: secondaryActionLabel ?? null,
        };
    }
  })();

  // ============================================================
  // ACCENT COLOR
  // ============================================================
  const accent =
    faction === "inphinity"
      ? "#ff5858"
      : faction === "inpinity"
      ? "#4a7bff"
      : colors.primary;

  const accentDim = `${accent}33`;

  // ============================================================
  // VISUAL INTERPOLATION (respects reduced motion)
  // ============================================================
  const effectiveProgress = reducedMotion ? 0 : progress;
  const circleOpacity = Math.max(0, 1 - effectiveProgress * 1.4);
  const gridOpacity = Math.max(0, effectiveProgress * 1.4 - 0.4);
  const circleScale = 1 - effectiveProgress * 0.3;
  const gridScale = 0.7 + effectiveProgress * 0.3;

  // ============================================================
  // CTA HANDLERS
  // ============================================================
  const handlePrimary = useCallback(() => {
    if (disabled || isLoading) return;
    playHeroSound(faction);
    haptic([10, 30, 10]);
    onPrimaryAction?.();
  }, [disabled, isLoading, faction, onPrimaryAction]);

  const handleSecondary = useCallback(() => {
    if (disabled) return;
    haptic([5]);
    onSecondaryAction?.();
  }, [disabled, onSecondaryAction]);

  const handleTertiary = useCallback(() => {
    if (disabled) return;
    haptic([5]);
    onTertiaryAction?.();
  }, [disabled, onTertiaryAction]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: reducedMotion ? "auto" : "180vh",
        minHeight: reducedMotion ? "70vh" : undefined,
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Courier New', monospace",
      }}
      aria-busy={isLoading}
    >
      <div
        style={{
          position: reducedMotion ? "relative" : "sticky",
          top: 0,
          height: reducedMotion ? "70vh" : "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* BG */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${colors.bgSoft} 0%, ${colors.bg} 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* SVG ∞ → Grid */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isVisible ? 1 : 0.3,
            transition: `opacity ${transition.slow}`,
          }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
            <filter id="hero-blur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="hero-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="800" height="600" fill="url(#hero-glow)" />

          {/* ∞-Phase */}
          <g
            transform={`translate(400 300) scale(${circleScale})`}
            opacity={circleOpacity}
            style={{
              transition: reducedMotion ? "none" : `opacity ${transition.slow}, transform ${transition.slow}`,
            }}
          >
            <circle cx={-75} cy={0} r={100} fill="none" stroke={accent} strokeWidth={2} opacity={0.9} />
            <circle cx={-75} cy={0} r={115} fill="none" stroke={accent} strokeWidth={0.6} opacity={0.4} />
            <circle cx={75} cy={0} r={100} fill="none" stroke={accent} strokeWidth={2} opacity={0.9} />
            <circle cx={75} cy={0} r={115} fill="none" stroke={accent} strokeWidth={0.6} opacity={0.4} />
            <circle cx={0} cy={0} r={6} fill={colors.primary} filter="url(#hero-blur)" opacity={0.7} />
            <circle cx={0} cy={0} r={4} fill={colors.primary} />
          </g>

          {/* Grid-Phase */}
          {!reducedMotion && (
            <g
              transform={`translate(400 300) scale(${gridScale})`}
              opacity={gridOpacity}
              style={{ transition: `opacity ${transition.slow}, transform ${transition.slow}` }}
            >
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 8 }).map((__, col) => {
                  const cellSize = 32;
                  const gap = 6;
                  const totalSize = cellSize * 8 + gap * 7;
                  const x = col * (cellSize + gap) - totalSize / 2;
                  const y = row * (cellSize + gap) - totalSize / 2;
                  const dx = x + cellSize / 2;
                  const dy = y + cellSize / 2;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const isNexus = dist < cellSize * 2;
                  const cellOpacity = Math.max(0.15, 1 - dist / 280);
                  return (
                    <rect
                      key={`${row}-${col}`}
                      x={x}
                      y={y}
                      width={cellSize}
                      height={cellSize}
                      rx={3}
                      fill={isNexus ? colors.primary : "transparent"}
                      stroke={isNexus ? colors.primary : accent}
                      strokeWidth={isNexus ? 1.5 : 1}
                      opacity={cellOpacity * (isNexus ? 0.9 : 0.55)}
                    />
                  );
                })
              )}
            </g>
          )}
        </svg>

        {/* Copy-Overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: 680,
            padding: `${spacing[7]} ${spacing[6]}`,
            display: "flex",
            flexDirection: "column",
            gap: spacing[4],
            alignItems: "center",
          }}
        >
          {/* Demo-Badge */}
          {isDemoData && (
            <div
              style={{
                padding: `${spacing[1]} ${spacing[3]}`,
                background: "rgba(255,136,0,0.15)",
                border: `1px solid ${colors.warning}`,
                color: colors.warning,
                borderRadius: 999,
                fontSize: fontSize.xs,
                letterSpacing: letterSpacing.wide,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              ⚠ Demo Mode
            </div>
          )}

          {/* Eyebrow */}
          <div
            style={{
              fontSize: fontSize.sm,
              color: accent,
              letterSpacing: letterSpacing.wider,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {copy.eyebrow}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: `clamp(28px, 5vw, ${fontSize["4xl"]})`,
              color: colors.primary,
              margin: 0,
              letterSpacing: letterSpacing.wider,
              lineHeight: 1.1,
              textShadow: `0 0 40px ${colors.primaryGlow}`,
              fontWeight: "bold",
            }}
          >
            {copy.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: fontSize.lg,
              color: colors.textDim,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            {copy.subtitle}
          </p>

          {/* Live Stats */}
          {liveStats && (
            <div
              style={{
                display: "flex",
                gap: spacing[5],
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: spacing[2],
              }}
            >
              {[
                { label: "Plots", value: liveStats.totalPlots },
                { label: "Builders", value: liveStats.activeBuilders },
                { label: "Qubiq", value: liveStats.totalQubiq },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    textAlign: "center",
                    minWidth: 80,
                  }}
                >
                  <div
                    style={{
                      color: colors.primary,
                      fontSize: fontSize["2xl"],
                      fontWeight: "bold",
                      letterSpacing: letterSpacing.tight,
                    }}
                  >
                    {formatCount(stat.value)}
                  </div>
                  <div
                    style={{
                      color: colors.textFaint,
                      fontSize: fontSize.xs,
                      letterSpacing: letterSpacing.wide,
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: spacing[4],
              marginTop: spacing[3],
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {copy.primary && onPrimaryAction && (
              <button
                ref={primaryBtnRef}
                onClick={handlePrimary}
                className="ip-btn ip-btn--lg"
                disabled={disabled || isLoading}
                aria-label={copy.primary}
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  color: "#000",
                  boxShadow: `0 0 30px ${accentDim}`,
                  padding: `${spacing[4]} ${spacing[7]}`,
                  fontSize: fontSize.lg,
                  letterSpacing: letterSpacing.wide,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  opacity: disabled || isLoading ? 0.5 : 1,
                  cursor: disabled || isLoading ? "not-allowed" : "pointer",
                  transition: `all ${transition.base}`,
                  filter: isLoading ? "grayscale(1)" : "none",
                }}
              >
                {isLoading ? "⏳ Loading…" : copy.primary} →
              </button>
            )}

            {copy.secondary && onSecondaryAction && (
              <button
                onClick={handleSecondary}
                className="ip-btn ip-btn--ghost ip-btn--lg"
                disabled={disabled}
                aria-label={copy.secondary}
                style={{
                  padding: `${spacing[4]} ${spacing[7]}`,
                  fontSize: fontSize.lg,
                  letterSpacing: letterSpacing.wide,
                  textTransform: "uppercase",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {copy.secondary}
              </button>
            )}

            {tertiaryActionLabel && onTertiaryAction && (
              <button
                onClick={handleTertiary}
                className="ip-btn ip-btn--ghost ip-btn--sm"
                disabled={disabled}
                aria-label={tertiaryActionLabel}
                style={{
                  padding: `${spacing[3]} ${spacing[5]}`,
                  fontSize: fontSize.sm,
                  letterSpacing: letterSpacing.base,
                }}
              >
                {tertiaryActionLabel}
              </button>
            )}
          </div>

          {/* Scroll-Indicator */}
          {!reducedMotion && (
            <div
              style={{
                marginTop: spacing[6],
                fontSize: fontSize.sm,
                color: colors.textFaint,
                letterSpacing: letterSpacing.wider,
                textTransform: "uppercase",
                animation: "ip-pulse 2.4s ease-in-out infinite",
              }}
            >
              ↓ Scroll to enter the city
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CityHero;