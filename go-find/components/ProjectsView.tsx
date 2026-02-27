
import React from 'react';
import { Plus, Layout, CalendarCheck } from 'lucide-react';
import { UserProfile, ViewType } from '../types';

interface ProjectsViewProps {
  profile: UserProfile;
  onNavigate: (view: ViewType) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ profile, onNavigate }) => {
  const projects = profile.projectRoles;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Workspace</h2>
          <p className="text-gray-400 mt-1">Manage your active research collaborations and milestones.</p>
        </div>
        <button 
          onClick={() => onNavigate(ViewType.WORKSPACE)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Workspace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div 
            key={project.projectId}
            className="bg-[#080808] border border-[#1a1a1a] rounded-[2.5rem] p-8 hover:border-white/30 transition-all duration-500 group flex flex-col md:flex-row gap-8"
          >
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-white/5">
                    <Layout className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{project.projectName}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500 font-medium">Role: {project.role}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://picsum.photos/id/${i+20}/100/100`} className="w-10 h-10 rounded-full border-4 border-black" alt="Team" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#111] border-4 border-black flex items-center justify-center text-[10px] font-bold text-gray-500">
                    +2
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Responsibilities</p>
                <div className="flex flex-wrap gap-2">
                  {project.responsibilities.map((resp, idx) => (
                    <span key={idx} className="text-xs text-gray-300 bg-[#111] px-3 py-1.5 rounded-xl border border-[#222]">
                      {resp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Contribution Progress</p>
                  <span className="text-xs font-bold text-white">{project.contributionPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#111] rounded-full overflow-hidden border border-[#222]">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000" 
                    style={{ width: `${project.contributionPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-72 flex flex-col justify-between p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white">Next Milestone</p>
                  <CalendarCheck className="w-4 h-4 text-gray-600" />
                </div>
                <div className="p-4 bg-[#111] rounded-2xl border border-[#222]">
                  <p className="text-xs font-bold text-indigo-400 mb-1">Due in 3 days</p>
                  <p className="text-sm text-white font-medium">Draft Methodology V2</p>
                </div>
              </div>

              <div className="space-y-3 mt-8">
                <button 
                  onClick={() => onNavigate(ViewType.WORKSPACE)}
                  className="w-full bg-white text-black font-bold py-3 rounded-xl text-sm transition-all active:scale-95"
                >
                  Open Workspace
                </button>
                <button className="w-full bg-[#111] text-white border border-[#222] font-bold py-3 rounded-xl text-sm hover:bg-[#1a1a1a] transition-all">
                  Team Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
