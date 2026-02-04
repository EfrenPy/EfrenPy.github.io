/* ==========================================================================
   Offline Indicator
   ========================================================================== */

export function initOfflineIndicator() {
  var banner = document.querySelector('.offline-banner');
  if (!banner) return;

  function updateStatus() {
    if (navigator.onLine) {
      banner.hidden = true;
    } else {
      banner.hidden = false;
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}
