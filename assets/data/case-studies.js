/* ==========================================================================
   CASE STUDIES: edit this file only. Layout and options live in settings.js (section `cases`).

   FIELDS
     id        (required) unique, no spaces
     title     (required)
     pillar    (required) 'Geospatial consulting' | 'Applied research' | 'Training and capacity'
     client    (optional)
     period    (optional)
     context   (required) the starting situation (also used as the short summary)
     approach  (required) list of steps
     outcome   (required) what the client got
     tags      (optional)
     image     (optional) 'assets/img/cases/name.jpg'
     feature   (optional) 'compare' makes an interactive before/after slider:
                 { kind: 'compare', seed: 21, labels: ['2015', '2025'] }
               or a generated figure: { kind: 'lc' | 'carbon' | 'grid', seed: 8 }
     files     (optional) [{ label: 'Download case brief', url: 'assets/files/...', format: 'PDF', size: '1 MB' }]
     status    (optional) 'soon' shows a "Coming soon" badge
     sample    (optional) true shows "Sample case". Delete for real entries.
   ========================================================================== */

window.SCC_CASES = [
  {
    id: 'c1', sample: false, title: 'MultiMulti-Source Land-Cover Data Fusion', pillar: 'Applied research',
    period: '2026', tags: ['Remote sensing', 'LULCC', 'Forest cover'],
    context: 'Land-cover data are fundamental to REDD+ projects as they provide the spatial basis for quantifying differences in GHG emissions between without-project and with-project scenarios. However, the performance of global land-cover products may vary across landscape characteristics, forest types, and land-use patterns, potentially resulting in omission and commission errors when compared with local conditions. Integrating multiple land-cover datasets can provide complementary spatial evidence to address these discrepancies and improve classification accuracy.',
    approach: ['The fusion based on a majority-voting approach with predefined decision rules', 'Boolean-rule temporal propagation for in multi-year integration.'],
    outcome: 'The correction reduced the dominant misclassification of non-forest areas as forest and improved the overall balance between forest and non-forest classification accuracy. However, this improvement involved a slight increase in errors in the opposite direction, indicating a redistribution rather than a uniform reduction of classification errors.',
    image: 'assets/img/cases/lc_fusion.jpg',
    feature: { kind: 'grid', seed: 8 },
    files: [{label: 'Report and script', url: 'https://github.com/ivannalissaputra24/GEE_land_cover_fusion'}]
  },
  {
    id: 'c2', sample: true, title: 'Baseline assessment of village forest areas', pillar: 'Applied research',
    client: '[Client name]', period: '[Month Year]', tags: ['Baseline', 'Village forest', 'Field survey'],
    context: 'Village managers needed reference conditions for their forest area before setting management targets.',
    approach: ['Derived land-cover classes from satellite imagery and verified them with field points.', 'Ran a landscape diagnostic to identify constraints and opportunities.', 'Defined indicators that the village team can track over time.'],
    outcome: 'A baseline report with maps, indicators and a monitoring starting point that village managers can plan with.',
    feature: { kind: 'grid', seed: 8 }
  },
  {
    id: 'c3', sample: true, title: 'Building an in-house GIS routine', pillar: 'Training and capacity',
    client: '[Client name]', period: '[Month Year]', tags: ['Capacity building', 'QC/QA', 'Spatial database'],
    context: 'A growing organization collected field data in many formats and had no shared spatial database.',
    approach: ['Set up a standard spatial database and naming workflow.', 'Wrote QC/QA protocols for field data collection.', 'Ran hands-on sessions in applied GIS and map production with the team.'],
    outcome: 'A team that manages its own spatial data, with written procedures that outlast the engagement.',
    feature: { kind: 'carbon', seed: 14 }
  }
];
