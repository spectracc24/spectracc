/* ==========================================================================
   PROJECTS: edit this file only. Layout and options live in settings.js (section `projects`).

   FIELDS
     id           (required) unique, no spaces
     title        (required)
     pillar       (required) 'Consulting' | 'Research' | 'Training' (used by the filter buttons)
     area         (optional) practice area, shown under the title
     client       (optional) shown in the opened details
     location     (optional)
     year         (optional) '2026' or '2024 to 2026'
     summary      (recommended) 1 to 3 sentences
     deliverables (optional) ['Report', 'Maps']
     tags         (optional) keyword tags
     image        (optional) 'assets/img/projects/name.jpg'
     feature      (optional) generated figure: { kind: 'lc' | 'carbon' | 'grid', seed: 4 }
     files        (optional) [{ label: 'Download brief', url: 'assets/files/...', format: 'PDF', size: '1 MB' }]
     link         (optional) { url: 'https://...', label: 'Project page' }
     status       (optional) 'soon' shows a "Coming soon" badge
     sample       (optional) true shows "Sample entry". Delete for real entries.
   ========================================================================== */

window.SCC_PROJECTS = [
  {
    id: 'p-platform', sample: false, 
    title: 'TAPAK (Teknologi Akuisisi dan Pencatatan Hutan Kita)', pillar: 'Consulting', area: 'Monitoring tools',
    client: 'Village Forest Management Institutions (LDPH)', 
    location: 'Kapuas Hulu District', 
    year: '2026',
    image: 'assets/img/projects/tapak_app_full.jpg',
    summary: 'Limited funding prevents local communities from accessing adequate navigation and spatial tracking equipment, which are essential for documenting conservation activities and monitoring natural resources. TAPAK addresses this challenge through an open-source, Android-based, and user-friendly navigation and spatial tracking tool. It enables communities to collect geospatial data, track field activities, and document conservation efforts using readily available smartphones at no additional cost. ',
    deliverables: ['TAPAK android application', 'User guide and technical Documentation'], tags: ['Spatial monitoring tools'],
    feature: { kind: 'carbon', seed: 4 }
  },
  {
    id: 'p-lulc', sample: true, title: 'Land-use and land-cover change mapping', pillar: 'Consulting', area: 'Remote sensing',
    client: '[Client]', location: '[Location]', year: '[Year]',
    summary: 'Classified land-cover maps for several periods, with change statistics and an accuracy assessment.',
    deliverables: ['Classified maps by period', 'Change statistics', 'Accuracy assessment'], tags: ['LULCC'],
    feature: { kind: 'lc', seed: 31 }
  },
  {
    id: 'p-baseline', sample: true, title: 'Environmental baseline and landscape diagnostic', pillar: 'Research', area: 'Environmental baseline assessments',
    client: '[Client]', location: '[Location]', year: '[Year]',
    summary: 'Reference conditions and a diagnostic of constraints and opportunities for a project landscape.',
    deliverables: ['Baseline report', 'Reference condition maps', 'Constraints and opportunities'], tags: ['Baseline'],
    feature: { kind: 'lc', seed: 17 }
  },
  {
    id: 'p-monitoring', sample: true, title: 'Monitoring framework and indicator design', pillar: 'Research', area: 'Monitoring, evaluation and performance',
    client: '[Client]', location: '[Location]', year: '[Year]',
    summary: 'Indicators, a monitoring protocol and a reporting template a project team can run on its own.',
    deliverables: ['Indicator set', 'Monitoring protocol', 'Reporting template'], tags: ['Monitoring'],
    feature: { kind: 'grid', seed: 22 }
  },
  {
    id: 'p-gis-training', sample: true, title: 'Applied GIS and cartography training', pillar: 'Training', area: 'Capacity development',
    client: '[Client]', location: '[Location]', year: '[Year]',
    summary: 'Hands-on modules in applied GIS and map production with practice datasets.',
    deliverables: ['Training modules', 'Practice datasets', 'Participant map portfolio'], tags: ['GIS', 'Cartography'],
    feature: { kind: 'grid', seed: 6 }
  },
  {
    id: 'p-database', sample: true, title: 'Geospatial database and field data QC/QA', pillar: 'Training', area: 'Geospatial data engineering',
    client: '[Client]', location: '[Location]', year: '[Year]',
    summary: 'A standard spatial database, naming workflow and QC/QA checklist for field data collection.',
    deliverables: ['Spatial database structure', 'QC/QA checklist', 'Field data protocol'], tags: ['Data'],
    feature: { kind: 'carbon', seed: 27 }
  }
];
