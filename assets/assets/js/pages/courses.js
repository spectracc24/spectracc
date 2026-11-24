/* Course Library — catalog and external course detail pages. */
(function () {
  'use strict';
  var SCC = window.SCC, $ = SCC.$, $$ = SCC.$$, esc = SCC.esc;
  var items = function () { return window.SCC_COURSES || []; };
  var activeCategory = 'All';
  var activeType = 'all';
  var searchTerm = '';

  function categories() {
    return ['All'].concat(Array.from(new Set(items().map(function (c) { return c.category; }).filter(Boolean))).sort());
  }
  function card(c) {
    var media = c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.title) + '" loading="lazy">' : '<div class="course-placeholder"><span>COURSE IMAGE</span><small>Image area</small></div>';
    var count = c.type === 'paid' ? (Number(c.buyers) || 0) + ' buyers' : (Number(c.visitors) || 0) + ' visitors';
    return '<a class="course-card" href="#course-detail/' + encodeURIComponent(c.id) + '">' +
      '<div class="course-card-media">' + media + '<span class="course-access ' + (c.type === 'paid' ? 'paid' : 'free') + '">' + (c.type === 'paid' ? 'Paid' : 'Free') + '</span></div>' +
      '<div class="course-card-body"><div class="course-card-meta"><span>' + esc(c.category || 'Learning') + '</span><span>' + esc(c.format || 'Course') + '</span></div>' +
      '<h3>' + esc(c.title) + '</h3><p>' + esc(c.summary || '') + '</p><div class="course-card-foot"><span>' + esc(count) + '</span><span class="course-open">View course ' + SCC.ic('i-arrow') + '</span></div></div></a>';
  }
  function renderCatalog(root) {
    var cats = categories();
    root.innerHTML = '<div class="course-toolbar"><label class="course-search"><span class="sr-only">Search courses</span>' + SCC.ic('i-search') + '<input id="courseSearch" type="search" placeholder="Search courses, topics, or skills…" value="' + esc(searchTerm) + '"></label>' +
      '<label class="course-filter"><span>Category</span><select id="courseCategory">' + cats.map(function (c) { return '<option value="' + esc(c) + '"' + (c === activeCategory ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></label>' +
      '<label class="course-filter"><span>Access</span><select id="courseType"><option value="all">All access</option><option value="free"' + (activeType === 'free' ? ' selected' : '') + '>Free</option><option value="paid"' + (activeType === 'paid' ? ' selected' : '') + '>Paid</option></select></label></div>' +
      '<div class="course-results-line"><span id="courseCount"></span><span>Curated learning resources by Spectra CC</span></div><div class="course-grid" id="courseGrid"></div>';
    $('#courseSearch', root).addEventListener('input', function (e) { searchTerm = e.target.value; drawCards(root); });
    $('#courseCategory', root).addEventListener('change', function (e) { activeCategory = e.target.value; drawCards(root); });
    $('#courseType', root).addEventListener('change', function (e) { activeType = e.target.value; drawCards(root); });
    drawCards(root);
  }
  function drawCards(root) {
    var q = searchTerm.trim().toLowerCase();
    var filtered = items().filter(function (c) {
      var hay = [c.title, c.category, c.summary, c.format, c.level, (c.tags || []).join(' ')].join(' ').toLowerCase();
      return (activeCategory === 'All' || c.category === activeCategory) && (activeType === 'all' || c.type === activeType) && (!q || hay.indexOf(q) > -1);
    });
    $('#courseCount', root).textContent = filtered.length + (filtered.length === 1 ? ' learning resource' : ' learning resources');
    $('#courseGrid', root).innerHTML = filtered.length ? filtered.map(card).join('') : '<div class="course-empty"><span class="ico">' + SCC.ic('i-search') + '</span><h3>No courses found</h3><p>Try another keyword or change the filters.</p></div>';
  }
  function renderDetail(root) {
    var id = decodeURIComponent((location.hash.split('/')[1] || '').split('?')[0]);
    var c = items().find(function (x) { return x.id === id; });
    if (!c) { root.innerHTML = '<div class="course-empty"><h2>Course not found</h2><p>This learning resource may have been moved or is no longer available.</p><a class="btn btn-p" href="#courses">Back to Course Library ' + SCC.ic('i-arrow') + '</a></div>'; return; }
    var media = c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.title) + '">' : '<div class="course-placeholder detail-placeholder"><span>COURSE IMAGE</span><small>Image area</small></div>';
    var stats = c.type === 'paid' ? '<div><b>' + (Number(c.buyers) || 0).toLocaleString('en-US') + '</b><span>Buyers</span></div>' : '<div><b>' + (Number(c.visitors) || 0).toLocaleString('en-US') + '</b><span>Visitors</span></div>';
    var outcomes = (c.learning_outcomes || []).length ? '<section class="course-detail-section"><h2>What you will learn</h2><ul class="course-outcomes">' + c.learning_outcomes.map(function (x) { return '<li>' + SCC.ic('i-check') + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul></section>' : '';
    root.innerHTML = '<a class="course-back" href="#courses">' + SCC.ic('i-arrow') + ' Back to Course Library</a><div class="course-detail-layout"><article class="course-detail-main"><div class="course-detail-media">' + media + '</div>' +
      '<div class="course-detail-tags"><span>' + esc(c.category || 'Learning') + '</span><span class="course-access ' + (c.type === 'paid' ? 'paid' : 'free') + '">' + (c.type === 'paid' ? 'Paid' : 'Free') + '</span>' + (c.level ? '<span>' + esc(c.level) + '</span>' : '') + '</div>' +
      '<h1>' + esc(c.title) + '</h1><p class="course-detail-summary">' + esc(c.summary || '') + '</p><section class="course-detail-section"><h2>About this learning resource</h2>' + SCC.paras(c.description || c.summary) + '</section>' + outcomes +
      (c.audience ? '<section class="course-detail-section"><h2>Who is this for?</h2><p>' + esc(c.audience) + '</p></section>' : '') +
      '</article><aside class="course-detail-aside"><div class="course-access-panel"><p class="eyebrow">COURSE INFORMATION</p><div class="course-info-row"><span>Access</span><b>' + (c.type === 'paid' ? 'Paid' : 'Free') + '</b></div>' +
      (c.price ? '<div class="course-info-row"><span>Price</span><b>' + esc(c.price) + '</b></div>' : '') + (c.format ? '<div class="course-info-row"><span>Format</span><b>' + esc(c.format) + '</b></div>' : '') +
      (c.level ? '<div class="course-info-row"><span>Level</span><b>' + esc(c.level) + '</b></div>' : '') + (c.duration ? '<div class="course-info-row"><span>Duration</span><b>' + esc(c.duration) + '</b></div>' : '') +
      (c.provider ? '<div class="course-info-row"><span>Provider</span><b>' + esc(c.provider) + '</b></div>' : '') + '<div class="course-stats">' + stats + '</div>' +
      (c.access_url ? '<a class="btn btn-p course-access-btn" href="' + esc(c.access_url) + '" target="_blank" rel="noopener noreferrer">' + (c.type === 'paid' ? 'Access / Purchase course' : 'Access learning resource') + ' ' + SCC.ic('i-external') + '</a>' : '<div class="course-link-pending">Access link will be available soon.</div>') +
      '<p class="course-external-note">You will be redirected to the external platform hosting this learning resource.</p></div></aside></div>';
  }
  SCC.registerPage('courses', {
    init: function (view) { renderCatalog($('#courseRoot', view)); renderDetail($('#courseDetailRoot', view)); },
    show: function (view) { if (location.hash.indexOf('#course-detail/') === 0) { $('#courseCatalogPanel', view).hidden = true; $('#courseDetailPanel', view).hidden = false; renderDetail($('#courseDetailRoot', view)); } else { $('#courseCatalogPanel', view).hidden = false; $('#courseDetailPanel', view).hidden = true; renderCatalog($('#courseRoot', view)); } }
  });
})();
