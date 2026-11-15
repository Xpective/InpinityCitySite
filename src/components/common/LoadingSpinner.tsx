import { useEffect, useState } from "react";
import {
  colors,
  fontSize,
  letterSpacing,
  spacing,
} from "../../lib/theme";

// ============================================================
// TYPES
// ============================================================
type SpinnerSize = "small" | "medium" | "large";
type SpinnerVariant = "spinner" | "pulse" | "dots";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  text?: string;
  fullPage?: boolean;
  // NEU (optional, brechen nichts):
  variant?: SpinnerVariant;
  delayMs?: number;
  cancelLabel?: string;
  onCancel?: () => void;
  overlay?: boolean;
  /** Hide visible text but keep it for screen readers */
  srOnly?: boolean;
}

// ============================================================
// SIZE CONFIG
// ============================================================
const SIZE_CONFIG: Record<SpinnerSize, { px: number; font: string; gap: string }> = {
  small: { px: 20, font: fontSize.sm, gap: spacing[2] },
  medium: { px: 40, font: fontSize.md, gap: spacing[3] },
  large: { px: 60, font: fontSize.xl, gap: spacing[4] },
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

// ============================================================
// SVG SPINNER (no CSS injection — works everywhere)
// ============================================================
function SvgSpinner({ size, color }: { size: number; color: string }) {
  if (isReducedMotion()) {
    return (
      <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth="4" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden="true">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={`${color}33`}
        strokeWidth="4"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="125"
        strokeDashoffset="94"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

// ============================================================
// PULSE VARIANT
// ============================================================
function PulseSpinner({ size, color }: { size: number; color: string }) {
  const reduced = isReducedMotion();
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          background: `${color}22`,
          animation: reduced ? "none" : "ip-pulse 1.8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 15px ${color}88`,
        }}
      />
    </div>
  );
}

// ============================================================
// DOTS VARIANT
// ============================================================
function DotsSpinner({ size, color }: { size: number; color: string }) {
  const reduced = isReducedMotion();
  const dotSize = Math.max(6, size * 0.2);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: dotSize * 0.4,
        height: size,
      }}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: color,
            animation: reduced
              ? "none"
              : `ip-pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LoadingSpinner({
  size = "medium",
  color = colors.primary,
  text,
  fullPage = false,
  variant = "spinner",
  delayMs = 0,
  cancelLabel,
  onCancel,
  overlay = false,
  srOnly = false,
}: LoadingSpinnerProps) {
  const [visible, setVisible] = useState(delayMs === 0);

  // Delay-before-show (prevents flicker on fast loads)
  useEffect(() => {
    if (delayMs === 0) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  if (!visible) return null;

  const cfg = SIZE_CONFIG[size];

  const spinner =
    variant === "pulse" ? (
      <PulseSpinner size={cfg.px} color={color} />
    ) : variant === "dots" ? (
      <DotsSpinner size={cfg.px} color={color} />
    ) : (
      <SvgSpinner size={cfg.px} color={color} />
    );

  const isFullscreen = fullPage || overlay;

  const containerStyle: React.CSSProperties = fullPage
    ? {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        gap: cfg.gap,
        padding: spacing[6],
      }
    : overlay
    ? {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 10,
        gap: cfg.gap,
        padding: spacing[6],
        borderRadius: "inherit",
      }
    : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: cfg.gap,
        padding: spacing[6],
      };

  return (
    <div
      style={containerStyle}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text || "Loading"}
    >
      {spinner}

      {text && (
        <p
          style={{
            color: isFullscreen ? colors.text : colors.textDim,
            fontSize: cfg.font,
            fontFamily: "'Courier New', monospace",
            letterSpacing: letterSpacing.base,
            margin: 0,
            textAlign: "center",
            ...(srOnly
              ? {
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }
              : {}),
          }}
        >
          {text}
        </p>
      )}

      {onCancel && (
        <button
          onClick={onCancel}
          className="ip-btn ip-btn--ghost ip-btn--sm"
          style={{
            marginTop: spacing[3],
            fontSize: fontSize.sm,
            padding: `${spacing[2]} ${spacing[4]}`,
            letterSpacing: letterSpacing.base,
            textTransform: "uppercase",
          }}
          aria-label={cancelLabel || "Cancel"}
        >
          {cancelLabel || "Cancel"}
        </button>
      )}
    </div>
  );
}

// ============================================================
// SKELETON LOADER (additional export)
// ============================================================
interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  count?: number;
  gap?: number;
}

export function SkeletonLoader({
  width = "100%",
  height = 16,
  borderRadius = 4,
  count = 1,
  gap = 8,
}: SkeletonLoaderProps) {
  const reduced = isReducedMotion();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width,
            height,
            borderRadius,
            background: "rgba(255,255,255,0.06)",
            animation: reduced ? "none" : "ip-pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}