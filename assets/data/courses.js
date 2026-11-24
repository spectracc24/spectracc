/*
 * SPECTRA CC — COURSE CATALOG
 * Add or edit course entries here. This is a static catalog: files and videos may
 * live on external platforms; access_url is the destination shown to visitors.
 *
 * Fields: id, title, category, type ('free'|'paid'), format, level, duration,
 * summary, description, learning_outcomes (array), audience, provider, price,
 * visitors, buyers, access_url, image (optional local image path).
 */
window.SCC_COURSES = [
  {
    id: 'getting-started-with-gis',
    title: 'Getting Started with GIS',
    category: 'GIS & Mapping',
    type: 'free',
    format: 'Online course',
    level: 'Beginner',
    duration: 'Self-paced',
    summary: 'An introductory learning path to understand spatial data, maps, and the foundations of GIS.',
    description: 'A practical introduction to geographic information systems. This course is designed to help learners become familiar with spatial data and the basic concepts behind digital mapping. Replace this sample description with your own course information.',
    learning_outcomes: ['Understand core GIS concepts and spatial data types', 'Recognize common GIS data formats', 'Explore the basic stages of a mapping workflow'],
    audience: 'Students, practitioners, and anyone beginning to learn GIS.',
    provider: 'Spectra CC',
    price: 'Free',
    visitors: 0,
    buyers: 0,
    access_url: '',
    image: ''
  },
  {
    id: 'remote-sensing-foundations',
    title: 'Remote Sensing Foundations',
    category: 'Remote Sensing',
    type: 'paid',
    format: 'Learning materials',
    level: 'Beginner–Intermediate',
    duration: 'Self-paced',
    summary: 'Learn the fundamentals of satellite imagery, spectral information, and remote sensing applications.',
    description: 'A structured introduction to satellite remote sensing and its applications. Update this section with the full syllabus, prerequisites, and course delivery information.',
    learning_outcomes: ['Understand basic principles of remote sensing', 'Interpret spectral information and imagery', 'Identify suitable imagery for common applications'],
    audience: 'Students, GIS practitioners, and environmental researchers.',
    provider: 'Spectra CC',
    price: 'Paid',
    visitors: 0,
    buyers: 0,
    access_url: '',
    image: ''
  }
];
