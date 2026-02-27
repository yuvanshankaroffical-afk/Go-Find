
export interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  author: string;
  createdDate: string;
  commentsCount: number;
  stars: number;
}

export interface AgentStep {
  label: string;
  status: 'done' | 'running' | 'pending';
}

export interface ResearchArtifacts {
  papers: any[];
  sources: any[];
  experts: any[];
  notes: any[];
  outline: any[];
}

export interface StructuredChatResponse {
  session_update: {
    session_id: string;
    title: string;
    role: string;
    depth: string;
    keywords: string[];
    subtopics: string[];
  };
  chat_message: {
    text: string;
    quick_actions: string[];
  };
  artifacts: ResearchArtifacts;
  ui_hints: {
    right_panel_default_tab: string;
    show_agent_steps: boolean;
    agent_steps: AgentStep[];
    toast?: string;
    open_export_modal?: boolean;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: string;
  isPinned?: boolean;
  isMistake?: boolean;
  attachments?: { name: string; type: string; url: string }[];
  structured?: StructuredChatResponse;
}

export interface ResearchSession {
  id: string;
  topic: string;
  role: 'High School' | 'Student' | 'Teacher' | 'Professional' | 'Job Seeker' | 'Researcher' | 'PhD';
  papersCount: number;
  expertsCount: number;
  notesCount: number;
  lastUpdated: string;
  messages: ChatMessage[];
  artifacts: ResearchArtifacts;
}

export enum ViewType {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  TEAM_MATCHING = 'TEAM_MATCHING',
  CHAT = 'CHAT',
  REPOSITORY = 'REPOSITORY',
  PROFILE = 'PROFILE',
  LIBRARY = 'LIBRARY',
  EDIT_PROFILE = 'EDIT_PROFILE',
  WORKSPACE = 'WORKSPACE',
  NEW_PROJECT = 'NEW_PROJECT'
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface UserProfile {
  id: string;
  avatar: { type: 'initials' | 'image'; url?: string };
  name: string;
  email?: string;
  phone?: string;
  bio: string;
  college: string;
  department: string;
  yearSemester: string;
  location?: string;

  role: 'High School' | 'Student' | 'Teacher' | 'Professional' | 'Job Seeker' | 'Researcher' | 'PhD';
  aiPrefs: {
    depth: 'Simple' | 'Standard' | 'Advanced' | 'Research-grade';
    tone: 'Friendly' | 'Professional' | 'Academic';
    language: string;
    citationsOnly: boolean;
    preferRecent: boolean;
  };

  domains: string[];
  interests: string[];
  preferredProjectType: 'Mini Project' | 'Final Year' | 'Research Paper' | 'Hackathon';

  skills: Skill[];
  tools: string[];
  learningGoals: string[];

  collaboration: {
    openToCollaborate: boolean;
    preferredRoles: string[];
    availabilityHoursPerWeek: number;
    preferredDays: string[];
    workStyle: 'Team' | 'Solo' | 'Mixed';
    communication: string[];
  };

  portfolio: {
    github?: string;
    linkedin?: string;
    resumeUrl?: string;
    scholar?: string;
    website?: string;
  };

  privacy: {
    visibility: 'Public' | 'Campus only' | 'Private';
    showEmail: boolean;
    showPhone: boolean;
    showLinks: boolean;
    aiConsent: boolean;
  };

  stats: {
    projectsCompleted: number;
    reportsGenerated: number;
    papersSaved: number;
    sessionsRun: number;
  };

  projectRoles: Array<{
    projectId: string;
    projectName: string;
    role: string;
    responsibilities: string[];
    status: 'Active' | 'Paused' | 'Completed';
    contributionPercent: number;
  }>;

  updatedAt: string;
}

export interface LibraryItem {
  id: string;
  type: 'paper' | 'expert' | 'dataset' | 'note' | 'template' | 'tool';
  title: string;
  description: string;
  tags: string[];
  meta: {
    year?: number;
    venue?: string;
    citations?: number;
    affiliation?: string;
    focusArea?: string;
    size?: string;
    license?: string;
    modality?: string;
    workspaceName?: string;
    updatedAt?: string;
    rating?: number;
    type?: string;
    sections?: string[];
  };
  saved: boolean;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
}
