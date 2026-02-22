export function getHostNow() {
    return window.location.hostname.replace(/^www\./, "");
  }
  
  export const getHostNoWww = getHostNow;