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
  department: 'Editorial & Publications' | 'Media & PR' | 'Event Management' | 'Research & Innovation' | 'Creative & Design' | 'Technology & Web';
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
  category: 'Conference' | 'Workshop' | 'Science Fair' | 'Symposium' | 'Seminar';
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
  category: 'Annual Gala' | 'Workshops' | 'Science Expo' | 'Guest Lectures' | 'Lab Tours';
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
  category: 'Academic Partner' | 'Industrial Collaborator' | 'International Affiliate' | 'Student Chapter';
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

export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    id: 'patron-1',
    name: 'Prof. Dr. Khalid Mahmood',
    role: 'Patron-in-Chief',
    department: 'Vice Chancellor',
    institution: 'University of the Punjab, Lahore',
    bio: 'Distinguished academic leader spearheading multidisciplinary scientific research, institutional excellence, and global academic collaborations at the University of the Punjab.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    email: 'vc@pu.edu.pk',
    category: 'patron',
    researchFocus: ['Higher Education Governance', 'Scientific Policy', 'Institutional Growth']
  },
  {
    id: 'advisor-1',
    name: 'Prof. Dr. Mohsin Ali Kazmi',
    role: 'Patron & Director IMME',
    department: 'Institute of Metallurgy and Materials Engineering (IMME)',
    institution: 'University of the Punjab',
    bio: 'Renowned materials scientist and visionary administrator devoted to advancing scientific communication, metallurgy research, and empowering young student researchers.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    email: 'director.imme@pu.edu.pk',
    category: 'advisor',
    researchFocus: ['Advanced Metallurgy', 'Functional Materials', 'Corrosion Engineering']
  },
  {
    id: 'advisor-2',
    name: 'Dr. Ameeq Farooq',
    role: 'Chief Faculty Advisor',
    department: 'IMME',
    institution: 'University of the Punjab',
    bio: 'Dedicated mentor fostering scientific writing, STEM outreach, and international conference participation among undergraduate and graduate scholars.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    email: 'ameeq.imme@pu.edu.pk',
    category: 'advisor',
    researchFocus: ['Surface Engineering', 'Nanocomposites', 'Science Communication']
  },
  {
    id: 'exec-1',
    name: 'Syed Muhammad Ahmad',
    role: 'President',
    department: 'IMME, PU',
    institution: 'University of the Punjab',
    bio: 'Student leader leading SciComS initiatives across national symposiums, inter-departmental research journals, and tech-driven scientific workshops.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    email: 'president.scicoms@pu.edu.pk',
    category: 'executive',
    linkedin: 'https://linkedin.com',
    researchFocus: ['Advanced Ceramics', 'Digital Research Archiving']
  },
  {
    id: 'exec-2',
    name: 'Ayesha Tariq',
    role: 'Vice President',
    department: 'Department of Physics, PU',
    institution: 'University of the Punjab',
    bio: 'Coordinator of academic symposiums, women in STEM initiatives, and scientific peer-review panels.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    email: 'vp.scicoms@pu.edu.pk',
    category: 'executive',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'exec-3',
    name: 'Hamza Bilal',
    role: 'General Secretary',
    department: 'IMME, PU',
    institution: 'University of the Punjab',
    bio: 'Managing society operations, administrative liaison with university faculties, and executive workflow coordination.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    email: 'gensec.scicoms@pu.edu.pk',
    category: 'executive'
  }
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Zainab Noor',
    role: 'Director of Editorial & Journal',
    department: 'Editorial & Publications',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Oversees peer review protocols, manuscript formatting, and annual SciComS journal volumes.',
    email: 'zainab.editorial@scicoms.org',
    skills: ['Scientific Writing', 'LaTeX', 'Peer Review', 'Editorial Management']
  },
  {
    id: 'tm-2',
    name: 'Usman Ghani',
    role: 'Lead Technical Architect',
    department: 'Technology & Web',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    bio: 'Architecting digital portal systems, academic archives, and interactive scientific visualization tools.',
    email: 'usman.tech@scicoms.org',
    skills: ['Next.js', 'WebGL', 'TypeScript', 'Cloud Infrastructure']
  },
  {
    id: 'tm-3',
    name: 'Fatima Zahra',
    role: 'Director of Event Management',
    department: 'Event Management',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Lead organizer of the National Materials & Science Fair, workshops, and international webinars.',
    email: 'fatima.events@scicoms.org',
    skills: ['Event Planning', 'Logistics', 'Speaker Coordination', 'Budgeting']
  },
  {
    id: 'tm-4',
    name: 'Bilal Khan',
    role: 'Director of Media & PR',
    department: 'Media & PR',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'Directing university press releases, media broadcasts, podcasts, and digital storytelling.',
    email: 'bilal.media@scicoms.org',
    skills: ['Public Relations', 'Content Strategy', 'Broadcasting', 'Press Releases']
  },
  {
    id: 'tm-5',
    name: 'Maryam Asif',
    role: 'Director of Research & Innovation',
    department: 'Research & Innovation',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Facilitating student-faculty joint research grants, patent filing guidance, and symposium papers.',
    email: 'maryam.research@scicoms.org',
    skills: ['Data Analysis', 'Grant Proposals', 'Material Characterization', 'SPSS/Python']
  },
  {
    id: 'tm-6',
    name: 'Daniyal Qureshi',
    role: 'Head of Creative & Design',
    department: 'Creative & Design',
    term: '2025 - 2026',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    bio: 'Crafting brand identity, conference proceedings layout, infographic posters, and visual communication assets.',
    email: 'daniyal.design@scicoms.org',
    skills: ['Figma', 'Brand Identity', 'Infographics', 'Adobe Creative Cloud']
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'science-symposium-2026',
    title: '5th National Scientific Communication & Metallurgy Symposium (SCMS-2026)',
    tagline: 'Bridging Advanced Materials Research with Global Scientific Dialogue',
    category: 'Symposium',
    date: 'October 14-16, 2026',
    time: '09:00 AM - 05:00 PM PKT',
    location: 'Faisal Auditorium & IMME Complex, University of the Punjab, Lahore',
    venueType: 'Hybrid',
    status: 'Upcoming',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80',
    description: 'A prestigious 3-day flagship gathering uniting over 500+ researchers, material scientists, university faculty, and industry pioneers from across Pakistan and abroad.',
    fullDetails: 'The 5th National Scientific Communication & Metallurgy Symposium is the flagship academic convention organized by SciComS at the Institute of Metallurgy and Materials Engineering (IMME), University of the Punjab. Featuring keynote presentations, technical paper tracks, poster competitions, and panel discussions on AI-driven materials discovery and clean energy metallurgical innovations.',
    speakers: [
      {
        name: 'Prof. Dr. Arshad Bashir',
        designation: 'Chair of Nanomaterials',
        organization: 'Imperial College London Collaborator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
      },
      {
        name: 'Dr. Samina Rizvi',
        designation: 'Principal Scientist',
        organization: 'National Institute of Lasers & Optronics',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
      }
    ],
    schedule: [
      { time: '09:00 AM', session: 'Inaugural Ceremony & Welcome Address by Patron-in-Chief', speaker: 'Vice Chancellor PU' },
      { time: '10:30 AM', session: 'Keynote Track 1: Next-Gen High Entropy Alloys in Aerospace', speaker: 'Prof. Dr. Arshad Bashir' },
      { time: '01:30 PM', session: 'Technical Paper Presentations (Parallel Tracks A & B)', speaker: 'Session Chairs' },
      { time: '03:45 PM', session: 'Panel: Scientific Journalism in the Age of Generative AI', speaker: 'Distinguished Panelists' }
    ],
    registrationFee: 'PKR 1,500 (Students) / PKR 3,000 (Professionals)',
    eligibility: 'Open to all undergraduate/postgraduate students, researchers, faculty, and industry engineers.',
    capacity: 600,
    registeredCount: 428
  },
  {
    id: 'scientific-writing-workshop',
    title: 'Masterclass: High-Impact Scientific Writing & Q1 Journal Publishing',
    tagline: 'From Literature Review to Elsevier & Springer Acceptances',
    category: 'Workshop',
    date: 'September 22, 2026',
    time: '11:00 AM - 03:30 PM PKT',
    location: 'IMME Seminar Hall, University of the Punjab',
    venueType: 'In-Person',
    status: 'Upcoming',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80',
    description: 'An intensive hands-on masterclass detailing manuscript structuring, effective data visualization, peer-review response tactics, and reference management with Zotero/Mendeley.',
    fullDetails: 'Led by seasoned journal reviewers and editors, this workshop walks early-career researchers and graduate students through the end-to-end publishing workflow for top-tier international journals.',
    speakers: [
      {
        name: 'Dr. Ameeq Farooq',
        designation: 'Associate Professor & Reviewer',
        organization: 'IMME, PU',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    schedule: [
      { time: '11:00 AM', session: 'Deconstructing High-Impact Abstract & Introduction Structure', speaker: 'Dr. Ameeq Farooq' },
      { time: '01:00 PM', session: 'Data Visualization & Statistical Plotting Best Practices', speaker: 'Zainab Noor' },
      { time: '02:30 PM', session: 'Live Manuscript Critique and Peer Review Rebuttal Simulation', speaker: 'Interactive Panel' }
    ],
    registrationFee: 'Free for SciComS Registered Members / PKR 500 for Non-Members',
    eligibility: 'Undergraduate and Master/PhD scholars preparing manuscripts.',
    capacity: 120,
    registeredCount: 96
  },
  {
    id: 'punjab-science-expo-2026',
    title: 'Punjab Inter-Collegiate Science & Innovation Expo 2026',
    tagline: 'Inspiring Young Minds, Catalyzing Inventions',
    category: 'Science Fair',
    date: 'November 18-19, 2026',
    time: '09:30 AM - 04:30 PM PKT',
    location: 'Main University Grounds, Quaid-e-Azam Campus, Lahore',
    venueType: 'In-Person',
    status: 'Upcoming',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000&auto=format&fit=crop&q=80',
    description: 'A vibrant exhibition of 150+ student science models, metallurgical prototypes, environmental engineering solutions, and robotics demonstrations.',
    fullDetails: 'The Punjab Inter-Collegiate Science Expo is a marquee annual community outreach event designed to promote STEM literacy, innovation mindset, and student entrepreneurship.',
    speakers: [
      {
        name: 'Dr. Tariq Mahmood',
        designation: 'Dean, Faculty of Engineering & Technology',
        organization: 'University of the Punjab',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      }
    ],
    schedule: [
      { time: '09:30 AM', session: 'Exhibition Floor Opening & VIP Jury Walkthrough', speaker: 'Jury Panel' },
      { time: '02:00 PM', session: 'Live Science Demonstrations & Chemistry Theater', speaker: 'SciComS Outreach Team' },
      { time: '04:00 PM', session: 'Grand Award Ceremony & Cash Prize Distribution', speaker: 'Dean FET' }
    ],
    registrationFee: 'PKR 1,000 per Project Team (Max 4 Members)',
    eligibility: 'School, College, and University student teams.',
    capacity: 200,
    registeredCount: 140
  },
  {
    id: 'ai-in-materials-seminar',
    title: 'Seminar: Machine Learning & Computational Metallurgy',
    tagline: 'Accelerating Alloy Design via Neural Networks & DFT Simulations',
    category: 'Seminar',
    date: 'August 12, 2026',
    time: '02:00 PM - 04:30 PM PKT',
    location: 'Video Conference Hall, Department of Metallurgy, PU',
    venueType: 'Hybrid',
    status: 'Past',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    description: 'Exploration of how machine learning models forecast crystal phase stability, tensile performance, and oxidation rates in novel refractory alloys.',
    fullDetails: 'Archived session recording and seminar slides available for verified portal members.',
    speakers: [
      {
        name: 'Dr. Bilal Qasim',
        designation: 'Research Fellow',
        organization: 'Center for High Performance Computing',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80'
      }
    ],
    schedule: [
      { time: '02:00 PM', session: 'Introduction to DFT and Materials Informatics', speaker: 'Dr. Bilal Qasim' },
      { time: '03:15 PM', session: 'Python Workflow Demonstration with PyMatGen', speaker: 'Tech Lead Usman Ghani' }
    ],
    registrationFee: 'Completed (Archived)',
    eligibility: 'Computational engineering students and faculty.',
    capacity: 100,
    registeredCount: 100
  }
];

export const JOURNAL_DATA: JournalArticle[] = [
  {
    id: 'advances-metallurgy-2026',
    title: 'Microstructural Evolution and Corrosion Resistance of Friction Stir Processed Al-Zn-Mg-Cu Alloys',
    slug: 'microstructural-evolution-friction-stir-al-zn-mg-cu',
    abstract: 'Friction stir processing (FSP) was implemented on high-strength 7000 series aluminum alloys to refine grain boundary precipitates and mitigate localized pitting corrosion. Electrochemical impedance spectroscopy (EIS) coupled with transmission electron microscopy revealed a 48% reduction in corrosion current density and notable enhancement in grain boundary passivation.',
    authors: [
      { name: 'Dr. Ameeq Farooq', affiliation: 'Institute of Metallurgy & Materials Engineering, PU', email: 'ameeq.imme@pu.edu.pk', isCorresponding: true },
      { name: 'Syed Muhammad Ahmad', affiliation: 'IMME, University of the Punjab', email: 'ahmad.research@pu.edu.pk' },
      { name: 'Prof. Dr. Mohsin Ali Kazmi', affiliation: 'Faculty of Engineering, PU', email: 'kazmi.imme@pu.edu.pk' }
    ],
    category: 'Metallurgy',
    volume: 'Vol 8',
    issue: 'Issue 2',
    year: 2026,
    doi: '10.1016/j.scicoms.2026.04.012',
    publishedDate: 'June 18, 2026',
    downloadsCount: 1420,
    citationsCount: 19,
    pdfUrl: '#',
    keywords: ['Friction Stir Processing', 'Aluminum 7075', 'Electrochemical Impedance', 'Microstructure', 'Corrosion Passivation'],
    fullTextContent: {
      introduction: 'High-strength aluminum alloys belonging to the AA7xxx series remain the material of choice for aerospace airframes due to their remarkable strength-to-weight ratio. However, their vulnerability to stress corrosion cracking (SCC) and intergranular corrosion has motivated widespread investigation into thermomechanical surface modifications.',
      methodology: 'Samples were subjected to single and multi-pass friction stir processing using a tool rotational speed of 1200 RPM and traverse rate of 40 mm/min. Microstructural evolution was examined via EBSD and TEM. Corrosion kinetics were evaluated in 3.5 wt% NaCl electrolyte using potentiodynamic polarization.',
      results: 'A dramatic grain refinement from an initial average grain size of 42 µm to 3.8 µm was achieved in the stir zone. Coarse continuous grain boundary precipitates (η-MgZn2) were converted into discontinuous, spherical nanoscale dispersoids, suppressing anodic dissolution pathways.',
      discussion: 'The discontinuity of grain boundary phases effectively breaks the electrical conductivity along the grain borders, substantially increasing the pitting initiation threshold.',
      conclusion: 'FSP serves as a potent solid-state processing method to concurrently improve tensile ductility and electrochemical durability of aerospace-grade aluminum alloys.',
      references: [
        'Mishra, R. S., & Ma, Z. Y. (2005). Friction stir welding and processing. Materials Science and Engineering: R: Reports, 50(1-2), 1-78.',
        'Kazmi, M. A., & Farooq, A. (2024). Passivation dynamics of grain refined metallic matrices. Journal of Materials Research and Technology, 31, 240-255.',
        'Williams, J. C., & Starke, E. A. (2003). Progress in structural materials for aerospace systems. Acta Materialia, 51(19), 5775-5799.'
      ]
    }
  },
  {
    id: 'quantum-dots-biomedical-2026',
    title: 'Synthesis of Biocompatible Graphene Quantum Dots for Target-Specific Bio-Imaging Applications',
    slug: 'synthesis-biocompatible-graphene-quantum-dots',
    abstract: 'Hydrothermal synthesis of nitrogen-doped graphene quantum dots (N-GQDs) from agro-waste precursors demonstrates photoluminescence quantum yields exceeding 38%. In vitro cellular cytotoxicity assays on human cell lines confirmed exceptional biocompatibility and high fluorescent contrast for subcellular organelle tracking.',
    authors: [
      { name: 'Ayesha Tariq', affiliation: 'Department of Physics, University of the Punjab', email: 'ayesha.physics@pu.edu.pk', isCorresponding: true },
      { name: 'Dr. Rabia Tahir', affiliation: 'Center for Applied Molecular Biology (CAMB)', email: 'rabia.camb@pu.edu.pk' }
    ],
    category: 'Biotechnology',
    volume: 'Vol 8',
    issue: 'Issue 1',
    year: 2026,
    doi: '10.1016/j.scicoms.2026.02.008',
    publishedDate: 'March 10, 2026',
    downloadsCount: 980,
    citationsCount: 12,
    pdfUrl: '#',
    keywords: ['Graphene Quantum Dots', 'Green Synthesis', 'Bio-imaging', 'Fluorescence Spectroscopy', 'Cytotoxicity'],
    fullTextContent: {
      introduction: 'Fluorescent carbonaceous nanomaterials have emerged as benign alternatives to toxic heavy-metal semiconductor quantum dots (such as CdSe and PbS) in biomedical diagnostics.',
      methodology: 'Precursors were subjected to bottom-up hydrothermal carbonization at 180°C for 8 hours followed by dialysis membrane purification.',
      results: 'Monodisperse quantum dots of 3.2 ± 0.4 nm diameter exhibited excitation-dependent emissions peaking at 450 nm with zero discernible cytotoxicity up to 250 µg/mL concentrations.',
      discussion: 'The presence of pyridinic and pyrrolic nitrogen atoms in the carbon matrix creates trap states that drastically boost the radiative recombination probability.',
      conclusion: 'Green-synthesized N-GQDs offer a low-cost, scalable, and non-toxic fluorescent probe for cellular microscopy.',
      references: [
        'Shen, J., et al. (2012). Graphene quantum dots: emergent light-emitting nanomaterials. Chemical Communications, 48(31), 3686-3699.',
        'Tariq, A., et al. (2025). Optical tunability in nitrogen-doped carbon nanostructures. Optics & Laser Technology, 170, 110290.'
      ]
    }
  },
  {
    id: 'ai-phase-prediction-alloys',
    title: 'Machine Learning Classification of High-Entropy Alloy Phase Formations Using Ensemble Trees',
    slug: 'machine-learning-high-entropy-alloy-phase-formation',
    abstract: 'Predicting whether a multi-component alloy will form a single-phase solid solution or brittle intermetallic compounds is notoriously complex. We construct an XGBoost-driven ensemble architecture trained on thermodynamic and valence electron parameters, achieving 94.2% test prediction accuracy.',
    authors: [
      { name: 'Usman Ghani', affiliation: 'Department of Computer Science / IMME, PU', email: 'usman.cs@pu.edu.pk', isCorresponding: true },
      { name: 'Maryam Asif', affiliation: 'Institute of Metallurgy & Materials Engineering, PU', email: 'maryam.research@pu.edu.pk' }
    ],
    category: 'AI in Science',
    volume: 'Vol 7',
    issue: 'Issue 4',
    year: 2025,
    doi: '10.1016/j.scicoms.2025.11.045',
    publishedDate: 'November 28, 2025',
    downloadsCount: 2150,
    citationsCount: 31,
    pdfUrl: '#',
    keywords: ['High-Entropy Alloys', 'Machine Learning', 'XGBoost', 'Valence Electron Concentration', 'Solid Solution'],
    fullTextContent: {
      introduction: 'High-entropy alloys (HEAs) break traditional physical metallurgy conventions by mixing five or more principal elements in equimolar or near-equimolar ratios.',
      methodology: 'Feature extraction leveraged atomic radius disparity, mixing enthalpy, mixing entropy, and valence electron concentration across 850 experimentally verified alloys.',
      results: 'Ensemble gradient boosted trees outperformed traditional Hume-Rothery empirical criteria by over 26% across unseen multicomponent compositions.',
      discussion: 'Feature importance rankings identified atomic size mismatch parameter (delta) and electronegativity difference as the dominant determinants of phase stability.',
      conclusion: 'Computational data-driven discovery shortens the synthesis and characterization lifecycle of ultra-refractory HEAs from years to days.',
      references: [
        'Yeh, J. W., et al. (2004). Nanostructured high-entropy alloys with multiple principal elements. Advanced Engineering Materials, 6(5), 299-303.',
        'Ghani, U., & Asif, M. (2025). Data-driven materials engineering. Computational Materials Science, 240, 112998.'
      ]
    }
  }
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    year: '2021',
    month: 'November',
    title: 'Founding of SciComS at University of the Punjab',
    description: 'Conceived and formally chartered at the Institute of Metallurgy and Materials Engineering (IMME) to bridge the communication gap between university researchers and public scientific discourse.',
    category: 'Inception',
    statsBadge: 'Chartered by IMME',
    iconName: 'flag'
  },
  {
    year: '2022',
    month: 'September',
    title: 'Inaugural National Materials & Science Conference',
    description: 'Hosted 350+ delegates from 18 universities across Pakistan, establishing SciComS as the premier student-led scientific communication forum in Punjab.',
    category: 'Summit',
    statsBadge: '350+ Delegates',
    iconName: 'groups'
  },
  {
    year: '2023',
    month: 'March',
    title: 'Launch of the Peer-Reviewed SciComS Research Journal',
    description: 'Published Volume 1 of our official institutional journal with an editorial board comprising senior faculty and international peer reviewers.',
    category: 'Publication',
    statsBadge: 'ISSN Indexed',
    iconName: 'menu_book'
  },
  {
    year: '2024',
    month: 'October',
    title: 'IEEE & International Materials Society Affiliations',
    description: 'Formed bilateral collaborative agreements for joint webinars, student research exchanges, and technical paper sponsorships.',
    category: 'Affiliation',
    statsBadge: '5 Global Partners',
    iconName: 'handshake'
  },
  {
    year: '2025',
    month: 'December',
    title: 'Digital Institutional Portal & AI Research Repository',
    description: 'Architected the next-generation digital portal supporting online manuscript submissions, membership verification, and digital academic credentials.',
    category: 'Expansion',
    statsBadge: '1,500+ Active Members',
    iconName: 'hub'
  },
  {
    year: '2026',
    month: 'Present',
    title: 'National Center of Excellence for Science Outreach',
    description: 'Operating multidisciplinary wings spanning 6 technical directorates, publishing quarterly journal volumes, and organizing nationwide STEM fairs.',
    category: 'Expansion',
    statsBadge: '25+ Annual Events',
    iconName: 'rocket_launch'
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Best Student Technical Society in Punjab',
    category: 'National Award',
    year: '2025',
    awarder: 'Punjab Higher Education Commission (PHEC)',
    description: 'Awarded for extraordinary contributions to science popularization, research publications, and organizing high-caliber national symposiums.',
    badge: '1st Prize / Excellence Cup',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-2',
    title: 'National Science Fair Overall Champions',
    category: 'Competition Winner',
    year: '2025',
    awarder: 'Pakistan Academy of Sciences',
    description: 'SciComS student research team clinched 1st position in the Materials & Nanotechnology division with an eco-friendly corrosion inhibitor prototype.',
    badge: 'Gold Medal',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-3',
    title: 'Special Institutional Outreach Grant (PKR 2.5 Million)',
    category: 'Research Grant',
    year: '2024',
    awarder: 'National Science Foundation of Pakistan',
    description: 'Competitive grant awarded to modernize student laboratories and expand digital scientific journalism across tertiary educational institutes.',
    badge: 'Funded Project',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-4',
    title: '50+ High-Impact Journal Publications',
    category: 'Institutional Honor',
    year: '2023 - 2026',
    awarder: 'Elsevier, Springer, Wiley & SciComS Journal',
    description: 'Undergraduate and postgraduate student members authored over fifty Q1/Q2 indexed peer-reviewed scientific articles through society mentorship.',
    badge: 'Cumulative Impact Factor > 180',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Inaugural Keynote at 4th Science Symposium',
    category: 'Annual Gala',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    date: 'October 2025',
    caption: 'Faculty leadership and keynote speakers addressing the audience at Faisal Auditorium PU.'
  },
  {
    id: 'gal-2',
    title: 'Hands-on Electron Microscopy Lab Tour',
    category: 'Lab Tours',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    date: 'December 2025',
    caption: 'Student delegates observing live SEM characterization at the IMME Advanced Materials Center.'
  },
  {
    id: 'gal-3',
    title: 'Science Fair Model Demonstrations',
    category: 'Science Expo',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    date: 'November 2025',
    caption: 'Young innovators presenting solar-powered water purification and metallurgical prototypes.'
  },
  {
    id: 'gal-4',
    title: 'Scientific Writing & LaTeX Bootcamp',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    date: 'January 2026',
    caption: 'Intensive computer laboratory session coaching students in Overleaf LaTeX document preparation.'
  },
  {
    id: 'gal-5',
    title: 'Annual Executive Shield Distribution',
    category: 'Annual Gala',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80',
    date: 'May 2025',
    caption: 'Honoring outgoing directorates for distinguished institutional service and student leadership.'
  },
  {
    id: 'gal-6',
    title: 'Guest Lecture on Space Materials by Foreign Delegations',
    category: 'Guest Lectures',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    date: 'February 2026',
    caption: 'International research fellows sharing insights on ultra-high temperature ceramics.'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Engr. Haris Mehmood',
    role: 'Metallurgist & PhD Scholar',
    currentOrganization: 'RWTH Aachen University, Germany',
    batch: 'Batch 2020-2024 (IMME)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    quote: 'SciComS was the defining cornerstone of my undergraduate journey at Punjab University. Leading the Editorial team instilled rigorous scientific communication skills that directly helped me secure a fully funded DAAD PhD scholarship in Germany.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Dr. Fatima Tariq',
    role: 'Postdoctoral Fellow',
    currentOrganization: 'National University of Singapore (NUS)',
    batch: 'Batch 2019-2023 (Physics PU)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    quote: 'The collaborative workshops, conference organizing experience, and mentorship at SciComS transformed me from a timid student into an articulate researcher ready for global scientific forums.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Waleed Raza',
    role: 'Quality Assurance Lead',
    currentOrganization: 'Mughal Steel Industries',
    batch: 'Batch 2021-2025 (IMME)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    quote: 'Managing large-scale technical symposia and industrial expos gave me unmatched operational and networking capabilities that industrial recruiters prized during campus placements.',
    rating: 5
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: 'p-1',
    name: 'Institute of Metallurgy & Materials Engineering (IMME)',
    category: 'Academic Partner',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80',
    description: 'Parent academic institute providing state-of-the-art laboratory facilities, faculty advisorship, and conference venues.',
    website: 'http://pu.edu.pk/imme',
    collabScope: 'Research Laboratory Access, Faculty Mentorship, Institutional Endorsement'
  },
  {
    id: 'p-2',
    name: 'Pakistan Council of Scientific & Industrial Research (PCSIR)',
    category: 'Industrial Collaborator',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    description: 'Premier national research body collaborating on material testing, chemical analysis, and joint student internships.',
    website: 'https://pcsir.gov.pk',
    collabScope: 'Material Characterization Facilities, Summer Research Internships'
  },
  {
    id: 'p-3',
    name: 'IEEE University of the Punjab Student Branch',
    category: 'Student Chapter',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80',
    description: 'Collaborating on interdisciplinary engineering hackathons, tech workshops, and student networking summits.',
    website: 'https://ieee.org',
    collabScope: 'Joint Tech Workshops, Hackathons, Cross-Society Promotion'
  },
  {
    id: 'p-4',
    name: 'ASM International - Pakistan Chapter',
    category: 'International Affiliate',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
    description: 'Connecting student metallurgists with global materials standards, certifications, and international webinars.',
    website: 'https://asminternational.org',
    collabScope: 'Webinar Series, Student Chapters Exchange, Certification Sponsorship'
  }
];

export const FEEDBACK_POSTS_DATA: FeedbackPost[] = [
  {
    id: 'fb-1',
    authorName: 'Ali Haider',
    authorRole: 'IMME 6th Semester Student',
    date: 'August 28, 2026',
    category: 'Suggestion',
    title: 'Suggestion for adding Python / Machine Learning for Materials track in next symposium',
    content: 'Computational materials science is rapidly becoming a core industry requirement. It would be tremendously beneficial if the upcoming SCMS-2026 symposium included a dedicated workshop track on PyMatGen and Density Functional Theory (DFT) modeling.',
    upvotes: 42,
    commentsCount: 9,
    status: 'Implemented'
  },
  {
    id: 'fb-2',
    authorName: 'Sara Qureshi',
    authorRole: 'M.Phil Materials Scholar',
    date: 'August 24, 2026',
    category: 'Event Feedback',
    title: 'Commendation on the High-Impact Scientific Writing Masterclass',
    content: 'The literature review structuring framework shared by Dr. Ameeq Farooq was exceptionally clear and practical. Could we please receive the recorded session links and sample LaTeX templates via the portal?',
    upvotes: 28,
    commentsCount: 4,
    status: 'Reviewed'
  },
  {
    id: 'fb-3',
    authorName: 'Hassan Nisar',
    authorRole: 'Undergraduate Researcher',
    date: 'August 19, 2026',
    category: 'Research Idea',
    title: 'Proposing an Inter-departmental Battery & Energy Storage Working Group',
    content: 'With Chemistry, Physics, and Metallurgy students all researching lithium-ion and sodium-ion cathodes, SciComS could host a monthly inter-disciplinary seminar group to share testing protocols and prevent duplication.',
    upvotes: 35,
    commentsCount: 12,
    status: 'Under Discussion'
  }
];

export const MOCK_APPLICATIONS_DATA: MembershipApplication[] = [
  {
    id: 'APP-2026-0891',
    fullName: 'Muhammad Usman Khan',
    rollNumber: 'BME-23-44',
    email: 'usman.bme23@pu.edu.pk',
    phone: '+92 301 4567890',
    department: 'Institute of Metallurgy & Materials Engineering',
    semester: '4th Semester',
    degree: 'B.Sc. (Engg.) Metallurgy & Materials Engineering',
    preferredTeam: 'Research & Innovation',
    secondaryTeam: 'Editorial & Publications',
    skills: ['Python', 'OriginPro', 'Literature Review', 'X-Ray Diffraction Analysis'],
    pastExperience: 'Volunteered in the logistics team for SCMS-2025 and authored a semester review paper on bio-compatible titanium implants.',
    statementOfPurpose: 'I aspire to contribute to the peer-reviewed SciComS journal and assist in organizing technical research tracks for student researchers.',
    submissionDate: '2026-08-30',
    status: 'Pending'
  },
  {
    id: 'APP-2026-0892',
    fullName: 'Khadija Rehman',
    rollNumber: 'BS-PHY-24-12',
    email: 'khadija.phy24@pu.edu.pk',
    phone: '+92 322 9876543',
    department: 'Department of Physics',
    semester: '2nd Semester',
    degree: 'BS Physics',
    preferredTeam: 'Media & PR',
    secondaryTeam: 'Creative & Design',
    skills: ['Graphic Design', 'Figma', 'Scientific Podcasting', 'Social Media Marketing'],
    pastExperience: 'Managed digital media outreach for high school science fairs and designed promotional flyers.',
    statementOfPurpose: 'Passionate about simplifying complex physics principles for the broader public via infographics and social video reels.',
    submissionDate: '2026-08-30',
    status: 'Interview Scheduled'
  },
  {
    id: 'APP-2026-0888',
    fullName: 'Shahzaib Ahmed',
    rollNumber: 'BME-22-19',
    email: 'shahzaib.bme22@pu.edu.pk',
    phone: '+92 333 1122334',
    department: 'IMME, PU',
    semester: '6th Semester',
    degree: 'B.Sc. Metallurgy & Materials',
    preferredTeam: 'Event Management',
    secondaryTeam: 'Technology & Web',
    skills: ['Event Operations', 'Logistics', 'Vendor Management', 'Public Speaking'],
    pastExperience: 'Coordinated stage logistics for the 2025 Science Expo with 400+ attendees.',
    statementOfPurpose: 'Experienced with event coordination and eager to lead the venue and speaker hospitality arrangements for upcoming national symposiums.',
    submissionDate: '2026-08-28',
    status: 'Approved'
  }
];
