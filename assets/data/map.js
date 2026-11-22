/* ==========================================================================
   INTERACTIVE MAP: edit this file only.

   BASICS
   - Map view:     options.center ([lat, lng]) and options.zoom.
   - Basemaps:     add or remove entries in `basemaps` (any XYZ tile URL).
   - Layers:       add a block in `layers`. Data comes from either
                     data: { ...GeoJSON... }                (pasted inline), or
                     url:  'assets/data/geo/my-layer.geojson'  (a file in assets/data/geo/)
                   Reading a url needs the site to run on a web server (GitHub Pages works;
                   opening index.html directly from disk blocks it).
                   Coordinates in GeoJSON are [longitude, latitude].
   - Legend:       built automatically from each layer.
                   Single style -> one swatch (label = `legend` or the layer name).
                   Classified   -> set classBy ('class') and a `classes` list; one swatch per class.
   - Popups:       popupTitle = property used as the title, popup = [[property, 'Label'], ...].
   - Soon:         any layer or tool with status: 'soon' is shown greyed out with a "Soon" badge.
                   Set a tool to 'ready' only if it exists below (see TOOLS).

   LAYER FIELDS
     id (unique) · name · group · type: 'polygon' | 'line' | 'point' · visible: true/false
     opacity (0 to 1) · style · classBy · classes · legend · popupTitle · popup · description
     data | url · status: 'soon'

   STYLE (polygon/line)  { color, weight, fillColor, fillOpacity, dashArray }
   STYLE (point)         { radius, color, fillColor, fillOpacity, weight }

   TOOLS (ids the page knows how to run)
     distance, area, buffer, coords, stats, upload, export
   Tools with an unknown id, or status 'soon', appear as "Coming soon".

   The sample layers below are ILLUSTRATIVE (generated shapes, not a real site). Replace them.
   ========================================================================== */

window.SCC_MAP = {

  options: {
    center: [-0.655, 109.285],
    zoom: 12,
    minZoom: 3,
    maxZoom: 18,
    height: 'min(78vh, 720px)',
    defaultTab: 'layers',      /* 'layers' or 'tools' */
    legendOpen: true,
    note: 'Sample layers are generated for illustration and do not describe a real site.'
  },

  defaultBasemap: 'osm',
  basemaps: [
    { id: 'osm',  name: 'Streets', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors', maxZoom: 19 },
    { id: 'sat',  name: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics', maxZoom: 18 },
    { id: 'topo', name: 'Terrain', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors, SRTM | &copy; OpenTopoMap (CC-BY-SA)', maxZoom: 17 },
    { id: 'light', name: 'Light', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 19 },
    { id: 'dark', name: 'Dark', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 19 }
  ],

  layers: [
    { id: 'aoi', name: 'Project area', group: 'Boundaries', type: 'polygon', visible: true,
      style: { color: '#17324D', weight: 2.5, fillColor: '#17324D', fillOpacity: 0.03, dashArray: '7 5' },
      legend: 'Project area boundary', popupTitle: 'name', popup: [['status', 'Status']],
      description: 'Outer boundary of the sample project area.',
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Sample project area","status":"Illustrative"},"geometry":{"type":"Polygon","coordinates":[[[109.2046,-0.5996],[109.2317,-0.6002],[109.2521,-0.5995],[109.2731,-0.5999],[109.3,-0.5983],[109.3194,-0.6012],[109.3429,-0.5982],[109.371,-0.6027],[109.3716,-0.6177],[109.3761,-0.6377],[109.379,-0.654],[109.3753,-0.6754],[109.378,-0.695],[109.3581,-0.6935],[109.3303,-0.6939],[109.306,-0.6896],[109.2882,-0.6917],[109.2598,-0.6931],[109.237,-0.6902],[109.2185,-0.6907],[109.2101,-0.6755],[109.2144,-0.6534],[109.209,-0.636],[109.2106,-0.6157],[109.2046,-0.5996]]]}}]} },

    { id: 'landcover', name: 'Land cover (sample)', group: 'Analysis layers', type: 'polygon', visible: true, opacity: 0.8,
      classBy: 'class',
      classes: [
        { value: 'mangrove', label: 'Mangrove', color: '#2F7D5B' },
        { value: 'peat', label: 'Peat swamp forest', color: '#5B9E6E' },
        { value: 'regrowth', label: 'Regrowth', color: '#A9C6B2' },
        { value: 'cleared', label: 'Cleared / plantation', color: '#D9CBA0' },
        { value: 'water', label: 'Open water', color: '#9CC3D5' }
      ],
      style: { weight: 0.8, color: '#ffffff', fillOpacity: 0.85 },
      popupTitle: 'name', popup: [['class', 'Class']],
      description: 'Illustrative land-cover patches.',
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"class":"cleared","name":"Patch 01"},"geometry":{"type":"Polygon","coordinates":[[[109.2046,-0.5996],[109.2317,-0.6002],[109.2317,-0.6178],[109.2106,-0.6157],[109.2046,-0.5996]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 02"},"geometry":{"type":"Polygon","coordinates":[[[109.2317,-0.6002],[109.2521,-0.5995],[109.2514,-0.6214],[109.2317,-0.6178],[109.2317,-0.6002]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 03"},"geometry":{"type":"Polygon","coordinates":[[[109.2521,-0.5995],[109.2731,-0.5999],[109.2777,-0.6211],[109.2514,-0.6214],[109.2521,-0.5995]]]}},{"type":"Feature","properties":{"class":"regrowth","name":"Patch 04"},"geometry":{"type":"Polygon","coordinates":[[[109.2731,-0.5999],[109.3,-0.5983],[109.2987,-0.62],[109.2777,-0.6211],[109.2731,-0.5999]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 05"},"geometry":{"type":"Polygon","coordinates":[[[109.3,-0.5983],[109.3194,-0.6012],[109.321,-0.6187],[109.2987,-0.62],[109.3,-0.5983]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 06"},"geometry":{"type":"Polygon","coordinates":[[[109.3194,-0.6012],[109.3429,-0.5982],[109.3476,-0.6165],[109.321,-0.6187],[109.3194,-0.6012]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 07"},"geometry":{"type":"Polygon","coordinates":[[[109.3429,-0.5982],[109.371,-0.6027],[109.3716,-0.6177],[109.3476,-0.6165],[109.3429,-0.5982]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 08"},"geometry":{"type":"Polygon","coordinates":[[[109.2106,-0.6157],[109.2317,-0.6178],[109.2322,-0.6383],[109.209,-0.636],[109.2106,-0.6157]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 09"},"geometry":{"type":"Polygon","coordinates":[[[109.2317,-0.6178],[109.2514,-0.6214],[109.2597,-0.6341],[109.2322,-0.6383],[109.2317,-0.6178]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 10"},"geometry":{"type":"Polygon","coordinates":[[[109.2514,-0.6214],[109.2777,-0.6211],[109.2821,-0.6358],[109.2597,-0.6341],[109.2514,-0.6214]]]}},{"type":"Feature","properties":{"class":"regrowth","name":"Patch 11"},"geometry":{"type":"Polygon","coordinates":[[[109.2777,-0.6211],[109.2987,-0.62],[109.3016,-0.6386],[109.2821,-0.6358],[109.2777,-0.6211]]]}},{"type":"Feature","properties":{"class":"regrowth","name":"Patch 12"},"geometry":{"type":"Polygon","coordinates":[[[109.2987,-0.62],[109.321,-0.6187],[109.3249,-0.6395],[109.3016,-0.6386],[109.2987,-0.62]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 13"},"geometry":{"type":"Polygon","coordinates":[[[109.321,-0.6187],[109.3476,-0.6165],[109.352,-0.6376],[109.3249,-0.6395],[109.321,-0.6187]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 14"},"geometry":{"type":"Polygon","coordinates":[[[109.3476,-0.6165],[109.3716,-0.6177],[109.3761,-0.6377],[109.352,-0.6376],[109.3476,-0.6165]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 15"},"geometry":{"type":"Polygon","coordinates":[[[109.209,-0.636],[109.2322,-0.6383],[109.2307,-0.6572],[109.2144,-0.6534],[109.209,-0.636]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 16"},"geometry":{"type":"Polygon","coordinates":[[[109.2322,-0.6383],[109.2597,-0.6341],[109.2611,-0.6557],[109.2307,-0.6572],[109.2322,-0.6383]]]}},{"type":"Feature","properties":{"class":"regrowth","name":"Patch 17"},"geometry":{"type":"Polygon","coordinates":[[[109.2597,-0.6341],[109.2821,-0.6358],[109.2851,-0.6561],[109.2611,-0.6557],[109.2597,-0.6341]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 18"},"geometry":{"type":"Polygon","coordinates":[[[109.2821,-0.6358],[109.3016,-0.6386],[109.3018,-0.6547],[109.2851,-0.6561],[109.2821,-0.6358]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 19"},"geometry":{"type":"Polygon","coordinates":[[[109.3016,-0.6386],[109.3249,-0.6395],[109.3306,-0.6569],[109.3018,-0.6547],[109.3016,-0.6386]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 20"},"geometry":{"type":"Polygon","coordinates":[[[109.3249,-0.6395],[109.352,-0.6376],[109.3489,-0.6565],[109.3306,-0.6569],[109.3249,-0.6395]]]}},{"type":"Feature","properties":{"class":"cleared","name":"Patch 21"},"geometry":{"type":"Polygon","coordinates":[[[109.352,-0.6376],[109.3761,-0.6377],[109.379,-0.654],[109.3489,-0.6565],[109.352,-0.6376]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 22"},"geometry":{"type":"Polygon","coordinates":[[[109.2144,-0.6534],[109.2307,-0.6572],[109.2335,-0.6766],[109.2101,-0.6755],[109.2144,-0.6534]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 23"},"geometry":{"type":"Polygon","coordinates":[[[109.2307,-0.6572],[109.2611,-0.6557],[109.2622,-0.6759],[109.2335,-0.6766],[109.2307,-0.6572]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 24"},"geometry":{"type":"Polygon","coordinates":[[[109.2611,-0.6557],[109.2851,-0.6561],[109.2839,-0.6743],[109.2622,-0.6759],[109.2611,-0.6557]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 25"},"geometry":{"type":"Polygon","coordinates":[[[109.2851,-0.6561],[109.3018,-0.6547],[109.3047,-0.6726],[109.2839,-0.6743],[109.2851,-0.6561]]]}},{"type":"Feature","properties":{"class":"regrowth","name":"Patch 26"},"geometry":{"type":"Polygon","coordinates":[[[109.3018,-0.6547],[109.3306,-0.6569],[109.3277,-0.6731],[109.3047,-0.6726],[109.3018,-0.6547]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 27"},"geometry":{"type":"Polygon","coordinates":[[[109.3306,-0.6569],[109.3489,-0.6565],[109.3511,-0.6745],[109.3277,-0.6731],[109.3306,-0.6569]]]}},{"type":"Feature","properties":{"class":"peat","name":"Patch 28"},"geometry":{"type":"Polygon","coordinates":[[[109.3489,-0.6565],[109.379,-0.654],[109.3753,-0.6754],[109.3511,-0.6745],[109.3489,-0.6565]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 29"},"geometry":{"type":"Polygon","coordinates":[[[109.2101,-0.6755],[109.2335,-0.6766],[109.237,-0.6902],[109.2185,-0.6907],[109.2101,-0.6755]]]}},{"type":"Feature","properties":{"class":"water","name":"Patch 30"},"geometry":{"type":"Polygon","coordinates":[[[109.2335,-0.6766],[109.2622,-0.6759],[109.2598,-0.6931],[109.237,-0.6902],[109.2335,-0.6766]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 31"},"geometry":{"type":"Polygon","coordinates":[[[109.2622,-0.6759],[109.2839,-0.6743],[109.2882,-0.6917],[109.2598,-0.6931],[109.2622,-0.6759]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 32"},"geometry":{"type":"Polygon","coordinates":[[[109.2839,-0.6743],[109.3047,-0.6726],[109.306,-0.6896],[109.2882,-0.6917],[109.2839,-0.6743]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 33"},"geometry":{"type":"Polygon","coordinates":[[[109.3047,-0.6726],[109.3277,-0.6731],[109.3303,-0.6939],[109.306,-0.6896],[109.3047,-0.6726]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 34"},"geometry":{"type":"Polygon","coordinates":[[[109.3277,-0.6731],[109.3511,-0.6745],[109.3581,-0.6935],[109.3303,-0.6939],[109.3277,-0.6731]]]}},{"type":"Feature","properties":{"class":"mangrove","name":"Patch 35"},"geometry":{"type":"Polygon","coordinates":[[[109.3511,-0.6745],[109.3753,-0.6754],[109.378,-0.695],[109.3581,-0.6935],[109.3511,-0.6745]]]}}]} },

    { id: 'river', name: 'Rivers', group: 'Hydrology', type: 'line', visible: true,
      style: { color: '#2B7FB8', weight: 3 }, legend: 'River', popupTitle: 'name',
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Sample river"},"geometry":{"type":"LineString","coordinates":[[109.3004,-0.596],[109.3122,-0.6027],[109.3209,-0.6094],[109.3248,-0.6161],[109.3238,-0.6228],[109.3199,-0.6295],[109.3154,-0.6362],[109.312,-0.6429],[109.3102,-0.6496],[109.3089,-0.6563],[109.3065,-0.663],[109.3019,-0.6697],[109.2955,-0.6764],[109.289,-0.6831],[109.2853,-0.6898],[109.2864,-0.6965]]}}]} },

    { id: 'transect', name: 'Survey transect', group: 'Field data', type: 'line', visible: true,
      style: { color: '#C0392B', weight: 3, dashArray: '2 7' }, legend: 'Survey transect', popupTitle: 'name',
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Transect T1","length_note":"Survey line"},"geometry":{"type":"LineString","coordinates":[[109.217,-0.612],[109.275,-0.65],[109.325,-0.662],[109.365,-0.688]]}}]} },

    { id: 'plots', name: 'Survey plots', group: 'Field data', type: 'point', visible: true,
      style: { radius: 6, color: '#ffffff', weight: 1.5, fillColor: '#17324D', fillOpacity: 1 },
      legend: 'Survey plot', popupTitle: 'name', popup: [['land cover', 'Land cover'], ['canopy', 'Canopy cover (%)']],
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Plot P-01","land cover":"Peat","canopy":74},"geometry":{"type":"Point","coordinates":[109.2491,-0.6408]}},{"type":"Feature","properties":{"name":"Plot P-02","land cover":"Cleared","canopy":15},"geometry":{"type":"Point","coordinates":[109.2468,-0.6143]}},{"type":"Feature","properties":{"name":"Plot P-03","land cover":"Mangrove","canopy":73},"geometry":{"type":"Point","coordinates":[109.2796,-0.678]}},{"type":"Feature","properties":{"name":"Plot P-04","land cover":"Mangrove","canopy":79},"geometry":{"type":"Point","coordinates":[109.2974,-0.6727]}},{"type":"Feature","properties":{"name":"Plot P-05","land cover":"Regrowth","canopy":48},"geometry":{"type":"Point","coordinates":[109.3093,-0.631]}},{"type":"Feature","properties":{"name":"Plot P-06","land cover":"Cleared","canopy":3},"geometry":{"type":"Point","coordinates":[109.3468,-0.6471]}},{"type":"Feature","properties":{"name":"Plot P-07","land cover":"Cleared","canopy":11},"geometry":{"type":"Point","coordinates":[109.22,-0.6351]}},{"type":"Feature","properties":{"name":"Plot P-08","land cover":"Cleared","canopy":13},"geometry":{"type":"Point","coordinates":[109.2618,-0.608]}},{"type":"Feature","properties":{"name":"Plot P-09","land cover":"Cleared","canopy":13},"geometry":{"type":"Point","coordinates":[109.3205,-0.6154]}},{"type":"Feature","properties":{"name":"Plot P-10","land cover":"Peat","canopy":68},"geometry":{"type":"Point","coordinates":[109.2289,-0.6472]}},{"type":"Feature","properties":{"name":"Plot P-11","land cover":"Cleared","canopy":14},"geometry":{"type":"Point","coordinates":[109.3383,-0.6398]}},{"type":"Feature","properties":{"name":"Plot P-12","land cover":"Cleared","canopy":5},"geometry":{"type":"Point","coordinates":[109.2989,-0.6371]}},{"type":"Feature","properties":{"name":"Plot P-13","land cover":"Peat","canopy":67},"geometry":{"type":"Point","coordinates":[109.3566,-0.617]}},{"type":"Feature","properties":{"name":"Plot P-14","land cover":"Regrowth","canopy":54},"geometry":{"type":"Point","coordinates":[109.2789,-0.62]}}]} },

    { id: 'villages', name: 'Villages', group: 'Field data', type: 'point', visible: true,
      style: { radius: 8, color: '#ffffff', weight: 2, fillColor: '#168C91', fillOpacity: 1 },
      legend: 'Village', popupTitle: 'name', popup: [['type', 'Type']],
      data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"[Village A]","type":"Village"},"geometry":{"type":"Point","coordinates":[109.235,-0.612]}},{"type":"Feature","properties":{"name":"[Village B]","type":"Village"},"geometry":{"type":"Point","coordinates":[109.31,-0.62]}},{"type":"Feature","properties":{"name":"[Village C]","type":"Village"},"geometry":{"type":"Point","coordinates":[109.345,-0.652]}}]} },

    { id: 'ndvi', name: 'Vegetation trend 2015 to 2025', group: 'Analysis layers', type: 'polygon', status: 'soon' },
    { id: 'peatdepth', name: 'Peat depth model', group: 'Analysis layers', type: 'polygon', status: 'soon' }
  ],

  tools: [
    { id: 'distance', label: 'Measure distance', desc: 'Click points along a path.', status: 'ready' },
    { id: 'area',     label: 'Measure area',     desc: 'Click the corners of a polygon.', status: 'ready' },
    { id: 'buffer',   label: 'Buffer',           desc: 'Click a point, set a radius.', status: 'ready' },
    { id: 'coords',   label: 'Coordinate picker', desc: 'Click to read and copy coordinates.', status: 'ready' },
    { id: 'stats',    label: 'Layer statistics', desc: 'Counts, area, length and class shares.', status: 'ready' },
    { id: 'upload',   label: 'Add GeoJSON',      desc: 'Open a local file. It stays in your browser.', status: 'ready' },
    { id: 'export',   label: 'Export layer',     desc: 'Download a layer as GeoJSON.', status: 'ready' },
    { id: 'overlay',  label: 'Overlay and intersect', desc: 'Combine two layers.', status: 'soon' },
    { id: 'zonal',    label: 'Zonal statistics',  desc: 'Summarize rasters by zone.', status: 'soon' },
    { id: 'timeseries', label: 'Time series',     desc: 'Vegetation index over time.', status: 'soon' },
    { id: 'print',    label: 'Print and export image', desc: 'Save the current view.', status: 'soon' }
  ]
};
