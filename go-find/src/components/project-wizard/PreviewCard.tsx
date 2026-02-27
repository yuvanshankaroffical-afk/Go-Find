
import React from 'react';
import { Layout, Users, Brain, Clock, Globe, Lock, Users2, Rocket } from 'lucide-react';
import { ProjectDraft } from '../../types/project';

interface PreviewCardProps {
  draft: ProjectDraft;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ draft }) => {
  return (
    <div className="bg-[#080808] border border-[#1a1a1a] rounded-[2.5rem] overflow-hidden sticky top-8 shadow-2xl">
      <div className="h-32 bg-gradient-to-br from-white/10 to-transparent relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Rocket className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-4 left-6">
          <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
            draft.publish.visibility === 'Private' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
            draft.publish.visibility === 'Campus only' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
            'border-blue-500/20 text-blue-400 bg-blue-500/5'
          }`}>
            {draft.publish.visibility}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            {draft.domains.slice(0, 2).map(d => (
              <span key={d} className="text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                {d}
              </span>
            ))}
            {draft.domains.length > 2 && <span className="text-[9px] font-bold text-gray-600">+{draft.domains.length - 2}</span>}
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">
            {draft.title || "Untitled Project"}
          </h3>
          <p className="text-xs text-gray-500 mt-2 italic">
            {draft.tagline || "Your project tagline will appear here..."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Difficulty</p>
            <p className="text-xs font-bold text-white">{draft.difficulty}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Team Status</p>
            <p className="text-xs font-bold text-white truncate">{draft.team.status}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {draft.tech.techStack.length > 0 ? (
                draft.tech.techStack.slice(0, 5).map(t => (
                  <span key={t} className="text-[10px] text-white bg-white/10 px-2 py-0.5 rounded-md border border-white/5">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-gray-700 italic">No tech specified</span>
              )}
              {draft.tech.techStack.length > 5 && <span className="text-[10px] text-gray-600">+{draft.tech.techStack.length - 5}</span>}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">Required Roles</p>
            <div className="flex flex-wrap gap-1.5">
              {draft.team.requiredRoles.length > 0 ? (
                draft.team.requiredRoles.map(r => (
                  <span key={r} className="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/10">
                    {r}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-gray-700 italic">No roles specified</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Team Size: {draft.team.expectedTeamSize}</span>
          </div>
          <div className="flex items-center space-x-2">
            {draft.publish.visibility === 'Public' ? <Globe className="w-4 h-4 text-blue-400" /> : <Lock className="w-4 h-4 text-amber-500" />}
          </div>
        </div>
      </div>
    </div>
  );
};
