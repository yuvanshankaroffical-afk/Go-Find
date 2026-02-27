
import React, { useState } from 'react';
import { Plus, X, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Chip Input ---
interface ChipInputProps {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const ChipInput: React.FC<ChipInputProps> = ({ label, values, onChange, placeholder, required, error }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (val: string) => {
    onChange(values.filter(v => v !== val));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl focus-within:border-white/20 transition-all">
        {values.map(val => (
          <span key={val} className="flex items-center space-x-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white">
            <span>{val}</span>
            <button onClick={() => handleRemove(val)} className="hover:text-red-400 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder || "Add tag..."}
          className="bg-transparent border-none focus:ring-0 text-xs text-white placeholder-gray-600 flex-1 min-w-[120px]"
        />
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{error}</p>}
    </div>
  );
};

// --- Bullet List Editor ---
interface BulletListProps {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}

export const BulletList: React.FC<BulletListProps> = ({ label, values, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="space-y-2">
        {values.map((val, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl group">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-xs text-gray-300 flex-1">{val}</span>
            <button onClick={() => handleRemove(i)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            placeholder={placeholder || "Add item..."}
            className="flex-1 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
          />
          <button 
            onClick={handleAdd}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Skills Editor ---
interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface SkillsEditorProps {
  label: string;
  values: Skill[];
  onChange: (newValues: Skill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ label, values, onChange }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Skill['level']>('Beginner');

  const handleAdd = () => {
    if (name.trim()) {
      onChange([...values, { name: name.trim(), level }]);
      setName('');
      setLevel('Beginner');
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="space-y-2">
        {values.map((skill, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl group">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-white font-bold">{skill.name}</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                skill.level === 'Beginner' ? 'border-blue-500/20 text-blue-400 bg-blue-500/5' :
                skill.level === 'Intermediate' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
                'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
              }`}>
                {skill.level}
              </span>
            </div>
            <button onClick={() => handleRemove(i)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Skill name..."
            className="flex-1 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
          />
          <select 
            value={level}
            onChange={(e) => setLevel(e.target.value as Skill['level'])}
            className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button 
            onClick={handleAdd}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Stepper ---
interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        {steps.map((step, i) => {
          const isCompleted = i + 1 < currentStep;
          const isActive = i + 1 === currentStep;
          return (
            <div key={i} className="flex flex-col items-center space-y-2 flex-1 relative">
              {/* Line */}
              {i !== 0 && (
                <div className={`absolute right-1/2 top-4 w-full h-[1px] -translate-y-1/2 z-0 ${
                  isCompleted || isActive ? 'bg-white' : 'bg-white/10'
                }`} />
              )}
              
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                isCompleted ? 'bg-white border-white text-black' :
                isActive ? 'bg-black border-white text-white' :
                'bg-black border-white/10 text-gray-600'
              }`}>
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest hidden md:block ${
                isActive ? 'text-white' : 'text-gray-600'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

// --- Toast ---
export const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-2xl font-bold text-xs shadow-2xl z-[100] flex items-center space-x-3"
    >
      <Check className="w-4 h-4" />
      <span>{message}</span>
    </motion.div>
  );
};
