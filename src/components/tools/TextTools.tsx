import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { RotateCcw, Sparkles } from 'lucide-react';

// 6. Word Counter
export const WordCounter: React.FC = () => {
  const [text, setText] = useState('PTools provides fast, simple, and useful browser-based online tools for everyone.');

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  // Support English (.!?), Bangla (। / \u0964), Hindi (॥ / \u0965), and Arabic (؟ / \u061F)
  const sentenceMatches = trimmed.match(/[^.!?\u0964\u0965\u061F]+[.!?\u0964\u0965\u061F]+(?:\s|$)/g);
  const sentences = trimmed ? (sentenceMatches ? sentenceMatches.length : 1) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMin = Math.ceil(words / 200);
  const speakingTimeMin = Math.ceil(words / 130);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
          <div className="text-xs text-slate-500">Words</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">{words.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
          <div className="text-xs text-slate-500">Characters</div>
          <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">{charsWithSpaces.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
          <div className="text-xs text-slate-500">Sentences</div>
          <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">{sentences.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
          <div className="text-xs text-slate-500">Paragraphs</div>
          <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">{paragraphs.toLocaleString()}</div>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full p-4 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4 text-xs text-slate-500">
            <span>Chars (no spaces): <strong className="font-mono text-slate-700 dark:text-slate-300">{charsNoSpaces}</strong></span>
            <span>Est. Reading: <strong className="font-mono text-slate-700 dark:text-slate-300">{readingTimeMin} min</strong></span>
            <span>Est. Speaking: <strong className="font-mono text-slate-700 dark:text-slate-300">{speakingTimeMin} min</strong></span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setText('')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <CopyButton text={text} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Character Counter with Platform Limits
export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');

  const len = text.length;
  const limits = [
    { name: 'X / Twitter', max: 280 },
    { name: 'SMS Single Segment', max: 160 },
    { name: 'Google SEO Title', max: 60 },
    { name: 'Google Meta Description', max: 160 },
    { name: 'LinkedIn Post', max: 3000 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text to check platform character limits..."
        className="w-full p-4 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Total Characters: <span className="font-mono text-blue-600 dark:text-blue-400">{len}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setText('')}
            className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            Clear
          </button>
          <CopyButton text={text} />
        </div>
      </div>

      <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Platform Character Limits
        </div>
        {limits.map((l) => {
          const pct = Math.min(100, Math.round((len / l.max) * 100));
          const isOver = len > l.max;
          return (
            <div key={l.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">{l.name}</span>
                <span className={`font-mono ${isOver ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                  {len} / {l.max} {isOver && `(${len - l.max} over)`}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${isOver ? 'bg-rose-500' : pct > 90 ? 'bg-amber-500' : 'bg-blue-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 8. Text Case Converter
export const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('free online tools for everyone built by pixelary studio');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()));
  };
  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };
  const toCamelCase = () => {
    const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, ' ');
    const parts = cleaned.trim().split(/\s+/);
    if (!parts.length || !parts[0]) return;
    const res = parts[0].toLowerCase() + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');
    setText(res);
  };
  const toSnakeCase = () => {
    setText(text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, ''));
  };
  const toKebabCase = () => {
    setText(text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
  };
  const toConstantCase = () => {
    setText(text.trim().toUpperCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, ''));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={toUpperCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">UPPERCASE</button>
        <button onClick={toLowerCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">lowercase</button>
        <button onClick={toTitleCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">Title Case</button>
        <button onClick={toSentenceCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">Sentence case</button>
        <button onClick={toCamelCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">camelCase</button>
        <button onClick={toSnakeCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">snake_case</button>
        <button onClick={toKebabCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">kebab-case</button>
        <button onClick={toConstantCase} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200">CONSTANT_CASE</button>
      </div>

      <textarea
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
      />

      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Click any formatting style above to transform instantly</span>
        <div className="flex gap-2">
          <button onClick={() => setText('')} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900">Clear</button>
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
};

// 9. Remove Duplicate Lines
export const RemoveDuplicateLines: React.FC = () => {
  const [input, setInput] = useState("apple\nbanana\norange\napple\ngrapes\nbanana\nwatermelon");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [trimLines, setTrimLines] = useState(true);

  const lines = input.split('\n');
  const seen = new Set<string>();
  const uniqueLines: string[] = [];

  lines.forEach((line) => {
    let check = trimLines ? line.trim() : line;
    if (!caseSensitive) check = check.toLowerCase();
    if (!seen.has(check) && (trimLines ? check.length > 0 : true)) {
      seen.add(check);
      uniqueLines.push(trimLines ? line.trim() : line);
    }
  });

  if (sortAlpha) {
    uniqueLines.sort((a, b) => a.localeCompare(b));
  }

  const output = uniqueLines.join('\n');
  const removedCount = lines.length - uniqueLines.length;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span>Case Sensitive</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortAlpha}
            onChange={(e) => setSortAlpha(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span>Sort Alphabetically</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span>Trim Whitespace</span>
        </label>
        <div className="ml-auto text-blue-600 dark:text-blue-400 font-mono font-medium">
          {removedCount} duplicates removed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Original List ({lines.length} lines)
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Unique Lines ({uniqueLines.length} lines)
          </label>
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setInput('')} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900">Clear</button>
        <CopyButton text={output} label="Copy Unique Lines" />
      </div>
    </div>
  );
};

// 10. Text Cleaner
export const TextCleaner: React.FC = () => {
  const [text, setText] = useState("  This   has    extra   spaces.\n\n\nAnd multiple blank lines.\n<p>And <b>HTML tags</b> to strip.</p>  ");
  const [stripExtraSpaces, setStripExtraSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [stripHtml, setStripHtml] = useState(true);
  const [trimEdges, setTrimEdges] = useState(true);

  let cleaned = text;
  if (stripHtml) {
    cleaned = cleaned.replace(/<[^>]*>/g, '');
  }
  if (stripExtraSpaces) {
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
  }
  if (removeBlankLines) {
    cleaned = cleaned.replace(/^\s*[\r\n]/gm, '');
  }
  if (trimEdges) {
    cleaned = cleaned.trim();
  }

  const charsSaved = text.length - cleaned.length;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-xs p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={stripExtraSpaces} onChange={(e) => setStripExtraSpaces(e.target.checked)} className="rounded text-blue-600" />
          <span>Strip Extra Spaces</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={removeBlankLines} onChange={(e) => setRemoveBlankLines(e.target.checked)} className="rounded text-blue-600" />
          <span>Remove Empty Lines</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={stripHtml} onChange={(e) => setStripHtml(e.target.checked)} className="rounded text-blue-600" />
          <span>Strip HTML Tags</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={trimEdges} onChange={(e) => setTrimEdges(e.target.checked)} className="rounded text-blue-600" />
          <span>Trim Edges</span>
        </label>
        <div className="ml-auto text-emerald-600 dark:text-emerald-400 font-mono font-medium">
          {charsSaved > 0 ? `Saved ${charsSaved} chars` : '0 chars saved'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Original Messy Text</label>
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Purified Clean Text</label>
          <textarea
            readOnly
            rows={8}
            value={cleaned}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setText('')} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900">Clear</button>
        <CopyButton text={cleaned} label="Copy Cleaned Text" />
      </div>
    </div>
  );
};

// 46. Lorem Ipsum Generator
export const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlTags, setHtmlTags] = useState(false);

  const sampleWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
    'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
    'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
    'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWords = (num: number): string => {
    const res: string[] = [];
    for (let i = 0; i < num; i++) {
      res.push(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
    }
    return res.join(' ');
  };

  const generateSentence = (): string => {
    const len = Math.floor(Math.random() * 10) + 8;
    const str = generateWords(len);
    return str.charAt(0).toUpperCase() + str.slice(1) + '.';
  };

  const generateParagraph = (): string => {
    const numSentences = Math.floor(Math.random() * 4) + 4;
    const sentences: string[] = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  let output = '';
  if (type === 'words') {
    output = generateWords(count);
    if (startWithLorem && !output.startsWith('lorem ipsum')) {
      output = 'Lorem ipsum ' + output;
    }
  } else if (type === 'sentences') {
    const s: string[] = [];
    for (let i = 0; i < count; i++) s.push(generateSentence());
    output = s.join(' ');
  } else {
    const p: string[] = [];
    for (let i = 0; i < count; i++) {
      const para = generateParagraph();
      p.push(htmlTags ? `<p>${para}</p>` : para);
    }
    output = p.join(htmlTags ? '\n' : '\n\n');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <label className="text-slate-600 dark:text-slate-400">Generate:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <label className="flex items-center gap-1.5 cursor-pointer ml-2">
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} className="rounded text-blue-600" />
          <span>Start with "Lorem ipsum"</span>
        </label>
        {type === 'paragraphs' && (
          <label className="flex items-center gap-1.5 cursor-pointer ml-2">
            <input type="checkbox" checked={htmlTags} onChange={(e) => setHtmlTags(e.target.checked)} className="rounded text-blue-600" />
            <span>Wrap in &lt;p&gt; tags</span>
          </label>
        )}
      </div>

      <textarea
        readOnly
        rows={9}
        value={output}
        className="w-full p-4 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono leading-relaxed"
      />

      <div className="flex justify-end">
        <CopyButton text={output} label="Copy Lorem Ipsum" />
      </div>
    </div>
  );
};

// 47. Slug Generator
export const SlugGenerator: React.FC = () => {
  const [text, setText] = useState('Top 10 Best Online Tools & Software for 2026!');
  const [separator, setSeparator] = useState<'-' | '_' | '.'>('-');
  const [lowercase, setLowercase] = useState(true);

  let slug = text
    .normalize('NFD') // transliterate accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-_.]/g, '')
    .trim()
    .replace(/[\s-_.]+/g, separator);

  if (lowercase) slug = slug.toLowerCase();

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Article Title or Headline</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
        <label className="flex items-center gap-1.5">
          <span>Separator:</span>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value as any)}
            className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
            <option value=".">Dot (.)</option>
          </select>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="rounded text-blue-600" />
          <span>Lowercase only</span>
        </label>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
        <div className="overflow-hidden mr-3">
          <div className="text-xs text-slate-400">Clean URL Slug</div>
          <div className="text-base font-mono font-semibold text-blue-600 dark:text-blue-400 truncate mt-0.5">
            {slug || '(empty)'}
          </div>
        </div>
        <CopyButton text={slug} label="Copy Slug" />
      </div>
    </div>
  );
};
