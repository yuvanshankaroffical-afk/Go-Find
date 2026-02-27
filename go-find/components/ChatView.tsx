import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Search, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  BookOpen, 
  Users, 
  FileText, 
  Layout, 
  Star, 
  Clock, 
  Settings, 
  ChevronDown, 
  Download, 
  Copy, 
  RefreshCw, 
  StickyNote, 
  ExternalLink, 
  Check, 
  Pin, 
  Trash2, 
  Brain, 
  Sparkles, 
  Rocket,
  GraduationCap, 
  Globe, 
  User, 
  Volume2, 
  ThumbsDown, 
  Smile, 
  Play, 
  CheckCircle2, 
  X,
  Info,
  ArrowRight,
  Filter,
  Menu,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';

// --- Types ---

type Role = 'Student' | 'PhD' | 'Researcher';
type Depth = 'Standard' | 'Advanced' | 'Research-grade';
type MessageType = 'text' | 'link' | 'audio' | 'paper-summary';

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
  tldr: string;
  saved: boolean;
}

interface Source {
  id: string;
  title: string;
  type: string;
  url: string;
  shortNote: string;
  saved: boolean;
}

interface Expert {
  id: string;
  name: string;
  affiliation: string;
  profileUrl: string;
  whyRelevant: string;
  saved: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  saved: boolean;
}

interface OutlineItem {
  section: string;
  content: string;
}

interface Message {
  id: string;
  from: 'user' | 'assistant';
  text: string;
  at: string;
  type: MessageType;
  metadata?: any;
}

interface Session {
  id: string;
  title: string;
  role: Role;
  depth: Depth;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  artifacts: {
    papers: Paper[];
    sources: Source[];
    experts: Expert[];
    notes: Note[];
    outline: OutlineItem[];
  };
}

// --- Mock Data ---

const STORAGE_KEY = "rc_chat_sessions_v1";

const SEED_SESSIONS: Session[] = [
  {
    id: 's1',
    title: 'AI in Healthcare Diagnostics',
    role: 'Student',
    depth: 'Standard',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      { id: 'm1', from: 'user', text: 'What are the current trends in AI-driven medical imaging?', at: new Date(Date.now() - 3600000).toISOString(), type: 'text' },
      { id: 'm2', from: 'assistant', text: 'Current trends in AI medical imaging focus on self-supervised learning, multi-modal data integration, and explainable AI (XAI) for clinical trust.', at: new Date(Date.now() - 3500000).toISOString(), type: 'text' }
    ],
    artifacts: {
      papers: [
        { id: 'p1', title: 'Self-Supervised Learning for Medical Imaging', authors: 'Chen et al.', year: 2023, venue: 'Nature Medicine', url: '#', tldr: 'A comprehensive review of self-supervised techniques in radiology.', saved: true }
      ],
      sources: [
        { id: 'src1', title: 'FDA AI/ML Database', type: 'Database', url: '#', shortNote: 'List of approved medical AI devices.', saved: false }
      ],
      experts: [
        { id: 'e1', name: 'Dr. Andrew Ng', affiliation: 'Stanford AI Lab', profileUrl: '#', whyRelevant: 'Pioneer in deep learning applications for healthcare.', saved: true }
      ],
      notes: [
        { id: 'n1', title: 'XAI Importance', content: 'Explainability is the biggest hurdle for clinical adoption.', saved: false }
      ],
      outline: [
        { section: 'Introduction', content: 'Overview of AI in radiology.' },
        { section: 'Current Trends', content: 'Transformer models and SSL.' }
      ]
    }
  },
  {
    id: 's2',
    title: 'Quantum Computing Fundamentals',
    role: 'PhD',
    depth: 'Advanced',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    messages: [
      { id: 'm1', from: 'user', text: 'Explain the difference between superconducting and ion trap qubits.', at: new Date(Date.now() - 7200000).toISOString(), type: 'text' },
      { id: 'm2', from: 'assistant', text: 'Superconducting qubits (like IBM/Google) offer fast gates but shorter coherence, while ion traps (Quantinuum/IonQ) have high fidelity and connectivity but slower operations.', at: new Date(Date.now() - 7100000).toISOString(), type: 'text' }
    ],
    artifacts: {
      papers: [],
      sources: [],
      experts: [],
      notes: [],
      outline: []
    }
  }
];

// --- Components ---

const Toast = ({ message, visible }: { message: string, visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/10"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-bold">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export const ChatView: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [agentStep, setAgentStep] = useState<string | null>(null);
  const [artifactTab, setArtifactTab] = useState<'papers' | 'sources' | 'experts' | 'notes' | 'outline' | 'saved'>('papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Mobile UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // 300ms delay as requested
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) setActiveSessionId(parsed[0].id);
    } else {
      setSessions(SEED_SESSIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SESSIONS));
      setActiveSessionId(SEED_SESSIONS[0].id);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, isSending]);

  const activeSession = useMemo(() => 
    sessions.find(s => s.id === activeSessionId) || null
  , [sessions, activeSessionId]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNewSession = () => {
    const newSession: Session = {
      id: `s-${Date.now()}`,
      title: 'New Research Session',
      role: 'Student',
      depth: 'Standard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      artifacts: { papers: [], sources: [], experts: [], notes: [], outline: [] }
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setIsSidebarOpen(false);
  };

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input;
    if (!text.trim() || !activeSessionId || isSending) return;

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      from: 'user',
      text,
      at: new Date().toISOString(),
      type: text.startsWith('http') ? 'link' : 'text'
    };

    // Update session locally
    setSessions(prev => prev.map(s => s.id === activeSessionId ? {
      ...s,
      messages: [...s.messages, userMsg],
      updatedAt: new Date().toISOString()
    } : s));
    setInput('');
    setIsSending(true);

    // Simulate Agent Steps
    const steps = ['Intent', 'Search', 'Read', 'Summarize', 'Organize'];
    for (const step of steps) {
      setAgentStep(step);
      await new Promise(r => setTimeout(r, 800));
    }

    // Simulate AI Response
    const aiMsg: Message = {
      id: `m-ai-${Date.now()}`,
      from: 'assistant',
      text: `Based on your query about "${text}", I've analyzed several recent publications and synthesized the key findings. I've also identified top experts in this field and drafted a preliminary research outline in the right panel.`,
      at: new Date().toISOString(),
      type: text.toLowerCase().includes('paper') ? 'paper-summary' : 'text',
      metadata: text.toLowerCase().includes('paper') ? {
        title: 'Advances in Neural Information Processing',
        authors: 'A. Vaswani et al.',
        year: 2023
      } : undefined
    };

    // Mock Artifact Update
    const mockArtifacts = {
      papers: [
        { id: `p-${Date.now()}`, title: `Recent Advances in ${text.slice(0, 20)}...`, authors: 'Smith et al.', year: 2024, venue: 'IEEE Xplore', url: '#', tldr: 'A breakthrough study on the efficiency of these systems.', saved: false }
      ],
      sources: [
        { id: `src-${Date.now()}`, title: 'Global Research Index', type: 'Repository', url: '#', shortNote: 'Comprehensive data source.', saved: false }
      ],
      experts: [
        { id: `e-${Date.now()}`, name: 'Prof. Sarah Jenkins', affiliation: 'MIT', profileUrl: '#', whyRelevant: 'Leading researcher in this specific domain.', saved: false }
      ],
      notes: [
        { id: `n-${Date.now()}`, title: 'Key Insight', content: 'The convergence of these two technologies is accelerating.', saved: false }
      ],
      outline: [
        { section: 'Current State', content: 'Analysis of existing methodologies.' },
        { section: 'Future Directions', content: 'Potential breakthroughs in the next 5 years.' }
      ]
    };

    setSessions(prev => prev.map(s => s.id === activeSessionId ? {
      ...s,
      messages: [...s.messages, aiMsg],
      artifacts: {
        papers: [...mockArtifacts.papers, ...s.artifacts.papers],
        sources: [...mockArtifacts.sources, ...s.artifacts.sources],
        experts: [...mockArtifacts.experts, ...s.artifacts.experts],
        notes: [...mockArtifacts.notes, ...s.artifacts.notes],
        outline: mockArtifacts.outline.length > 0 ? mockArtifacts.outline : s.artifacts.outline
      },
      updatedAt: new Date().toISOString()
    } : s));

    setIsSending(false);
    setAgentStep(null);
  };

  const toggleSaveArtifact = (type: keyof Session['artifacts'], id: string) => {
    setSessions(prev => prev.map(s => s.id === activeSessionId ? {
      ...s,
      artifacts: {
        ...s.artifacts,
        [type]: (s.artifacts[type] as any[]).map((item: any) => 
          item.id === id ? { ...item, saved: !item.saved } : item
        )
      }
    } : s));
    
    const item = activeSession?.artifacts[type].find((i: any) => i.id === id);
    if (item && 'saved' in item) triggerToast(!(item as any).saved ? "Saved to Library" : "Removed from Library");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast("Copied to clipboard");
  };

  const handleRegenerate = () => {
    if (!activeSession || activeSession.messages.length < 2) return;
    const lastUserMsg = [...activeSession.messages].reverse().find(m => m.from === 'user');
    if (lastUserMsg) {
      // Remove last assistant message
      setSessions(prev => prev.map(s => s.id === activeSessionId ? {
        ...s,
        messages: s.messages.filter((_, i) => i !== s.messages.length - 1)
      } : s));
      handleSend(lastUserMsg.text);
    }
  };

  const updateSessionRole = (role: Role) => {
    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, role } : s));
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#050505] text-white">
      <Toast message={toastMessage} visible={showToast} />

      {/* Hover Trigger Area (Left Edge) */}
      {!isMobile && (
        <div 
          className="fixed left-0 top-0 bottom-0 w-4 z-[60] cursor-pointer"
          onMouseEnter={handleMouseEnter}
        />
      )}

      {/* --- COLUMN 1: SIDEBAR (Desktop & Mobile Drawer) --- */}
      <AnimatePresence>
        {(isSidebarOpen || isHovered || !isMobile) && (
          <motion.aside 
            initial={isMobile ? { x: -300 } : { x: -280 }}
            animate={(isSidebarOpen || isHovered || !isMobile) ? { x: (isMobile || isHovered) ? 0 : -280 } : { x: -300 }}
            exit={{ x: -300 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed lg:absolute left-0 top-0 bottom-0 z-50 w-72 h-full flex flex-col border-r shadow-2xl bg-[#080808] border-[#1a1a1a] transition-shadow duration-300 ${
              (isHovered || isSidebarOpen) ? 'shadow-white/5' : 'shadow-none'
            }`}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={onBack}
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-white/10">
                    <Rocket className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-lg font-black tracking-tighter text-gray-300 group-hover:text-white transition-colors">ResearchMate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500 mt-0.5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all bg-[#0c0c0c] border-[#222] focus:border-white/20"
                />
              </div>

              <button 
                onClick={handleNewSession}
                className="w-full flex items-center justify-center space-x-2 bg-white text-black py-3 rounded-2xl font-bold text-sm shadow-lg shadow-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Session</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-2">Recent Sessions</p>
                <div className="space-y-1">
                  {filteredSessions.map(session => (
                    <button
                      key={session.id}
                      onClick={() => {
                        setActiveSessionId(session.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all group relative ${
                        activeSessionId === session.id 
                          ? 'bg-white/5 border border-white/10' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold truncate pr-4 ${activeSessionId === session.id ? 'text-white' : 'text-gray-400'}`}>
                          {session.title}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                          session.role === 'PhD' ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {session.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-gray-500">
                        <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
                        <Clock className="w-2.5 h-2.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-[#1a1a1a] space-y-2">
              <button 
                onClick={onBack}
                className="w-full flex items-center space-x-3 p-3 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all font-bold shadow-lg shadow-white/5"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-xs">Back to Home</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#111] transition-all text-gray-500 hover:text-white">
                <Settings className="w-4 h-4" />
                <span className="text-xs font-bold">Settings</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- COLUMN 2: CENTER CHAT --- */}
      <main className={`flex-1 flex flex-col relative min-w-0 transition-all duration-300 ${!isMobile ? 'ml-4' : ''}`}>
        {/* Chat Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/80 border-[#1a1a1a]">
          <div className="flex items-center space-x-4 min-w-0">
            <button 
              onClick={onBack}
              className="p-2 rounded-xl bg-gray-100 dark:bg-[#111] text-gray-500 hover:text-white transition-all flex items-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Home</span>
            </button>
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col min-w-0">
              <h2 className="text-sm font-bold tracking-tight truncate">{activeSession?.title || 'Select a session'}</h2>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className="relative">
                  <select 
                    value={activeSession?.role} 
                    onChange={(e) => updateSessionRole(e.target.value as Role)}
                    className="bg-transparent border-none p-0 text-[10px] text-gray-500 font-medium focus:ring-0 cursor-pointer hover:text-white transition-colors"
                  >
                    <option value="Student">Student</option>
                    <option value="PhD">PhD</option>
                    <option value="Researcher">Researcher</option>
                  </select>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">{activeSession?.depth}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <button 
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className="lg:hidden p-2 text-white bg-white/10 rounded-xl"
            >
              {isRightPanelOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Chat Transcript */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 scrollbar-hide">
          {activeSession?.messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-end space-x-3 ${msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${
                  msg.from === 'user' 
                    ? 'bg-indigo-600 overflow-hidden' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                }`}>
                  {msg.from === 'user' ? (
                    <img src={`https://picsum.photos/seed/${msg.id}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    'SL'
                  )}
                </div>

                {/* Bubble */}
                <div className="flex flex-col space-y-2 max-w-[85%] sm:max-w-[80%]">
                  <div className={`relative p-4 lg:p-5 rounded-[1.5rem] lg:rounded-[2rem] text-sm leading-relaxed shadow-sm group transition-all ${
                    msg.from === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-[#111] text-gray-200 border border-[#222] rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>

                    {/* Special Message Cards */}
                    {msg.type === 'link' && (
                      <div className="mt-4 bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm">External Resource</h4>
                          <p className="text-[10px] opacity-70">Research paper or database link detected</p>
                          <p className="text-[10px] mt-2 font-mono opacity-80 truncate">{msg.text}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 flex-shrink-0 ml-2" />
                      </div>
                    )}

                    {msg.type === 'paper-summary' && msg.metadata && (
                      <div className="mt-4 bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs line-clamp-1">{msg.metadata.title}</h4>
                          <p className="text-[10px] opacity-70 mt-0.5">{msg.metadata.authors} • {msg.metadata.year}</p>
                          <button className="mt-2 text-[10px] font-bold text-indigo-400 hover:underline">View Summary →</button>
                        </div>
                      </div>
                    )}

                    {msg.type === 'audio' && (
                      <div className="mt-4 bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center space-x-4">
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600">
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                        <div className="flex-1 h-8 flex items-center space-x-1">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono">02:12</span>
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center justify-end space-x-1 opacity-40 text-[9px]">
                      <span>{new Date(msg.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.from === 'assistant' && (
                        <div className="flex">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <CheckCircle2 className="w-2.5 h-2.5 -ml-1" />
                        </div>
                      )}
                    </div>

                    {/* Message Actions */}
                    <div className={`absolute top-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.from === 'user' ? '-left-12 lg:-left-24' : '-right-12 lg:-right-24'}`}>
                      <button onClick={() => copyToClipboard(msg.text)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500 transition-all">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {msg.from === 'assistant' && (
                        <>
                          <button onClick={handleRegenerate} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500 transition-all">
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator / Agent Steps */}
          {isSending && (
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-end space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  SL
                </div>
                <div className="p-4 rounded-[1.5rem] lg:rounded-[2rem] rounded-bl-none shadow-sm border bg-[#111] border-[#222]">
                  <div className="flex space-x-1">
                    {[0, 0.2, 0.4].map(delay => (
                      <motion.div 
                        key={delay}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay }}
                        className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent Steps Bar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full overflow-x-auto scrollbar-hide max-w-full"
              >
                <Brain className="w-3.5 h-3.5 text-white animate-pulse flex-shrink-0" />
                <div className="flex items-center space-x-3 whitespace-nowrap">
                  {['Intent', 'Search', 'Read', 'Summarize', 'Organize'].map((step, i) => (
                    <div key={step} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        agentStep === step ? 'bg-white animate-ping' : (['Intent', 'Search', 'Read', 'Summarize', 'Organize'].indexOf(agentStep!) > i ? 'bg-emerald-500' : 'bg-gray-700')
                      }`}></div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${
                        agentStep === step ? 'text-white' : (['Intent', 'Search', 'Read', 'Summarize', 'Organize'].indexOf(agentStep!) > i ? 'text-emerald-500' : 'text-gray-600')
                      }`}>
                        {step}
                      </span>
                      {i < 4 && <div className="w-3 h-[1px] bg-gray-800"></div>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Composer */}
        <div className="p-4 lg:p-8 sticky bottom-0 z-40 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 px-2 overflow-x-auto scrollbar-hide pb-1">
              {['Explain simpler', 'Find recent papers', 'Compare top 3', 'Suggest dataset', 'Generate report'].map(chip => (
                <button 
                  key={chip}
                  onClick={() => setInput(chip)}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[9px] lg:text-[10px] font-bold border transition-all whitespace-nowrap ${
                    'bg-[#0c0c0c] border-[#222] text-gray-500 hover:text-white hover:border-white/20'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="relative group rounded-[1.5rem] lg:rounded-[2.5rem] shadow-2xl transition-all bg-[#0c0c0c] border border-[#1a1a1a]">
              <div className="flex items-center px-4 py-3 lg:px-6 lg:py-4">
                <button className="p-2 text-gray-400 hover:text-indigo-500 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask a topic or paste a link..."
                  className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm lg:text-base px-2 lg:px-4 placeholder-gray-500"
                />
                <div className="flex items-center space-x-1 lg:space-x-2">
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-indigo-500 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-500 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isSending}
                    className={`ml-1 lg:ml-2 flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl font-bold text-xs lg:text-sm transition-all ${
                      input.trim() 
                        ? 'bg-white text-black shadow-lg shadow-white/10 hover:scale-105 active:scale-95' 
                        : 'bg-gray-100 dark:bg-[#111] text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="hidden sm:inline">Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- COLUMN 3: RIGHT PANEL (Desktop & Mobile Drawer) --- */}
      <AnimatePresence>
        {(isRightPanelOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed lg:relative right-0 z-50 w-full sm:w-96 h-full flex flex-col border-l shadow-2xl lg:shadow-none bg-[#080808] border-[#1a1a1a]"
          >
            <div className="p-6 border-b border-gray-200 dark:border-[#1a1a1a]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Research Artifacts</h3>
                <button onClick={() => setIsRightPanelOpen(false)} className="lg:hidden p-2 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-[#0c0c0c] p-1 rounded-2xl border border-gray-200 dark:border-[#1a1a1a] overflow-x-auto scrollbar-hide">
                {[
                  { id: 'papers', icon: BookOpen, label: 'Papers' },
                  { id: 'sources', icon: Globe, label: 'Sources' },
                  { id: 'experts', icon: Users, label: 'Experts' },
                  { id: 'notes', icon: StickyNote, label: 'Notes' },
                  { id: 'outline', icon: Layout, label: 'Outline' },
                  { id: 'saved', icon: Star, label: 'Saved' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setArtifactTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                      artifactTab === tab.id 
                        ? 'bg-white text-black shadow-lg' 
                        : 'text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={artifactTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {artifactTab === 'papers' && (
                    activeSession?.artifacts.papers.map(paper => (
                      <ArtifactCard 
                        key={paper.id} 
                        title={paper.title} 
                        subtitle={`${paper.authors} • ${paper.year} • ${paper.venue}`}
                        description={paper.tldr}
                        icon={BookOpen}
                        saved={paper.saved}
                        onSave={() => toggleSaveArtifact('papers', paper.id)}
                      />
                    ))
                  )}

                  {artifactTab === 'sources' && (
                    activeSession?.artifacts.sources.map(src => (
                      <ArtifactCard 
                        key={src.id} 
                        title={src.title} 
                        subtitle={src.type}
                        description={src.shortNote}
                        icon={Globe}
                        saved={src.saved}
                        onSave={() => toggleSaveArtifact('sources', src.id)}
                        url={src.url}
                      />
                    ))
                  )}

                  {artifactTab === 'experts' && (
                    activeSession?.artifacts.experts.map(expert => (
                      <ArtifactCard 
                        key={expert.id} 
                        title={expert.name} 
                        subtitle={expert.affiliation}
                        description={expert.whyRelevant}
                        icon={User}
                        saved={expert.saved}
                        onSave={() => toggleSaveArtifact('experts', expert.id)}
                      />
                    ))
                  )}

                  {artifactTab === 'notes' && (
                    activeSession?.artifacts.notes.map(note => (
                      <ArtifactCard 
                        key={note.id} 
                        title={note.title} 
                        description={note.content}
                        icon={StickyNote}
                        saved={note.saved}
                        onSave={() => toggleSaveArtifact('notes', note.id)}
                      />
                    ))
                  )}

                  {artifactTab === 'outline' && (
                    <div className="space-y-6">
                      {activeSession?.artifacts.outline.map((item, idx) => (
                        <div key={idx} className="space-y-2 group">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-[10px] font-black text-indigo-400">
                              {idx + 1}
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.section}</h4>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed pl-9">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {artifactTab === 'saved' && (
                    <div className="space-y-8">
                      {Object.entries(activeSession?.artifacts || {}).map(([type, items]) => {
                        if (type === 'outline') return null;
                        const savedItems = (items as any[]).filter(i => i.saved);
                        if (savedItems.length === 0) return null;
                        return (
                          <div key={type} className="space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1">{type}</h4>
                            {savedItems.map(item => (
                              <ArtifactCard 
                                key={item.id} 
                                title={item.title || item.name} 
                                subtitle={item.authors || item.affiliation || item.type}
                                icon={Star}
                                saved={true}
                                onSave={() => toggleSaveArtifact(type as any, item.id)}
                              />
                            ))}
                          </div>
                        );
                      })}
                      {!Object.entries(activeSession?.artifacts || {}).some(([type, items]) => type !== 'outline' && (items as any[]).some(i => i.saved)) && (
                        <div className="py-20 text-center opacity-20 space-y-4">
                          <Star className="w-12 h-12 mx-auto" />
                          <p className="text-sm font-bold">No saved artifacts yet</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Helper Components ---

interface ArtifactCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon: any;
  saved: boolean;
  onSave: () => void;
  url?: string;
}

const ArtifactCard: React.FC<ArtifactCardProps> = ({ title, subtitle, description, icon: Icon, saved, onSave, url }) => {
  return (
    <div className={`p-4 rounded-2xl border transition-all group relative ${
      saved 
        ? 'bg-indigo-500/5 border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
        : 'bg-white dark:bg-[#0c0c0c] border-gray-100 dark:border-[#1a1a1a] hover:border-indigo-500/30'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${saved ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-[#111] text-gray-500'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold leading-tight line-clamp-2 dark:text-white">{title}</h4>
            {subtitle && <p className="text-[10px] text-gray-500 mt-0.5 truncate">{subtitle}</p>}
          </div>
        </div>
        <button 
          onClick={onSave}
          className={`p-2 rounded-lg transition-all flex-shrink-0 ${saved ? 'text-indigo-400' : 'text-gray-600 hover:text-white'}`}
        >
          <Star className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      {description && (
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 mb-4">{description}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#1a1a1a]">
        <button className="text-[10px] font-bold text-gray-500 hover:text-indigo-400 flex items-center space-x-1.5 transition-colors">
          <ExternalLink className="w-3 h-3" />
          <span>Open Resource</span>
        </button>
        <button className="p-1.5 text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
