import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ArrowRight, 
  BookOpen, 
  Users, 
  FileText, 
  Clock, 
  ChevronRight,
  Rocket,
  Layout,
  GraduationCap,
  History,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Paperclip,
  Smile,
  Mic,
  Send
} from 'lucide-react';
import { UserProfile, ViewType, ResearchSession, Project } from '../types';
import { MOCK_RESEARCH_SESSIONS } from '../constants';
import { workspaceService } from '../src/workspaceService';
import { Workspace } from '../src/workspaceTypes';

interface HomeViewProps {
  profile: UserProfile;
  onNavigate: (view: ViewType) => void;
  onStartResearch: (topic: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ profile, onNavigate, onStartResearch }) => {
  const [researchTopic, setResearchTopic] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Student' | 'PhD' | 'Researcher'>('Student');
  
  const workspaceData = workspaceService.getData();
  const workspaces = workspaceData.workspaces;

  const stats = [
    { label: 'Active Workspaces', value: workspaces.length, icon: Layout, color: 'text-blue-400' },
    { label: 'Saved Papers', value: profile.stats.papersSaved, icon: BookOpen, color: 'text-emerald-400' },
    { label: 'Saved Experts', value: 12, icon: Users, color: 'text-purple-400' },
    { label: 'Reports/Notes', value: profile.stats.reportsGenerated, icon: FileText, color: 'text-amber-400' },
  ];

  const quickChips = [
    "Explain simpler",
    "Recent papers",
    "Dataset + metrics",
    "Problem statement"
  ];

  return (
    <div className="space-y-10 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-[#1a1a1a] p-8 md:p-12">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Go-find AI Research Assistant</span>
            <div className="h-4 w-[1px] bg-white/10 mx-2" />
            <button 
              onClick={() => onNavigate(ViewType.NEW_PROJECT)}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>New Project</span>
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{profile.name.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
            What are we researching today? Start a new session or pick up where you left off.
          </p>

          <div className="relative group max-w-3xl">
            <div className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-3 flex flex-col space-y-4 transition-all duration-300 shadow-2xl">
              <div className="flex items-center px-4 space-x-4">
                <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
                <input 
                  type="text"
                  value={researchTopic}
                  onChange={(e) => setResearchTopic(e.target.value)}
                  placeholder={`Ask a topic or paste a paper link as a ${selectedRole.toLowerCase()}...`}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-600 w-full py-3 text-base"
                  onKeyDown={(e) => e.key === 'Enter' && researchTopic && onStartResearch(researchTopic)}
                />
              </div>
              
              <div className="flex items-center justify-between px-2 pt-2 border-t border-[#1a1a1a]">
                <div className="flex items-center bg-[#050505] border border-[#1a1a1a] rounded-xl p-1">
                  {(['Student', 'PhD', 'Researcher'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRole(r)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        selectedRole === r ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <Smile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
                  <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
                  <button 
                    onClick={() => researchTopic && onStartResearch(researchTopic)}
                    disabled={!researchTopic}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-bold px-6 py-2.5 rounded-full transition-all flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
                  >
                    <span className="text-sm">Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <button 
                key={chip}
                onClick={() => setResearchTopic(chip)}
                className="px-4 py-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] rounded-full text-[10px] font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#080808] border border-[#1a1a1a] p-6 rounded-3xl hover:border-[#222] transition-all group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-black border border-[#1a1a1a] group-hover:border-[#333] transition-all`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-800 group-hover:text-gray-600 transition-all" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sessions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <History className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Recent Sessions</h2>
            </div>
            <button className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">View All</button>
          </div>

          <div className="space-y-3">
            {MOCK_RESEARCH_SESSIONS.map((session) => (
              <div 
                key={session.id}
                onClick={() => onStartResearch(session.topic)}
                className="group flex items-center justify-between p-4 bg-[#080808] border border-[#1a1a1a] rounded-2xl hover:border-[#333] transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-black border border-[#1a1a1a] flex items-center justify-center group-hover:border-white/30 transition-all">
                    <Rocket className="w-4 h-4 text-gray-600 group-hover:text-white transition-all" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">{session.topic}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{session.role}</span>
                      <span className="text-[10px] text-gray-700">•</span>
                      <span className="text-[10px] text-gray-500">{session.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-white transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Active Workspaces */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layout className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Active Workspaces</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  const data = workspaceService.getData();
                  data.activeWorkspaceId = null; // Ensure we go to the list view which shows the modal
                  workspaceService.saveData(data);
                  onNavigate(ViewType.WORKSPACE);
                }}
                className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all"
                title="Create New Workspace"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate(ViewType.WORKSPACE)}
                className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                View All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {workspaces.slice(0, 3).map((ws) => (
              <div 
                key={ws.id}
                onClick={() => {
                  const data = workspaceService.getData();
                  data.activeWorkspaceId = ws.id;
                  workspaceService.saveData(data);
                  onNavigate(ViewType.WORKSPACE);
                }}
                className="group flex items-center justify-between p-4 bg-[#080808] border border-[#1a1a1a] rounded-2xl hover:border-[#333] transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-black border border-[#1a1a1a] flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                    <Layout className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-all" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{ws.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] text-gray-500">{ws.visibility}</span>
                      <span className="text-[10px] text-gray-700">•</span>
                      <span className="text-[10px] text-gray-500">{ws.members.length} members</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-white transition-all" />
              </div>
            ))}
            {workspaces.length === 0 && (
              <div className="p-8 text-center border border-dashed border-[#222] rounded-2xl opacity-30">
                <p className="text-xs font-bold uppercase tracking-widest">No active workspaces</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Recommended For You</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Large Language Models in Healthcare: A Review", type: "Paper", tag: "AI / Med" },
            { title: "Ethical Considerations for Autonomous Systems", type: "Expertise", tag: "Ethics" },
            { title: "Dataset: Global Energy Consumption 2023", type: "Dataset", tag: "Energy" }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-[#080808] border border-[#1a1a1a] rounded-3xl hover:border-[#222] transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded-md">{item.type}</span>
                <button className="text-gray-700 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-sm font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">{item.title}</h4>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{item.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* External Details Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ExternalLink className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">External Portfolios & Details</h2>
          </div>
          <button 
            onClick={() => onNavigate(ViewType.PROFILE)}
            className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
          >
            Edit Links
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'GitHub', value: profile.portfolio.github || 'Not connected', icon: Github, color: 'text-white' },
            { label: 'LinkedIn', value: profile.portfolio.linkedin || 'Not connected', icon: Linkedin, color: 'text-blue-400' },
            { label: 'Google Scholar', value: profile.portfolio.scholar || 'Not connected', icon: GraduationCap, color: 'text-indigo-400' },
            { label: 'Personal Website', value: profile.portfolio.website || 'Not connected', icon: Globe, color: 'text-emerald-400' },
          ].map((link) => (
            <a 
              key={link.label}
              href={link.value.startsWith('http') ? link.value : '#'}
              target="_blank"
              rel="noreferrer"
              className="bg-[#080808] border border-[#1a1a1a] p-5 rounded-3xl hover:border-[#222] transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className="p-3 rounded-2xl bg-black border border-[#1a1a1a] group-hover:border-[#333] transition-all">
                <link.icon className={`w-6 h-6 ${link.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{link.label}</p>
                <p className="text-[10px] text-gray-600 truncate max-w-[150px] mt-1">{link.value.replace('https://', '')}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
