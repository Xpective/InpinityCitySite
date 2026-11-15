import { useEffect, useRef, useState } from "react";
import {
  AppError,
  getUserFriendlyErrorMessage,
} from "../../lib/errorHandling";
import {
  colors,
  fontSize,
  letterSpacing,
  radius,
  spacing,
} from "../../lib/theme";

// ============================================================
// TYPES
// ============================================================
interface ErrorMessageProps {
  error: AppError | Error | string | null;
  onRetry?: () => void;
  variant?: "inline" | "card" | "toast";
  className?: string;
  showDetails?: boolean;
  onDismiss?: () => void;
  autoDismissMs?: number;
  errorCode?: string;
  locale?: "en" | "de";
  /** 💎 IDEE 1: Auto-Retry bei retryable Network-Errors */
  autoRetryMs?: number;
}

type ErrorTaxonomy = "network" | "contract" | "user" | "system" | "unknown";

// ============================================================
// ERROR CLASSIFICATION
// ============================================================
function classifyError(error: AppError): ErrorTaxonomy {
  const msg = (error.message || "").toLowerCase();
  if (/network|fetch|timeout|offline|econnrefused|subgraph/i.test(msg)) return "network";
  if (/revert|contract|abi|allowance|insufficient|nonce/i.test(msg)) return "contract";
  if (/rejected|denied|cancelled|canceled/i.test(msg)) return "user";
  if (/config|missing env|undefined|null is not/i.test(msg)) return "system";
  const cat = (error as any)?.category as string | undefined;
  if (cat === "network") return "network";
  if (cat === "contract") return "contract";
  if (cat === "validation") return "contract";
  return "unknown";
}

function getSeverityColors(severity: string) {
  switch (severity) {
    case "info":
      return { border: colors.info, bg: "rgba(0,229,255,0.08)", text: colors.info, icon: "ℹ️" };
    case "warning":
      return { border: colors.warning, bg: "rgba(255,136,0,0.08)", text: colors.warning, icon: "⚠️" };
    case "critical":
      return { border: colors.partner, bg: "rgba(192,96,255,0.08)", text: colors.partner, icon: "🚨" };
    case "error":
    default:
      return { border: colors.danger, bg: "rgba(255,51,51,0.08)", text: colors.danger, icon: "❌" };
  }
}

function normalizeError(error: AppError | Error | string): AppError {
  if (typeof error === "string") {
    return {
      name: "Error",
      message: error,
      severity: "error",
      category: "unknown",
      retryable: true,
      timestamp: Date.now(),
    } as AppError;
  }
  if (error instanceof Error && !("severity" in error)) {
    return {
      name: error.name,
      message: error.message,
      severity: "error",
      category: "unknown",
      retryable: true,
      timestamp: Date.now(),
      originalError: error,
    } as AppError;
  }
  return error as AppError;
}

// ============================================================
// 💎 IDEE 5: Copy mit vollem Kontext (URL, UA, Stack)
// ============================================================
async function copyErrorDetails(error: AppError, userMessage: string): Promise<boolean> {
  const payload = {
    timestamp: new Date(error.timestamp).toISOString(),
    severity: error.severity,
    category: error.category,
    message: error.message,
    userMessage,
    context: (error as any).context || null,
    stack: (error as any).originalError?.stack || null,
    url: typeof window !== "undefined" ? window.location.href : null,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    appVersion: "phircle-city-v21",
  };
  const text = JSON.stringify(payload, null, 2);
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// MAIN
// ============================================================
export default function ErrorMessage({
  error,
  onRetry,
  variant = "card",
  className = "",
  showDetails = false,
  onDismiss,
  autoDismissMs,
  errorCode,
  locale = "en",
  autoRetryMs,
}: ErrorMessageProps) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss for toast variant
  useEffect(() => {
    if (variant !== "toast" || dismissed) return;
    if (autoDismissMs == null || autoDismissMs <= 0) return;
    const t = setTimeout(() => {
      setDismissed(true);
      onDismiss?.();
    }, autoDismissMs);
    return () => clearTimeout(t);
  }, [variant, autoDismissMs, dismissed, onDismiss]);

  // 💎 IDEE 3: Shake-Animation bei Critical Error
  useEffect(() => {
    if (!error || dismissed) return;
    const appError = normalizeError(error);
    if (appError.severity !== "critical") return;
    const el = cardRef.current;
    if (!el) return;
    el.style.animation = "errorShake 0.5s ease-in-out";
    const t = setTimeout(() => {
      if (el) el.style.animation = "";
    }, 600);
    return () => clearTimeout(t);
  }, [error, dismissed]);

  // 💎 IDEE 1: Retry-Countdown für Network-Errors
  const taxonomy = error ? classifyError(normalizeError(error)) : "unknown";
  const shouldAutoRetry = Boolean(
    taxonomy === "network" && autoRetryMs && autoRetryMs > 0 && onRetry
  );

  useEffect(() => {
    if (!shouldAutoRetry || dismissed) return;
    const seconds = Math.ceil((autoRetryMs as number) / 1000);
    setRetryCountdown(seconds);

    const tick = setInterval(() => {
      setRetryCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(tick);
          onRetry?.();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [shouldAutoRetry, autoRetryMs, dismissed, onRetry]);

  // 💎 IDEE 4: Keyboard-Shortcuts
  useEffect(() => {
    if (!error || dismissed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onDismiss) {
        e.preventDefault();
        handleDismiss();
      } else if (e.key === "Enter" && onRetry) {
        const appError = normalizeError(error);
        if (appError.retryable) {
          e.preventDefault();
          onRetry();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, dismissed, onRetry, onDismiss]);

  if (!error || dismissed) return null;

  const appError = normalizeError(error);
  const userMessage = getUserFriendlyErrorMessage(appError);
  const severity = appError.severity || "error";
  const severityColors = getSeverityColors(severity);

  const retryLabel = locale === "de" ? "Wiederholen" : "Retry";
  const tryAgainLabel = locale === "de" ? "Erneut versuchen" : "Try Again";
  const dismissLabel = locale === "de" ? "Schließen" : "Dismiss";
  const copyLabel = copied
    ? locale === "de" ? "Kopiert ✓" : "Copied ✓"
    : locale === "de" ? "Details kopieren" : "Copy details";

  const heading =
    locale === "de"
      ? severity === "critical" ? "Kritischer Fehler" : "Ein Fehler ist aufgetreten"
      : severity === "critical" ? "Critical Error" : "Something went wrong";

  const taxonomyLabel: Record<ErrorTaxonomy, string> = {
    network: locale === "de" ? "Netzwerk" : "Network",
    contract: locale === "de" ? "Vertrag" : "Contract",
    user: locale === "de" ? "Abgebrochen" : "Cancelled",
    system: locale === "de" ? "System" : "System",
    unknown: locale === "de" ? "Unbekannt" : "Unknown",
  };

  const handleCopy = async () => {
    const ok = await copyErrorDetails(appError, userMessage);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  // ============================================================
  // INLINE VARIANT
  // ============================================================
  if (variant === "inline") {
    return (
      <div
        className={className}
        role="alert"
        aria-live="assertive"
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing[3],
          padding: `${spacing[2]} ${spacing[4]}`,
          background: severityColors.bg,
          borderRadius: radius.md,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: severityColors.border,
          color: severityColors.text,
          fontSize: fontSize.md,
          fontFamily: "'Courier New', monospace",
        }}
      >
        <span style={{ fontSize: 16 }} aria-hidden="true">{severityColors.icon}</span>
        <span style={{ flex: 1 }}>{userMessage}</span>
        {retryCountdown !== null && (
          <span style={{ fontSize: fontSize.xs, color: colors.warning, letterSpacing: letterSpacing.base }}>
            ⟳ {retryCountdown}s
          </span>
        )}
        {errorCode && (
          <span style={{ fontSize: fontSize.xs, color: colors.textFaint, letterSpacing: letterSpacing.base }}>
            [{errorCode}]
          </span>
        )}
        {onRetry && appError.retryable && (
          <button onClick={onRetry} className="ip-btn ip-btn--ghost ip-btn--sm" style={{ fontSize: fontSize.sm }}>
            {retryLabel}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={handleDismiss}
            aria-label={dismissLabel}
            style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 14, padding: 2 }}
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  // ============================================================
  // TOAST VARIANT
  // ============================================================
  if (variant === "toast") {
    return (
      <div
        ref={cardRef}
        style={{
          position: "fixed",
          bottom: spacing[7],
          right: spacing[7],
          zIndex: 1000,
          maxWidth: 420,
        }}
        role="alert"
        aria-live="assertive"
      >
        <div
          style={{
            padding: `${spacing[4]} ${spacing[5]}`,
            background: colors.bgElevated,
            backdropFilter: "blur(10px)",
            borderRadius: radius.lg,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: severityColors.border,
            color: colors.text,
            fontFamily: "'Courier New', monospace",
            boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 25px ${severityColors.border}44`,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: spacing[3] }}>
            <span style={{ fontSize: 20 }} aria-hidden="true">{severityColors.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: "bold", color: severityColors.text, fontSize: fontSize.md, letterSpacing: letterSpacing.tight }}>
                {taxonomyLabel[taxonomy]}
                {errorCode && ` · ${errorCode}`}
              </p>
              <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSize.sm, lineHeight: 1.5, color: colors.textDim }}>
                {userMessage}
              </p>
              {retryCountdown !== null && (
                <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSize.xs, color: colors.warning }}>
                  ⟳ Auto-retry in {retryCountdown}s…
                </p>
              )}
            </div>
            {onDismiss && (
              <button
                onClick={handleDismiss}
                aria-label={dismissLabel}
                style={{ background: "none", border: "none", color: colors.textFaint, cursor: "pointer", fontSize: 14, padding: 2 }}
              >
                ✕
              </button>
            )}
          </div>

          {(onRetry || showDetails) && (
            <div style={{ display: "flex", gap: spacing[2], marginTop: spacing[3], justifyContent: "flex-end" }}>
              {showDetails && (
                <button
                  onClick={handleCopy}
                  className="ip-btn ip-btn--ghost ip-btn--sm"
                  style={{ fontSize: fontSize.xs, padding: `${spacing[1]} ${spacing[3]}` }}
                >
                  {copyLabel}
                </button>
              )}
              {onRetry && appError.retryable && (
                <button
                  onClick={onRetry}
                  className="ip-btn ip-btn--sm"
                  style={{ fontSize: fontSize.xs, padding: `${spacing[1]} ${spacing[3]}` }}
                >
                  {retryLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // CARD VARIANT (default)
  // ============================================================
  return (
    <div
      ref={cardRef}
      className={className}
      role="alert"
      aria-live="assertive"
      style={{
        padding: spacing[7],
        background: colors.bgCard,
        borderRadius: radius.xl,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: severityColors.border,
        textAlign: "center",
        maxWidth: 520,
        margin: "2rem auto",
        fontFamily: "'Courier New', monospace",
        boxShadow: `0 0 40px ${severityColors.border}33`,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: spacing[3] }} aria-hidden="true">
        {severity === "critical" ? "🚨" : severity === "warning" ? "⚠️" : "❌"}
      </div>

      <div
        style={{
          display: "inline-block",
          padding: `${spacing[1]} ${spacing[3]}`,
          marginBottom: spacing[3],
          background: severityColors.bg,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: severityColors.border,
          borderRadius: 999,
          fontSize: fontSize.xs,
          color: severityColors.text,
          letterSpacing: letterSpacing.wide,
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {taxonomyLabel[taxonomy]}
        {errorCode && ` · ${errorCode}`}
      </div>

      <h3 style={{ color: colors.primary, marginBottom: spacing[2], fontSize: fontSize["2xl"], letterSpacing: letterSpacing.wide, fontWeight: "bold" }}>
        {heading}
      </h3>

      <p style={{ color: colors.textDim, marginBottom: spacing[5], fontSize: fontSize.md, lineHeight: 1.6 }}>
        {userMessage}
      </p>

      {retryCountdown !== null && (
        <div
          style={{
            marginBottom: spacing[4],
            padding: spacing[3],
            background: "rgba(255,136,0,0.08)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: colors.warning,
            borderRadius: radius.md,
            fontSize: fontSize.sm,
            color: colors.warning,
          }}
        >
          ⟳ Auto-retrying in {retryCountdown}s…
        </div>
      )}

      {showDetails && appError.message !== userMessage && (
        <>
          <details
            style={{
              marginBottom: spacing[3],
              textAlign: "left",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.borderSoft,
              borderRadius: radius.md,
              padding: spacing[3],
            }}
          >
            <summary style={{ color: colors.text, cursor: "pointer", fontSize: fontSize.sm, letterSpacing: letterSpacing.base, fontWeight: "bold" }}>
              {locale === "de" ? "Technische Details" : "Technical details"}
            </summary>
            <pre
              style={{
                marginTop: spacing[2],
                padding: spacing[3],
                background: "rgba(0,0,0,0.4)",
                borderRadius: radius.md,
                fontSize: fontSize.xs,
                color: colors.textDim,
                overflow: "auto",
                maxHeight: 200,
                fontFamily: "'Courier New', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {appError.message}
              {(appError as any).context &&
                `\n\nContext: ${JSON.stringify((appError as any).context, null, 2)}`}
            </pre>
          </details>

          {/* 💎 IDEE 2: Stack-Trace-Collapsible */}
          {(appError as any).originalError?.stack && (
            <details
              style={{
                marginBottom: spacing[5],
                textAlign: "left",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: colors.borderSoft,
                borderRadius: radius.md,
                padding: spacing[3],
              }}
            >
              <summary style={{ color: colors.text, cursor: "pointer", fontSize: fontSize.sm, letterSpacing: letterSpacing.base, fontWeight: "bold" }}>
                {locale === "de" ? "Stack-Trace" : "Stack trace"}
              </summary>
              <pre
                style={{
                  marginTop: spacing[2],
                  padding: spacing[3],
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: radius.md,
                  fontSize: fontSize.xs,
                  color: colors.textDim,
                  overflow: "auto",
                  maxHeight: 240,
                  fontFamily: "'Courier New', monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {(appError as any).originalError.stack}
              </pre>
            </details>
          )}
        </>
      )}

      <div style={{ display: "flex", gap: spacing[3], justifyContent: "center", flexWrap: "wrap" }}>
        {onRetry && appError.retryable && (
          <button
            onClick={onRetry}
            className="ip-btn ip-btn--lg"
            style={{
              padding: `${spacing[3]} ${spacing[7]}`,
              fontSize: fontSize.md,
              letterSpacing: letterSpacing.wide,
              textTransform: "uppercase",
              fontWeight: "bold",
              background: `linear-gradient(135deg, ${severityColors.border}, ${severityColors.border}cc)`,
              color: "#000",
            }}
          >
            🔄 {tryAgainLabel}
          </button>
        )}
        {showDetails && (
          <button
            onClick={handleCopy}
            className="ip-btn ip-btn--ghost"
            style={{ padding: `${spacing[3]} ${spacing[5]}`, fontSize: fontSize.sm, letterSpacing: letterSpacing.base }}
          >
            {copyLabel}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="ip-btn ip-btn--ghost"
            style={{ padding: `${spacing[3]} ${spacing[5]}`, fontSize: fontSize.sm, letterSpacing: letterSpacing.base }}
          >
            {dismissLabel}
          </button>
        )}
      </div>

      {/* Keyframe für Shake-Animation */}
      <style>
        {`
          @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
        `}
      </style>
    </div>
  );
}