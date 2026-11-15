import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  colors,
  fontSize,
  letterSpacing,
  spacing,
  radius,
  transition,
  qubiqSteps,
  type QubiqStepId,
} from "../../lib/theme";

// ============================================================
// TYPES
// ============================================================
type Props = {
  currentStep: QubiqStepId;
  completedSteps: QubiqStepId[];
  qubiqProgress?: number;
  qubiqMax?: number;
  onStepClick?: (step: QubiqStepId) => void;
  showProgress?: boolean;
  isBusy?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  compact?: boolean;
  soundEnabled?: boolean;
  showTimeEstimate?: boolean;
  startedAt?: number | null;
};

// ============================================================
// HELPERS
// ============================================================
function isReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function playBeep(freq: number, duration = 0.08) {
  if (typeof window === "undefined") return;
  if (isReducedMotion()) return;
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* ignore */
  }
}

function haptic(pattern: number | number[] = 5) {
  if (typeof navigator === "undefined") return;
  if (isReducedMotion()) return;
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
}

// ============================================================
// CONFETTI (Lightweight, no deps)
// ============================================================
type ConfettiParticle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rot: number;
  rotSpeed: number;
};

function spawnConfetti(): ConfettiParticle[] {
  const particleColors = ["#00ff88", "#ffcc00", "#00e5ff", "#c060ff", "#ff8800"];
  const particles: ConfettiParticle[] = [];
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 6;
    particles.push({
      id: Math.random(),
      x: 0,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      size: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.3,
    });
  }
  return particles;
}

// ============================================================
// COMPONENT
// ============================================================
export function QubiqFlow({
  currentStep,
  completedSteps,
  qubiqProgress = 0,
  qubiqMax = 25,
  onStepClick,
  showProgress = true,
  isBusy = false,
  errorMessage = null,
  onRetry,
  compact = false,
  soundEnabled = true,
  showTimeEstimate = true,
  startedAt = null,
}: Props) {
  const [expandedStep, setExpandedStep] = useState<QubiqStepId | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const currentStepRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<QubiqStepId>(currentStep);
  const [celebration, setCelebration] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [showBackToCurrent, setShowBackToCurrent] = useState(false);
  const [focusedStepIndex, setFocusedStepIndex] = useState<number>(-1);

  const stepRefs = useRef<Record<QubiqStepId, HTMLDivElement | null>>(
    {} as Record<QubiqStepId, HTMLDivElement | null>
  );

  // ============================================================
  // TIME-UPDATE
  // ============================================================
  useEffect(() => {
    if (!showTimeEstimate) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [showTimeEstimate]);

  // ============================================================
  // AUTO-SCROLL TO CURRENT STEP
  // ============================================================
  useEffect(() => {
    if (prevStepRef.current === currentStep) return;
    prevStepRef.current = currentStep;

    const el = currentStepRef.current;
    if (!el) return;
    if (typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: isReducedMotion() ? "auto" : "smooth",
        block: "nearest",
      });
    }

    if (soundEnabled) playBeep(520, 0.06);
    haptic(5);
  }, [currentStep, soundEnabled]);

  // ============================================================
  // SCROLL-LISTENER (Back-to-current Button)
  // ============================================================
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentEl = currentStepRef.current;
      if (!currentEl) return;
      const rect = currentEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const isVisible = rect.top >= containerRect.top && rect.bottom <= containerRect.bottom;
      setShowBackToCurrent(!isVisible);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================
  // CELEBRATION
  // ============================================================
  useEffect(() => {
    if (qubiqProgress >= qubiqMax && qubiqMax > 0) {
      setCelebration(true);
      setConfetti(spawnConfetti());

      if (soundEnabled) {
        playBeep(880, 0.12);
        setTimeout(() => playBeep(1100, 0.15), 130);
      }
      haptic([20, 50, 20]);

      const fadeTimer = setTimeout(() => setConfetti([]), 2500);
      const celebrationTimer = setTimeout(() => setCelebration(false), 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(celebrationTimer);
      };
    }
  }, [qubiqProgress, qubiqMax, soundEnabled]);

  // ============================================================
  // CONFETTI PHYSICS
  // ============================================================
  useEffect(() => {
    if (confetti.length === 0) return;
    let rafId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;

      setConfetti((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + 0.3 * dt,
            vx: p.vx * 0.99,
            rot: p.rot + p.rotSpeed * dt,
          }))
          .filter((p) => p.y < 400)
      );

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [confetti.length]);

  // ============================================================
  // COMPUTED
  // ============================================================
  const isCompleted = useCallback(
    (id: QubiqStepId) => completedSteps.includes(id),
    [completedSteps]
  );
  const isCurrent = useCallback((id: QubiqStepId) => id === currentStep, [currentStep]);

  const completedCount = completedSteps.length;
  const progressPercent = Math.min(100, (qubiqProgress / Math.max(1, qubiqMax)) * 100);
  const isQubiqComplete = qubiqProgress >= qubiqMax;

  const currentStepIndex = useMemo(
    () => qubiqSteps.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  const elapsedSeconds = startedAt ? Math.max(0, (now - startedAt) / 1000) : 0;
  const completionRatio = completedCount / qubiqSteps.length;

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleStepClick = useCallback(
    (step: QubiqStepId, clickable: boolean) => {
      setExpandedStep((prev) => (prev === step ? null : step));

      if (!clickable) return;
      if (soundEnabled) playBeep(480, 0.05);
      haptic(5);
      onStepClick?.(step);
    },
    [onStepClick, soundEnabled]
  );

  const handleRetry = useCallback(() => {
    if (soundEnabled) playBeep(440, 0.08);
    haptic([10, 20, 10]);
    onRetry?.();
  }, [onRetry, soundEnabled]);

  const scrollToCurrent = useCallback(() => {
    currentStepRef.current?.scrollIntoView({
      behavior: isReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
    setShowBackToCurrent(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        const nextIdx = Math.max(0, Math.min(qubiqSteps.length - 1, focusedStepIndex + dir));
        setFocusedStepIndex(nextIdx);
        const step = qubiqSteps[nextIdx];
        const el = stepRefs.current[step.id];
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [focusedStepIndex]
  );

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      style={{
        position: "relative",
        background: colors.bgCard,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderStyle: "solid",
        borderColor: celebration ? colors.success : colors.primary,
        borderRadius: radius.md,
        padding: compact ? spacing[4] : spacing[6],
        fontFamily: "'Courier New', monospace",
        transition: `border-color ${transition.slow}, box-shadow ${transition.slow}`,
        boxShadow: celebration ? `0 0 40px rgba(0,255,136,0.5)` : "none",
        overflow: "visible",
      }}
      role="region"
      aria-label="Qubiq build progress"
    >
      {/* CONFETTI OVERLAY */}
      {confetti.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
          aria-hidden="true"
        >
          {confetti.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
                transform: `rotate(${p.rot}rad)`,
                opacity: Math.max(0, 1 - Math.abs(p.y) / 300),
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          ))}
        </div>
      )}

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: compact ? spacing[3] : spacing[5],
          flexWrap: "wrap",
          gap: spacing[2],
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
          <h2
            style={{
              fontSize: compact ? fontSize.md : fontSize.lg,
              color: celebration ? colors.success : colors.primary,
              letterSpacing: letterSpacing.wide,
              textTransform: "uppercase",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            {celebration ? "🎉 Plot Complete!" : "⚡ Qubiq Flow"}
          </h2>
          {!compact && (
            <div
              style={{
                padding: `2px ${spacing[2]}`,
                background: "rgba(255,204,0,0.1)",
                border: `1px solid ${colors.primary}44`,
                borderRadius: 999,
                fontSize: fontSize.xs,
                color: colors.primary,
                fontWeight: "bold",
                letterSpacing: letterSpacing.base,
              }}
            >
              {Math.round(completionRatio * 100)}%
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: spacing[3], alignItems: "center", flexWrap: "wrap" }}>
          {showTimeEstimate && startedAt != null && elapsedSeconds > 0 && (
            <div
              style={{
                fontSize: fontSize.xs,
                color: colors.textFaint,
                letterSpacing: letterSpacing.base,
              }}
            >
              ⏱ {formatDuration(elapsedSeconds)}
            </div>
          )}
          <div
            style={{
              fontSize: fontSize.sm,
              color: colors.textDim,
              letterSpacing: letterSpacing.base,
            }}
            aria-live="polite"
          >
            {completedCount} / {qubiqSteps.length}
          </div>
        </div>
      </div>

      {/* ERROR-BOX */}
      {errorMessage && (
        <div
          style={{
            marginBottom: spacing[4],
            padding: spacing[3],
            background: "rgba(255,51,51,0.1)",
            borderLeftWidth: 3,
            borderLeftStyle: "solid",
            borderLeftColor: colors.danger,
            borderRadius: radius.md,
            fontSize: fontSize.sm,
            color: colors.danger,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: spacing[3],
          }}
          role="alert"
        >
          <span style={{ flex: 1 }}>⚠ {errorMessage}</span>
          {onRetry && (
            <button
              onClick={handleRetry}
              className="ip-btn ip-btn--ghost ip-btn--sm"
              style={{ fontSize: fontSize.xs, padding: `${spacing[1]} ${spacing[3]}` }}
              aria-label="Retry"
            >
              ↻ Retry
            </button>
          )}
        </div>
      )}

      {/* QUBIQ PROGRESS-BAR */}
      {showProgress && completedSteps.includes("approve" as QubiqStepId) && (
        <div style={{ marginBottom: compact ? spacing[3] : spacing[5] }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: fontSize.sm,
              color: colors.textDim,
              marginBottom: spacing[2],
              letterSpacing: letterSpacing.base,
            }}
          >
            <span>Qubiq Progress</span>
            <strong style={{ color: isQubiqComplete ? colors.success : colors.primary }}>
              {qubiqProgress} / {qubiqMax}
              {isQubiqComplete && " ✓"}
            </strong>
          </div>
          <div
            style={{
              height: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: radius.sm,
              overflow: "hidden",
              position: "relative",
            }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Qubiq progress: ${qubiqProgress} of ${qubiqMax}`}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                background: isQubiqComplete
                  ? `linear-gradient(90deg, ${colors.success}, ${colors.successDim})`
                  : `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDim})`,
                transition: `width ${transition.slow}`,
                boxShadow: isQubiqComplete
                  ? `0 0 15px ${colors.success}66`
                  : `0 0 10px ${colors.primary}66`,
              }}
            />
          </div>
        </div>
      )}

      {/* BACK TO CURRENT (floating) */}
      {showBackToCurrent && (
        <button
          onClick={scrollToCurrent}
          aria-label="Scroll to current step"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            display: "block",
            margin: "0 auto",
            marginBottom: spacing[2],
            padding: `${spacing[1]} ${spacing[3]}`,
            background: colors.primary,
            color: "#000",
            border: "none",
            borderRadius: 999,
            fontSize: fontSize.xs,
            fontWeight: "bold",
            letterSpacing: letterSpacing.base,
            cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            boxShadow: `0 2px 12px ${colors.primary}88`,
          }}
        >
          ↑ Back to current
        </button>
      )}

      {/* STEPS */}
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing[2],
          maxHeight: compact ? 280 : 420,
          overflowY: "auto",
          paddingRight: spacing[1],
        }}
        onKeyDown={handleKeyDown}
      >
        {qubiqSteps.map((step, idx) => {
          const done = isCompleted(step.id);
          const active = isCurrent(step.id);
          const isLocked = !done && !active && idx > currentStepIndex;
          const clickable = done || active;
          const isExpanded = expandedStep === step.id;

          const borderColor = done
            ? colors.success
            : active
            ? colors.primary
            : isLocked
            ? colors.borderSoft
            : colors.border;

          const bg = done
            ? "rgba(0,255,136,0.06)"
            : active
            ? "rgba(255,204,0,0.06)"
            : "rgba(255,255,255,0.02)";

          // Compute ring progress for current step (Qubiq progress)
          const ringProgress =
            active && step.id === "qubiq" && qubiqMax > 0
              ? Math.min(1, qubiqProgress / qubiqMax)
              : null;

          return (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[step.id] = el;
                if (active) currentStepRef.current = el;
              }}
            >
              <button
                onClick={() => handleStepClick(step.id, clickable)}
                disabled={!clickable && !done}
                onFocus={() => setFocusedStepIndex(idx)}
                aria-expanded={isExpanded}
                aria-current={active ? "step" : undefined}
                aria-label={`${step.label}${
                  done ? " (complete)" : active ? " (current)" : isLocked ? " (locked)" : ""
                }`}
                style={{
                  display: "flex",
                  gap: spacing[3],
                  padding: compact ? spacing[2] : spacing[3],
                  background: bg,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderLeftWidth: 3,
                  borderLeftStyle: "solid",
                  borderLeftColor: borderColor,
                  borderRadius: radius.md,
                  cursor: clickable ? "pointer" : "default",
                  transition: `all ${transition.base}`,
                  opacity: isLocked ? 0.4 : 1,
                  textAlign: "left",
                  width: "100%",
                  fontFamily: "'Courier New', monospace",
                  filter: isBusy && active ? "brightness(1.15)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (clickable) {
                    e.currentTarget.style.background = done
                      ? "rgba(0,255,136,0.12)"
                      : "rgba(255,204,0,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = bg;
                }}
              >
                {/* Circle with optional progress ring */}
                <div
                  style={{
                    position: "relative",
                    width: compact ? 24 : 32,
                    height: compact ? 24 : 32,
                    flexShrink: 0,
                  }}
                >
                  {ringProgress !== null && ringProgress > 0 && (
                    <svg
                      width={compact ? 24 : 32}
                      height={compact ? 24 : 32}
                      viewBox="0 0 32 32"
                      style={{
                        position: "absolute",
                        inset: 0,
                        transform: "rotate(-90deg)",
                        pointerEvents: "none",
                      }}
                      aria-hidden="true"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="rgba(255,204,0,0.2)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                        strokeDasharray={`${ringProgress * 88} 88`}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 0.4s ease" }}
                      />
                    </svg>
                  )}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: done
                        ? colors.success
                        : active
                        ? colors.primary
                        : "transparent",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: borderColor,
                      color: done || active ? "#000" : colors.textFaint,
                      fontSize: compact ? fontSize.xs : fontSize.md,
                      fontWeight: "bold",
                      transition: `all ${transition.base}`,
                    }}
                  >
                    {done ? "✓" : active && isBusy ? "●" : step.icon}
                  </div>
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: spacing[2],
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: compact ? fontSize.sm : fontSize.md,
                        color: done
                          ? colors.success
                          : active
                          ? colors.primary
                          : colors.text,
                        fontWeight: "bold",
                        letterSpacing: letterSpacing.tight,
                      }}
                    >
                      {step.label}
                    </span>
                    {active && (
                      <span
                        style={{
                          fontSize: fontSize.xs,
                          color: colors.primary,
                          letterSpacing: letterSpacing.wide,
                          fontWeight: "bold",
                          animation: isReducedMotion()
                            ? "none"
                            : "ip-pulse 2s ease-in-out infinite",
                        }}
                      >
                        ● NOW
                      </span>
                    )}
                    {done && (
                      <span
                        style={{
                          fontSize: fontSize.xs,
                          color: colors.success,
                          letterSpacing: letterSpacing.wide,
                          fontWeight: "bold",
                        }}
                      >
                        DONE
                      </span>
                    )}
                  </div>
                  {!compact && (
                    <div
                      style={{
                        fontSize: fontSize.sm,
                        color: colors.textDim,
                        lineHeight: 1.4,
                        marginTop: 2,
                      }}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </button>

              {/* EXPANDED DETAIL */}
              {isExpanded && !compact && (
                <div
                  style={{
                    marginTop: spacing[1],
                    marginLeft: spacing[5],
                    padding: spacing[3],
                    background: "rgba(255,255,255,0.02)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: colors.borderSoft,
                    borderRadius: radius.md,
                    fontSize: fontSize.sm,
                    color: colors.textDim,
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                  {step.requiresFaction && (
                    <div
                      style={{
                        marginTop: spacing[1],
                        color: colors.warning,
                        fontSize: fontSize.xs,
                      }}
                    >
                      ⚠ Requires faction selection
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER-TIP */}
      <div
        style={{
          marginTop: compact ? spacing[2] : spacing[4],
          padding: spacing[3],
          background: "rgba(0,229,255,0.05)",
          borderLeftWidth: 3,
          borderLeftStyle: "solid",
          borderLeftColor: colors.info,
          borderRadius: radius.md,
          fontSize: fontSize.sm,
          color: colors.textDim,
          lineHeight: 1.5,
        }}
        aria-live="polite"
      >
        💡 <strong style={{ color: colors.info }}>Tip:</strong>{" "}
        {qubiqSteps[currentStepIndex]?.description || "Start with Step 1: connect your wallet."}
      </div>
    </div>
  );
}

export default QubiqFlow;