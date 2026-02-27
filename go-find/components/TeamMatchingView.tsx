
import React from 'react';
import { Bookmark, MessageSquare } from 'lucide-react';
import { MOCK_USERS } from '../constants';

export const TeamMatchingView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Smart Team Matching</h2>
          <p className="text-gray-400 mt-1">AI-ranked peers based on skill complementarity and work style.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {MOCK_USERS.slice(0, 4).map((u) => (
              <img key={u.id} src={u.avatar} className="w-8 h-8 rounded-full border-2 border-black" alt={u.name} />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">124 peers online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_USERS.map((user) => (
          <div 
            key={user.id}
            className="bg-[#080808] border border-[#1a1a1a] rounded-[2rem] p-8 hover:border-white/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -mr-16 -mt-16"></div>
            
            <div className="relative z-10 flex items-start space-x-6">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl border-2 border-[#1a1a1a] object-cover" />
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
                  {user.matchScore}% Match
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{user.role}</p>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-white transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/5 text-gray-400 border border-white/10 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 italic leading-relaxed">
                  "{user.bio}"
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1a1a1a]">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Availability</p>
                    <p className="text-xs text-gray-300">{user.availabilitySchedule}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Comm Style</p>
                    <p className="text-xs text-gray-300">{user.commStyle}</p>
                  </div>
                </div>

                <div className="bg-indigo-600/10 border border-indigo-600/20 p-4 rounded-2xl">
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Why it fits</p>
                  <p className="text-xs text-gray-300">{user.projectFitReason}</p>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex-1 bg-white text-black font-bold py-2.5 rounded-xl hover:bg-gray-200 transition-all text-sm shadow-xl active:scale-95">
                    Invite to Team
                  </button>
                  <button className="w-11 h-11 bg-[#111] border border-[#222] rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
