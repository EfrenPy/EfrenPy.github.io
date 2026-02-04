/* ==========================================================================
   Sidebar Visibility
   ========================================================================== */

export function initSidebar() {
  const authorUrlsWrapper = document.querySelector('.author__urls-wrapper');
  const authorUrls = document.querySelector('.author__urls');
  const followButton = document.querySelector('.author__urls-wrapper button');

  const updateSidebarVisibility = () => {
    if (!authorUrls) return;

    const hasButton = followButton !== null;
    const buttonVisible = hasButton && followButton.offsetParent !== null;
    const show = !hasButton || (hasButton && !buttonVisible);

    if (show) {
      authorUrls.style.display = '';
    } else {
      authorUrls.style.display = 'none';
    }
  };

  updateSidebarVisibility();
  window.addEventListener('resize', updateSidebarVisibility);

  // Follow menu dropdown toggle
  if (followButton && authorUrls) {
    followButton.addEventListener('click', function() {
      const isHidden = authorUrls.style.display === 'none' ||
                       getComputedStyle(authorUrls).display === 'none';

      authorUrls.style.display = isHidden ? 'block' : 'none';
      this.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isHidden));
    });
  }
}
