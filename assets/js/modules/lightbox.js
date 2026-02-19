/* ==========================================================================
   Image Lightbox with Keyboard Navigation
   ========================================================================== */

var showPrev, showNext;

export function initLightbox() {
  var imageLinks = document.querySelectorAll(
    'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPG"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]'
  );

  if (imageLinks.length === 0) return;

  var currentIndex = 0;
  var images = Array.from(imageLinks);

  // Reuse existing dialog or create new one
  var dialog = document.querySelector('.image-lightbox');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.innerHTML =
      '<button class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
      '<img src="" alt="Lightbox image">' +
      '<button class="lightbox-next" aria-label="Next image">&#8250;</button>' +
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(dialog);

    // Handle broken images
    dialog.querySelector('img').addEventListener('error', function() {
      this.alt = 'Image could not be loaded';
      this.style.minWidth = '300px';
      this.style.minHeight = '200px';
      this.style.display = 'flex';
      this.style.alignItems = 'center';
      this.style.background = 'rgba(255,255,255,0.1)';
    });

    // Add lightbox styles once
    var style = document.createElement('style');
    style.textContent =
      '.image-lightbox { border: none; padding: 0; background: rgba(0,0,0,0.9); max-width: 95vw; max-height: 95vh; position: relative; }' +
      '.image-lightbox::backdrop { background: rgba(0,0,0,0.8); }' +
      '.image-lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; display: block; }' +
      '.image-lightbox .lightbox-close { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; line-height: 1; }' +
      '.image-lightbox .lightbox-close:hover { background: #fff; }' +
      '.image-lightbox .lightbox-prev, .image-lightbox .lightbox-next { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 28px; cursor: pointer; line-height: 1; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }' +
      '.image-lightbox .lightbox-prev:hover, .image-lightbox .lightbox-next:hover { background: #fff; }' +
      '.image-lightbox .lightbox-prev { left: 10px; }' +
      '.image-lightbox .lightbox-next { right: 10px; }' +
      '.image-lightbox .lightbox-prev[hidden], .image-lightbox .lightbox-next[hidden] { display: none; }' +
      '.image-lightbox .lightbox-counter { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 0.85rem; }';
    document.head.appendChild(style);

    // Close handlers (only bind once)
    dialog.querySelector('.lightbox-close').addEventListener('click', function() { dialog.close(); });
    dialog.addEventListener('click', function(e) {
      if (e.target === dialog) dialog.close();
    });

    // Nav and keyboard handlers (only bind once, use module-level refs)
    var prevBtn = dialog.querySelector('.lightbox-prev');
    var nextBtn = dialog.querySelector('.lightbox-next');
    prevBtn.addEventListener('click', function(e) { e.stopPropagation(); if (showPrev) showPrev(); });
    nextBtn.addEventListener('click', function(e) { e.stopPropagation(); if (showNext) showNext(); });

    dialog.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (showPrev) showPrev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); if (showNext) showNext(); }
    });
  }

  var lightboxImg = dialog.querySelector('img');
  var prevBtn = dialog.querySelector('.lightbox-prev');
  var nextBtn = dialog.querySelector('.lightbox-next');
  var counter = dialog.querySelector('.lightbox-counter');

  function showImage(index) {
    currentIndex = index;
    // Reset error styles from previous failed loads
    lightboxImg.style.minWidth = '';
    lightboxImg.style.minHeight = '';
    lightboxImg.style.background = '';
    lightboxImg.src = images[index].href;
    // Dynamic alt text from source image
    var sourceImg = images[index].querySelector('img');
    lightboxImg.alt = (sourceImg && sourceImg.alt) ? sourceImg.alt : 'Image ' + (index + 1);
    // Update nav button visibility
    var hasMultiple = images.length > 1;
    prevBtn.hidden = !hasMultiple;
    nextBtn.hidden = !hasMultiple;
    // Update counter
    counter.textContent = hasMultiple ? (index + 1) + ' / ' + images.length : '';
  }

  // Update module-level refs so dialog handlers use current image set
  showPrev = function() {
    showImage((currentIndex - 1 + images.length) % images.length);
  };
  showNext = function() {
    showImage((currentIndex + 1) % images.length);
  };

  // Attach click handlers to image links
  images.forEach(function(link, index) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showImage(index);
      dialog.showModal();
    });
  });
}
