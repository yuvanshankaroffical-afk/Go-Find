
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChatView } from './components/ChatView';
import { TeamMatchingView } from './components/TeamMatchingView';
import { ProjectsView } from './components/ProjectsView';
import { ProfileView } from './components/ProfileView';
import { LibraryView } from './components/LibraryView';
import { EditProfileView } from './components/EditProfileView';
import { HomeView } from './components/HomeView';
import { WorkspaceModule } from './src/components/WorkspaceModule';
import { NewProjectPage } from './src/components/NewProjectPage';
import { ViewType, UserProfile } from './types';
import { MOCK_USER_PROFILE } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('rc_profile_v1');
    return saved ? JSON.parse(saved) : MOCK_USER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('rc_profile_v1', JSON.stringify(profile));
  }, [profile]);

  const renderContent = () => {
    switch (activeView) {
      case ViewType.HOME:
        return (
          <HomeView 
            profile={profile} 
            onNavigate={setActiveView} 
            onStartResearch={(topic) => {
              console.log('Starting research on:', topic);
              setActiveView(ViewType.CHAT);
            }} 
          />
        );
      case ViewType.TEAM_MATCHING:
        return <TeamMatchingView />;
      case ViewType.CHAT:
        return <ChatView onBack={() => setActiveView(ViewType.HOME)} />;
      case ViewType.PROFILE:
        return <ProfileView profile={profile} onEdit={() => setActiveView(ViewType.EDIT_PROFILE)} />;
      case ViewType.LIBRARY:
        return <LibraryView />;
      case ViewType.PROJECTS:
      case ViewType.WORKSPACE:
        return <WorkspaceModule />;
      case ViewType.NEW_PROJECT:
        return <NewProjectPage onBack={() => setActiveView(ViewType.HOME)} />;
      case ViewType.EDIT_PROFILE:
        return (
          <EditProfileView 
            initialProfile={profile} 
            onSave={(updated) => {
              setProfile(updated);
              setActiveView(ViewType.PROFILE);
            }}
            onBack={() => setActiveView(ViewType.PROFILE)} 
          />
        );
      default:
        return <HomeView profile={profile} onNavigate={setActiveView} onStartResearch={() => setActiveView(ViewType.CHAT)} />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white selection:bg-indigo-500/30">
      {activeView !== ViewType.CHAT && (
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          isOpen={isSidebarOpen} 
          setOpen={setSidebarOpen}
          profile={profile}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 bg-black">
        {activeView !== ViewType.CHAT && (
          <TopBar 
            onSearch={() => {}} 
            onMenuClick={() => setSidebarOpen(true)} 
          />
        )}
        <main className={`flex-1 bg-black overflow-y-auto ${activeView === ViewType.CHAT ? 'p-0' : 'p-4 md:p-8'}`}>
          <div className={activeView === ViewType.CHAT ? 'h-full w-full' : 'max-w-[1600px] mx-auto'}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && activeView !== ViewType.CHAT && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
