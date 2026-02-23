export function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase().replace(/^www\./, "");
}

export function getHostNowRaw() {
  return window.location.hostname;
}

export function getHostNow() {
  return normalizeHostname(getHostNowRaw());
}

// Backwards-compatible alias (kept in case it's used elsewhere)
export const getHostNowWw = getHostNow;