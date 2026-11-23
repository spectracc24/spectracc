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
    id: 'c1', sample: true, title: 'Forest cover change analysis', pillar: 'Geospatial consulting',
    client: '[Client name]', period: '[Month Year]', tags: ['Remote sensing', 'LULCC', 'Forest cover'],
    context: 'A growing forest management initiative needed a defensible record of where forest cover had changed before it planned protection and restoration work.',
    approach: ['Assembled and corrected multi-temporal imagery for the project area.', 'Classified land cover for each period and checked the classes against field survey points.', 'Measured change by class and mapped where it concentrated.'],
    outcome: 'A land-cover change map and area statistics the team can defend to donors and regulators, plus a documented workflow their own staff can repeat.',
    feature: { kind: 'compare', seed: 21, labels: ['2015', '2025'] }
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
