
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Save, Rocket, Info, 
  Users, Code, Brain, Link as LinkIcon, Calendar,
  CheckCircle2, AlertCircle, Trash2, Eye, ChevronUp,
  Plus, FileText, X
} from 'lucide-react';
import { ProjectDraft, Difficulty, ProjectStatus, Visibility, ProjectType, TeamStatus, CollaborationMode, FocusType } from '../types/project';
import { Stepper, ChipInput, BulletList, SkillsEditor, Toast } from './project-wizard/WizardComponents';
import { PreviewCard } from './project-wizard/PreviewCard';

const STORAGE_KEY = "rc_project_draft_v1";

const DEFAULT_DRAFT: ProjectDraft = {
  id: "p" + Date.now(),
  title: "",
  tagline: "",
  projectType: "Mini project",
  domains: [],
  difficulty: "Beginner",
  abstract: "",
  problemStatement: "",
  objectives: [],
  keywords: [],
  team: {
    status: "Looking for teammates",
    requiredRoles: [],
    expectedTeamSize: 3,
    collaborationMode: "Hybrid",
    communication: ["Discord", "In-app"]
  },
  tech: {
    techStack: [],
    skillsRequired: [],
    tools: []
  },
  research: {
    focusType: "Both",
    references: [],
    datasetRequired: false,
    dataset: {}
  },
  links: {
    github: "",
    demo: "",
    docs: ""
  },
  uploads: {
    extraFiles: []
  },
  timeline: {
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    milestones: [],
    status: "Idea"
  },
  publish: {
    visibility: "Public",
    allowComments: true,
    allowReuseAsReference: true
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const STEPS = [
  "Basics",
  "Team & Roles",
  "Tech & Skills",
  "Research Details",
  "Links & Uploads",
  "Timeline & Publish"
];

export const NewProjectPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ProjectDraft>(DEFAULT_DRAFT);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setDraft(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
    setIsLoading(false);
  }, []);

  const saveDraft = (showToast = true) => {
    const updated = { ...draft, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (showToast) setToast("Draft saved successfully");
  };

  const clearDraft = () => {
    if (confirm("Are you sure you want to clear this draft? All progress will be lost.")) {
      localStorage.removeItem(STORAGE_KEY);
      setDraft({ ...DEFAULT_DRAFT, id: "p" + Date.now() });
      setStep(1);
      setToast("Draft cleared");
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!draft.title.trim()) newErrors.title = "Project title is required";
    if (draft.domains.length === 0) newErrors.domains = "At least one domain is required";
    if (!draft.abstract.trim()) newErrors.abstract = "Abstract is required";
    if (!draft.problemStatement.trim()) newErrors.problemStatement = "Problem statement is required";
    if (draft.tech.techStack.length === 0) newErrors.techStack = "At least one tech stack item is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validate()) {
      console.log("Publishing Project:", draft);
      setIsPublished(true);
      localStorage.removeItem(STORAGE_KEY);
    } else {
      setToast("Please fix errors before publishing");
      setStep(1); // Go to first step with errors
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isPublished) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-fadeIn">
        <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Project Published!</h1>
          <p className="text-gray-400">Your project "{draft.title}" is now live and visible to the community.</p>
        </div>
        <div className="bg-[#080808] border border-[#1a1a1a] p-8 rounded-[2.5rem] text-left space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project ID: {draft.id}</span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">Active</span>
          </div>
          <h3 className="text-xl font-bold text-white">{draft.title}</h3>
          <div className="flex flex-wrap gap-2">
            {draft.domains.map(d => <span key={d} className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{d}</span>)}
          </div>
        </div>
        <button 
          onClick={onBack}
          className="bg-white text-black px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack} className="group flex items-center space-x-3 text-gray-500 hover:text-white transition-colors">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Cancel & Exit</span>
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={clearDraft} className="text-[10px] font-bold text-gray-600 hover:text-red-400 uppercase tracking-widest transition-colors">Clear Draft</button>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {step} of 6</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Stepper currentStep={step} totalSteps={6} steps={STEPS} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Content */}
          <div className="lg:col-span-7 space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Project Basics</h2>
                      <p className="text-gray-500 text-sm">Define the core identity of your research project.</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Title *</label>
                        <input 
                          type="text"
                          value={draft.title}
                          onChange={(e) => setDraft({...draft, title: e.target.value})}
                          placeholder="e.g. AI-Driven Climate Analysis"
                          className={`w-full bg-[#0c0c0c] border ${errors.title ? 'border-red-500/50' : 'border-[#1a1a1a]'} rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all`}
                        />
                        {errors.title && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.title}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tagline</label>
                        <input 
                          type="text"
                          value={draft.tagline}
                          onChange={(e) => setDraft({...draft, tagline: e.target.value})}
                          placeholder="One line that describes the goal..."
                          className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Type *</label>
                          <select 
                            value={draft.projectType}
                            onChange={(e) => setDraft({...draft, projectType: e.target.value as ProjectType})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          >
                            <option value="Mini project">Mini project</option>
                            <option value="Final year">Final year</option>
                            <option value="Research paper">Research paper</option>
                            <option value="Hackathon">Hackathon</option>
                            <option value="Internship project">Internship project</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Difficulty *</label>
                          <select 
                            value={draft.difficulty}
                            onChange={(e) => setDraft({...draft, difficulty: e.target.value as Difficulty})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <ChipInput 
                        label="Domains *"
                        values={draft.domains}
                        onChange={(vals) => setDraft({...draft, domains: vals})}
                        placeholder="e.g. Machine Learning, Healthcare..."
                        required
                        error={errors.domains}
                      />

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Abstract *</label>
                        <textarea 
                          value={draft.abstract}
                          onChange={(e) => setDraft({...draft, abstract: e.target.value})}
                          placeholder="A brief summary of your project..."
                          className={`w-full bg-[#0c0c0c] border ${errors.abstract ? 'border-red-500/50' : 'border-[#1a1a1a]'} rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all h-32 resize-none`}
                        />
                        {errors.abstract && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.abstract}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Problem Statement *</label>
                        <textarea 
                          value={draft.problemStatement}
                          onChange={(e) => setDraft({...draft, problemStatement: e.target.value})}
                          placeholder="What specific problem are you solving?"
                          className={`w-full bg-[#0c0c0c] border ${errors.problemStatement ? 'border-red-500/50' : 'border-[#1a1a1a]'} rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all h-32 resize-none`}
                        />
                        {errors.problemStatement && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.problemStatement}</p>}
                      </div>

                      <BulletList 
                        label="Objectives"
                        values={draft.objectives}
                        onChange={(vals) => setDraft({...draft, objectives: vals})}
                        placeholder="Add a key objective..."
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Team & Roles</h2>
                      <p className="text-gray-500 text-sm">Who are you looking for to join your mission?</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Team Status *</label>
                        <select 
                          value={draft.team.status}
                          onChange={(e) => setDraft({...draft, team: {...draft.team, status: e.target.value as TeamStatus}})}
                          className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                        >
                          <option value="Looking for teammates">Looking for teammates</option>
                          <option value="Team full">Team full</option>
                          <option value="Solo project">Solo project</option>
                        </select>
                      </div>

                      <ChipInput 
                        label="Required Roles"
                        values={draft.team.requiredRoles}
                        onChange={(vals) => setDraft({...draft, team: {...draft.team, requiredRoles: vals}})}
                        placeholder="e.g. Frontend Dev, Data Scientist..."
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expected Team Size</label>
                          <input 
                            type="number"
                            min="1"
                            max="10"
                            value={draft.team.expectedTeamSize}
                            onChange={(e) => setDraft({...draft, team: {...draft.team, expectedTeamSize: parseInt(e.target.value)}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Collaboration Mode</label>
                          <select 
                            value={draft.team.collaborationMode}
                            onChange={(e) => setDraft({...draft, team: {...draft.team, collaborationMode: e.target.value as CollaborationMode}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <ChipInput 
                        label="Communication Preferences"
                        values={draft.team.communication}
                        onChange={(vals) => setDraft({...draft, team: {...draft.team, communication: vals}})}
                        placeholder="e.g. Discord, WhatsApp..."
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Tech & Skills</h2>
                      <p className="text-gray-500 text-sm">Specify the tools and expertise needed.</p>
                    </div>

                    <div className="space-y-6">
                      <ChipInput 
                        label="Tech Stack * (min 1)"
                        values={draft.tech.techStack}
                        onChange={(vals) => setDraft({...draft, tech: {...draft.tech, techStack: vals}})}
                        placeholder="e.g. React, Python, PyTorch..."
                        required
                        error={errors.techStack}
                      />

                      <SkillsEditor 
                        label="Skills Required"
                        values={draft.tech.skillsRequired}
                        onChange={(vals) => setDraft({...draft, tech: {...draft.tech, skillsRequired: vals}})}
                      />

                      <ChipInput 
                        label="Tools (Optional)"
                        values={draft.tech.tools}
                        onChange={(vals) => setDraft({...draft, tech: {...draft.tech, tools: vals}})}
                        placeholder="e.g. Figma, Docker, Notion..."
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Research Details</h2>
                      <p className="text-gray-500 text-sm">Deep dive into the academic and data aspects.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focus Type</label>
                        <select 
                          value={draft.research.focusType}
                          onChange={(e) => setDraft({...draft, research: {...draft.research, focusType: e.target.value as FocusType}})}
                          className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                        >
                          <option value="Application">Application-based</option>
                          <option value="Research-based">Research-based</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>

                      <ChipInput 
                        label="Keywords"
                        values={draft.keywords}
                        onChange={(vals) => setDraft({...draft, keywords: vals})}
                        placeholder="e.g. NLP, Sustainability..."
                      />

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">References</label>
                        <div className="space-y-3">
                          {draft.research.references.map((ref, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl group">
                              <div className="flex flex-col">
                                <span className="text-xs text-white font-bold">{ref.title}</span>
                                <span className="text-[10px] text-gray-500 truncate max-w-[300px]">{ref.urlOrDoi}</span>
                              </div>
                              <button 
                                onClick={() => setDraft({...draft, research: {...draft.research, references: draft.research.references.filter((_, idx) => idx !== i)}})}
                                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input 
                              id="ref-title"
                              type="text"
                              placeholder="Paper title..."
                              className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                            <div className="flex space-x-2">
                              <input 
                                id="ref-url"
                                type="text"
                                placeholder="URL or DOI..."
                                className="flex-1 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                              />
                              <button 
                                onClick={() => {
                                  const t = (document.getElementById('ref-title') as HTMLInputElement).value;
                                  const u = (document.getElementById('ref-url') as HTMLInputElement).value;
                                  if (t && u) {
                                    setDraft({...draft, research: {...draft.research, references: [...draft.research.references, { title: t, urlOrDoi: u }]}});
                                    (document.getElementById('ref-title') as HTMLInputElement).value = '';
                                    (document.getElementById('ref-url') as HTMLInputElement).value = '';
                                  }
                                }}
                                className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Brain className="w-5 h-5 text-indigo-400" />
                            <span className="text-sm font-bold text-white">Dataset Required?</span>
                          </div>
                          <button 
                            onClick={() => setDraft({...draft, research: {...draft.research, datasetRequired: !draft.research.datasetRequired}})}
                            className={`w-12 h-6 rounded-full transition-all relative ${draft.research.datasetRequired ? 'bg-indigo-600' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${draft.research.datasetRequired ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                        
                        {draft.research.datasetRequired && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 pt-4 border-t border-white/5"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <input 
                                type="text"
                                placeholder="Dataset Name"
                                value={draft.research.dataset.name || ""}
                                onChange={(e) => setDraft({...draft, research: {...draft.research, dataset: {...draft.research.dataset, name: e.target.value}}})}
                                className="bg-black border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                              />
                              <input 
                                type="text"
                                placeholder="URL (optional)"
                                value={draft.research.dataset.url || ""}
                                onChange={(e) => setDraft({...draft, research: {...draft.research, dataset: {...draft.research.dataset, url: e.target.value}}})}
                                className="bg-black border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                              />
                            </div>
                            <textarea 
                              placeholder="Privacy or usage notes..."
                              value={draft.research.dataset.privacyNotes || ""}
                              onChange={(e) => setDraft({...draft, research: {...draft.research, dataset: {...draft.research.dataset, privacyNotes: e.target.value}}})}
                              className="w-full bg-black border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all h-20 resize-none"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Links & Uploads</h2>
                      <p className="text-gray-500 text-sm">Connect your external resources and documents.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">GitHub Repository</label>
                          <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input 
                              type="text"
                              value={draft.links.github}
                              onChange={(e) => setDraft({...draft, links: {...draft.links, github: e.target.value}})}
                              placeholder="https://github.com/..."
                              className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Demo</label>
                          <div className="relative">
                            <Rocket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input 
                              type="text"
                              value={draft.links.demo}
                              onChange={(e) => setDraft({...draft, links: {...draft.links, demo: e.target.value}})}
                              placeholder="https://demo.com/..."
                              className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Uploads (Mock)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { label: 'Cover Image', key: 'coverImageName', icon: Eye },
                            { label: 'Report PDF', key: 'reportFileName', icon: FileText },
                            { label: 'Presentation', key: 'pptFileName', icon: Rocket }
                          ].map((upload) => (
                            <div 
                              key={upload.key}
                              className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] border-dashed hover:border-white/20 transition-all cursor-pointer text-center space-y-3"
                              onClick={() => {
                                const name = prompt(`Enter ${upload.label} filename:`);
                                if (name) setDraft({...draft, uploads: {...draft.uploads, [upload.key]: name}});
                              }}
                            >
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                                <upload.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest">{upload.label}</p>
                                <p className="text-[9px] text-gray-600 mt-1 truncate">
                                  {(draft.uploads as any)[upload.key] || "Click to upload"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter text-white">Timeline & Publish</h2>
                      <p className="text-gray-500 text-sm">Finalize your timeline and visibility settings.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Start Date</label>
                          <input 
                            type="date"
                            value={draft.timeline.startDate}
                            onChange={(e) => setDraft({...draft, timeline: {...draft.timeline, startDate: e.target.value}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">End Date / Deadline</label>
                          <input 
                            type="date"
                            value={draft.timeline.endDate}
                            onChange={(e) => setDraft({...draft, timeline: {...draft.timeline, endDate: e.target.value}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Milestones</label>
                        <div className="space-y-3">
                          {draft.timeline.milestones.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl group">
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white font-bold text-[10px]">{i+1}</div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-white font-bold">{m.title}</span>
                                  <span className="text-[10px] text-gray-500">{m.dueDate || "No date"}</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => setDraft({...draft, timeline: {...draft.timeline, milestones: draft.timeline.milestones.filter((_, idx) => idx !== i)}})}
                                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <div className="flex space-x-2">
                            <input 
                              id="ms-title"
                              type="text"
                              placeholder="Milestone title..."
                              className="flex-1 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                            <input 
                              id="ms-date"
                              type="date"
                              className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                            <button 
                              onClick={() => {
                                const t = (document.getElementById('ms-title') as HTMLInputElement).value;
                                const d = (document.getElementById('ms-date') as HTMLInputElement).value;
                                if (t) {
                                  setDraft({...draft, timeline: {...draft.timeline, milestones: [...draft.timeline.milestones, { title: t, dueDate: d }]}});
                                  (document.getElementById('ms-title') as HTMLInputElement).value = '';
                                  (document.getElementById('ms-date') as HTMLInputElement).value = '';
                                }
                              }}
                              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Status</label>
                          <select 
                            value={draft.timeline.status}
                            onChange={(e) => setDraft({...draft, timeline: {...draft.timeline, status: e.target.value as ProjectStatus}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          >
                            <option value="Idea">Idea</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visibility *</label>
                          <select 
                            value={draft.publish.visibility}
                            onChange={(e) => setDraft({...draft, publish: {...draft.publish, visibility: e.target.value as Visibility}})}
                            className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                          >
                            <option value="Public">Public</option>
                            <option value="Campus only">Campus only</option>
                            <option value="Private">Private</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] flex items-center justify-between">
                          <span className="text-sm font-bold text-white">Allow Comments</span>
                          <button 
                            onClick={() => setDraft({...draft, publish: {...draft.publish, allowComments: !draft.publish.allowComments}})}
                            className={`w-12 h-6 rounded-full transition-all relative ${draft.publish.allowComments ? 'bg-indigo-600' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${draft.publish.allowComments ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                        <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] flex items-center justify-between">
                          <span className="text-sm font-bold text-white">Reuse as Reference</span>
                          <button 
                            onClick={() => setDraft({...draft, publish: {...draft.publish, allowReuseAsReference: !draft.publish.allowReuseAsReference}})}
                            className={`w-12 h-6 rounded-full transition-all relative ${draft.publish.allowReuseAsReference ? 'bg-indigo-600' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${draft.publish.allowReuseAsReference ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Preview (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Project Preview</span>
              </div>
              <PreviewCard draft={draft} />
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold text-white">Why publish?</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Publishing your project makes it discoverable to potential teammates, mentors, and the research community. You can always edit or unpublish later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-3 md:p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-6 py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:text-white disabled:opacity-20 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button 
              onClick={() => saveDraft()}
              className="px-6 py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:text-white transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden md:inline">Save Draft</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white"
              onClick={() => setShowMobilePreview(true)}
            >
              <Eye className="w-5 h-5" />
            </button>

            {step < 6 ? (
              <button 
                onClick={() => {
                  saveDraft(false);
                  setStep(s => Math.min(6, s + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-black px-8 py-2.5 rounded-2xl font-bold flex items-center space-x-2 hover:bg-gray-200 transition-all shadow-xl shadow-white/10"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handlePublish}
                className="bg-indigo-600 text-white px-10 py-2.5 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
              >
                <Rocket className="w-4 h-4" />
                <span>Publish Project</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Preview Drawer */}
      <AnimatePresence>
        {showMobilePreview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePreview(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-[#080808] border-t border-white/10 rounded-t-[3rem] p-8 z-[70] max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Project Preview</h3>
                <button onClick={() => setShowMobilePreview(false)} className="p-2 rounded-full bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <PreviewCard draft={draft} />
              <div className="h-20" /> {/* Spacer */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};
