import React, { useState, useEffect } from 'react';
import { CopyButton } from './CalculatorTools';
import { CheckCircle2, AlertCircle, Download, Code, Minimize2 } from 'lucide-react';

// 15. JSON Formatter
export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('{"name":"PTools","category":"tools","features":["fast","secure","free"],"stats":{"users":1000,"rating":5}}');
  const [indent, setIndent] = useState<2 | 4 | 'tab'>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      let parsed = JSON.parse(input);
      if (sortKeys && typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const sorted: any = {};
        Object.keys(parsed).sort().forEach((k) => { sorted[k] = parsed[k]; });
        parsed = sorted;
      }
      const ind = indent === 'tab' ? '\t' : indent;
      const formatted = JSON.stringify(parsed, null, ind);
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  useEffect(() => {
    formatJson();
  }, []);

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span>Indentation:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : parseInt(e.target.value) as any)}
            className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} className="rounded text-blue-600" />
          <span>Sort Keys Alphabetically</span>
        </label>
        <button
          onClick={formatJson}
          className="ml-auto px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
        >
          Format JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Raw / Unformatted JSON</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Beautified JSON</label>
          {error ? (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs text-rose-600 dark:text-rose-400 font-mono h-64 overflow-auto">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4" /> JSON Syntax Error
              </div>
              <div>{error}</div>
            </div>
          ) : (
            <textarea
              readOnly
              rows={12}
              value={output}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <button onClick={() => setInput('')} className="text-slate-500 hover:text-slate-700">Clear</button>
        <div className="flex gap-2">
          {output && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .json</span>
            </button>
          )}
          <CopyButton text={output} label="Copy JSON" />
        </div>
      </div>
    </div>
  );
};

// 16. JSON Validator
export const JsonValidator: React.FC = () => {
  const [input, setInput] = useState('{\n  "status": "valid",\n  "tools_count": 50,\n  "supported": true\n}');
  const [validation, setValidation] = useState<{ isValid: boolean; message: string; keysCount?: number; sizeBytes?: number }>({
    isValid: true,
    message: 'Valid JSON syntax',
    keysCount: 3,
    sizeBytes: 68
  });

  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1;
      setValidation({
        isValid: true,
        message: 'JSON is 100% valid RFC 8259 format.',
        keysCount: keys,
        sizeBytes: new TextEncoder().encode(input).length
      });
    } catch (err: any) {
      setValidation({
        isValid: false,
        message: err.message || 'Syntax error'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <textarea
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between items-center">
        <button
          onClick={validate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
        >
          Validate JSON
        </button>
        <button onClick={() => setInput('')} className="text-xs text-slate-500">Clear</button>
      </div>

      <div className={`p-4 rounded-xl border ${validation.isValid ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'}`}>
        <div className="flex items-center gap-2 font-semibold text-sm mb-1">
          {validation.isValid ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
          <span>{validation.isValid ? 'Valid JSON' : 'Invalid JSON'}</span>
        </div>
        <div className="text-xs font-mono">{validation.message}</div>
        {validation.isValid && validation.keysCount !== undefined && (
          <div className="flex gap-4 text-xs font-mono mt-2 pt-2 border-t border-emerald-200/50">
            <span>Root Keys / Elements: {validation.keysCount}</span>
            <span>Size: {validation.sizeBytes} bytes</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 17. JSON Minifier
export const JsonMinifier: React.FC = () => {
  const [input, setInput] = useState('{\n  "name": "PTools",\n  "type": "utility",\n  "online": true\n}');
  const [output, setOutput] = useState('');
  const [savedBytes, setSavedBytes] = useState(0);

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      const min = JSON.stringify(parsed);
      setOutput(min);
      setSavedBytes(input.length - min.length);
    } catch {
      setOutput('Error: Invalid JSON syntax');
    }
  };

  useEffect(() => {
    minify();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Formatted JSON Input</label>
        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center">
        <button onClick={minify} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium">
          Minify & Compress
        </button>
        {savedBytes > 0 && (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
            Saved {savedBytes} bytes ({Math.round((savedBytes / input.length) * 100)}% reduction)
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Compact Minified Single-Line JSON</label>
        <textarea
          readOnly
          rows={4}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy Minified JSON" />
      </div>
    </div>
  );
};

// 18. HTML Formatter
export const HtmlFormatter: React.FC = () => {
  const [input, setInput] = useState('<div class="container"><header><h1>PTools</h1></header><main><p>Free tools for everyone.</p><a href="/tools">Browse</a></main></div>');
  const [output, setOutput] = useState('');

  const formatHtml = (html: string) => {
    let tab = '  ';
    let result = '';
    let indent = 0;

    html.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indent -= 1;
      }

      result += '\n' + tab.repeat(Math.max(0, indent)) + '<' + element + '>';

      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br') && !element.startsWith('hr') && !element.startsWith('meta')) {
        indent += 1;
      }
    });

    return result.substring(1);
  };

  useEffect(() => {
    setOutput(formatHtml(input));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Raw HTML Code</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput(formatHtml(e.target.value));
          }}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Formatted Clean HTML</label>
        <textarea
          readOnly
          rows={8}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy HTML" />
      </div>
    </div>
  );
};

// 19. CSS Formatter
export const CssFormatter: React.FC = () => {
  const [input, setInput] = useState('.card{background:#fff;padding:16px;border-radius:8px}.button{color:#fff;background:#2563eb}');
  const [output, setOutput] = useState('');

  const formatCss = (css: string) => {
    return css
      .replace(/\s*\{\s*/g, ' {\n  ')
      .replace(/\s*;\s*/g, ';\n  ')
      .replace(/\s*\}\s*/g, '\n}\n\n')
      .trim();
  };

  useEffect(() => {
    setOutput(formatCss(input));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">CSS Stylesheet</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput(formatCss(e.target.value));
          }}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Beautified CSS</label>
        <textarea
          readOnly
          rows={8}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy CSS" />
      </div>
    </div>
  );
};

// 20. JavaScript Formatter
export const JavascriptFormatter: React.FC = () => {
  const [input, setInput] = useState('function calculateSum(a,b){const result=a+b;if(result>100){return"large"}return result}');
  const [output, setOutput] = useState('');

  const formatJs = (js: string) => {
    // Lightweight JS indentation formatter
    return js
      .replace(/\s*\{\s*/g, ' {\n  ')
      .replace(/\s*;\s*/g, ';\n  ')
      .replace(/\s*\}\s*/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  useEffect(() => {
    setOutput(formatJs(input));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">JavaScript Code</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput(formatJs(e.target.value));
          }}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Formatted JS</label>
        <textarea
          readOnly
          rows={8}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy JS" />
      </div>
    </div>
  );
};

// 39. CSV to JSON
export const CsvToJson: React.FC = () => {
  const [csv, setCsv] = useState('id,name,role,salary\n1,Alice,Designer,85000\n2,Bob,Engineer,95000\n3,Charlie,Product Manager,105000');
  const [hasHeader, setHasHeader] = useState(true);
  const [delimiter, setDelimiter] = useState<',' | ';' | '\t'>(',');
  const [output, setOutput] = useState('');

  const convert = () => {
    const lines = csv.trim().split('\n').filter(Boolean);
    if (!lines.length) return;

    if (hasHeader) {
      const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ''));
      const rows = lines.slice(1).map((line) => {
        const values = line.split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ''));
        const obj: any = {};
        headers.forEach((h, idx) => {
          let val: any = values[idx] ?? '';
          if (!isNaN(Number(val)) && val !== '') val = Number(val);
          if (val === 'true') val = true;
          if (val === 'false') val = false;
          obj[h] = val;
        });
        return obj;
      });
      setOutput(JSON.stringify(rows, null, 2));
    } else {
      const rows = lines.map((line) => line.split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, '')));
      setOutput(JSON.stringify(rows, null, 2));
    }
  };

  useEffect(() => {
    convert();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span>Delimiter:</span>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as any)}
            className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="rounded text-blue-600" />
          <span>First row contains headers</span>
        </label>
        <button onClick={convert} className="ml-auto px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">
          Convert to JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">CSV Input</label>
          <textarea
            rows={10}
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">JSON Output</label>
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy JSON" />
      </div>
    </div>
  );
};

// 40. JSON to CSV
export const JsonToCsv: React.FC = () => {
  const [json, setJson] = useState('[\n  {"id": 1, "name": "Alice", "role": "Designer", "salary": 85000},\n  {"id": 2, "name": "Bob", "role": "Engineer", "salary": 95000},\n  {"id": 3, "name": "Charlie", "role": "Product Manager", "salary": 105000}\n]');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed) || !parsed.length) {
        throw new Error('Input must be a non-empty array of objects');
      }

      const headers = Array.from(new Set(parsed.flatMap((item) => Object.keys(item))));
      const csvRows = [headers.join(',')];

      parsed.forEach((item) => {
        const row = headers.map((header) => {
          let val = item[header] ?? '';
          if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
          const str = String(val);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        });
        csvRows.push(row.join(','));
      });

      setOutput(csvRows.join('\n'));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
      setOutput('');
    }
  };

  useEffect(() => {
    convert();
  }, []);

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">JSON Array</label>
          <textarea
            rows={10}
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">CSV Spreadsheet Output</label>
          {error ? (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs text-rose-600 dark:text-rose-400 font-mono h-64">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              rows={10}
              value={output}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <button onClick={convert} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">
          Convert JSON to CSV
        </button>
        <div className="flex gap-2">
          {output && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .csv</span>
            </button>
          )}
          <CopyButton text={output} label="Copy CSV" />
        </div>
      </div>
    </div>
  );
};

// 41. Markdown to HTML
export const MarkdownToHtml: React.FC = () => {
  const [md, setMd] = useState('# Welcome to PTools\n\nFree online tools for everyone.\n\n- **Fast** browser-side operations\n- **No server uploads**\n- *Clean* modern interface\n\n```json\n{"status": "ok"}\n```');

  // Lightweight Markdown parse
  const parseMarkdown = (raw: string): string => {
    let html = raw
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/^\s*\-\s*(.*$)/gim, '<li>$1</li>');

    html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
    html = html.replace(/\n\n/g, '<br/><br/>');
    return html;
  };

  const htmlOutput = parseMarkdown(md);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Markdown Input</label>
          <textarea
            rows={10}
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">HTML Code Output</label>
          <textarea
            readOnly
            rows={10}
            value={htmlOutput}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Live HTML Render Preview</div>
        <div
          className="prose dark:prose-invert text-sm max-w-none border-t border-slate-100 dark:border-slate-800 pt-3"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={htmlOutput} label="Copy HTML Code" />
      </div>
    </div>
  );
};

// 42. HTML to Markdown
export const HtmlToMarkdown: React.FC = () => {
  const [html, setHtml] = useState('<h1>PTools Header</h1>\n<p>Fast, simple, and <strong>secure</strong> tools.</p>\n<ul>\n  <li>Image Compressor</li>\n  <li>PDF Merger</li>\n</ul>');
  
  const convertToMd = (str: string): string => {
    return str
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<ul[^>]*>/gi, '')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<ol[^>]*>/gi, '')
      .replace(/<\/ol>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<[^>]+>/g, '') // strip any leftovers
      .trim();
  };

  const mdOutput = convertToMd(html);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">HTML Source</label>
          <textarea
            rows={10}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Markdown Output</label>
          <textarea
            readOnly
            rows={10}
            value={mdOutput}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={mdOutput} label="Copy Markdown" />
      </div>
    </div>
  );
};
