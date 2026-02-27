
import React from 'react';
import { Home, Layout, Users, BookOpen, User, Rocket, Plus, MessageSquare } from 'lucide-react';
import { ViewType, UserProfile } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  profile: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, setOpen, profile }) => {
  const navItems = [
    { id: ViewType.HOME, label: 'Home', icon: Home },
    { id: ViewType.CHAT, label: 'Research Chat', icon: MessageSquare },
    { id: ViewType.WORKSPACE, label: 'Workspaces', icon: Layout },
    { id: ViewType.TEAM_MATCHING, label: 'Team Matching', icon: Users },
    { id: ViewType.LIBRARY, label: 'Library', icon: BookOpen },
    { id: ViewType.PROFILE, label: 'My Profile', icon: User },
  ];

  const handleNavClick = (view: ViewType) => {
    onViewChange(view);
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <aside 
      onMouseEnter={() => window.innerWidth >= 768 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setOpen(false)}
      className={`${isOpen ? 'w-64 shadow-[20px_0_50px_rgba(0,0,0,0.8)] translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'} fixed md:relative flex flex-col bg-[#080808] border-r border-[#1a1a1a] transition-all duration-300 ease-in-out z-20 h-full overflow-hidden`}
    >
      <div 
        onClick={() => handleNavClick(ViewType.HOME)}
        className="p-6 flex items-center space-x-3 cursor-pointer"
      >
        <div className="w-10 h-10 bg-white rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-white/10">
          <Rocket className="w-6 h-6 text-black" />
        </div>
        <div className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Go-find</h1>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div 
          onClick={() => handleNavClick(ViewType.PROFILE)}
          className={`flex items-center p-3 bg-[#111] rounded-xl border border-[#222] transition-all duration-300 cursor-pointer hover:border-white/50 ${isOpen ? 'space-x-3' : 'justify-center'}`}
        >
          {profile.avatar.type === 'image' && profile.avatar.url ? (
            <img src={profile.avatar.url} alt={profile.name} className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          {isOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-white">{profile.name}</p>
              <p className="text-xs text-gray-500 truncate">{profile.department}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center ${isOpen ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-all ${
              activeView === item.id ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:bg-[#111] hover:text-white'
            }`}
          >
            <item.icon className={!isOpen ? 'w-6 h-6' : 'w-5 h-5'} />
            <span className={`transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={() => handleNavClick(ViewType.NEW_PROJECT)}
          className={`w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 rounded-xl shadow-lg shadow-white/5 transition-all flex items-center justify-center ${isOpen ? 'space-x-2' : ''}`}
        >
          <Plus className="w-5 h-5" />
          <span className={`transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            Upload a new project
          </span>
        </button>
      </div>
    </aside>
  );
};
