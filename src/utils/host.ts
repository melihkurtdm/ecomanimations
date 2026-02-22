export function getHostNow() {
    return window.location.hostname.replace(/^www\./, "");
  }