
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Layout, BookOpen, FileText, CheckSquare, Users, Settings, 
  Download, ChevronRight, MoreHorizontal, Globe, Lock, Users2, 
  Clock, MessageSquare, Rocket, Trash2, Edit3, Save, ArrowLeft,
  Filter, Share2, ExternalLink, Brain, Sparkles, Send, Paperclip,
  CheckCircle2, AlertCircle, Loader2, ChevronDown, ListTodo, Target,
  Mail
} from 'lucide-react';
import { workspaceService } from '../workspaceService';
import { Workspace, WorkspaceData, ResearchSession, Note, Task, Member } from '../workspaceTypes';

// --- Components ---

const WorkspaceList: React.FC<{ 
  data: WorkspaceData; 
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}> = ({ data, onSelect, onCreate, onDelete }) => {
  const [search, setSearch] = useState("");
  
  const filtered = data.workspaces.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Workspaces</h1>
          <p className="text-gray-500 mt-1">Manage your research projects and collaborations.</p>
        </div>
        <button 
          onClick={onCreate}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>New Workspace</span>
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors mt-0.5" />
        </div>
        <input 
          type="text"
          placeholder="Search workspaces..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-[#222] rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-white/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ws => (
          <motion.div
            key={ws.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(ws.id)}
            className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-[2rem] cursor-pointer hover:border-white/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full -mr-10 -mt-10 group-hover:bg-white/10 transition-all"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    ws.visibility === 'Private' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
                    ws.visibility === 'Team' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
                    'border-blue-500/20 text-blue-400 bg-blue-500/5'
                  }`}>
                    {ws.visibility}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(confirm('Delete this workspace?')) {
                        workspaceService.deleteWorkspace(ws.id);
                        onDelete(ws.id);
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">{ws.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mt-1">{ws.description}</p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>{ws.members.length}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                  <Brain className="w-3.5 h-3.5" />
                  <span>{ws.sessions.length}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-500 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Module ---

export const WorkspaceModule: React.FC = () => {
  const [data, setData] = useState<WorkspaceData>(() => workspaceService.getData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeWorkspace = data.workspaces.find(w => w.id === data.activeWorkspaceId);

  const handleSelectWorkspace = (id: string) => {
    const newData = { ...data, activeWorkspaceId: id };
    setData(newData);
    workspaceService.saveData(newData);
  };

  const handleDeleteWorkspace = () => {
    const refreshedData = workspaceService.getData();
    setData(refreshedData);
  };

  const handleCreateWorkspace = (name: string, desc: string, tags: string[], visibility: any) => {
    const newWs = workspaceService.createWorkspace(name, desc, tags, visibility);
    const newData = workspaceService.getData();
    newData.activeWorkspaceId = newWs.id;
    setData(newData);
    setShowCreateModal(false);
  };

  const updateActiveWorkspace = (updatedWs: Workspace) => {
    const newData = { ...data };
    const idx = newData.workspaces.findIndex(w => w.id === updatedWs.id);
    if (idx !== -1) {
      newData.workspaces[idx] = updatedWs;
      setData(newData);
      workspaceService.saveData(newData);
    }
  };

  if (!data.activeWorkspaceId || !activeWorkspace) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <WorkspaceList 
          data={data} 
          onSelect={handleSelectWorkspace} 
          onCreate={() => setShowCreateModal(true)} 
          onDelete={handleDeleteWorkspace}
        />
        {showCreateModal && (
          <CreateWorkspaceModal 
            onClose={() => setShowCreateModal(false)} 
            onConfirm={handleCreateWorkspace} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      {/* Workspace Sidebar */}
      <div className="w-64 border-r border-[#1a1a1a] flex flex-col bg-[#080808]">
        <div className="p-6 border-b border-[#1a1a1a]">
          <button 
            onClick={() => handleSelectWorkspace("")}
            className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">All Workspaces</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white truncate">{activeWorkspace.name}</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter truncate">{activeWorkspace.visibility}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Layout },
            { id: 'research', label: 'Research', icon: Brain },
            { id: 'library', label: 'Library', icon: BookOpen },
            { id: 'notes', label: 'Notes', icon: FileText },
            { id: 'tasks', label: 'Tasks', icon: CheckSquare },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'export', label: 'Export', icon: Download },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-white text-black shadow-lg shadow-white/5' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="pt-6 pb-2 px-4">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Recent Sessions</p>
          </div>
          {activeWorkspace.sessions.slice(0, 5).map(session => (
            <button
              key={session.id}
              onClick={() => { setActiveTab('research'); /* Set active session logic here */ }}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-[11px] font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all truncate"
            >
              <MessageSquare className="w-3 h-3" />
              <span className="truncate">{session.topic}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'dashboard' && <DashboardView workspace={activeWorkspace} onNavigate={setActiveTab} />}
              {activeTab === 'research' && <ResearchView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} />}
              {activeTab === 'library' && <LibraryView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} />}
              {activeTab === 'notes' && <NotesView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} />}
              {activeTab === 'tasks' && <TasksView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} />}
              {activeTab === 'members' && <MembersView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} />}
              {activeTab === 'settings' && <SettingsView workspace={activeWorkspace} onUpdate={updateActiveWorkspace} onDelete={handleDeleteWorkspace} />}
              {activeTab === 'export' && <ExportView workspace={activeWorkspace} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Views ---

const DashboardView: React.FC<{ workspace: Workspace; onNavigate: (tab: string) => void }> = ({ workspace, onNavigate }) => {
  const stats = [
    { label: 'Sessions', value: workspace.sessions.length, icon: Brain, tab: 'research' },
    { label: 'Library Items', value: workspace.library.papers.length + workspace.library.experts.length + workspace.library.links.length, icon: BookOpen, tab: 'library' },
    { label: 'Open Tasks', value: workspace.tasks.columns.todo.length + workspace.tasks.columns.doing.length, icon: CheckSquare, tab: 'tasks' },
    { label: 'Members', value: workspace.members.length, icon: Users, tab: 'members' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black tracking-tighter text-white">Workspace Overview</h2>
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('research')} className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">New Session</button>
          <button onClick={() => onNavigate('export')} className="bg-[#111] border border-[#222] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a1a1a] transition-all">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            onClick={() => onNavigate(stat.tab)}
            className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-[1.5rem] space-y-4 cursor-pointer hover:border-white/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Sessions</h3>
            <button onClick={() => onNavigate('research')} className="text-xs font-bold text-gray-500 hover:text-white">View all</button>
          </div>
          <div className="space-y-3">
            {workspace.sessions.length > 0 ? workspace.sessions.slice(0, 4).map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{session.topic}</p>
                    <p className="text-[10px] text-gray-500">{new Date(session.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </div>
            )) : (
              <div className="py-12 text-center opacity-30">No sessions yet</div>
            )}
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Tasks Due Soon</h3>
            <button onClick={() => onNavigate('tasks')} className="text-xs font-bold text-gray-500 hover:text-white">View all</button>
          </div>
          <div className="space-y-3">
            {workspace.tasks.columns.todo.length > 0 ? workspace.tasks.columns.todo.slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{task.title}</p>
                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-[#0c0c0c] flex items-center justify-center text-[8px] font-bold">JD</div>
                </div>
              </div>
            )) : (
              <div className="py-12 text-center opacity-30">No pending tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Modals ---

const CreateWorkspaceModal: React.FC<{ onClose: () => void; onConfirm: (n: string, d: string, t: string[], v: any) => void }> = ({ onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState('Private');
  const [tags, setTags] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2.5rem] w-full max-w-xl p-10 space-y-8 shadow-2xl"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tighter text-white">Create Workspace</h2>
          <p className="text-gray-500">Set up a new collaborative environment for your research.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Workspace Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Quantum Ethics Research"
              className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What is this workspace for?"
              className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10 h-24 resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Private', 'Team', 'Public'].map(v => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                  visibility === v ? 'bg-white text-black border-white' : 'bg-[#111] text-gray-500 border-[#222] hover:border-gray-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:text-white transition-all">Cancel</button>
          <button 
            disabled={!name}
            onClick={() => onConfirm(name, desc, tags.split(',').map(t => t.trim()), visibility)}
            className="flex-1 py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            Create Workspace
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Placeholder Views for other tabs (to be implemented in next steps) ---

const ResearchView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void }> = ({ workspace, onUpdate }) => {
  const [topic, setTopic] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeSession, setActiveSession] = useState<ResearchSession | null>(workspace.sessions[0] || null);

  const handleRun = () => {
    if (!topic) return;
    setIsRunning(true);
    // Simulate agent run
    setTimeout(() => {
      const newSession: ResearchSession = {
        id: 's' + Date.now(),
        topic,
        roleDepth: 'Standard',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        agentSteps: [
          { id: '1', label: 'Analyzing Intent', status: 'done' },
          { id: '2', label: 'Searching Web', status: 'done' },
          { id: '3', label: 'Synthesizing Results', status: 'done' },
        ],
        messages: [
          { id: 'm1', from: 'user', text: topic, at: new Date().toISOString() },
          { id: 'm2', from: 'assistant', text: `I've analyzed your request for "${topic}". Here are the key findings...`, at: new Date().toISOString() }
        ],
        sources: [],
        papers: [],
        experts: []
      };
      const updatedWs = { ...workspace, sessions: [newSession, ...workspace.sessions] };
      onUpdate(updatedWs);
      setActiveSession(newSession);
      setIsRunning(false);
      setTopic("");
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#050505]">
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {activeSession ? (
              activeSession.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user' ? 'bg-white text-black font-medium' : 'bg-[#111] border border-[#222] text-gray-300'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tighter text-white">Start New Research</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">Enter a topic below to let the AI agent explore and gather artifacts for your workspace.</p>
                </div>
              </div>
            )}
            {isRunning && (
              <div className="flex justify-start">
                <div className="bg-[#111] border border-[#222] p-4 rounded-2xl flex items-center space-x-3">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Agent Running...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-gradient-to-t from-[#050505] to-transparent">
            <div className="max-w-4xl mx-auto relative group">
              <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRun()}
                placeholder="Ask the research agent anything..."
                className="w-full bg-[#111] border border-[#222] rounded-2xl py-5 pl-6 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all shadow-2xl"
              />
              <button 
                onClick={handleRun}
                disabled={!topic || isRunning}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Context Panel */}
        <div className="w-80 border-l border-[#1a1a1a] bg-[#080808] flex flex-col">
          <div className="p-6 border-b border-[#1a1a1a]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Session Artifacts</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Sources</p>
              {activeSession?.sources.length ? activeSession.sources.map(s => (
                <div key={s.id} className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">{s.title}</span>
                </div>
              )) : <p className="text-[10px] text-gray-700 italic">No sources found yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LibraryView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void }> = ({ workspace, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('papers');
  const [search, setSearch] = useState("");

  const items = (workspace.library as any)[activeTab] || [];
  const filtered = items.filter((item: any) => 
    (item.title || item.name).toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Workspace Library</h2>
          <p className="text-gray-500 text-sm">Central repository for all discovered artifacts.</p>
        </div>
        <div className="flex items-center space-x-2 bg-[#111] p-1.5 rounded-2xl border border-[#222]">
          {['papers', 'experts', 'links', 'notes'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === t ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors mt-0.5" />
        </div>
        <input 
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? filtered.map((item: any) => (
          <div key={item.id} className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-[2rem] space-y-4 hover:border-white/20 transition-all group">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {activeTab === 'papers' && <BookOpen className="w-5 h-5 text-blue-400" />}
                {activeTab === 'experts' && <Users className="w-5 h-5 text-emerald-400" />}
                {activeTab === 'links' && <Globe className="w-5 h-5 text-amber-400" />}
                {activeTab === 'notes' && <FileText className="w-5 h-5 text-rose-400" />}
              </div>
              <button className="text-gray-700 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            <div>
              <h3 className="font-bold text-white group-hover:text-white transition-colors">{item.title || item.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.summary || item.affiliation || item.url || item.templateType}</p>
            </div>
            <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{activeTab.slice(0, -1)}</span>
              <button className="text-[10px] font-bold text-white hover:underline">View Details</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center space-y-4 opacity-30">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-widest">No {activeTab} found</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Try a different search or run a research session to add items.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NotesView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void }> = ({ workspace, onUpdate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", template: "Custom" as any, content: "" });

  const handleCreate = () => {
    if (!newNote.title) return;
    const note: Note = {
      id: 'n' + Date.now(),
      title: newNote.title,
      templateType: newNote.template,
      contentMarkdown: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onUpdate({ ...workspace, notes: [note, ...workspace.notes] });
    setIsCreating(false);
    setNewNote({ title: "", template: "Custom", content: "" });
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Notes & Docs</h2>
          <p className="text-gray-500 text-sm">Write and organize your research findings.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {isCreating && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Title</label>
              <input 
                type="text" 
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Template</label>
              <select 
                value={newNote.template}
                onChange={(e) => setNewNote({ ...newNote, template: e.target.value as any })}
                className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
              >
                {["Problem Statement", "Literature Review", "Methodology", "Results", "Conclusion", "Custom"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Content (Markdown)</label>
            <textarea 
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10 h-48 resize-none font-mono text-sm"
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button onClick={() => setIsCreating(false)} className="text-gray-500 font-bold hover:text-white transition-colors">Cancel</button>
            <button onClick={handleCreate} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">Save Note</button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workspace.notes.length > 0 ? workspace.notes.map(note => (
          <div key={note.id} className="bg-[#0c0c0c] border border-[#1a1a1a] p-8 rounded-[2.5rem] space-y-4 hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">{note.templateType}</span>
              <div className="flex items-center space-x-2">
                <button className="text-gray-700 hover:text-white transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button className="text-gray-700 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">{note.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-4 leading-relaxed italic">"{note.contentMarkdown.slice(0, 200)}..."</p>
            <div className="pt-4 flex items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
              <button className="text-white hover:underline">Read Full Note</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center space-y-4 opacity-30">
            <FileText className="w-12 h-12 mx-auto" />
            <p className="text-sm font-bold uppercase tracking-widest">No notes yet</p>
            <button onClick={() => setIsCreating(true)} className="text-xs text-white underline">Create your first note</button>
          </div>
        )}
      </div>
    </div>
  );
};

const TasksView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void }> = ({ workspace, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (!newTaskTitle) return;
    const task: Task = {
      id: 't' + Date.now(),
      title: newTaskTitle,
      description: "",
      assigneeId: workspace.members[0].id,
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      labels: [],
      checklist: []
    };
    const updatedTasks = { ...workspace.tasks };
    updatedTasks.columns.todo.push(task);
    onUpdate({ ...workspace, tasks: updatedTasks });
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const moveTask = (taskId: string, from: string, to: string) => {
    const updatedTasks = { ...workspace.tasks };
    const taskIdx = (updatedTasks.columns as any)[from].findIndex((t: any) => t.id === taskId);
    if (taskIdx === -1) return;
    const [task] = (updatedTasks.columns as any)[from].splice(taskIdx, 1);
    (updatedTasks.columns as any)[to].push(task);
    onUpdate({ ...workspace, tasks: updatedTasks });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Tasks & Milestones</h2>
          <p className="text-gray-500 text-sm">Track progress and manage project deadlines.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {['todo', 'doing', 'done'].map(col => (
          <div key={col} className="space-y-6">
            <div className="flex items-center justify-between px-4 py-2 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{col}</h3>
              <span className="text-[10px] text-white font-mono bg-white/10 px-2 py-0.5 rounded">{(workspace.tasks.columns as any)[col].length}</span>
            </div>
            
            <div className="space-y-4">
              {col === 'todo' && isAdding && (
                <div className="bg-[#111] border border-white/20 p-4 rounded-2xl space-y-3">
                  <input 
                    autoFocus
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="Task title..."
                    className="w-full bg-transparent border-none text-sm text-white focus:ring-0 p-0"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={() => setIsAdding(false)} className="text-[10px] font-bold text-gray-500">Cancel</button>
                    <button onClick={handleAddTask} className="text-[10px] font-bold text-white">Add</button>
                  </div>
                </div>
              )}

              {(workspace.tasks.columns as any)[col].map((task: Task) => (
                <motion.div layout key={task.id} className="bg-[#0c0c0c] border border-[#1a1a1a] p-5 rounded-[1.5rem] space-y-4 hover:border-white/20 transition-all group">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-white leading-tight">{task.title}</h4>
                    <button className="text-gray-700 hover:text-white transition-colors"><MoreHorizontal className="w-3 h-3" /></button>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{task.description || "No description provided."}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-bold text-gray-400">JD</div>
                      <div className="flex items-center space-x-1 text-[9px] text-amber-500 font-bold">
                        <Clock className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {col !== 'todo' && <button onClick={() => moveTask(task.id, col, col === 'doing' ? 'todo' : 'doing')} className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-white"><ArrowLeft className="w-3 h-3" /></button>}
                      {col !== 'done' && <button onClick={() => moveTask(task.id, col, col === 'todo' ? 'doing' : 'done')} className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-white"><ChevronRight className="w-3 h-3" /></button>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MembersView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void }> = ({ workspace, onUpdate }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember: Member = {
      id: 'u' + Date.now(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: 'Editor'
    };
    onUpdate({ ...workspace, members: [...workspace.members, newMember] });
    setInviteEmail("");
    setIsInviting(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Team Members</h2>
          <p className="text-gray-500 text-sm">Manage access and roles for your collaborators.</p>
        </div>
        <button 
          onClick={() => setIsInviting(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5"
        >
          <Plus className="w-5 h-5" />
          <span>Invite Member</span>
        </button>
      </div>

      {isInviting && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 flex items-center space-x-4 shadow-2xl">
          <div className="flex-1 relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
            <input 
              autoFocus
              type="email" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email address..."
              className="w-full bg-[#111] border border-[#222] rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>
          <button onClick={() => setIsInviting(false)} className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Cancel</button>
          <button onClick={handleInvite} className="bg-white text-black px-6 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">Send Invite</button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspace.members.map(member => (
          <div key={member.id} className="bg-[#0c0c0c] border border-[#1a1a1a] p-8 rounded-[2.5rem] flex flex-col items-center text-center space-y-4 hover:border-white/20 transition-all group">
            <div className="relative">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 transition-transform duration-500">
                {member.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-lg border-4 border-[#0c0c0c] flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">{member.role}</span>
              <button className="p-2 text-gray-700 hover:text-white transition-colors"><Settings className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView: React.FC<{ workspace: Workspace; onUpdate: (w: Workspace) => void; onDelete: () => void }> = ({ workspace, onUpdate, onDelete }) => {
  const [name, setName] = useState(workspace.name);
  const [desc, setDesc] = useState(workspace.description);

  return (
    <div className="p-8 space-y-12 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter text-white">Workspace Settings</h2>
        <p className="text-gray-500">Manage workspace details, visibility, and data.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">General Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Workspace Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Description</label>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10 h-24 resize-none"
              />
            </div>
            <button 
              onClick={() => onUpdate({ ...workspace, name, description: desc })}
              className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a] space-y-4">
          <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">Danger Zone</h3>
          <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-[2rem] flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Delete Workspace</p>
              <p className="text-xs text-gray-500 mt-1">Once deleted, all sessions, library items, and notes will be permanently removed.</p>
            </div>
            <button 
              onClick={() => { if(confirm('Are you sure?')) { workspaceService.deleteWorkspace(workspace.id); onDelete(); } }}
              className="bg-red-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExportView: React.FC<{ workspace: Workspace }> = ({ workspace }) => {
  const [includeSessions, setIncludeSessions] = useState(true);
  const [includeLibrary, setIncludeLibrary] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);

  const generateReport = () => {
    let report = `# Research Report: ${workspace.name}\n\n`;
    report += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    report += `## Description\n${workspace.description}\n\n`;
    
    if (includeSessions) {
      report += `## Research Sessions\n`;
      workspace.sessions.forEach(s => {
        report += `### ${s.topic}\n${s.messages.map(m => `**${m.from}**: ${m.text}`).join('\n\n')}\n\n`;
      });
    }

    if (includeNotes) {
      report += `## Notes\n`;
      workspace.notes.forEach(n => {
        report += `### ${n.title} (${n.templateType})\n${n.contentMarkdown}\n\n`;
      });
    }

    return report;
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter text-white">Export Report</h2>
        <p className="text-gray-500">Generate a comprehensive Markdown report of your workspace activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Include in Report</h3>
          <div className="space-y-4">
            {[
              { id: 'sessions', label: 'Research Sessions', state: includeSessions, setState: setIncludeSessions },
              { id: 'library', label: 'Library Items', state: includeLibrary, setState: setIncludeLibrary },
              { id: 'notes', label: 'Notes & Docs', state: includeNotes, setState: setIncludeNotes },
            ].map(item => (
              <label key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                <span className="text-sm font-bold text-white">{item.label}</span>
                <input 
                  type="checkbox" 
                  checked={item.state} 
                  onChange={(e) => item.setState(e.target.checked)}
                  className="w-5 h-5 rounded border-[#222] bg-[#111] text-white focus:ring-0"
                />
              </label>
            ))}
          </div>
          <button 
            className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
            onClick={() => {
              const blob = new Blob([generateReport()], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${workspace.name.replace(/\s+/g, '_')}_Report.md`;
              a.click();
            }}
          >
            <Download className="w-5 h-5" />
            <span>Download Report (.md)</span>
          </button>
        </div>

        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-4 overflow-hidden flex flex-col">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preview</h3>
          <div className="flex-1 bg-[#050505] rounded-xl p-6 font-mono text-[10px] text-gray-500 overflow-y-auto scrollbar-hide whitespace-pre-wrap border border-[#1a1a1a]">
            {generateReport()}
          </div>
        </div>
      </div>
    </div>
  );
};
