/* ==========================================================================
   Screen Reader Announcements
   ========================================================================== */

var announceTimeout = null;

export function announce(message) {
  var announcer = document.getElementById('sr-announcer');
  if (announcer) {
    if (announceTimeout) clearTimeout(announceTimeout);
    announcer.textContent = message;
    announceTimeout = setTimeout(function() { announcer.textContent = ''; }, 1000);
  }
}
