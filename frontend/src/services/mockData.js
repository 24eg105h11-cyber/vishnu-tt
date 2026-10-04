export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Technical', slug: 'technical', icon: 'Cpu', color: 'from-blue-500 to-indigo-600', description: 'Coding, AI, Hardware, Tech Talks' },
  { id: 'cat-2', name: 'Cultural', slug: 'cultural', icon: 'Music', color: 'from-purple-500 to-pink-600', description: 'Dance, Drama, Music, Fashion' },
  { id: 'cat-3', name: 'Sports', slug: 'sports', icon: 'Trophy', color: 'from-emerald-500 to-teal-600', description: 'Tournaments, E-Sports, Athletics' },
  { id: 'cat-4', name: 'Hackathon', slug: 'hackathon', icon: 'Code', color: 'from-orange-500 to-amber-600', description: '24-48h Build & Sprint Competitions' },
  { id: 'cat-5', name: 'Workshop', slug: 'workshop', icon: 'BookOpen', color: 'from-cyan-500 to-blue-600', description: 'Hands-on Bootcamps & Masterclasses' },
  { id: 'cat-6', name: 'Coding', slug: 'coding', icon: 'Terminal', color: 'from-violet-500 to-purple-600', description: 'Competitive Programming & DSA' },
  { id: 'cat-7', name: 'Entrepreneurship', slug: 'entrepreneurship', icon: 'TrendingUp', color: 'from-rose-500 to-red-600', description: 'Startups, Pitch Deck & Incubators' },
  { id: 'cat-8', name: 'Arts', slug: 'arts', icon: 'Palette', color: 'from-fuchsia-500 to-pink-600', description: 'Design, Fine Arts, Digital Media' },
];

export const MOCK_CLUBS = [
  {
    id: 'club-1',
    name: 'ByteCraft Coding Club',
    code: 'BCC',
    category: 'Technical',
    description: 'The flagship competitive programming and open-source software community of Campus. We build, hack, and learn together.',
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    facultyCoordinator: 'Dr. Robert Vance',
    studentCoordinators: ['Alex Rivera', 'Samantha Wu'],
    followersCount: 524,
    status: 'APPROVED',
    organizerUserId: 'user-organizer',
    socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'club-2',
    name: 'Aura Cultural Society',
    code: 'ACS',
    category: 'Cultural',
    description: 'Bringing music, rhythm, dance, and theatrical arts to life on campus. Home of the annual Campus Music & Dance Fest.',
    logoUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    facultyCoordinator: 'Prof. Elena Rostova',
    studentCoordinators: ['David K.', 'Priya Sharma'],
    followersCount: 890,
    status: 'APPROVED',
    organizerUserId: 'user-organizer-2',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' }
  },
  {
    id: 'club-3',
    name: 'RoboVanguard Robotics Lab',
    code: 'RVR',
    category: 'Technical',
    description: 'Designing autonomous drones, AI bots, combat robotics, and embedded IoT hardware.',
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    facultyCoordinator: 'Dr. Marcus Thorne',
    studentCoordinators: ['Liam Chen'],
    followersCount: 340,
    status: 'APPROVED',
    organizerUserId: 'user-organizer-3',
    socialLinks: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' }
  },
  {
    id: 'club-4',
    name: 'Nexus E-Cell (Entrepreneurship)',
    code: 'NEC',
    category: 'Entrepreneurship',
    description: 'Fostering campus student founders, venture capital mentorship, and seed funding pitch competitions.',
    logoUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    facultyCoordinator: 'Dr. Sarah Jenkins',
    studentCoordinators: ['Noah Miller'],
    followersCount: 410,
    status: 'APPROVED',
    organizerUserId: 'user-organizer-4',
    socialLinks: { linkedin: 'https://linkedin.com' }
  }
];

export const MOCK_EVENTS = [
  {
    id: 'evt-1',
    title: 'Campus HackOvernight 2026',
    clubId: 'club-1',
    clubName: 'ByteCraft Coding Club',
    clubLogoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    category: 'Hackathon',
    description: '24-Hour flagship campus hackathon. Build innovative web, mobile, or AI prototypes with cash prizes up to $5,000, free meals, swag, and recruiter mentorship!',
    posterUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-24',
    startTime: '09:00 AM',
    endTime: '09:00 AM (Next Day)',
    venue: 'Main Innovation Hub & Auditorium',
    maxCapacity: 200,
    registeredCount: 142,
    status: 'APPROVED',
    rules: [
      'Teams of 2 to 4 registered members',
      'All code must be committed during hackathon window',
      'Valid student ID card required at entry',
      'Hardware kits available at IoT counter'
    ],
    eligibility: 'Open to all enrolled undergraduate and postgraduate students.',
    organizerUserId: 'user-organizer',
    contactEmail: 'hackathon@codingclub.edu',
    contactPhone: '+1 555-8822',
    registrationDeadline: '2026-10-22T23:59:59Z'
  },
  {
    id: 'evt-2',
    title: 'Spring Boot & React Fullstack Bootcamp',
    clubId: 'club-1',
    clubName: 'ByteCraft Coding Club',
    clubLogoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    category: 'Workshop',
    description: 'Intensive 3-hour live workshop on constructing REST APIs using Java Spring Boot 3, Spring Security, MongoDB, and React with Vite.',
    posterUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-18',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    venue: 'CS Seminar Hall 3B',
    maxCapacity: 80,
    registeredCount: 78,
    status: 'APPROVED',
    rules: [
      'Bring a laptop with Java 17 and Node.js pre-installed',
      'GitHub account required'
    ],
    eligibility: 'Basic knowledge of Java or JavaScript.',
    organizerUserId: 'user-organizer',
    contactEmail: 'workshop@codingclub.edu',
    contactPhone: '+1 555-9933',
    registrationDeadline: '2026-10-17T18:00:00Z'
  },
  {
    id: 'evt-3',
    title: 'Aura Unplugged Campus Acoustic Night',
    clubId: 'club-2',
    clubName: 'Aura Cultural Society',
    clubLogoUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    category: 'Cultural',
    description: 'An evening of soulful acoustic solos, student band performances, beatboxing battles, and open mic under the campus star light.',
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    date: '2026-10-29',
    startTime: '06:00 PM',
    endTime: '09:30 PM',
    venue: 'Open Air Amphitheatre',
    maxCapacity: 400,
    registeredCount: 310,
    status: 'APPROVED',
    rules: [
      'Open mic registration at venue by 05:30 PM',
      'Respect campus acoustics guideline'
    ],
    eligibility: 'Free entry for all college students & faculty.',
    organizerUserId: 'user-organizer-2',
    contactEmail: 'cultural@aura.edu',
    contactPhone: '+1 555-1122',
    registrationDeadline: '2026-10-28T23:59:59Z'
  },
  {
    id: 'evt-4',
    title: 'AI & Bot Wars Autonomous Challenge',
    clubId: 'club-3',
    clubName: 'RoboVanguard Robotics Lab',
    clubLogoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
    category: 'Technical',
    description: 'Battle of custom autonomous line-followers, obstacle avoiding bots, and robo-sumo wrestlers built by engineering teams.',
    posterUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    date: '2026-11-05',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    venue: 'Mechanical Workshop Bay 2',
    maxCapacity: 120,
    registeredCount: 95,
    status: 'APPROVED',
    rules: [
      'Maximum bot dimensions: 30cm x 30cm x 30cm',
      'Battery voltage capped at 24V'
    ],
    eligibility: 'Open to registered student robotics teams.',
    organizerUserId: 'user-organizer-3',
    contactEmail: 'robotics@campus.edu',
    contactPhone: '+1 555-4411',
    registrationDeadline: '2026-11-03T23:59:59Z'
  },
  {
    id: 'evt-5',
    title: 'Startup Pitch Fest: Venture Tank 2026',
    clubId: 'club-4',
    clubName: 'Nexus E-Cell',
    clubLogoUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80',
    category: 'Entrepreneurship',
    description: 'Pitch your startup idea to real Angel Investors and Alumni Founders. Top 3 ideas win $2,500 seed money & incubator desk space.',
    posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    date: '2026-11-12',
    startTime: '11:00 AM',
    endTime: '03:30 PM',
    venue: 'Management Block Conference Room 101',
    maxCapacity: 100,
    registeredCount: 45,
    status: 'APPROVED',
    rules: [
      '5-minute pitch deck presentation + 3-minute Q&A',
      'Submit slide deck 24 hours prior'
    ],
    eligibility: 'Student startups or ideas with at least one campus founder.',
    organizerUserId: 'user-organizer-4',
    contactEmail: 'ecell@campus.edu',
    contactPhone: '+1 555-7788',
    registrationDeadline: '2026-11-10T23:59:59Z'
  },
  {
    id: 'evt-6',
    title: 'Intro to Quantum Computing & Qiskit',
    clubId: 'club-1',
    clubName: 'ByteCraft Coding Club',
    clubLogoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    category: 'Technical',
    description: 'Exploring quantum superposition, entanglement, and running quantum circuits on real IBM Quantum hardware.',
    posterUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    date: '2026-11-20',
    startTime: '03:00 PM',
    endTime: '05:00 PM',
    venue: 'Lab 4 - Physics & Computing',
    maxCapacity: 50,
    registeredCount: 12,
    status: 'PENDING',
    rules: ['Basic Linear Algebra helpful'],
    eligibility: 'All branches welcome.',
    organizerUserId: 'user-organizer',
    contactEmail: 'quantum@codingclub.edu',
    contactPhone: '+1 555-8822',
    registrationDeadline: '2026-11-19T23:59:59Z'
  }
];

export const MOCK_REGISTRATIONS = [
  {
    id: 'reg-101',
    registrationId: 'REG-2026-88291',
    eventId: 'evt-1',
    eventTitle: 'Campus HackOvernight 2026',
    studentId: 'user-student',
    studentName: 'Jane Smith',
    studentEmail: 'student@college.edu',
    collegeId: 'STU-2024-889',
    department: 'Information Technology',
    year: '3rd Year',
    phone: '+1 555-0192',
    qrCodeData: '{"registrationId":"REG-2026-88291","eventId":"evt-1","studentId":"user-student"}',
    status: 'REGISTERED',
    checkInTime: null,
    createdAt: '2026-10-02T10:15:00Z'
  },
  {
    id: 'reg-102',
    registrationId: 'REG-2026-44310',
    eventId: 'evt-2',
    eventTitle: 'Spring Boot & React Fullstack Bootcamp',
    studentId: 'user-student',
    studentName: 'Jane Smith',
    studentEmail: 'student@college.edu',
    collegeId: 'STU-2024-889',
    department: 'Information Technology',
    year: '3rd Year',
    phone: '+1 555-0192',
    qrCodeData: '{"registrationId":"REG-2026-44310","eventId":"evt-2","studentId":"user-student"}',
    status: 'ATTENDED',
    checkInTime: '2026-10-01T14:05:22Z',
    createdAt: '2026-09-28T09:30:00Z'
  }
];

export const MOCK_CERTIFICATES = [
  {
    id: 'cert-1',
    certificateId: 'CERT-2026-99381',
    eventId: 'evt-2',
    eventTitle: 'Spring Boot & React Fullstack Bootcamp',
    studentId: 'user-student',
    studentName: 'Jane Smith',
    collegeId: 'STU-2024-889',
    issueDate: 'October 01, 2026',
    signatureUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-10-01T17:00:00Z'
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'user-student',
    title: 'Registration Confirmed! 🎉',
    message: 'You have registered for Campus HackOvernight 2026. Your QR ticket is ready in My Events.',
    type: 'REGISTRATION_SUCCESS',
    targetUrl: '/my-events',
    isRead: false,
    createdAt: '2026-10-02T10:15:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-student',
    title: 'Certificate Awarded! 🎓',
    message: 'Your certificate for Spring Boot & React Fullstack Bootcamp is now available for download.',
    type: 'CERTIFICATE_AVAILABLE',
    targetUrl: '/certificates',
    isRead: true,
    createdAt: '2026-10-01T17:05:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-student',
    title: 'New Announcement from ByteCraft Coding Club',
    message: 'Check out the problem statements released early for the upcoming HackOvernight!',
    type: 'ANNOUNCEMENT',
    targetUrl: '/clubs/club-1',
    isRead: false,
    createdAt: '2026-10-03T12:00:00Z'
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, id: 'user-lead-1', name: 'Samantha Wu', collegeId: 'STU-2023-102', department: 'Computer Science', points: 680, badges: ['🏆 Event Explorer', '🔥 Active Participant', '💻 Tech Enthusiast', '🎯 Campus Champion', '🌟 Club Star'], eventsAttended: 16 },
  { rank: 2, id: 'user-lead-2', name: 'Jane Smith', collegeId: 'STU-2024-889', department: 'Information Technology', points: 420, badges: ['🏆 Event Explorer', '🔥 Active Participant', '💻 Tech Enthusiast'], eventsAttended: 9 },
  { rank: 3, id: 'user-lead-3', name: 'Marcus Johnson', collegeId: 'STU-2024-551', department: 'Electronics', points: 390, badges: ['🏆 Event Explorer', '🔥 Active Participant'], eventsAttended: 8 },
  { rank: 4, id: 'user-lead-4', name: 'Ananya Roy', collegeId: 'STU-2023-319', department: 'Mechanical', points: 310, badges: ['🏆 Event Explorer', '💻 Tech Enthusiast'], eventsAttended: 7 },
  { rank: 5, id: 'user-lead-5', name: 'David Kim', collegeId: 'STU-2025-014', department: 'Civil Engineering', points: 260, badges: ['🏆 Event Explorer'], eventsAttended: 5 }
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    clubId: 'club-1',
    clubName: 'ByteCraft Coding Club',
    title: 'HackOvernight 2026 Hardware Kit Request Form Open',
    content: 'All registered teams requiring Arduino/Raspberry Pi/Sensor modules for HackOvernight can submit their component list on our Discord channel.',
    priority: 'HIGH',
    createdAt: '2026-10-03T09:00:00Z'
  },
  {
    id: 'ann-2',
    clubId: 'club-2',
    clubName: 'Aura Cultural Society',
    title: 'Auditions for Campus Dance Team',
    content: 'Auditions for Western and Classical fusion dance troupe will be held this Friday at Student Center 2nd Floor.',
    priority: 'NORMAL',
    createdAt: '2026-10-02T15:30:00Z'
  }
];

export const MOCK_USERS = [
  { id: 'user-student', name: 'Jane Smith', email: 'student@college.edu', role: 'ROLE_STUDENT', collegeId: 'STU-2024-889', department: 'Information Technology', year: '3rd Year', points: 420, active: true },
  { id: 'user-organizer', name: 'Alex Rivera (Coding Lead)', email: 'organizer@codingclub.edu', role: 'ROLE_ORGANIZER', collegeId: 'ORG-101', department: 'Computer Science', year: '4th Year', points: 500, active: true },
  { id: 'user-admin', name: 'Campus Administrator', email: 'admin@college.edu', role: 'ROLE_ADMIN', collegeId: 'ADM-001', department: 'Administration', year: 'Staff', points: 1000, active: true }
];
