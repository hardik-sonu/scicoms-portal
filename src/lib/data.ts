// ============================================================================
// SciComS Portal — data.ts
// Production seed data. Only confirmed, real information is included.
// Fields with no confirmed real value are explicit empty strings ('') or
// empty arrays ([]) rather than invented placeholder text — search for ''
// to see exactly what still needs real information supplied.
//
// TYPE UNION NOTES (check any hardcoded filter/tab list in the UI that
// enumerates these values, so nothing is silently excluded):
// - TeamMember['department']  includes 'Finance & Operations' (Ateeb Ahmad's
//   real role did not fit the original set).
// - EventItem['category']     includes 'Webinar' | 'Community Engagement' |
//   'Design Competition' to match the real event types held so far.
// - PartnerItem['category']   includes 'Academic & Student Society Partner'
//   and 'Community & Social Impact Partner' to match the real partner list.
// - GalleryItem['category']   includes 'Webinars' since most real gallery
//   photos are webinar recaps.
// ============================================================================

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  department: string;
  institution: string;
  bio: string;
  avatar: string;
  email: string;
  category: 'patron' | 'advisor' | 'executive' | 'director';
  linkedin?: string;
  googleScholar?: string;
  researchFocus?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department:
    | 'Editorial & Publications'
    | 'Media & PR'
    | 'Event Management'
    | 'Research & Innovation'
    | 'Creative & Design'
    | 'Technology & Web'
    | 'Finance & Operations';
  term: string;
  avatar: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  skills: string[];
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category:
    | 'Conference'
    | 'Workshop'
    | 'Science Fair'
    | 'Symposium'
    | 'Seminar'
    | 'Webinar'
    | 'Community Engagement'
    | 'Design Competition';
  date: string;
  time: string;
  location: string;
  venueType: 'In-Person' | 'Hybrid' | 'Virtual';
  status: 'Upcoming' | 'Past' | 'Ongoing';
  featured: boolean;
  coverImage: string;
  description: string;
  fullDetails: string;
  speakers: {
    name: string;
    designation: string;
    organization: string;
    avatar: string;
  }[];
  schedule: {
    time: string;
    session: string;
    speaker: string;
  }[];
  registrationFee: string;
  eligibility: string;
  capacity: number;
  registeredCount: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  authors: {
    name: string;
    affiliation: string;
    email: string;
    isCorresponding?: boolean;
  }[];
  category: 'Materials Science' | 'Metallurgy' | 'Biotechnology' | 'AI in Science' | 'Chemical Physics';
  volume: string;
  issue: string;
  year: number;
  doi: string;
  publishedDate: string;
  downloadsCount: number;
  citationsCount: number;
  pdfUrl: string;
  keywords: string[];
  fullTextContent: {
    introduction: string;
    methodology: string;
    results: string;
    discussion: string;
    conclusion: string;
    references: string[];
  };
}

export interface MilestoneItem {
  year: string;
  month?: string;
  title: string;
  description: string;
  category: 'Inception' | 'Summit' | 'Affiliation' | 'Publication' | 'Expansion';
  statsBadge?: string;
  iconName: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'National Award' | 'Research Grant' | 'Competition Winner' | 'Institutional Honor';
  year: string;
  awarder: string;
  description: string;
  badge: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Annual Gala' | 'Workshops' | 'Science Expo' | 'Guest Lectures' | 'Lab Tours' | 'Webinars';
  imageUrl: string;
  date: string;
  caption: string;
  photographer?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  currentOrganization: string;
  batch: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface PartnerItem {
  id: string;
  name: string;
  category:
    | 'Academic Partner'
    | 'Industrial Collaborator'
    | 'International Affiliate'
    | 'Student Chapter'
    | 'Academic & Student Society Partner'
    | 'Community & Social Impact Partner';
  logo: string;
  description: string;
  website: string;
  collabScope: string;
}

export interface FeedbackPost {
  id: string;
  authorName: string;
  authorRole: string;
  date: string;
  category: 'Suggestion' | 'Event Feedback' | 'Research Idea' | 'Website' | 'General';
  title: string;
  content: string;
  upvotes: number;
  commentsCount: number;
  status: 'Reviewed' | 'Under Discussion' | 'Implemented';
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  semester: string;
  degree: string;
  preferredTeam: string;
  secondaryTeam: string;
  skills: string[];
  pastExperience: string;
  statementOfPurpose: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Interview Scheduled';
}

// ============================================================================
// LEADERSHIP
// ============================================================================
export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    id: 'patron-1',
    name: 'Prof. Dr. Muhammad Ali',
    role: 'Patron-in-Chief',
    department: 'Vice Chancellor',
    institution: 'University of the Punjab, Lahore',
    bio: 'An academic leader focused on multidisciplinary scientific research, institutional excellence, and global academic collaboration.',
    avatar: '/images/leadership/patron-chief.jpg',
    email: '',
    category: 'patron',
    researchFocus: [
      'Higher Education Governance',
      'Scientific Policy',
      'Institutional Growth'
    ]
  },
  {
    id: 'advisor-1',
    name: 'Prof. Dr. Muhammad Kamran',
    role: 'Patron & Director IMME',
    department: 'Institute of Metallurgy and Materials Engineering (IMME)',
    institution: 'University of the Punjab, Lahore',
    bio: 'A registered Professional Engineer and materials researcher focused on materials characterization, solidification, corrosion control, biomaterials, and scientific research.',
    avatar: '/images/leadership/director-imme.jpg',
    email: '',
    category: 'advisor',
    researchFocus: [
      'Solidification & Metallurgy',
      'Corrosion Control',
      'Biomaterials & Characterization'

    ]
  },
  {
    id: 'advisor-1',
    name: 'Dr. Ing. Waseem Amin',
    role: 'Advisor',
    department: 'Institute of Metallurgy and Materials Engineering (IMME)',
    institution: 'University of the Punjab, Lahore',
    bio: 'Focuses on mentoring students in scientific writing, STEM outreach, and international conference participation.',
    avatar: '/images/leadership/advisor.jpg',
    email: '',
    category: 'advisor',
    researchFocus: [
      'Micromechanical Modeling',
      'Phase-Field Simulation',
      'Computational Materials Engineering'
    ]
  },
  {
    id: 'exec-1',
    name: 'Ali Musharraf',
    role: 'President',
    department: 'IMME, PU',
    institution: 'University of the Punjab, Lahore',
    bio: 'A student leader managing SciComS initiatives, national symposiums, research journals, and scientific workshops.',
    avatar: '/images/leadership/president.jpg',
    email: '',
    category: 'executive',
    researchFocus: [
      'Advanced Ceramics',
      'Digital Research Archiving',
      'Corrosion Engineering'
    ]
  },
  {
    id: 'exec-2',
    name: 'Bisma Akhtar',
    role: 'Vice President',
    department: 'IMME, PU',
    institution: 'University of the Punjab, Lahore',
    bio: 'Focused on academic symposiums, women in STEM initiatives, and scientific peer-review activities.',
    avatar: '/images/leadership/vice-president.jpg',
    email: '',
    category: 'executive'
  },
  {
    id: 'exec-3',
    name: 'Zain ul Abideen',
    role: 'General Secretary',
    department: 'IMME, PU',
    institution: 'University of the Punjab',
    bio: 'Responsible for society operations, university coordination, and executive workflow management.',
    avatar: '/images/leadership/general-secretary.jpg',
    email: '',
    category: 'executive'
  }
];

// ============================================================================
// TEAM (Executive Council, Term 2026–2027)
// ============================================================================
export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Ateeb Ahmad',
    role: 'Finance Secretary',
    department: 'Finance & Operations',
    term: '2026 - 2027',
    avatar: '/images/team/ateeb-ahmad.jpg',
    bio: 'Manages society budgets, financial records, and reporting across all SciComS initiatives and events.',
    email: '',
    skills: ['Budget Management', 'Record Keeping', 'Financial Reporting', 'Numerical Accuracy', 'Financial Organization', 'Detail Orientation']
  },
  {
    id: 'tm-2',
    name: 'Ahsan Raza',
    role: 'Media Head',
    department: 'Media & PR',
    term: '2026 - 2027',
    avatar: '/images/team/ahsan-raza.jpg',
    bio: 'Leads content strategy, brand management, and campaign execution across all SciComS media channels.',
    email: '',
    skills: ['Content Strategy', 'Brand Management', 'Campaign Execution', 'Visual Communication', 'Digital Marketing', 'Creative Leadership']
  },
  {
    id: 'tm-3',
    name: 'Bisma Liaqat',
    role: 'Media Coordinator',
    department: 'Media & PR',
    term: '2026 - 2027',
    avatar: '/images/team/bisma-liaqat.jpg',
    bio: 'Coordinates content scheduling, media outreach, and digital asset management for the society.',
    email: '',
    skills: ['Content Scheduling', 'Media Outreach', 'Asset Management', 'Communication Proficiency', 'Digital Coordination', 'Time Management']
  },
  {
    id: 'tm-4',
    name: 'Hardik Sonu',
    role: 'Graphic Designer',
    department: 'Creative & Design',
    term: '2026 - 2027',
    avatar: '/images/team/hardik-sonu.jpg',
    bio: 'Creates visual assets, structures layouts, and designs typography for SciComS publications and events.',
    email: '',
    skills: ['Asset Creation', 'Layout Structuring', 'Typography Design', 'Design Software', 'Color Theory', 'Visual Composition']
  },
  {
    id: 'tm-5',
    name: 'Bareera Bilal',
    role: 'Graphic Designer',
    department: 'Creative & Design',
    term: '2026 - 2027',
    avatar: '/images/team/bareera-bilal.jpg',
    bio: 'Produces visual designs and layouts, ensuring brand alignment across all creative outputs.',
    email: '',
    skills: ['Visual Design', 'Layout Creation', 'Brand Alignment', 'Graphic Software', 'Creative Thinking', 'Visual Aesthetics']
  },
  {
    id: 'tm-6',
    name: 'Touseef Ahmad',
    role: 'Graphic Designer',
    department: 'Creative & Design',
    term: '2026 - 2027',
    avatar: '/images/team/touseef-ahmad.jpg',
    bio: 'Handles brand identity, graphic production, and concept visualization for the society.',
    email: '',
    skills: ['Brand Identity', 'Graphic Production', 'Concept Visualization', 'Adobe Suite', 'Creative Direction', 'Spatial Composition']
  },
  {
    id: 'tm-7',
    name: 'Zubaria Saleem',
    role: 'Documentation Executive',
    department: 'Editorial & Publications',
    term: '2026 - 2027',
    avatar: '/images/team/zubaria-saleem.jpg',
    bio: 'Oversees report writing, data archiving, and information distribution across SciComS operations.',
    email: '',
    skills: ['Report Writing', 'Data Archiving', 'Information Distribution', 'Technical Writing', 'Information Management', 'Editing Precision']
  },
  {
    id: 'tm-8',
    name: 'Rabia Kanwal',
    role: 'Event Coordinator',
    department: 'Event Management',
    term: '2026 - 2027',
    avatar: '/images/team/rabia-kanwal.jpg',
    bio: 'Handles venue planning, event logistics, and schedule coordination for SciComS events.',
    email: '',
    skills: ['Venue Planning', 'Event Logistics', 'Schedule Coordination', 'Operational Planning', 'Problem Solving', 'Event Management']
  },
  {
    id: 'tm-9',
    name: 'Saba Sajid',
    role: 'Event Manager',
    department: 'Event Management',
    term: '2026 - 2027',
    avatar: '/images/team/saba-sajid.jpg',
    bio: 'Manages event operations, resource allocation, and program execution.',
    email: '',
    skills: ['Event Operations', 'Resource Management', 'Program Execution', 'Team Leadership', 'Risk Management', 'Strategic Coordination']
  },
  {
    id: 'tm-10',
    name: 'Isha Kashif',
    role: 'Event Manager',
    department: 'Event Management',
    term: '2026 - 2027',
    avatar: '/images/team/isha-kashif.jpg',
    bio: 'Coordinates vendors and on-site operations, with a focus on contingency management during events.',
    email: '',
    skills: ['Vendor Coordination', 'On-Site Operations', 'Contingency Management', 'Adaptability', 'Vendor Management', 'Crisis Control']
  },
  {
    id: 'tm-11',
    name: 'Samreen Ata-Al-Rehman',
    role: 'Event Manager',
    department: 'Event Management',
    term: '2026 - 2027',
    avatar: '/images/team/samreen-ata-al-rehman.jpg',
    bio: 'Manages guest relations, technical logistics, and timeline monitoring for society events.',
    email: '',
    skills: ['Guest Relations', 'Technical Logistics', 'Timeline Monitoring', 'Stakeholder Management', 'Spatial Setup', 'Process Efficiency']
  }
];

// ============================================================================
// EVENTS
// Unconfirmed fields (tagline for webinar events, time, registrationFee,
// eligibility, speaker designation/organization/avatar, schedule) are left
// as '' / [] intentionally. Do not replace with generated filler.
// ============================================================================
export const EVENTS_DATA: EventItem[] = [
  {
    id: 'triggering-passion',
    title: 'Triggering the Passion for Professional Success',
    tagline: '',
    category: 'Webinar',
    date: 'April 25, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/triggering-passion.jpg',
    description: 'An interactive presentation on professional career passion and guidance for engineering students.',
    fullDetails: 'Hosted by Engr. Noor Idrees, this webinar delivered an interactive presentation on building professional career passion, with guidance for engineering students. 54 of 54 seats were registered, including 53 female participants.',
    speakers: [
      { name: 'Engr. Noor Idrees', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 54,
    registeredCount: 54
  },
  {
    id: 'exploring-pathways',
    title: 'Exploring Pathways to Professional Success',
    tagline: '',
    category: 'Webinar',
    date: 'May 02, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/exploring-pathways.jpg',
    description: 'Insights into engineering career opportunities and professional path navigation.',
    fullDetails: 'Led by Engr. Eman Hussain, this webinar offered insights into engineering career opportunities and helped attendees navigate their professional path. 45 of 45 seats were registered, including 40 female participants.',
    speakers: [
      { name: 'Engr. Eman Hussain', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 45,
    registeredCount: 45
  },
  {
    id: 'empowering-women',
    title: 'Empowering Women in Materials Engineering',
    tagline: '',
    category: 'Webinar',
    date: 'May 04, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/empowering-women.jpg',
    description: 'Gender empowerment in STEM and career strategies for female engineers.',
    fullDetails: 'Presented by Engr. Sahar Khalid, this session focused on gender empowerment in STEM and career strategies for female engineers. All 50 available seats were registered.',
    speakers: [
      { name: 'Engr. Sahar Khalid', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 50,
    registeredCount: 50
  },
  {
    id: 'future-metallurgy',
    title: 'Future of Metallurgy and Materials',
    tagline: '',
    category: 'Webinar',
    date: 'May 08, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/future-metallurgy.jpg',
    description: 'Advanced materials overview and modern metallurgical innovations.',
    fullDetails: 'Engr. Nouman Ahmad presented an overview of advanced materials and modern metallurgical innovations. 32 of 32 seats were registered, including 12 female participants.',
    speakers: [
      { name: 'Engr. Nouman Ahmad', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 32,
    registeredCount: 32
  },
  {
    id: 'women-materials',
    title: 'Women in Materials Engineering',
    tagline: '',
    category: 'Webinar',
    date: 'May 09, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/women-materials.jpg',
    description: 'Keynote on female representation in materials engineering, with academic and industrial insights.',
    fullDetails: 'Engr. Sumbal Munawar delivered a keynote on female representation in materials engineering, drawing on academic and industrial insights. All 40 seats were registered.',
    speakers: [
      { name: 'Engr. Sumbal Munawar', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 40,
    registeredCount: 40
  },
  {
    id: 'professional-excellence',
    title: 'Driving Professional Excellence Through Research',
    tagline: '',
    category: 'Webinar',
    date: 'June 23, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/professional-excellence.jpg',
    description: 'Research methodology and skill development, and professional growth techniques.',
    fullDetails: 'Engr. Kainat covered research methodology, skill development, and techniques for professional growth. 40 of 40 seats were registered, including 16 female participants.',
    speakers: [
      { name: 'Engr. Kainat', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 40,
    registeredCount: 40
  },
  {
    id: 'beyond-grades',
    title: 'Beyond Grades, Skills That Make an Impact',
    tagline: '',
    category: 'Webinar',
    date: 'July 06, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/beyond-grades.jpg',
    description: 'Practical skill acquisition beyond academics and industry readiness discussion.',
    fullDetails: 'Dr. Muhammad Shamir led a discussion on practical, industry-ready skills beyond academic grades. 42 of 42 seats were registered, including 16 female participants.',
    speakers: [
      { name: 'Dr. Muhammad Shamir', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 42,
    registeredCount: 42
  },
  {
    id: 'sinterability-oxidation',
    title: 'Sinterability and Oxidation-Driven Phenomena',
    tagline: '',
    category: 'Webinar',
    date: 'July 14, 2026',
    time: '',
    location: 'Online / SciComS Platform',
    venueType: 'Virtual',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/sinterability-oxidation.jpg',
    description: 'Technical research breakdown on material sintering and high-temperature oxidation analysis.',
    fullDetails: 'Dr. Awais Ikram presented a technical breakdown on material sintering behavior and high-temperature oxidation analysis. 30 of 30 seats were registered, including 10 female participants.',
    speakers: [
      { name: 'Dr. Awais Ikram', designation: '', organization: '', avatar: '' }
    ],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    capacity: 30,
    registeredCount: 30
  },
  {
    id: 'community-services',
    title: 'Community Services: Connecting Knowledge with Communities',
    tagline: 'Communicating Science, Inspiring Futures — Small Efforts, Big Change. Together for a Better Tomorrow.',
    category: 'Community Engagement',
    date: 'N/A',
    time: '',
    location: 'Institute of Metallurgical & Materials Engineering, University of the Punjab, Lahore',
    venueType: 'In-Person',
    status: 'Ongoing',
    featured: true,
    coverImage: '/images/events/community-services.jpg',
    description: 'Hands-on science demonstrations, materials engineering awareness, career guidance, and school outreach.',
    fullDetails: 'An ongoing science outreach and community engagement initiative featuring hands-on activities and science demonstrations, metallurgical and materials engineering awareness, career guidance and admission counseling, and school outreach with STEM activities and motivation talks.',
    speakers: [],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    // Source reports registration as "30+" (approximate, not exact). The
    // confirmed minimum of 30 is recorded here as a conservative, non-exact
    // figure — update once an exact total is confirmed.
    capacity: 30,
    registeredCount: 30
  },
  {
    id: 'poster-competition',
    title: 'Poster Design Competition',
    tagline: 'Design • Create • Inspire — Let Your Design Speak for Your Knowledge!',
    category: 'Design Competition',
    date: 'August 27, 2026',
    time: '',
    location: 'Institute of Metallurgy & Materials Engineering (IMME-PU)',
    venueType: 'In-Person',
    status: 'Past',
    featured: true,
    coverImage: '/images/events/poster-competition.jpg',
    description: 'A poster design competition spanning Computer Lab and Heat Treatment Lab categories, with A3 computer-designed poster presentations.',
    fullDetails: 'The competition featured Computer Lab poster designs (CAD Modeling, Material Modeling, Simulation/FEA, Crystal Structures, Data Analysis, and Coding) alongside Heat Treatment Lab poster designs (Heat Treatment Processes, Microstructure Evolution, Phase Transformations, and Mechanical Property Changes). The top 10 designs in each lab were displayed with designer names, alongside A3 computer-designed poster presentations.',
    speakers: [],
    schedule: [],
    registrationFee: '',
    eligibility: '',
    // Source lists capacity as "N/A" — no confirmed capacity figure exists.
    // Set equal to the confirmed registered count (50) as the least
    // speculative technically valid value; replace once a real capacity
    // figure is confirmed.
    capacity: 50,
    registeredCount: 50
  }
];

// ============================================================================
// JOURNAL — no confirmed real articles exist yet.
// ============================================================================
export const JOURNAL_DATA: JournalArticle[] = [];

// ============================================================================
// MILESTONES — no confirmed society history (founding date, summits,
// affiliations, etc.) has been supplied.
// ============================================================================
export const MILESTONES_DATA: MilestoneItem[] = [];

// ============================================================================
// ACHIEVEMENTS — no confirmed real achievements exist yet.
// ============================================================================
export const ACHIEVEMENTS_DATA: AchievementItem[] = [];

// ============================================================================
// GALLERY
// ============================================================================
export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Triggering the Passion for Professional Success',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-01.jpg',
    date: 'April 2026',
    caption: 'Webinar on triggering the passion for professional success.'
  },
  {
    id: 'gal-2',
    title: 'Exploring Pathways to Professional Success',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-02.jpg',
    date: 'May 2026',
    caption: 'Webinar exploring pathways to professional success.'
  },
  {
    id: 'gal-3',
    title: 'Empowering Women in Materials Engineering',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-03.jpg',
    date: 'May 2026',
    caption: 'Webinar on empowering women in materials engineering.'
  },
  {
    id: 'gal-4',
    title: 'Future of Metallurgy and Materials',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-04.jpg',
    date: 'May 2026',
    caption: 'Webinar on the future of metallurgy and materials.'
  },
  {
    id: 'gal-5',
    title: 'Women in Materials Engineering',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-05.jpg',
    date: 'May 2026',
    caption: 'Webinar on women in materials engineering.'
  },
  {
    id: 'gal-6',
    title: 'Driving Professional Excellence Through Research',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-06.jpg',
    date: 'June 2026',
    caption: 'Webinar on driving professional excellence through research.'
  },
  {
    id: 'gal-7',
    title: 'Beyond Grades, Skills That Make an Impact',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-07.jpg',
    date: 'July 2026',
    caption: 'Webinar on skills that make an impact beyond grades.'
  },
  {
    id: 'gal-8',
    title: 'Sinterability and Oxidation-Driven Phenomena',
    category: 'Webinars',
    imageUrl: '/images/gallery/gallery-08.jpg',
    date: 'July 2026',
    caption: 'Webinar on sinterability and oxidation-driven phenomena.'
  },
  {
    id: 'gal-9',
    title: 'Community Services & STEM School Outreach',
    category: 'Science Expo',
    imageUrl: '/images/gallery/gallery-09.jpg',
    date: 'Ongoing',
    caption: 'Community services connecting knowledge with communities through STEM outreach.'
  },
  {
    id: 'gal-10',
    title: 'Poster Design Competition Showcase',
    category: 'Workshops',
    imageUrl: '/images/gallery/gallery-10.jpg',
    date: 'August 2026',
    caption: 'Showcase of the poster design competition at IMME-PU.'
  }
];

// ============================================================================
// TESTIMONIALS — no verified testimonials exist yet. Will be populated from
// real user submissions via the database.
// ============================================================================
export const TESTIMONIALS_DATA: TestimonialItem[] = [];

// ============================================================================
// PARTNERS / AFFILIATIONS
// Descriptions are kept conservative and do not assert formal contractual
// arrangements beyond what has been confirmed. collabScope reflects the
// scope of engagement as provided in source material.
// ============================================================================
export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: 'p-1',
    name: 'Institute of Metallurgy & Materials Engineering (IMME)',
    category: 'Academic Partner',
    logo: '/images/partners/imme.png',
    description: 'Parent academic institute of the University of the Punjab, associated with SciComS activities.',
    website: '',
    collabScope: 'Research Laboratory Access, Faculty Mentorship, Institutional Endorsement'
  },
  {
    id: 'p-2',
    name: 'Pakistan Council of Scientific & Industrial Research (PCSIR)',
    category: 'Industrial Collaborator',
    logo: '/images/partners/pcsir.png',
    description: 'National research body associated with SciComS activities.',
    website: '',
    collabScope: 'Material Characterization, Research Facilities, Student Internships'
  },
  {
    id: 'p-3',
    name: 'SciComS IMME-PU',
    category: 'Academic & Student Society Partner',
    logo: '/images/partners/scicoms.png',
    description: 'Academic and student society partner associated with SciComS activities.',
    website: '',
    collabScope: 'Knowledge Sharing & Outreach, Joint Event Collaboration, Student Engagement & Networking'
  },
  {
    id: 'p-4',
    name: 'Volunteer Classroom',
    category: 'Community & Social Impact Partner',
    logo: '/images/partners/volunteer-classroom.png',
    description: 'Community and social impact partner associated with SciComS outreach initiatives.',
    website: '',
    collabScope: 'Quality Education Outreach, Engineering & Community Service Collaboration, Empowering Underprivileged Youth, Student Volunteer Engagement'
  }
];

// ============================================================================
// FEEDBACK — no real feedback submissions exist yet. Will be populated from
// the database.
// ============================================================================
export const FEEDBACK_POSTS_DATA: FeedbackPost[] = [];

// ============================================================================
// MEMBERSHIP APPLICATIONS — no real applications should be seeded here.
// Will be populated from the database.
// ============================================================================
export const MOCK_APPLICATIONS_DATA: MembershipApplication[] = [];

// ============================================================================
// SITE CONTACT INFO — confirmed contact details, raw strings only.
// ============================================================================
export const CONTACT_INFO = {
  email: 'scicoms.imme.pu.2.0@gmail.com',
  phone: '+92 323 7301986',
  linkedin: 'https://www.linkedin.com/in/scicoms-imme-pu/',
  instagram: 'https://www.instagram.com/scicomsimme/',
  facebook: 'https://facebook.com/scicomsimme'
};