
import React from 'react';
import { MOCK_USER_PROFILE } from '../constants';
import { UserProfile } from '../types';
import { 
  Github, 
  Linkedin, 
  Globe, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle,
  Edit3,
  Share2,
  Users,
  Clock,
  Brain,
  Layers,
  GitBranch,
  FileText,
  CircleCheck,
  Search,
  Globe2,
  BookOpenCheck
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEdit }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn py-4 pb-20">
      {/* Role Snapshot Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#080808] to-[#121212] border border-[#1a1a1a] p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl border-4 border-[#1a1a1a] bg-white/5 flex items-center justify-center text-4xl font-black text-white shadow-2xl overflow-hidden">
              {profile.avatar.type === 'image' && profile.avatar.url ? (
                <img src={profile.avatar.url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-xl shadow-lg">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
              <p className="text-gray-400 font-medium">{profile.role} • {profile.department}</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="flex items-center space-x-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#222]">
                <Users className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-300">Mode: {profile.collaboration.workStyle}</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#222]">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-300">{profile.collaboration.availabilityHoursPerWeek} hrs/week</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#222]">
                <Brain className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-300">{profile.aiPrefs.depth} AI</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {profile.skills.map((skill, idx) => (
                <span key={idx} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/10 text-white border border-white/20 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={onEdit}
              className="flex items-center justify-center space-x-2 bg-white text-black font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all text-sm shadow-xl active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#1a1a1a] text-white border border-[#222] font-bold px-6 py-2.5 rounded-xl hover:bg-[#252525] transition-all text-sm active:scale-95">
              <Share2 className="w-4 h-4" />
              <span>Share Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Projects Completed', value: profile.stats.projectsCompleted, icon: Layers },
          { label: 'Reports Generated', value: profile.stats.reportsGenerated, icon: FileText },
          { label: 'Papers Saved', value: profile.stats.papersSaved, icon: GitBranch },
          { label: 'Sessions Run', value: profile.stats.sessionsRun, icon: CircleCheck },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-[1.5rem] flex flex-col items-center text-center space-y-2 hover:border-white/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-white" />
              <span>Academic Background</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">College</p>
                <p className="text-sm text-white">{profile.college}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Department</p>
                <p className="text-sm text-white">{profile.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Year / Semester</p>
                <p className="text-sm text-white">{profile.yearSemester}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Location</p>
                <p className="text-sm text-white">{profile.location || 'Not specified'}</p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#1a1a1a]">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Bio</p>
              <p className="text-sm text-gray-300 leading-relaxed italic">"{profile.bio}"</p>
            </div>
          </div>

          {/* Collaboration Details */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Users className="w-5 h-5 text-white" />
              <span>Collaboration Preferences</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Preferred Roles</p>
                <div className="flex flex-wrap gap-2">
                  {profile.collaboration.preferredRoles.map((role) => (
                    <span key={role} className="px-3 py-1 rounded-lg bg-white/10 text-white text-[10px] font-bold uppercase">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Communication</p>
                <div className="flex flex-wrap gap-2">
                  {profile.collaboration.communication.map((comm) => (
                    <span key={comm} className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                      {comm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Portfolio Links */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
            <h3 className="text-lg font-bold">Portfolio</h3>
            <div className="space-y-4">
              {profile.portfolio.github && (
                <a href={profile.portfolio.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center space-x-3">
                    <Github className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold">GitHub</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-700" />
                </a>
              )}
              {profile.portfolio.linkedin && (
                <a href={profile.portfolio.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold">LinkedIn</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-700" />
                </a>
              )}
              {profile.portfolio.website && (
                <a href={profile.portfolio.website} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold">Website</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-700" />
                </a>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-4">
            <h3 className="font-bold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((int, i) => (
                <span key={i} className="text-xs bg-[#1a1a1a] px-3 py-1 rounded-full text-gray-400 border border-[#222]">
                  #{int}
                </span>
              ))}
            </div>
          </div>

          {/* AI Preferences */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-4">
            <h3 className="font-bold">AI Preferences</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Depth</span>
                <span className="text-white font-bold">{profile.aiPrefs.depth}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tone</span>
                <span className="text-white font-bold">{profile.aiPrefs.tone}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Citations Only</span>
                <span className={`font-bold ${profile.aiPrefs.citationsOnly ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {profile.aiPrefs.citationsOnly ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Connected Services */}
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6">
            <h3 className="text-lg font-bold">Connected Services</h3>
            <div className="space-y-4">
              {[
                { name: 'Google Scholar', status: 'Connected', icon: GraduationCap, color: 'text-white' },
                { name: 'ORCID', status: 'Connected', icon: BookOpenCheck, color: 'text-emerald-400' },
                { name: 'ResearchGate', status: 'Not Connected', icon: Globe2, color: 'text-gray-600' },
                { name: 'Mendeley', status: 'Not Connected', icon: Search, color: 'text-gray-600' },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <service.icon className={`w-4 h-4 ${service.color}`} />
                    <span className="text-xs font-bold">{service.name}</span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${service.status === 'Connected' ? 'text-emerald-400' : 'text-gray-600'}`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
