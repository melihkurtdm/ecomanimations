export function getHostNow() {
    return window.location.hostname.replace(/^www\./, "").toLowerCase();
  }
  
  export const getHostNowWw = getHostNow;