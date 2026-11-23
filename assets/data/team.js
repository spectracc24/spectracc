/* ==========================================================================
   OUR TEAM: edit this file only. Two groups: `management` and `experts`.

   HOW TO ADD A PERSON
   1. Put the photo in  assets/img/team/  (e.g. assets/img/team/budi-santoso.jpg)
      Tip: square or portrait, face centered, about 800 x 800 px, under 300 KB.
   2. Copy one block, paste it into `management` or `experts`, fill in the fields.
   3. Save, commit and push.

   FIELDS
     name       (required)  Full name.
     role       (required)  Job title, e.g. 'Director', 'Finance Manager', 'Senior Remote Sensing Analyst'.
     field      (experts)   Discipline from `fields` below, spelled the same.
                            Several: field: ['Remote sensing', 'Hydrology']
     photo      (optional)  e.g. 'assets/img/team/budi-santoso.jpg'. Missing: the logo is shown.
     bio        (optional)  Profile text. The card shows the first lines; clicking opens all of it.
                            Separate paragraphs with a blank line (\n\n).
     education  (optional)  List, e.g. ['MSc Geoinformatics, University name, 2018']
     experience (optional)  List, e.g. ['Senior Analyst, Organization, 2020 to now']
     tags       (optional)  Skill tags, e.g. ['QGIS', 'Python']
     email, linkedin, website, orcid, scholar, researchgate   (optional) Buttons in the profile.
                            Use full URLs for all except email.

   Commas: after every } except the last one in a list. Use straight quotes.
   ========================================================================== */ 

window.SCC_TEAM = {

  fields: [
    'Remote sensing',
    'Forest ecology',
    'Hydrology',
    'Carbon accounting',
    'Environmental governance',
    'Spatial data science',
    'Food security',
    'Climate change adaptation'
  ],

  fieldDescriptions: {
    'Remote sensing': 'Optical, SAR and high-resolution imagery processing, land-cover mapping and change detection.',
    'Forest ecology': 'Forest structure, ecosystem condition and biodiversity assessment in the field and from imagery.',
    'Hydrology': 'Water, peat and catchment dynamics that shape land-use and carbon outcomes.',
    'Carbon accounting': 'Carbon stock estimation, emissions baselines and monitoring for climate mitigation.',
    'Environmental governance': 'Safeguards, policy context and institutional procedures that keep projects credible.',
    'Spatial data science': 'Predictive modeling, spatial classification, data fusion and geospatial database design.'
  },

  /* ---------------- MANAGEMENT ---------------- */
  management: [

    /* EXAMPLE (fully filled in). Copy it, edit it, and remove the comment marks.
    {
      name: 'Nama Lengkap',
      role: 'Director',
      photo: 'assets/img/team/nama-lengkap.jpg',
      bio: 'Paragraph one of the profile.\n\nParagraph two of the profile.',
      education: ['MSc Environmental Science, University name, 2016'],
      experience: ['Director, Spectra Citra Cendekia, 2025 to now'],
      tags: ['Strategy', 'Partnerships'],
      email: 'name@example.com',
      linkedin: 'https://www.linkedin.com/in/username'
    }, */

    {
      name: 'Ivannalis Saputra, S.P.',
      role: 'Founder & Technical Lead, Spectra CC',
      field: 'Spatial data science',
      photo: 'assets/img/team/ivan.jpg',
      bio: 'Senior Geospatial Analyst with over 10 years of experience in the Agriculture, Forestry, and Other Land Use (AFOLU) sector, particularly in REDD+ project development and implementation. His expertise spans geospatial data science, remote sensing, spatial analytics, and environmental modeling, integrating GIS, programming, and machine learning approaches to address land-use and environmental challenges. His technical specializations include land-use/land-cover change analysis and modeling, deforestation and forest degradation assessment, spatial predictive modeling, digital soil mapping, and spatial baseline development for estimating potential greenhouse gas emission reductions/removals. Beyond geospatial analysis, he has experience in technical project management and the application of international carbon standards, methodologies, and frameworks, including Plan Vivo PM001, VCS VM0047, Social and Biodiversity Impact Assessment (SBIA), and the IUCN Environmental and Social Management System (ESMS).',
      education: ['Bachelor of Agriculture (Major: Land Resources Management), Tangjungpura University'],
      tags: [
        'Remote sensing',
        'Carbon accounting',
        'Spatial data science'
      ],
      email: 'saputra.ivannalis24@gmail.com',
    }
    // { name: '[Full Name]', role: 'Finance and Administration' },
    // { name: '[Full Name]', role: 'Program and Operations' }
  ],

  /* ---------------- EXPERTS ---------------- */
  experts: [
    {
      name: 'Linda Wahyuni, S.P.,M.P',
      photo: 'assets/img/team/linda.jpg',
      role: 'Food Security Expert',
      field: 'Food Security',
      bio: 'Food Security Expert with over 10 years of experience, particularly in working with smallholder oil palm farmers, sustainable agricultural practices, and RSPO certification. She currently serves as a lecturer in the Agroecotechnology Study Program at Shanti Bhuana Institute.',
      education: [['Master of Agriculture (Major: Agricultural Socio-Economics), Tangjungpura University'],['Bachelor of Agriculture (Major: Agricultural Socio-Economics), Tangjungpura University']],
      email: 'lindawahyuni25@gmail.com',
      linkedin: 'https://id.linkedin.com/in/linda-wahyuni-a42741280'
    },
    { name: '[Full Name]', role: '[Job Title]', field: 'Forest ecology' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Hydrology' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Carbon accounting' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Environmental governance' },
    { name: '[Full Name]', role: '[Job Title]', field: 'Spatial data science' }
  ]
};
