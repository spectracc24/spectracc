/* ==========================================================================
   OUR TEAM: edit this file only. No need to touch index.html or script.js.

   HOW TO ADD A PERSON
   1. Put the photo in  assets/img/team/  (e.g. assets/img/team/budi-santoso.jpg)
      Tip: square or portrait photo, face centered, about 800 x 800 px, under 300 KB.
   2. Copy one block inside `members` below, paste it, and fill in the fields.
   3. Save, commit and push. Done.

   FIELDS OF A MEMBER
     name      (required)  Full name.
     role      (required)  Job title.
     field     (required)  A discipline from `fields` below, spelled exactly the same.
                           For several: field: ['Remote sensing', 'Hydrology']
     photo     (optional)  Path to the photo. Leave out to show the Spectra CC logo.
     bio       (optional)  Short profile, 1 to 3 sentences. If left out, the discipline
                           description is shown instead.
     tags      (optional)  Short skill tags, e.g. ['QGIS', 'Google Earth Engine'].
     email     (optional)  Shows an Email button.
     linkedin  (optional)  Full URL. Shows a LinkedIn button.
     website   (optional)  Full URL. Shows a Website button.

   Remember: a comma after every `}` except the last one, and straight quotes ' '.
   If a photo does not appear, check the file name (case-sensitive on GitHub Pages).
   ========================================================================== */

window.SCC_TEAM = {

  /* Disciplines shown in the network diagram and filter buttons.
     Six fits the diagram best. If you rename one, update the members too. */
  fields: [
    'Remote sensing',
    'Forest ecology',
    'Hydrology',
    'Carbon accounting',
    'Environmental governance',
    'Spatial data science'
  ],

  fieldDescriptions: {
    'Remote sensing': 'Optical, SAR and high-resolution imagery processing, land-cover mapping and change detection.',
    'Forest ecology': 'Forest structure, ecosystem condition and biodiversity assessment in the field and from imagery.',
    'Hydrology': 'Water, peat and catchment dynamics that shape land-use and carbon outcomes.',
    'Carbon accounting': 'Carbon stock estimation, emissions baselines and monitoring for climate mitigation.',
    'Environmental governance': 'Safeguards, policy context and institutional procedures that keep projects credible.',
    'Spatial data science': 'Predictive modeling, spatial classification, data fusion and geospatial database design.'
  },

  members: [

    /* ---- EXAMPLE (fully filled in). Replace the placeholders below with real people. ----
    {
      name: 'Budi Santoso',
      role: 'Senior Remote Sensing Analyst',
      field: 'Remote sensing',
      photo: 'assets/img/team/budi-santoso.jpg',
      bio: 'Maps land-cover change across peatland landscapes using Sentinel and Landsat time series.',
      tags: ['Google Earth Engine', 'QGIS', 'Python'],
      email: 'budi@example.com',
      linkedin: 'https://www.linkedin.com/in/username'
    },
    ---------------------------------------------------------------------------------------- */

    { name: '[Full Name]', role: '[Job Title]', field: 'Remote sensing' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Forest ecology' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Hydrology' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Carbon accounting' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Environmental governance' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Spatial data science' }

  ]
};
