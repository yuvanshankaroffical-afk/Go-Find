# ResearchCollab 🚀  
AI-Powered Student Research & Project Collaboration Platform

<img width="1903" height="850" alt="image" src="https://github.com/user-attachments/assets/c451b73a-edd4-448b-9edd-bf659c73c0ce" />


## Overview
ResearchCollab is a web platform that helps students discover project topics, search research papers, find relevant experts, and collaborate inside workspaces. It combines a ChatGPT-style research assistant with organized project tools like library, notes, tasks, and report export.

## Why this project?
Students often struggle with:
- Selecting good project/research topics
- Finding trusted papers and resources
- Understanding research in simple language
- Forming teams and collaborating effectively
- Organizing references, notes, and reports

ResearchCollab solves this by providing a single place to research + manage + collaborate.

## Key Features
### 🔍 AI Research Sessions (Chat View)
- Ask any topic (e.g., “AI in Healthcare”)
- Role-based summaries (High School → PhD)
- Follow-up questions like ChatGPT
- Session history (continue anytime)

### 📚 Research Library
<img width="1907" height="852" alt="image" src="https://github.com/user-attachments/assets/9bcf2072-b139-4465-b053-3137a04177eb" />


- Save papers, experts, links, and notes
- Folder + tag organization
- Quick search and filters

<img width="1907" height="847" alt="image" src="https://github.com/user-attachments/assets/527825ff-6105-4a99-9f47-7d3d2327a9e6" />

- 
<img width="1913" height="847" alt="image" src="https://github.com/user-attachments/assets/1a0aace3-27b0-4984-8375-5861f123f4bc" />

### 👥 Workspaces (Project Collaboration)
- Create workspaces for each project/team
- Invite members with roles (Owner/Admin/Editor/Viewer)
- Store sessions, library items, and notes per workspace

- <img width="1897" height="848" alt="image" src="https://github.com/user-attachments/assets/227ac6c9-caed-43e7-94de-aab12749913c" />


- <img width="1910" height="852" alt="image" src="https://github.com/user-attachments/assets/a3229ca8-96d9-4729-ac7d-1a22a4dc6a6a" />


### ✅ Tasks & Milestones
- Kanban board (To-do / Doing / Done)
- Assign tasks, set due dates
- Track milestones and progress

- <img width="1902" height="850" alt="image" src="https://github.com/user-attachments/assets/534639bc-0b8f-4c72-bf4e-a60c2b7ea017" />


<img width="1892" height="852" alt="image" src="https://github.com/user-attachments/assets/63aba3af-1867-4406-b305-adedb1fba590" />


### 📄 Report Generator
- Export research report (Phase-1: TXT/MD)
- (Future) PDF/Word export with citations

- <img width="1907" height="852" alt="image" src="https://github.com/user-attachments/assets/3ce38599-4fff-4a0c-8274-251a7e4b12ba" />


## Tech Stack
### Frontend
- React (TSX)
- TailwindCSS
- Framer Motion
- lucide-react

### Backend (Planned / In progress)
- Node.js + Express + TypeScript
- PostgreSQL + Prisma
- JWT Authentication
- Paper/Author search via free APIs:
  - OpenAlex
  - Semantic Scholar
  - arXiv
  - Crossref
  - ORCID

## Project Structure (Example)
Go-Find/
├─ README.md
├─ .gitignore
├─ docs/
│  ├─ screenshots/
│  ├─ api-spec.md
│  └─ database-schema.md
│
├─ frontend/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ tailwind.config.js
│  ├─ postcss.config.js
│  ├─ index.html
│  ├─ public/
│  │  └─ logo.svg
│  └─ src/
│     ├─ main.tsx
│     ├─ App.tsx
│     ├─ routes/
│     │  ├─ index.tsx
│     │  └─ ProtectedRoute.tsx
│     ├─ pages/
│     │  ├─ Home/
│     │  │  └─ HomePage.tsx
│     │  ├─ Auth/
│     │  │  ├─ Login.tsx
│     │  │  └─ Register.tsx
│     │  ├─ Workspaces/
│     │  │  ├─ WorkspaceList.tsx
│     │  │  ├─ WorkspaceDashboard.tsx
│     │  │  ├─ WorkspaceSettings.tsx
│     │  │  └─ Members.tsx
│     │  ├─ Chat/
│     │  │  ├─ ChatViewPage.tsx
│     │  │  └─ components/
│     │  │     ├─ SidebarSessions.tsx
│     │  │     ├─ ChatHeader.tsx
│     │  │     ├─ ChatTranscript.tsx
│     │  │     ├─ MessageBubble.tsx
│     │  │     ├─ Composer.tsx
│     │  │     ├─ AgentSteps.tsx
│     │  │     └─ RightPanelTabs.tsx
│     │  ├─ Library/
│     │  │  └─ LibraryPage.tsx
│     │  ├─ Profile/
│     │  │  ├─ ProfilePage.tsx
│     │  │  └─ EditProfilePage.tsx
│     │  └─ Projects/
│     │     ├─ NewProjectPage.tsx
│     │     └─ ProjectDetails.tsx
│     ├─ components/
│     │  ├─ ui/
│     │  │  ├─ Button.tsx
│     │  │  ├─ Input.tsx
│     │  │  ├─ Modal.tsx
│     │  │  ├─ Tabs.tsx
│     │  │  ├─ Toast.tsx
│     │  │  └─ ChipInput.tsx
│     │  ├─ layout/
│     │  │  ├─ Sidebar.tsx
│     │  │  └─ Header.tsx
│     │  └─ cards/
│     │     ├─ PaperCard.tsx
│     │     ├─ ExpertCard.tsx
│     │     └─ ProjectCard.tsx
│     ├─ store/
│     │  ├─ authStore.ts
│     │  ├─ workspaceStore.ts
│     │  └─ sessionStore.ts
│     ├─ services/
│     │  ├─ api.ts
│     │  ├─ auth.service.ts
│     │  ├─ workspace.service.ts
│     │  ├─ search.service.ts
│     │  └─ chat.service.ts
│     ├─ types/
│     │  ├─ user.ts
│     │  ├─ workspace.ts
│     │  ├─ session.ts
│     │  ├─ artifacts.ts
│     │  └─ project.ts
│     ├─ utils/
│     │  ├─ constants.ts
│     │  ├─ format.ts
│     │  └─ storage.ts
│     └─ styles/
│        └─ index.css
│
└─ backend/
   ├─ package.json
   ├─ tsconfig.json
   ├─ .env.example
   ├─ prisma/
   │  ├─ schema.prisma
   │  ├─ migrations/
   │  └─ seed.ts
   └─ src/
      ├─ server.ts
      ├─ app.ts
      ├─ config/
      │  └─ env.ts
      ├─ routes/
      │  ├─ auth.routes.ts
      │  ├─ home.routes.ts
      │  ├─ workspace.routes.ts
      │  ├─ session.routes.ts
      │  ├─ search.routes.ts
      │  ├─ library.routes.ts
      │  ├─ task.routes.ts
      │  └─ project.routes.ts
      ├─ controllers/
      │  ├─ auth.controller.ts
      │  ├─ home.controller.ts
      │  ├─ workspace.controller.ts
      │  ├─ session.controller.ts
      │  ├─ search.controller.ts
      │  ├─ library.controller.ts
      │  ├─ task.controller.ts
      │  └─ project.controller.ts
      ├─ services/
      │  ├─ auth.service.ts
      │  ├─ home.service.ts
      │  ├─ workspace.service.ts
      │  ├─ session.service.ts
      │  ├─ search.service.ts
      │  ├─ mockAgent.service.ts
      │  └─ providers/
      │     ├─ openalex.ts
      │     ├─ semanticscholar.ts
      │     ├─ arxiv.ts
      │     ├─ crossref.ts
      │     └─ orcid.ts
      ├─ middleware/
      │  ├─ auth.ts
      │  ├─ errorHandler.ts
      │  └─ rateLimit.ts
      ├─ utils/
      │  ├─ logger.ts
      │  ├─ cache.ts
      │  └─ response.ts
      └─ types/
         ├─ api.ts
         └─ search.ts
