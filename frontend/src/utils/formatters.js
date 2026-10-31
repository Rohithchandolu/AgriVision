// Utilities & formatting helpers for AgroVision AI
export function formatNumber(val, decimals = 2) {
  if (val === undefined || val === null) return "-";
  return Number(val).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(val) {
  if (typeof val === "string" && val.endsWith("%")) return val;
  return `${formatNumber(val, 1)}%`;
}

export function getStatusBadgeClasses(status) {
  switch (status?.toLowerCase()) {
    case "optimal":
    case "optimal growth":
    case "healthy":
    case "healthy / vigorous":
    case "peak vigor":
      return "bg-secondary-fixed/20 text-on-secondary-fixed-variant border border-secondary/30";
    case "critical":
    case "critical stress":
    case "critical stress detected":
      return "bg-error-container text-error border border-error/40 animate-pulse";
    case "moderate":
    case "moderate stress":
    case "warning":
      return "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border border-tertiary/40";
    default:
      return "bg-surface-container-high text-on-surface-variant border border-outline-variant/30";
  }
}

