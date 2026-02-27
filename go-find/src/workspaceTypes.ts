
export type Visibility = "Private" | "Team" | "Public";
export type MemberRole = "Owner" | "Admin" | "Editor" | "Viewer";
export type AgentStatus = "pending" | "running" | "done" | "error";
export type TemplateType = "Problem Statement" | "Literature Review" | "Methodology" | "Results" | "Conclusion" | "Custom";
export type MilestoneStatus = "Planned" | "In Progress" | "Done";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
}

export interface Folder {
  id: string;
  name: string;
}

export interface AgentStep {
  id: string;
  label: string;
  status: AgentStatus;
}

export interface Message {
  id: string;
  from: "user" | "assistant";
  text: string;
  at: string;
}

export interface Source {
  id: string;
  title: string;
  type: "paper" | "wiki" | "news";
  url: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
  summary: string;
}

export interface Expert {
  id: string;
  name: string;
  affiliation: string;
  url: string;
  highlight: string;
}

export interface ResearchSession {
  id: string;
  topic: string;
  roleDepth: "Simple" | "Standard" | "Advanced" | "Research-grade";
  createdAt: string;
  updatedAt: string;
  agentSteps: AgentStep[];
  messages: Message[];
  sources: Source[];
  papers: Paper[];
  experts: Expert[];
}

export interface Note {
  id: string;
  title: string;
  templateType: TemplateType;
  contentMarkdown: string;
  createdAt: string;
  updatedAt: string;
  linkedTo?: { type: "session" | "paper"; id: string };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  dueDate: string;
  labels: string[];
  checklist: { id: string; text: string; done: boolean }[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  tags: string[];
  visibility: Visibility;
  createdAt: string;
  updatedAt: string;
  members: Member[];
  folders: Folder[];
  sessions: ResearchSession[];
  library: {
    papers: Paper[];
    experts: Expert[];
    links: { id: string; title: string; url: string }[];
    notes: Note[];
  };
  notes: Note[];
  tasks: {
    columns: {
      todo: Task[];
      doing: Task[];
      done: Task[];
    };
    milestones: Milestone[];
  };
}

export interface WorkspaceData {
  userProfile: { id: string; name: string; role: string };
  activeWorkspaceId: string | null;
  workspaces: Workspace[];
}
