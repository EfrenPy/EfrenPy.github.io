/* ==========================================================================
   Site Search
   ========================================================================== */

export function initSearch() {
  var toggle = document.querySelector('.search-toggle');
  var overlay = document.querySelector('.search-overlay');
  if (!toggle || !overlay) return;

  var input = overlay.querySelector('.search-overlay__input');
  var resultsContainer = overlay.querySelector('.search-overlay__results');
  var closeBtn = overlay.querySelector('.search-overlay__close');
  var searchData = null;

  function openSearch() {
    overlay.hidden = false;
    document.body.classList.add('overflow--hidden');
    input.value = '';
    resultsContainer.innerHTML = '';
    setTimeout(function() { input.focus(); }, 50);
    loadSearchData();
  }

  function closeSearch() {
    overlay.hidden = true;
    document.body.classList.remove('overflow--hidden');
    toggle.focus();
  }

  function loadSearchData() {
    if (searchData) return;
    fetch('/search.json')
      .then(function(res) { return res.json(); })
      .then(function(data) { searchData = data; })
      .catch(function() { searchData = []; });
  }

  function performSearch(query) {
    if (!searchData || !query) {
      resultsContainer.innerHTML = '';
      return;
    }

    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    var results = searchData.filter(function(item) {
      var text = (item.title + ' ' + item.excerpt + ' ' + (item.tags || []).join(' ')).toLowerCase();
      return terms.every(function(term) { return text.indexOf(term) !== -1; });
    });

    if (results.length === 0) {
      var lang = document.documentElement.getAttribute('data-lang') || 'en';
      resultsContainer.innerHTML = '<div class="search-no-results">' + (lang === 'es' ? 'No se encontraron resultados.' : 'No results found.') + '</div>';
      return;
    }

    resultsContainer.innerHTML = results.slice(0, 10).map(function(item) {
      var excerpt = item.excerpt || '';
      if (excerpt.length > 120) excerpt = excerpt.substring(0, 120) + '...';
      return '<a class="search-result" href="' + encodeURI(item.url) + '">' +
        '<div class="search-result__title">' + escapeHtml(item.title) + '</div>' +
        (excerpt ? '<div class="search-result__excerpt">' + escapeHtml(excerpt) + '</div>' : '') +
        '</a>';
    }).join('');
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  var debounceTimer;
  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    var query = input.value.trim();
    debounceTimer = setTimeout(function() { performSearch(query); }, 200);
  });

  toggle.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !overlay.hidden) {
      closeSearch();
    }
    // Ctrl/Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.hidden) {
        openSearch();
      } else {
        closeSearch();
      }
    }
  });
}
