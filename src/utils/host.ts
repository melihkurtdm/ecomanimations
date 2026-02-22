// src/utils/host.ts
export function getHostNoWww() {
    return window.location.hostname.replace(/^www\./, "").toLowerCase();
  }