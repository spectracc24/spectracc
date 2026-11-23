/* Showcase pages: Case Studies and Projects.
   Data: assets/data/case-studies.js and assets/data/projects.js
   Look:  assets/data/settings.js (sections `cases` and `projects`) */
(function () {
  'use strict';
  var SCC = window.SCC, $ = SCC.$, esc = SCC.esc, ic = SCC.ic;
  var low = function (a) { return a.filter(Boolean).join(' ').toLowerCase() };

  function caseStory(c) {
    return '<h3 class="it-h">Context</h3><p>' + esc(c.context) + '</p>' +
      '<h3 class="it-h">Approach</h3><ul class="ticks">' + (c.approach || []).map(function (a) { return '<li>' + ic('i-check') + '<span>' + esc(a) + '</span></li>' }).join('') + '</ul>' +
      '<h3 class="it-h">Outcome</h3><p>' + esc(c.outcome) + '</p>'
  }

  SCC.registerPage('cases', {
    init: function (view) {
      var items = (window.SCC_CASES || []).map(function (c) {
        return {
          id: 'case-' + c.id, kicker: c.pillar, title: c.title, meta: [c.client, c.period].filter(Boolean), summary: c.context, tags: c.tags,
          media: { image: c.image, alt: c.title, feature: c.feature, caption: c.caption }, files: c.files, link: c.link, links: c.links, status: c.status, sample: c.sample, filterKey: c.pillar,
          searchText: low([c.title, c.pillar, c.client, c.context, (c.tags || []).join(' ')]), sortDate: c.period || '',
          story: function () { return caseStory(c) }, detail: function () { return caseStory(c) }
        }
      });
      SCC.collection($('#caseRoot', view), items, SCC.cfg('cases'), { noun: 'case studies' })
    }
  });

  SCC.registerPage('projects', {
    init: function (view) {
      var items = (window.SCC_PROJECTS || []).map(function (p) {
        return {
          id: 'proj-' + p.id, kicker: p.pillar, title: p.title, meta: [p.area].filter(Boolean), summary: p.summary, tags: p.tags,
          media: { image: p.image, alt: p.title, feature: p.feature, caption: p.caption }, files: p.files, link: p.link, links: p.links, status: p.status, sample: p.sample, filterKey: p.pillar,
          searchText: low([p.title, p.area, p.pillar, p.client, p.location, p.summary, (p.deliverables || []).join(' '), (p.tags || []).join(' ')]), sortDate: p.year || '',
          detail: function () {
            var rows = [['Client', p.client], ['Location', p.location], ['Year', p.year], ['Practice area', p.area], ['Deliverables', (p.deliverables || []).join(', ')]].filter(function (r) { return r[1] });
            return (p.summary ? '<p>' + esc(p.summary) + '</p>' : '') + (rows.length ? '<dl class="dl-grid">' + rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>' }).join('') + '</dl>' : '')
          }
        }
      });
      SCC.collection($('#projRoot', view), items, SCC.cfg('projects'), { noun: 'projects' })
    }
  });
})();
