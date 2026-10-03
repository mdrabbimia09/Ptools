import React, { useState, useEffect } from 'react';
import { CopyButton } from './CalculatorTools';
import { Shield, RefreshCw } from 'lucide-react';

// MD5 implementation for standard string hashing
function md5(inputString: string): string {
  function rotateLeft(lValue: number, iShiftBits: number) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX: number, lY: number) {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }
  function F(x: number, y: number, z: number) { return (x & y) | (~x & z); }
  function G(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
  function H(x: number, y: number, z: number) { return x ^ y ^ z; }
  function I(x: number, y: number, z: number) { return y ^ (x | ~z); }
  function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  const utf8 = unescape(encodeURIComponent(inputString));
  const nwords = ((utf8.length + 8) >> 6) + 1;
  const x = new Array(nwords * 16).fill(0);
  for (let i = 0; i < utf8.length; i++) {
    x[i >> 2] |= (utf8.charCodeAt(i) & 0xff) << ((i % 4) * 8);
  }
  x[utf8.length >> 2] |= 0x80 << ((utf8.length % 4) * 8);
  x[nwords * 16 - 2] = utf8.length * 8;

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = FF(a, b, c, d, x[k + 0], 7, -680876936);
    d = FF(d, a, b, c, x[k + 1], 12, -389564586);
    c = FF(c, d, a, b, x[k + 2], 17, 606105819);
    b = FF(b, c, d, a, x[k + 3], 22, -1044525330);
    a = FF(a, b, c, d, x[k + 4], 7, -176418897);
    d = FF(d, a, b, c, x[k + 5], 12, 1200080426);
    c = FF(c, d, a, b, x[k + 6], 17, -1473231341);
    b = FF(b, c, d, a, x[k + 7], 22, -45705983);
    a = FF(a, b, c, d, x[k + 8], 7, 1770035416);
    d = FF(d, a, b, c, x[k + 9], 12, -1958414417);
    c = FF(c, d, a, b, x[k + 10], 17, -42063);
    b = FF(b, c, d, a, x[k + 11], 22, -1990404162);
    a = FF(a, b, c, d, x[k + 12], 7, 1804603682);
    d = FF(d, a, b, c, x[k + 13], 12, -40341101);
    c = FF(c, d, a, b, x[k + 14], 17, -1502002290);
    b = FF(b, c, d, a, x[k + 15], 22, 1236535329);

    a = GG(a, b, c, d, x[k + 1], 5, -165796510);
    d = GG(d, a, b, c, x[k + 6], 9, -1069501632);
    c = GG(c, d, a, b, x[k + 11], 14, 643717713);
    b = GG(b, c, d, a, x[k + 0], 20, -373897302);
    a = GG(a, b, c, d, x[k + 5], 5, -701558691);
    d = GG(d, a, b, c, x[k + 10], 9, 38016083);
    c = GG(c, d, a, b, x[k + 15], 14, -660478335);
    b = GG(b, c, d, a, x[k + 4], 20, -405537848);
    a = GG(a, b, c, d, x[k + 9], 5, 568446438);
    d = GG(d, a, b, c, x[k + 14], 9, -1019803690);
    c = GG(c, d, a, b, x[k + 3], 14, -187363961);
    b = GG(b, c, d, a, x[k + 8], 20, 1163531501);
    a = GG(a, b, c, d, x[k + 13], 5, -1444681467);
    d = GG(d, a, b, c, x[k + 2], 9, -51403784);
    c = GG(c, d, a, b, x[k + 7], 14, 1735328473);
    b = GG(b, c, d, a, x[k + 12], 20, -1926607734);

    a = HH(a, b, c, d, x[k + 5], 4, -378558);
    d = HH(d, a, b, c, x[k + 8], 11, -2022574463);
    c = HH(c, d, a, b, x[k + 11], 16, 1839030562);
    b = HH(b, c, d, a, x[k + 14], 23, -35309556);
    a = HH(a, b, c, d, x[k + 1], 4, -1530992060);
    d = HH(d, a, b, c, x[k + 4], 11, 1272893353);
    c = HH(c, d, a, b, x[k + 7], 16, -155497632);
    b = HH(b, c, d, a, x[k + 10], 23, -1094730640);
    a = HH(a, b, c, d, x[k + 13], 4, 681279174);
    d = HH(d, a, b, c, x[k + 0], 11, -358537222);
    c = HH(c, d, a, b, x[k + 3], 16, -722521979);
    b = HH(b, c, d, a, x[k + 6], 23, 76029189);
    a = HH(a, b, c, d, x[k + 9], 4, -640364487);
    d = HH(d, a, b, c, x[k + 12], 11, -421815835);
    c = HH(c, d, a, b, x[k + 15], 16, 530742520);
    b = HH(b, c, d, a, x[k + 2], 23, -995338651);

    a = II(a, b, c, d, x[k + 0], 6, -198630844);
    d = II(d, a, b, c, x[k + 7], 10, 1126891415);
    c = II(c, d, a, b, x[k + 14], 15, -1416354905);
    b = II(b, c, d, a, x[k + 5], 21, -57434055);
    a = II(a, b, c, d, x[k + 12], 6, 1700485571);
    d = II(d, a, b, c, x[k + 3], 10, -1894986606);
    c = II(c, d, a, b, x[k + 10], 15, -1051523);
    b = II(b, c, d, a, x[k + 1], 21, -2054922799);
    a = II(a, b, c, d, x[k + 8], 6, 1873313359);
    d = II(d, a, b, c, x[k + 15], 10, -30611744);
    c = II(c, d, a, b, x[k + 6], 15, -1560198380);
    b = II(b, c, d, a, x[k + 13], 21, 1309151649);
    a = II(a, b, c, d, x[k + 4], 6, -145523070);
    d = II(d, a, b, c, x[k + 11], 10, -1120210379);
    c = II(c, d, a, b, x[k + 2], 15, 718787259);
    b = II(b, c, d, a, x[k + 9], 21, -343485551);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  function wordToHex(lValue: number) {
    let wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValueTemp = '0' + lByte.toString(16);
      wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
    }
    return wordToHexValue;
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// 11. Base64 Encoder
export const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState('Hello World! PTools online tools.');
  
  let encoded = '';
  let byteLen = 0;
  try {
    const bytes = new TextEncoder().encode(input);
    byteLen = bytes.length;
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    encoded = btoa(binary);
  } catch {
    encoded = 'Error encoding string to Base64';
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Plain Text / UTF-8 Input ({byteLen} bytes)
        </label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Base64 Encoded Result
        </label>
        <textarea
          readOnly
          rows={5}
          value={encoded}
          className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setInput('')} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900">Clear</button>
        <CopyButton text={encoded} label="Copy Base64" />
      </div>
    </div>
  );
};

// 12. Base64 Decoder
export const Base64Decoder: React.FC = () => {
  const [input, setInput] = useState('SGVsbG8gV29ybGQhIFBUb29scyBvbmxpbmUgdG9vbHMu');
  
  let decoded = '';
  let error = '';
  try {
    const cleanInput = input.trim();
    if (cleanInput) {
      const binary = atob(cleanInput);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      decoded = new TextDecoder().decode(bytes);
    }
  } catch (err: any) {
    error = 'Invalid Base64 string: ' + (err.message || 'Malformed padding');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Base64 Encoded String</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Decoded Plain Text</label>
        {error ? (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs text-rose-600 dark:text-rose-400 font-mono">
            {error}
          </div>
        ) : (
          <textarea
            readOnly
            rows={5}
            value={decoded}
            className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setInput('')} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900">Clear</button>
        <CopyButton text={decoded} label="Copy Decoded Text" />
      </div>
    </div>
  );
};

// 13. URL Encoder
export const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('https://ptools.com/search?q=free online tools & category=pdf');
  const [mode, setMode] = useState<'component' | 'uri'>('component');

  let output = '';
  try {
    output = mode === 'component' ? encodeURIComponent(input) : encodeURI(input);
  } catch {
    output = 'Error encoding URI';
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setMode('component')}
          className={`px-3 py-1.5 font-medium rounded-md ${mode === 'component' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          encodeURIComponent (Full safe query string)
        </button>
        <button
          onClick={() => setMode('uri')}
          className={`px-3 py-1.5 font-medium rounded-md ${mode === 'uri' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          encodeURI (Preserve URL protocol & path)
        </button>
      </div>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL or text to encode..."
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
      />

      <div>
        <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Percent-Encoded Result</div>
        <textarea
          readOnly
          rows={4}
          value={output}
          className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200 break-all"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy Encoded URL" />
      </div>
    </div>
  );
};

// 14. URL Decoder
export const UrlDecoder: React.FC = () => {
  const [input, setInput] = useState('https%3A%2F%2Fptools.com%2Fsearch%3Fq%3Dfree%20online%20tools%20%26%20category%3Dpdf');
  const [decodePlus, setDecodePlus] = useState(true);

  let output = '';
  let error = '';
  try {
    let raw = input;
    if (decodePlus) {
      raw = raw.replace(/\+/g, ' ');
    }
    output = decodeURIComponent(raw);
  } catch (err: any) {
    error = 'Malformed URL encoding sequence: ' + err.message;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-2 text-xs">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={decodePlus}
            onChange={(e) => setDecodePlus(e.target.checked)}
            className="rounded text-blue-600"
          />
          <span>Treat '+' signs as spaces</span>
        </label>
      </div>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste percent-encoded URL..."
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
      />

      <div>
        <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Decoded URL</div>
        {error ? (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs font-mono text-rose-600 rounded-lg">
            {error}
          </div>
        ) : (
          <textarea
            readOnly
            rows={4}
            value={output}
            className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
          />
        )}
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={output} label="Copy Decoded URL" />
      </div>
    </div>
  );
};

// 21. UUID Generator
export const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuidV4 = () => {
    // RFC 4122 v4
    const rnd = new Uint8Array(16);
    window.crypto.getRandomValues(rnd);
    rnd[6] = (rnd[6] & 0x0f) | 0x40; // Version 4
    rnd[8] = (rnd[8] & 0x3f) | 0x80; // Variant 10xx

    const hex = Array.from(rnd, (b) => b.toString(16).padStart(2, '0')).join('');
    if (!hyphens) return uppercase ? hex.toUpperCase() : hex.toLowerCase();
    const formatted = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    return uppercase ? formatted.toUpperCase() : formatted.toLowerCase();
  };

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUuidV4());
    }
    setUuids(list);
  };

  // Initial load
  useEffect(() => {
    handleGenerate();
  }, []);

  const fullText = uuids.join('\n');

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span>Quantity:</span>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono"
          />
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded text-blue-600" />
          <span>Uppercase</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="rounded text-blue-600" />
          <span>Hyphens (-)</span>
        </label>
        <button
          onClick={handleGenerate}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Generate New</span>
        </button>
      </div>

      <textarea
        readOnly
        rows={Math.min(12, Math.max(5, count))}
        value={fullText}
        className="w-full p-4 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
      />

      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Generated using Web Crypto API (crypto.getRandomValues)</span>
        <CopyButton text={fullText} label="Copy All UUIDs" />
      </div>
    </div>
  );
};

// 22. Password Generator
export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      chars = chars.replace(/[1l0OIo]/g, '');
    }

    if (!chars) {
      setPassword('Select at least one character type');
      return;
    }

    const rnd = new Uint32Array(length);
    window.crypto.getRandomValues(rnd);
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[rnd[i] % chars.length];
    }
    setPassword(pwd);
  };

  useEffect(() => {
    generate();
  }, []);

  // Entropy calculation
  let poolSize = 0;
  if (includeUpper) poolSize += 26;
  if (includeLower) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 26;
  const entropy = Math.round(length * Math.log2(poolSize || 1));

  let strengthLabel = 'Weak';
  let strengthColor = 'bg-rose-500';
  if (entropy > 75) {
    strengthLabel = 'Very Strong';
    strengthColor = 'bg-emerald-500';
  } else if (entropy > 55) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-blue-500';
  } else if (entropy > 35) {
    strengthLabel = 'Moderate';
    strengthColor = 'bg-amber-500';
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3">
        <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
          {password}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={generate}
            title="Generate new password"
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>
          <CopyButton text={password} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Entropy: {entropy} bits</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{strengthLabel}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full ${strengthColor}`} style={{ width: `${Math.min(100, (entropy / 90) * 100)}%` }} />
        </div>
      </div>

      <div className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Password Length</span>
            <span className="font-mono font-bold text-blue-600">{length} characters</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded text-blue-600" />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="rounded text-blue-600" />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded text-blue-600" />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="rounded text-blue-600" />
            <span>Symbols (!@#$)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer col-span-2">
            <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="rounded text-blue-600" />
            <span>Exclude Ambiguous Characters (1, l, 0, O, o)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// 23. Hash Generator
export const HashGenerator: React.FC = () => {
  const [text, setText] = useState('PTools free online tools');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const computeHashes = async (str: string) => {
    setLoading(true);
    const md5Hex = md5(str);

    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    const computeSubtle = async (algo: string): Promise<string> => {
      try {
        const buf = await window.crypto.subtle.digest(algo, data);
        return Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      } catch {
        return 'N/A';
      }
    };

    const sha1Hex = await computeSubtle('SHA-1');
    const sha256Hex = await computeSubtle('SHA-256');
    const sha384Hex = await computeSubtle('SHA-384');
    const sha512Hex = await computeSubtle('SHA-512');

    setHashes({
      'MD5': md5Hex,
      'SHA-1': sha1Hex,
      'SHA-256': sha256Hex,
      'SHA-384': sha384Hex,
      'SHA-512': sha512Hex,
    });
    setLoading(false);
  };

  useEffect(() => {
    computeHashes(text);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Text to Hash</label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            computeHashes(e.target.value);
          }}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3">
        {Object.entries(hashes).map(([algo, h]) => (
          <div key={algo} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{algo}</span>
              <CopyButton text={h} label="Copy Hash" />
            </div>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all select-all">
              {h}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
