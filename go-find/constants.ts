
import { Project, UserProfile, ResearchSession } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Smart Waste Management using IoT',
    description: 'A deep-learning based system to optimize trash collection routes and identify bin levels in real-time.',
    domain: 'IoT / AI',
    difficulty: 'Intermediate',
    tags: ['Python', 'TensorFlow', 'Arduino'],
    author: 'Alex Chen',
    createdDate: '2 hours ago',
    commentsCount: 12,
    stars: 45
  },
  {
    id: '2',
    title: 'Blockchain for Academic Credentialing',
    description: 'Decentralized platform to verify and issue university certificates securely using Ethereum smart contracts.',
    domain: 'Blockchain',
    difficulty: 'Advanced',
    tags: ['Solidity', 'Web3.js', 'React'],
    author: 'Sarah Jenkins',
    createdDate: '1 day ago',
    commentsCount: 8,
    stars: 32
  },
  {
    id: '3',
    title: 'Mental Health Prediction via Social Media',
    description: 'Using NLP to analyze linguistic patterns in social media posts to predict early signs of burnout or depression.',
    domain: 'Data Science / NLP',
    difficulty: 'Advanced',
    tags: ['NLP', 'Transformers', 'Sentiment Analysis'],
    author: 'James Wilson',
    createdDate: '3 days ago',
    commentsCount: 24,
    stars: 128
  },
  {
    id: '4',
    title: 'AI-Powered Personal Finance Assistant',
    description: 'A mobile application that uses machine learning to categorize expenses and provide personalized saving tips.',
    domain: 'FinTech / AI',
    difficulty: 'Intermediate',
    tags: ['React Native', 'Python', 'Scikit-learn'],
    author: 'Emily Chen',
    createdDate: '4 days ago',
    commentsCount: 15,
    stars: 67
  },
  {
    id: '5',
    title: 'Decentralized Voting System',
    description: 'A secure and transparent voting platform built on blockchain technology to prevent tampering and ensure anonymity.',
    domain: 'Blockchain / Security',
    difficulty: 'Advanced',
    tags: ['Solidity', 'Ethereum', 'Truffle'],
    author: 'Michael Brown',
    createdDate: '5 days ago',
    commentsCount: 30,
    stars: 89
  },
  {
    id: '6',
    title: 'Autonomous Drone for Search and Rescue',
    description: 'Developing a drone capable of navigating complex environments and identifying survivors using thermal imaging.',
    domain: 'Robotics / Computer Vision',
    difficulty: 'Advanced',
    tags: ['ROS', 'OpenCV', 'C++'],
    author: 'David Lee',
    createdDate: '1 week ago',
    commentsCount: 42,
    stars: 210
  },
  {
    id: '7',
    title: 'Predictive Maintenance for Industrial Machinery',
    description: 'Using sensor data and time-series analysis to predict equipment failures before they occur, reducing downtime.',
    domain: 'Industrial IoT / Data Science',
    difficulty: 'Intermediate',
    tags: ['Python', 'Pandas', 'MQTT'],
    author: 'Sophia Martinez',
    createdDate: '1 week ago',
    commentsCount: 18,
    stars: 54
  },
  {
    id: '8',
    title: 'Smart Agriculture: Soil Health Monitoring',
    description: 'An IoT-based system that monitors soil moisture, pH, and nutrient levels to optimize irrigation and fertilization.',
    domain: 'IoT / Agriculture',
    difficulty: 'Beginner',
    tags: ['ESP32', 'LoRaWAN', 'Grafana'],
    author: 'Liam Wilson',
    createdDate: '2 weeks ago',
    commentsCount: 10,
    stars: 38
  },
  {
    id: '9',
    title: 'E-learning Platform with Personalized Learning Paths',
    description: 'An adaptive learning platform that uses AI to tailor educational content to each student\'s pace and style.',
    domain: 'EdTech / AI',
    difficulty: 'Intermediate',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    author: 'Olivia Taylor',
    createdDate: '2 weeks ago',
    commentsCount: 22,
    stars: 76
  },
  {
    id: '10',
    title: 'Kernel Optimization for RTOS',
    description: 'Advanced research into memory management and scheduling algorithms for real-time operating systems.',
    domain: 'Systems Programming',
    difficulty: 'Advanced',
    tags: ['C', 'Assembly', 'RTOS'],
    author: 'Jane Cooper',
    createdDate: '1 day ago',
    commentsCount: 5,
    stars: 88
  },
  {
    id: '11',
    title: 'Distributed Consensus Protocol',
    description: 'Implementation and formal verification of a high-performance consensus protocol for distributed ledgers.',
    domain: 'Distributed Systems',
    difficulty: 'Advanced',
    tags: ['Go', 'Formal Methods', 'Networking'],
    author: 'Jane Cooper',
    createdDate: '2 days ago',
    commentsCount: 12,
    stars: 120
  },
  {
    id: '12',
    title: 'Functional Language Compiler',
    description: 'Building a modern compiler for a new functional language targeting LLVM.',
    domain: 'Compilers',
    difficulty: 'Advanced',
    tags: ['Haskell', 'LLVM', 'C++'],
    author: 'Jane Cooper',
    createdDate: '3 days ago',
    commentsCount: 8,
    stars: 95
  },
  {
    id: '13',
    title: 'High-Performance DB Engine',
    description: 'A custom storage engine optimized for high-throughput transactional workloads.',
    domain: 'Databases',
    difficulty: 'Advanced',
    tags: ['C++', 'Storage', 'Concurrency'],
    author: 'Jane Cooper',
    createdDate: '4 days ago',
    commentsCount: 15,
    stars: 110
  },
  {
    id: '14',
    title: 'Advanced Network Security',
    description: 'Researching and implementing next-generation security protocols for zero-trust architectures.',
    domain: 'Cybersecurity',
    difficulty: 'Advanced',
    tags: ['Rust', 'Cryptography', 'Networking'],
    author: 'Jane Cooper',
    createdDate: '5 days ago',
    commentsCount: 20,
    stars: 150
  }
];

export const MOCK_USERS: any[] = [
  {
    id: 'u1',
    name: 'Jane Cooper',
    role: 'Full Stack Developer',
    avatar: 'https://picsum.photos/id/64/100/100',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    interests: ['Blockchain', 'FinTech'],
    matchScore: 95,
    bio: "Passionate about building scalable web apps and exploring decentralized finance.",
    availabilitySchedule: "Mon-Thu, 4pm-8pm",
    commStyle: "Direct & Collaborative",
    projectFitReason: "Expert in your current tech stack (React/Node)."
  },
  {
    id: 'u2',
    name: 'Robert Fox',
    role: 'Data Scientist',
    avatar: 'https://picsum.photos/id/91/100/100',
    skills: ['Python', 'PyTorch', 'SQL'],
    interests: ['AI Ethics', 'NLP'],
    matchScore: 88,
    bio: "Focused on ethical AI and natural language processing in healthcare datasets.",
    availabilitySchedule: "Weekends only",
    commStyle: "Detailed & Async",
    projectFitReason: "Strong background in the ML models you need."
  },
  {
    id: 'u3',
    name: 'Esther Howard',
    role: 'UI/UX Designer',
    avatar: 'https://picsum.photos/id/102/100/100',
    skills: ['Figma', 'Adobe XD', 'CSS'],
    interests: ['Accessibility', 'User Research'],
    matchScore: 82,
    bio: "User-centric designer with a flair for clean, minimalistic academic interfaces.",
    availabilitySchedule: "Flexible daily",
    commStyle: "Visual & Iterative",
    projectFitReason: "Can elevate the professional look of your research portal."
  },
  {
    id: 'u4',
    name: 'Guy Hawkins',
    role: 'DevOps Engineer',
    avatar: 'https://picsum.photos/id/103/100/100',
    skills: ['Docker', 'AWS', 'CI/CD'],
    interests: ['Infrastructure', 'Security'],
    matchScore: 79,
    bio: "Ensuring high availability and secure deployments for student-led startups.",
    availabilitySchedule: "Evenings (EST)",
    commStyle: "Technical & Focused",
    projectFitReason: "Perfect for scaling your MVP to a live production environment."
  },
  {
    id: 'u5',
    name: 'Jenny Wilson',
    role: 'Project Manager',
    avatar: 'https://picsum.photos/id/104/100/100',
    skills: ['Agile', 'Scrum', 'Jira'],
    interests: ['Strategy', 'Leadership'],
    matchScore: 91,
    bio: "Organized leader with experience managing interdisciplinary research teams.",
    availabilitySchedule: "Daily, 10am-2pm",
    commStyle: "Structured & Supportive",
    projectFitReason: "Will keep your team milestones on track for the final review."
  },
  {
    id: 'u6',
    name: 'Kristin Watson',
    role: 'Security Analyst',
    avatar: 'https://picsum.photos/id/106/100/100',
    skills: ['Pentesting', 'Cryptography', 'Risk Assessment'],
    interests: ['Privacy', 'Cyber Law'],
    matchScore: 74,
    bio: "Detail-oriented analyst protecting data integrity in academic projects.",
    availabilitySchedule: "Variable",
    commStyle: "Formal & Precise",
    projectFitReason: "Essential for the high-security requirements of your Blockchain project."
  }
];

export const MOCK_RESEARCH_SESSIONS: ResearchSession[] = [
  {
    id: 's1',
    topic: 'Impact of AI on Modern Healthcare',
    role: 'PhD',
    papersCount: 12,
    expertsCount: 5,
    notesCount: 8,
    lastUpdated: '2 hours ago',
    messages: [
      { id: 'm1', role: 'user', content: 'What are the main challenges of AI in healthcare?', timestamp: new Date() },
      { id: 'm2', role: 'assistant', content: 'The main challenges include data privacy, integration with legacy systems, and regulatory compliance...', timestamp: new Date() }
    ],
    artifacts: {
      papers: [
        { title: 'AI in Clinical Practice', authors: ['Dr. Smith'], year: 2023, venue: 'Nature Medicine', url: '#', tldr: 'A study on clinical AI.', why_it_matters: 'Critical for adoption.', confidence: 'high' },
        { title: 'Ethics of Medical AI', authors: ['Prof. Jones'], year: 2024, venue: 'Science', url: '#', tldr: 'Ethical considerations.', why_it_matters: 'Policy making.', confidence: 'high' }
      ],
      experts: [
        { name: 'Dr. Sarah Chen', affiliation: 'Medical AI Lab', profile_url: '#', why_relevant: 'Expert in diagnostic AI.', confidence: 'high' },
        { name: 'James Wilson', affiliation: 'Health Policy Institute', profile_url: '#', why_relevant: 'Expert in health policy.', confidence: 'high' }
      ],
      notes: [
        { title: 'Diagnostic Accuracy', content: 'Focus on diagnostic accuracy in clinical settings.', confidence: 'high' },
        { title: 'Regulatory Hurdles', content: 'Regulatory hurdles in EU are significant.', confidence: 'medium' }
      ],
      sources: [
        { title: 'PubMed', type: 'wiki', url: 'https://pubmed.gov', short_note: 'Primary source for medical papers.', confidence: 'high' },
        { title: 'WHO', type: 'news', url: 'https://who.int', short_note: 'Global health guidelines.', confidence: 'high' }
      ],
      outline: [
        { section: 'Introduction', content: 'Overview of AI in healthcare.' },
        { section: 'Current State', content: 'Current applications.' },
        { section: 'Challenges', content: 'Key hurdles.' },
        { section: 'Future Outlook', content: 'What to expect next.' }
      ]
    }
  },
  {
    id: 's2',
    topic: 'Sustainable Energy Solutions for Urban Areas',
    role: 'Student',
    papersCount: 8,
    expertsCount: 3,
    notesCount: 4,
    lastUpdated: '1 day ago',
    messages: [],
    artifacts: {
      papers: [],
      experts: [],
      notes: [],
      sources: [],
      outline: []
    }
  }
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'u1',
  avatar: { type: 'initials' },
  name: 'Jane Cooper',
  email: 'jane.cooper@university.edu',
  phone: '+1 (555) 000-0000',
  bio: 'Senior CS student passionate about AI and its applications in healthcare. Looking for research collaborators.',
  college: 'Stanford University',
  department: 'Computer Science',
  yearSemester: 'Senior / Fall 2024',
  location: 'Palo Alto, CA',
  role: 'Student',
  aiPrefs: {
    depth: 'Standard',
    tone: 'Professional',
    language: 'English',
    citationsOnly: true,
    preferRecent: true
  },
  domains: ['AI', 'Healthcare', 'NLP'],
  interests: ['Machine Learning', 'Data Ethics', 'Bioinformatics'],
  preferredProjectType: 'Final Year',
  skills: [
    { name: 'Python', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'PyTorch', level: 'Intermediate' }
  ],
  tools: ['VS Code', 'Git', 'Docker'],
  learningGoals: ['Quantum Computing', 'Rust'],
  collaboration: {
    openToCollaborate: true,
    preferredRoles: ['Research Lead', 'Frontend Dev'],
    availabilityHoursPerWeek: 15,
    preferredDays: ['Mon', 'Wed', 'Sat'],
    workStyle: 'Mixed',
    communication: ['Email', 'Discord']
  },
  portfolio: {
    github: 'https://github.com/janecooper',
    linkedin: 'https://linkedin.com/in/janecooper'
  },
  privacy: {
    visibility: 'Public',
    showEmail: true,
    showPhone: false,
    showLinks: true,
    aiConsent: true
  },
  stats: {
    projectsCompleted: 4,
    reportsGenerated: 12,
    papersSaved: 45,
    sessionsRun: 89
  },
  projectRoles: [
    {
      projectId: '1',
      projectName: 'Smart Waste Management',
      role: 'Backend Developer',
      responsibilities: ['API Architecture', 'Database Schema', 'IoT Integration'],
      status: 'Active',
      contributionPercent: 40
    },
    {
      projectId: '2',
      projectName: 'Blockchain Credentials',
      role: 'Research Lead',
      responsibilities: ['Protocol Analysis', 'Smart Contract Review'],
      status: 'Active',
      contributionPercent: 25
    },
    {
      projectId: '3',
      projectName: 'Mental Health Prediction',
      role: 'Frontend Developer',
      responsibilities: ['Dashboard UI', 'Data Visualization'],
      status: 'Paused',
      contributionPercent: 15
    }
  ],
  updatedAt: new Date().toISOString()
};
