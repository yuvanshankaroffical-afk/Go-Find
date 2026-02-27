
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Cpu, 
  Zap, 
  Heart, 
  Users, 
  Briefcase, 
  Shield, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Globe, 
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Camera,
  Info
} from 'lucide-react';
import { UserProfile, Skill, ViewType } from '../types';

const DEFAULT_PROFILE: UserProfile = {
  id: 'u1',
  avatar: { type: 'initials' },
  name: 'Jane Cooper',
  email: 'jane.cooper@university.edu',
  phone: '+1 (555) 000-0000',
  bio: 'Senior CS student passionate about AI and its applications in healthcare. Looking for research collaborators.',
  college: 'Stanford University',
  department: 'Computer Science',
  yearSemester: 'Senior / Fall 2024',
  location: 'Palo Alto, CA',
  role: 'Student',
  aiPrefs: {
    depth: 'Standard',
    tone: 'Professional',
    language: 'English',
    citationsOnly: true,
    preferRecent: true
  },
  domains: ['AI', 'Healthcare', 'NLP'],
  interests: ['Machine Learning', 'Data Ethics', 'Bioinformatics'],
  preferredProjectType: 'Final Year',
  skills: [
    { name: 'Python', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'PyTorch', level: 'Intermediate' }
  ],
  tools: ['VS Code', 'Git', 'Docker'],
  learningGoals: ['Quantum Computing', 'Rust'],
  collaboration: {
    openToCollaborate: true,
    preferredRoles: ['Research Lead', 'Frontend Dev'],
    availabilityHoursPerWeek: 15,
    preferredDays: ['Mon', 'Wed', 'Sat'],
    workStyle: 'Mixed',
    communication: ['Email', 'Discord']
  },
  portfolio: {
    github: 'https://github.com/janecooper',
    linkedin: 'https://linkedin.com/in/janecooper'
  },
  privacy: {
    visibility: 'Public',
    showEmail: true,
    showPhone: false,
    showLinks: true,
    aiConsent: true
  },
  stats: {
    projectsCompleted: 4,
    reportsGenerated: 12,
    papersSaved: 45,
    sessionsRun: 89
  },
  projectRoles: [],
  updatedAt: new Date().toISOString()
};

const TABS = [
  { id: 'about', label: 'About', icon: User },
  { id: 'role', label: 'Role & AI', icon: Cpu },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'collab', label: 'Collaboration', icon: Users },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'privacy', label: 'Privacy', icon: Shield },
];

interface EditProfileViewProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onBack: () => void;
}

export const EditProfileView: React.FC<EditProfileViewProps> = ({ initialProfile, onSave, onBack }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const [activeTab, setActiveTab] = useState('about');
  const [isDirty, setIsDirty] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.college) newErrors.college = 'College is required';
    if (!profile.department) newErrors.department = 'Department is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedProfile = {
      ...profile,
      updatedAt: new Date().toISOString()
    };

    onSave(updatedProfile);
    setIsDirty(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({
          avatar: { type: 'image', url: reader.result as string }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateProfile({
      avatar: { type: 'initials' }
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
  };

  const profileStrength = useMemo(() => {
    let score = 0;
    if (profile.name) score += 10;
    if (profile.bio) score += 10;
    if (profile.skills.length >= 3) score += 20;
    if (profile.interests.length >= 3) score += 15;
    if (profile.portfolio.github || profile.portfolio.linkedin) score += 15;
    if (profile.collaboration.openToCollaborate) score += 10;
    if (profile.college && profile.department) score += 20;
    return score;
  }, [profile]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-xs text-gray-500">Personalize your research identity and AI preferences</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!isDirty}
            className={`flex items-center space-x-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              isDirty 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-[#111] text-gray-700 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-8 space-y-8">
          {/* Tabs Navigation */}
          <div className="flex items-center space-x-1 bg-[#0c0c0c] p-1 rounded-2xl border border-[#1a1a1a] overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-black shadow-lg' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'about' && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-8">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-[2rem] bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center text-3xl font-black text-indigo-400 overflow-hidden">
                          {profile.avatar.type === 'image' && profile.avatar.url ? (
                            <img src={profile.avatar.url} alt={profile.name} className="w-full h-full object-cover" />
                          ) : (
                            profile.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-all cursor-pointer">
                          <Camera className="w-6 h-6 text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-bold">Profile Picture</h3>
                        <p className="text-xs text-gray-500">Upload a professional photo or use your initials.</p>
                        <div className="flex items-center space-x-2 pt-2">
                          <label className="px-3 py-1.5 bg-white/5 border border-[#222] rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all cursor-pointer">
                            Upload Image
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </label>
                          <button 
                            onClick={removeImage}
                            className="px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="Full Name" 
                        value={profile.name} 
                        onChange={(val) => updateProfile({ name: val })} 
                        error={errors.name}
                        required
                      />
                      <Input 
                        label="Location" 
                        value={profile.location || ''} 
                        onChange={(val) => updateProfile({ location: val })} 
                        placeholder="e.g. Palo Alto, CA"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Bio</label>
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                        maxLength={160}
                        rows={3}
                        className="w-full bg-[#050505] border border-[#222] rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none"
                        placeholder="Tell us about your research interests..."
                      />
                      <div className="flex justify-end">
                        <span className="text-[10px] text-gray-600">{profile.bio.length}/160</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input 
                        label="College / University" 
                        value={profile.college} 
                        onChange={(val) => updateProfile({ college: val })} 
                        error={errors.college}
                        required
                      />
                      <Input 
                        label="Department" 
                        value={profile.department} 
                        onChange={(val) => updateProfile({ department: val })} 
                        error={errors.department}
                        required
                      />
                      <Input 
                        label="Year / Semester" 
                        value={profile.yearSemester} 
                        onChange={(val) => updateProfile({ yearSemester: val })} 
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1a1a1a]">
                      <Input 
                        label="Email Address" 
                        value={profile.email || ''} 
                        onChange={(val) => updateProfile({ email: val })} 
                        type="email"
                      />
                      <Input 
                        label="Phone Number" 
                        value={profile.phone || ''} 
                        onChange={(val) => updateProfile({ phone: val })} 
                        type="tel"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'role' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-indigo-400" />
                        <span>Academic Role</span>
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['High School', 'Student', 'Teacher', 'Professional', 'Job Seeker', 'Researcher', 'PhD'].map((r) => (
                          <button
                            key={r}
                            onClick={() => updateProfile({ role: r as any })}
                            className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                              profile.role === r 
                                ? 'bg-white text-black border-white' 
                                : 'bg-[#111] text-gray-500 border-[#222] hover:border-white/20'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold flex items-center space-x-2">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                        <span>AI Research Preferences</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Select 
                          label="Research Depth"
                          value={profile.aiPrefs.depth}
                          options={['Simple', 'Standard', 'Advanced', 'Research-grade']}
                          onChange={(val) => updateProfile({ aiPrefs: { ...profile.aiPrefs, depth: val as any } })}
                        />
                        <Select 
                          label="Tone of Voice"
                          value={profile.aiPrefs.tone}
                          options={['Friendly', 'Professional', 'Academic']}
                          onChange={(val) => updateProfile({ aiPrefs: { ...profile.aiPrefs, tone: val as any } })}
                        />
                        <Input 
                          label="Preferred Language"
                          value={profile.aiPrefs.language}
                          onChange={(val) => updateProfile({ aiPrefs: { ...profile.aiPrefs, language: val } })}
                        />
                      </div>
                      
                      <div className="space-y-4 pt-4">
                        <Toggle 
                          label="Use citations only" 
                          description="Restrict AI responses to verified academic sources."
                          checked={profile.aiPrefs.citationsOnly}
                          onChange={(val) => updateProfile({ aiPrefs: { ...profile.aiPrefs, citationsOnly: val } })}
                        />
                        <Toggle 
                          label="Prefer recent sources" 
                          description="Prioritize research papers from the last 2–3 years."
                          checked={profile.aiPrefs.preferRecent}
                          onChange={(val) => updateProfile({ aiPrefs: { ...profile.aiPrefs, preferRecent: val } })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-indigo-400" />
                          <span>Technical Skills</span>
                        </h3>
                        <button 
                          onClick={() => updateProfile({ skills: [...profile.skills, { name: '', level: 'Beginner' }] })}
                          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Skill</span>
                        </button>
                      </div>
                      <div className="space-y-3">
                        {profile.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center space-x-4 animate-fadeIn">
                            <input 
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...profile.skills];
                                newSkills[idx].name = e.target.value;
                                updateProfile({ skills: newSkills });
                              }}
                              placeholder="e.g. Python"
                              className="flex-1 bg-[#050505] border border-[#222] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                            />
                            <select 
                              value={skill.level}
                              onChange={(e) => {
                                const newSkills = [...profile.skills];
                                newSkills[idx].level = e.target.value as any;
                                updateProfile({ skills: newSkills });
                              }}
                              className="bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                            <button 
                              onClick={() => {
                                const newSkills = profile.skills.filter((_, i) => i !== idx);
                                updateProfile({ skills: newSkills });
                              }}
                              className="p-2.5 text-gray-600 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Tools & Frameworks</h3>
                      <ChipInput 
                        placeholder="Add tools (e.g. Docker, PyTorch, Git)..."
                        chips={profile.tools}
                        onChange={(chips) => updateProfile({ tools: chips })}
                      />
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Learning Goals</h3>
                      <ChipInput 
                        placeholder="What do you want to learn next?..."
                        chips={profile.learningGoals}
                        onChange={(chips) => updateProfile({ learningGoals: chips })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'interests' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold">Research Domains</h3>
                      <ChipInput 
                        placeholder="Add domains (e.g. AI, IoT, Web)..."
                        chips={profile.domains}
                        onChange={(chips) => updateProfile({ domains: chips })}
                      />
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Interest Keywords</h3>
                      <ChipInput 
                        placeholder="Add keywords (e.g. Machine Learning, Ethics)..."
                        chips={profile.interests}
                        onChange={(chips) => updateProfile({ interests: chips })}
                      />
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <Select 
                        label="Preferred Project Type"
                        value={profile.preferredProjectType}
                        options={['Mini Project', 'Final Year', 'Research Paper', 'Hackathon']}
                        onChange={(val) => updateProfile({ preferredProjectType: val as any })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'collab' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <Toggle 
                        label="Open to collaborate" 
                        description="Allow other students to find you for team formation."
                        checked={profile.collaboration.openToCollaborate}
                        onChange={(val) => updateProfile({ collaboration: { ...profile.collaboration, openToCollaborate: val } })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-[#1a1a1a]">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Availability (Hours/Week)</label>
                        <input 
                          type="number"
                          min={0}
                          max={60}
                          value={profile.collaboration.availabilityHoursPerWeek}
                          onChange={(e) => updateProfile({ collaboration: { ...profile.collaboration, availabilityHoursPerWeek: parseInt(e.target.value) || 0 } })}
                          className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                      <Select 
                        label="Work Style"
                        value={profile.collaboration.workStyle}
                        options={['Team', 'Solo', 'Mixed']}
                        onChange={(val) => updateProfile({ collaboration: { ...profile.collaboration, workStyle: val as any } })}
                      />
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Preferred Roles</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Research Lead', 'Frontend Dev', 'Backend Dev', 'ML Engineer', 'Technical Writer', 'Presenter', 'QA Specialist'].map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              const roles = profile.collaboration.preferredRoles.includes(role)
                                ? profile.collaboration.preferredRoles.filter(r => r !== role)
                                : [...profile.collaboration.preferredRoles, role];
                              updateProfile({ collaboration: { ...profile.collaboration, preferredRoles: roles } });
                            }}
                            className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all ${
                              profile.collaboration.preferredRoles.includes(role)
                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                : 'bg-[#111] text-gray-500 border-[#222] hover:border-white/20'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Communication Channels</h3>
                      <div className="flex flex-wrap gap-2">
                        {['WhatsApp', 'Email', 'Discord', 'In-app Chat', 'Slack', 'Telegram'].map((comm) => (
                          <button
                            key={comm}
                            onClick={() => {
                              const comms = profile.collaboration.communication.includes(comm)
                                ? profile.collaboration.communication.filter(c => c !== comm)
                                : [...profile.collaboration.communication, comm];
                              updateProfile({ collaboration: { ...profile.collaboration, communication: comms } });
                            }}
                            className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all ${
                              profile.collaboration.communication.includes(comm)
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-[#111] text-gray-500 border-[#222] hover:border-white/20'
                            }`}
                          >
                            {comm}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 flex items-center space-x-2">
                          <Github className="w-3 h-3" />
                          <span>GitHub URL</span>
                        </label>
                        <input 
                          type="url"
                          value={profile.portfolio.github || ''}
                          onChange={(e) => updateProfile({ portfolio: { ...profile.portfolio, github: e.target.value } })}
                          placeholder="https://github.com/username"
                          className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 flex items-center space-x-2">
                          <Linkedin className="w-3 h-3" />
                          <span>LinkedIn URL</span>
                        </label>
                        <input 
                          type="url"
                          value={profile.portfolio.linkedin || ''}
                          onChange={(e) => updateProfile({ portfolio: { ...profile.portfolio, linkedin: e.target.value } })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 flex items-center space-x-2">
                          <Globe className="w-3 h-3" />
                          <span>Personal Website</span>
                        </label>
                        <input 
                          type="url"
                          value={profile.portfolio.website || ''}
                          onChange={(e) => updateProfile({ portfolio: { ...profile.portfolio, website: e.target.value } })}
                          placeholder="https://yourwebsite.com"
                          className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 flex items-center space-x-2">
                          <GraduationCap className="w-3 h-3" />
                          <span>Google Scholar</span>
                        </label>
                        <input 
                          type="url"
                          value={profile.portfolio.scholar || ''}
                          onChange={(e) => updateProfile({ portfolio: { ...profile.portfolio, scholar: e.target.value } })}
                          placeholder="Scholar profile URL"
                          className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                    </div>

                    <div className="pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold mb-6">Resume / CV</h3>
                      <div className="border-2 border-dashed border-[#222] rounded-[2rem] p-12 text-center space-y-4 hover:border-white/20 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-[#111] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Plus className="w-8 h-8 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Upload your Resume</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold">Profile Visibility</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['Public', 'Campus only', 'Private'].map((v) => (
                          <button
                            key={v}
                            onClick={() => updateProfile({ privacy: { ...profile.privacy, visibility: v as any } })}
                            className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                              profile.privacy.visibility === v 
                                ? 'bg-white text-black border-white' 
                                : 'bg-[#111] text-gray-500 border-[#222] hover:border-white/20'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">Display Settings</h3>
                      <div className="space-y-4">
                        <Toggle 
                          label="Show email address" 
                          description="Display your email to other students."
                          checked={profile.privacy.showEmail}
                          onChange={(val) => updateProfile({ privacy: { ...profile.privacy, showEmail: val } })}
                        />
                        <Toggle 
                          label="Show phone number" 
                          description="Display your phone number on your profile."
                          checked={profile.privacy.showPhone}
                          onChange={(val) => updateProfile({ privacy: { ...profile.privacy, showPhone: val } })}
                        />
                        <Toggle 
                          label="Show portfolio links" 
                          description="Make your GitHub, LinkedIn, etc. visible."
                          checked={profile.privacy.showLinks}
                          onChange={(val) => updateProfile({ privacy: { ...profile.privacy, showLinks: val } })}
                        />
                      </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                      <h3 className="text-lg font-bold">AI & Data</h3>
                      <Toggle 
                        label="AI Recommendation Consent" 
                        description="Allow the AI agent to use your profile data to suggest projects and teammates."
                        checked={profile.privacy.aiConsent}
                        onChange={(val) => updateProfile({ privacy: { ...profile.privacy, aiConsent: val } })}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Profile Strength */}
            <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Profile Strength</h3>
                <span className="text-xl font-black text-indigo-400">{profileStrength}%</span>
              </div>
              <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${profileStrength}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
              <div className="space-y-3">
                {profileStrength < 100 && (
                  <div className="flex items-start space-x-3 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                    <Info className="w-4 h-4 text-indigo-400 mt-0.5" />
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      {profileStrength < 50 ? 'Complete your basic info to start appearing in searches.' : 'Add more skills and portfolio links to improve matching accuracy.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <div className="h-24 bg-gradient-to-br from-indigo-600 to-purple-700 relative">
                <div className="absolute -bottom-12 left-8">
                  <div className="w-24 h-24 rounded-[2rem] bg-[#0c0c0c] p-1.5">
                    <div className="w-full h-full rounded-[1.7rem] bg-indigo-500/20 border-2 border-[#0c0c0c] flex items-center justify-center text-2xl font-black text-indigo-400 overflow-hidden">
                      {profile.avatar.type === 'image' && profile.avatar.url ? (
                        <img src={profile.avatar.url} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        profile.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 p-8 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold">{profile.name || 'Your Name'}</h3>
                    <Check className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{profile.role} • {profile.department}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{profile.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                    <GraduationCap className="w-3 h-3" />
                    <span>{profile.college || 'University not set'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Top Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.slice(0, 6).map((s, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-[#111] border border-[#222] text-[9px] font-bold text-gray-400 uppercase">
                        {s.name}
                      </span>
                    ))}
                    {profile.skills.length === 0 && <span className="text-[10px] text-gray-700 italic">No skills added yet</span>}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {profile.portfolio.github && <Github className="w-4 h-4 text-gray-500" />}
                    {profile.portfolio.linkedin && <Linkedin className="w-4 h-4 text-gray-500" />}
                    {profile.portfolio.website && <Globe className="w-4 h-4 text-gray-500" />}
                  </div>
                  <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                    profile.collaboration.openToCollaborate ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    <Users className="w-3 h-3" />
                    <span>{profile.collaboration.openToCollaborate ? 'Open to Collab' : 'Closed'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3"
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold">Profile updated successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, type = 'text', required, error }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 flex items-center justify-between">
      <span>{label} {required && <span className="text-red-500">*</span>}</span>
      {error && <span className="text-red-500 lowercase font-normal">{error}</span>}
    </label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-[#050505] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all ${
        error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-[#222] focus:ring-white/20'
      }`}
    />
  </div>
);

const Select = ({ label, value, options, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#050505] border border-[#222] rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
      >
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 rotate-90 pointer-events-none" />
    </div>
  </div>
);

const Toggle = ({ label, description, checked, onChange }: any) => (
  <div className="flex items-center justify-between p-4 bg-[#111] border border-[#222] rounded-2xl">
    <div className="space-y-0.5">
      <p className="text-sm font-bold text-white">{label}</p>
      <p className="text-[10px] text-gray-500">{description}</p>
    </div>
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all relative ${checked ? 'bg-indigo-600' : 'bg-gray-800'}`}
    >
      <motion.div 
        animate={{ x: checked ? 26 : 4 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
      />
    </button>
  </div>
);

const ChipInput = ({ placeholder, chips, onChange }: any) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !chips.includes(input.trim())) {
      onChange([...chips, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={placeholder}
          className="w-full bg-[#050505] border border-[#222] rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
        />
        <button 
          onClick={handleAdd}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip: string) => (
          <div key={chip} className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#111] border border-[#222] group">
            <span className="text-xs font-bold text-gray-400">{chip}</span>
            <button 
              onClick={() => onChange(chips.filter((c: string) => c !== chip))}
              className="text-gray-600 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
