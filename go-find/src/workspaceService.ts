
import { WorkspaceData, Workspace } from './workspaceTypes';

const STORAGE_KEY = "rc_workspaces_v1";

const DUMMY_DATA: WorkspaceData = {
  userProfile: { id: "u1", name: "Jane Doe", role: "PhD Candidate" },
  activeWorkspaceId: "w1",
  workspaces: [
    {
      id: "w1",
      name: "Quantum Computing Ethics",
      description: "Analyzing the societal impact of quantum supremacy and cryptographic vulnerability.",
      tags: ["Quantum", "Ethics", "Policy"],
      visibility: "Private",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [
        { id: "u1", name: "Jane Doe", email: "jane@university.edu", role: "Owner" },
        { id: "u2", name: "Dr. Smith", email: "smith@university.edu", role: "Admin" }
      ],
      folders: [
        { id: "f1", name: "Related Work" },
        { id: "f2", name: "Drafts" }
      ],
      sessions: [
        {
          id: "s1",
          topic: "Quantum Cryptography Standards",
          roleDepth: "Advanced",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agentSteps: [
            { id: "step1", label: "Intent Analysis", status: "done" },
            { id: "step2", label: "Web Search", status: "done" },
            { id: "step3", label: "Synthesis", status: "done" }
          ],
          messages: [
            { id: "m1", from: "user", text: "What are the current NIST standards for post-quantum cryptography?", at: new Date().toISOString() },
            { id: "m2", from: "assistant", text: "NIST has selected several algorithms for standardization, including CRYSTALS-Kyber for key-establishment and CRYSTALS-Dilithium for digital signatures...", at: new Date().toISOString() }
          ],
          sources: [
            { id: "src1", title: "NIST Post-Quantum Cryptography", type: "news", url: "https://nist.gov" }
          ],
          papers: [
            { id: "p1", title: "Post-Quantum Cryptography: A Review", authors: "Chen et al.", year: 2022, venue: "IEEE", url: "#", summary: "A comprehensive review of PQC algorithms." }
          ],
          experts: [
            { id: "e1", name: "Dr. Dustin Moody", affiliation: "NIST", url: "#", highlight: "Lead of NIST PQC project." }
          ]
        }
      ],
      library: {
        papers: [],
        experts: [],
        links: [],
        notes: []
      },
      notes: [
        {
          id: "n1",
          title: "Initial Thoughts on Policy",
          templateType: "Problem Statement",
          contentMarkdown: "# Problem Statement\nQuantum computers threaten current RSA encryption...",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      tasks: {
        columns: {
          todo: [
            { id: "t1", title: "Review NIST Draft", description: "Read the latest publication from NIST regarding Kyber.", assigneeId: "u1", dueDate: "2024-03-01", labels: ["Urgent"], checklist: [] }
          ],
          doing: [],
          done: []
        },
        milestones: [
          { id: "ms1", title: "Literature Review Complete", description: "All major papers indexed.", dueDate: "2024-03-15", status: "In Progress" }
        ]
      }
    }
  ]
};

export const workspaceService = {
  getData(): WorkspaceData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_DATA));
      return DUMMY_DATA;
    }
    return JSON.parse(stored);
  },

  saveData(data: WorkspaceData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  createWorkspace(name: string, description: string, tags: string[], visibility: any): Workspace {
    const data = this.getData();
    const newWs: Workspace = {
      id: "w" + Date.now(),
      name,
      description,
      tags,
      visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [{ ...data.userProfile, email: "user@example.com", role: "Owner" }],
      folders: [],
      sessions: [],
      library: { papers: [], experts: [], links: [], notes: [] },
      notes: [],
      tasks: { columns: { todo: [], doing: [], done: [] }, milestones: [] }
    };
    data.workspaces.push(newWs);
    this.saveData(data);
    return newWs;
  },

  updateWorkspace(workspace: Workspace) {
    const data = this.getData();
    const idx = data.workspaces.findIndex(w => w.id === workspace.id);
    if (idx !== -1) {
      data.workspaces[idx] = { ...workspace, updatedAt: new Date().toISOString() };
      this.saveData(data);
    }
  },

  deleteWorkspace(id: string) {
    const data = this.getData();
    data.workspaces = data.workspaces.filter(w => w.id !== id);
    if (data.activeWorkspaceId === id) data.activeWorkspaceId = null;
    this.saveData(data);
  }
};
