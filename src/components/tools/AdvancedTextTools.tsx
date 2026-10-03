import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { GitCompare, Search, ArrowUpDown, Shuffle, BarChart2 } from 'lucide-react';

// 1. Text Diff Viewer
export const TextDiffViewer: React.FC = () => {
  const [original, setOriginal] = useState('PTools is a fast browser online tools platform.\nIt has 50 free tools.\n100% client side privacy.');
  const [modified, setModified] = useState('PTools is a fast and simple browser online tools platform.\nIt has 100+ free tools.\n100% client side privacy and security.');

  const origLines = original.split('\n');
  const modLines = modified.split('\n');
  const maxLines = Math.max(origLines.length, modLines.length);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Original Text</label>
          <textarea
            rows={6}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Modified Text</label>
          <textarea
            rows={6}
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
          />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Line-by-Line Comparison</div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
          {Array.from({ length: maxLines }).map((_, idx) => {
            const o = origLines[idx];
            const m = modLines[idx];
            const isDiff = o !== m;

            return (
              <div key={idx} className="py-1.5 flex flex-col sm:flex-row gap-2">
                <div className={`flex-1 p-2 rounded ${isDiff && o !== undefined ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300' : 'text-slate-600 dark:text-slate-400'}`}>
                  <span className="text-[10px] text-slate-400 mr-2 select-none">{idx + 1}</span>
                  {o !== undefined ? o : <span className="italic text-slate-400">empty</span>}
                </div>
                <div className={`flex-1 p-2 rounded ${isDiff && m !== undefined ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
                  <span className="text-[10px] text-slate-400 mr-2 select-none">{idx + 1}</span>
                  {m !== undefined ? m : <span className="italic text-slate-400">empty</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 2. Find and Replace Tool
export const FindAndReplaceTool: React.FC = () => {
  const [text, setText] = useState('PTools is built for everyone. PTools provides online tools. Use PTools today.');
  const [find, setFind] = useState('PTools');
  const [replace, setReplace] = useState('Pixelary PTools');
  const [matchCase, setMatchCase] = useState(false);

  let replacedText = text;
  let matchesCount = 0;

  if (find) {
    try {
      const flags = matchCase ? 'g' : 'gi';
      const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      const matches = text.match(regex);
      matchesCount = matches ? matches.length : 0;
      replacedText = text.replace(regex, replace);
    } catch {}
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Source Text</label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Find</label>
          <input
            type="text"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Replace With</label>
          <input
            type="text"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} className="rounded text-blue-600" />
          <span>Match Case</span>
        </label>
        <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{matchesCount} matches replaced</span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Updated Result</label>
        <textarea
          readOnly
          rows={5}
          value={replacedText}
          className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end">
        <CopyButton text={replacedText} label="Copy Replaced Text" />
      </div>
    </div>
  );
};

// 3. Sort Lines Tool
export const SortLinesTool: React.FC = () => {
  const [input, setInput] = useState('Zebra\nBanana\nOrange\nApple\nGrapefruit');
  const [order, setOrder] = useState<'asc' | 'desc' | 'len-asc' | 'len-desc'>('asc');

  let lines = input.split('\n');
  if (order === 'asc') lines.sort((a, b) => a.localeCompare(b));
  else if (order === 'desc') lines.sort((a, b) => b.localeCompare(a));
  else if (order === 'len-asc') lines.sort((a, b) => a.length - b.length);
  else if (order === 'len-desc') lines.sort((a, b) => b.length - a.length);

  const output = lines.join('\n');

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-2 text-xs">
        <button onClick={() => setOrder('asc')} className={`px-3 py-1.5 rounded-lg ${order === 'asc' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>A → Z</button>
        <button onClick={() => setOrder('desc')} className={`px-3 py-1.5 rounded-lg ${order === 'desc' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Z → A</button>
        <button onClick={() => setOrder('len-asc')} className={`px-3 py-1.5 rounded-lg ${order === 'len-asc' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Shortest First</button>
        <button onClick={() => setOrder('len-desc')} className={`px-3 py-1.5 rounded-lg ${order === 'len-desc' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Longest First</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste lines to sort..."
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
        <textarea
          readOnly
          rows={8}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end">
        <CopyButton text={output} label="Copy Sorted Lines" />
      </div>
    </div>
  );
};

// 4. Reverse Text Tool
export const ReverseTextTool: React.FC = () => {
  const [text, setText] = useState('PTools online utilities for everyone');
  const [mode, setMode] = useState<'chars' | 'words' | 'each-word'>('chars');

  let reversed = '';
  if (mode === 'chars') {
    reversed = text.split('').reverse().join('');
  } else if (mode === 'words') {
    reversed = text.split(' ').reverse().join(' ');
  } else {
    reversed = text.split(' ').map((w) => w.split('').reverse().join('')).join(' ');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2 text-xs">
        <button onClick={() => setMode('chars')} className={`px-3 py-1.5 rounded-lg ${mode === 'chars' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Reverse Entire Text</button>
        <button onClick={() => setMode('words')} className={`px-3 py-1.5 rounded-lg ${mode === 'words' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Reverse Word Order</button>
        <button onClick={() => setMode('each-word')} className={`px-3 py-1.5 rounded-lg ${mode === 'each-word' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Reverse Each Word</button>
      </div>

      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
      />

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
        <div className="font-mono text-sm text-slate-800 dark:text-slate-200 truncate mr-3">
          {reversed}
        </div>
        <CopyButton text={reversed} label="Copy Reversed" />
      </div>
    </div>
  );
};

// 5. Word Frequency Counter
export const WordFrequencyCounter: React.FC = () => {
  const [text, setText] = useState('PTools is fast. PTools is free. Online tools should be fast and simple for everyone.');

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const freq: Record<string, number> = {};
  words.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });

  const sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to analyze word frequencies..."
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
      />

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Word Occurrences ({sortedFreq.length} unique words)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-auto">
          {sortedFreq.map(([word, count]) => (
            <div key={word} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-xs font-mono">
              <span className="truncate mr-2 text-slate-800 dark:text-slate-200">{word}</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{count}x</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
