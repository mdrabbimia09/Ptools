import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Cpu, Sparkles, Terminal, ShieldAlert } from 'lucide-react';

// 1. AI Prompt Formatter & Optimizer
export const PromptEngineeringFormatter: React.FC = () => {
  const [role, setRole] = useState('Senior Full-Stack TypeScript Software Engineer');
  const [task, setTask] = useState('Implement a secure JWT decoder and validator using Web Crypto API in React');
  const [context, setContext] = useState('Production SaaS platform running React 19, Tailwind CSS, Vite.');
  const [constraints, setConstraints] = useState('100% client-side execution, no external npm packages, strict TypeScript types, WCAG AA accessible.');
  const [format, setFormat] = useState('Provide clean, runnable TypeScript code without unnecessary conversational filler.');

  const constructedPrompt = `# ROLE
You are an expert ${role}.

# TASK
${task}

# CONTEXT & ENVIRONMENT
${context}

# CONSTRAINTS & RULES
${constraints}

# OUTPUT FORMAT
${format}`;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Persona / Role</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Core Objective / Task</label>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Context & Tech Stack</label>
          <input type="text" value={context} onChange={(e) => setContext(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Key Constraints & Invariants</label>
          <input type="text" value={constraints} onChange={(e) => setConstraints(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Engineered Production Prompt</span>
          <CopyButton text={constructedPrompt} label="Copy Prompt" />
        </div>
        <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 select-all whitespace-pre-wrap leading-relaxed">
          {constructedPrompt}
        </pre>
      </div>
    </div>
  );
};

// 2. LLM Token & Cost Estimator
export const LlmTokenEstimator: React.FC = () => {
  const [text, setText] = useState('PTools is a high-performance online tools website built for developers, students, and everyday internet users. All tools process data locally in the browser.');

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  // Standard approximation: ~4 characters per token in English
  const estimatedTokens = Math.ceil(charCount / 3.9);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Prompt / Input Text</label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="text-xs text-slate-500">Estimated Tokens</div>
          <div className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">{estimatedTokens}</div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="text-xs text-slate-500">Total Words</div>
          <div className="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">{wordCount}</div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="text-xs text-slate-500">Total Characters</div>
          <div className="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">{charCount}</div>
        </div>
      </div>
    </div>
  );
};
