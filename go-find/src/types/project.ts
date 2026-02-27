
export type ProjectType = "Mini project" | "Final year" | "Research paper" | "Hackathon" | "Internship project";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type TeamStatus = "Looking for teammates" | "Team full" | "Solo project";
export type CollaborationMode = "Online" | "Offline" | "Hybrid";
export type FocusType = "Application" | "Research-based" | "Both";
export type ProjectStatus = "Idea" | "In progress" | "Completed";
export type Visibility = "Public" | "Campus only" | "Private";

export interface ProjectDraft {
  id: string;
  title: string;
  tagline: string;
  projectType: ProjectType;
  domains: string[];
  difficulty: Difficulty;
  abstract: string;
  problemStatement: string;
  objectives: string[];
  keywords: string[];

  team: {
    status: TeamStatus;
    requiredRoles: string[];
    expectedTeamSize: number;
    collaborationMode: CollaborationMode;
    communication: string[];
  };

  tech: {
    techStack: string[];
    skillsRequired: { name: string; level: Difficulty }[];
    tools: string[];
  };

  research: {
    focusType: FocusType;
    references: { title: string; urlOrDoi: string }[];
    datasetRequired: boolean;
    dataset: { name?: string; url?: string; privacyNotes?: string };
  };

  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };

  uploads: {
    coverImageName?: string;
    reportFileName?: string;
    pptFileName?: string;
    extraFiles?: string[];
  };

  timeline: {
    startDate?: string;
    endDate?: string;
    milestones: { title: string; dueDate?: string }[];
    status: ProjectStatus;
  };

  publish: {
    visibility: Visibility;
    allowComments: boolean;
    allowReuseAsReference: boolean;
  };

  createdAt: string;
  updatedAt: string;
}
