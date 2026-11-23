/* ==========================================================================
   SITE SETTINGS: contact details, social links ("Find us"), and page switches.
   Edit this file only.

   PAGE SWITCHES  (pages)
     'live'    page works normally
     'soon'    page shows a "Coming soon" screen and a "Soon" badge in the menu
     'hidden'  page is removed from the menu (visiting it sends people home)
   Keys: team, case-studies, projects, publications, map

   FIND US  (links)
     platform  icon to use: linkedin, instagram, youtube, x, facebook, tiktok, github,
               fiverr, whatsapp, researchgate, googlescholar, orcid, telegram, medium
     label     name shown on the card
     handle    @username or short text shown under the label (optional)
     url       full address. Leave '' and the card shows "Coming soon".
     desc      one line about what people find there (optional)
     cta       button text (optional)
     featured  true makes the card wide and highlighted (use for Fiverr)
   Order here = order on the page. Delete a block to remove it.
   ========================================================================== */

window.SCC_SITE = {

  /* Change this value after you edit data files so visitors' browsers fetch the new version. */
  version: '2026-11-22',

  contact: {
    address: '',
    email: '',
    phone: '',
    website: ''
  },

  region: 'Kubu Raya, West Kalimantan, Indonesia',

  pages: {
    'team': 'live',
    'case-studies': 'live',
    'projects': 'live',
    'publications': 'live',
    'map': 'soon'
  },

  links: [
    { platform: 'fiverr',    label: 'Fiverr',    handle: '', url: '', featured: true,
      desc: 'Order focused mapping and GIS tasks as ready-made gigs.', cta: 'Visit our Fiverr profile' },
    { platform: 'linkedin',  label: 'LinkedIn',  handle: '', url: '', desc: 'Company updates, news and opportunities.' },
    { platform: 'instagram', label: 'Instagram', handle: '', url: '', desc: 'Field notes and behind the scenes.' },
    { platform: 'youtube',   label: 'YouTube',   handle: '', url: '', desc: 'Tutorials, webinars and project walkthroughs.' },
    { platform: 'facebook',  label: 'Facebook',  handle: '', url: '', desc: 'Community news and event announcements.' },
    { platform: 'x',         label: 'X',         handle: '', url: '', desc: 'Short updates and links.' },
    { platform: 'tiktok',    label: 'TikTok',    handle: '', url: '', desc: 'Short videos about mapping and the field.' },
    { platform: 'github',    label: 'GitHub',    handle: '', url: '', desc: 'Open code, scripts and datasets.' },
    { platform: 'whatsapp',  label: 'WhatsApp',  handle: '', url: '', desc: 'Quick questions to our team.' }
    /* More you can add: researchgate, googlescholar, orcid, telegram, medium */
  ]
};
