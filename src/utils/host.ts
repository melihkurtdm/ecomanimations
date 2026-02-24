export function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase().replace(/^www\./, "");
}

export function getHostNowRaw() {
  return window.location.hostname;
}

export function getHostNow() {
  const host = window.location.hostname.trim().toLowerCase();

  // Vercel domain'lerinde normalize etme; host'u aynen kullan
  if (host.endsWith(".vercel.app")) {
    return host;
  }

  // Diğerlerinde www temizle
  return host.startsWith("www.") ? host.slice(4) : host;
}

// Backwards-compatible alias (kept in case it's used elsewhere)
export const getHostNowWw = getHostNow;