/* ==========================================================================
   Offline Indicator
   ========================================================================== */

let offlineAbort = null;

export function initOfflineIndicator() {
  if (offlineAbort) offlineAbort.abort();
  offlineAbort = new AbortController();

  var banner = document.querySelector('.offline-banner');
  if (!banner) return;

  function updateStatus() {
    if (navigator.onLine) {
      banner.hidden = true;
    } else {
      banner.hidden = false;
    }
  }

  window.addEventListener('online', updateStatus, { signal: offlineAbort.signal });
  window.addEventListener('offline', updateStatus, { signal: offlineAbort.signal });
  updateStatus();
}
