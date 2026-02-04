/* ==========================================================================
   Screen Reader Announcements
   ========================================================================== */

export function announce(message) {
  var announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = message;
    setTimeout(function() { announcer.textContent = ''; }, 1000);
  }
}
