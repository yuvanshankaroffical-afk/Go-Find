
import React from 'react';
import { Search, Menu } from 'lucide-react';

interface TopBarProps {
  onSearch: (q: string) => void;
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-black border-b border-[#1a1a1a] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-500 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-48 md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors mt-0.5" />
          </div>
          <input
            type="text"
            placeholder="Search research, peers, or apps..."
            className="block w-full bg-[#0c0c0c] border border-[#222] rounded-full py-2 pl-11 pr-14 text-sm focus:outline-none focus:border-white/20 transition-all text-white placeholder-gray-600"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="flex items-center justify-center text-[10px] font-medium text-gray-600 bg-[#111] px-1.5 py-0.5 rounded border border-[#222] h-5">
              ⌘K
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
      </div>
    </header>
  );
};
