/* ==========================================================================
   Modern vanilla JavaScript - no jQuery dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // Sticky footer - adjust body margin to account for footer height
  const footer = document.querySelector('.page__footer');
  if (footer) {
    const updateFooterMargin = () => {
      document.body.style.marginBottom = footer.offsetHeight + 'px';
    };

    updateFooterMargin();

    // Use ResizeObserver for efficient resize handling
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateFooterMargin);
      resizeObserver.observe(footer);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', updateFooterMargin);
    }
  }

  // Sidebar visibility logic
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
    });
  }

  // Simple image lightbox using native dialog
  const imageLinks = document.querySelectorAll(
    'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPG"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]'
  );

  if (imageLinks.length > 0) {
    // Create lightbox dialog
    const dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.innerHTML = `
      <img src="" alt="Lightbox image">
      <button class="lightbox-close" aria-label="Close">&times;</button>
    `;
    document.body.appendChild(dialog);

    const lightboxImg = dialog.querySelector('img');
    const closeBtn = dialog.querySelector('.lightbox-close');

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
      .image-lightbox {
        border: none;
        padding: 0;
        background: rgba(0, 0, 0, 0.9);
        max-width: 95vw;
        max-height: 95vh;
      }
      .image-lightbox::backdrop {
        background: rgba(0, 0, 0, 0.8);
      }
      .image-lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        display: block;
      }
      .image-lightbox .lightbox-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
      }
      .image-lightbox .lightbox-close:hover {
        background: #fff;
      }
    `;
    document.head.appendChild(style);

    // Attach click handlers to image links
    imageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        lightboxImg.src = this.href;
        dialog.showModal();
      });
    });

    // Close handlers
    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

});

// Enable smooth scrolling via CSS (add to html element)
document.documentElement.style.scrollBehavior = 'smooth';
