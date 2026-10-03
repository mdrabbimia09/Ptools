import React, { useState, useEffect } from 'react';
import { CopyButton } from './CalculatorTools';
import { Shield, Key, Code, Play, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

// 1. JWT (JSON Web Token) Decoder
export const JwtDecoderTool: React.FC = () => {
  const [jwt, setJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIERvZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTgwMDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');

  let headerObj = {};
  let payloadObj = {};
  let signature = '';
  let error = '';
  let expDate = '';
  let isExpired = false;

  try {
    const parts = jwt.trim().split('.');
    if (parts.length === 3) {
      headerObj = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      payloadObj = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      signature = parts[2];

      const p: any = payloadObj;
      if (p.exp) {
        const d = new Date(p.exp * 1000);
        expDate = d.toLocaleString();
        isExpired = d.getTime() < Date.now();
      }
    } else {
      error = 'A valid JWT must have 3 dot-separated parts (Header.Payload.Signature)';
    }
  } catch (err: any) {
    error = 'Malformed JWT token: ' + err.message;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Encoded JWT String</label>
        <textarea
          rows={3}
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          placeholder="Paste JWT (eyJhbGciOi...)"
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      {error ? (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-mono text-rose-600">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {expDate && (
            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${isExpired ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 text-rose-700 dark:text-rose-300' : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'}`}>
              <div className="flex items-center gap-1.5 font-medium">
                {isExpired ? <AlertCircle className="w-4 h-4 text-rose-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                <span>{isExpired ? 'Token Expired' : 'Token Valid & Active'}</span>
              </div>
              <span className="font-mono">{isExpired ? `Expired on ${expDate}` : `Expires: ${expDate}`}</span>
            </div>
          )}

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span>Header: Algorithm & Token Type</span>
              <CopyButton text={JSON.stringify(headerObj, null, 2)} label="Copy Header" />
            </div>
            <pre className="text-xs font-mono text-purple-600 dark:text-purple-400 overflow-x-auto">
              {JSON.stringify(headerObj, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span>Payload: Claims & Data</span>
              <CopyButton text={JSON.stringify(payloadObj, null, 2)} label="Copy Payload" />
            </div>
            <pre className="text-xs font-mono text-blue-600 dark:text-blue-400 overflow-x-auto">
              {JSON.stringify(payloadObj, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. HMAC Generator
export const HmacGeneratorTool: React.FC = () => {
  const [message, setMessage] = useState('PTools secure message');
  const [secretKey, setSecretKey] = useState('secret_api_key_123');
  const [algo, setAlgo] = useState<'SHA-256' | 'SHA-512' | 'SHA-384' | 'SHA-1'>('SHA-256');
  const [hmacHex, setHmacHex] = useState('');

  const generateHmac = async () => {
    try {
      const enc = new TextEncoder();
      const keyData = enc.encode(secretKey);
      const msgData = enc.encode(message);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algo },
        false,
        ['sign']
      );

      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
      const hex = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setHmacHex(hex);
    } catch {
      setHmacHex('Error generating HMAC');
    }
  };

  useEffect(() => {
    generateHmac();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message String</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Secret Key</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Hash Algorithm</label>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          >
            <option value="SHA-256">HMAC-SHA256</option>
            <option value="SHA-512">HMAC-SHA512</option>
            <option value="SHA-384">HMAC-SHA384</option>
            <option value="SHA-1">HMAC-SHA1</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={generateHmac}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
        >
          Compute HMAC Hash
        </button>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>HMAC Output (Hexadecimal)</span>
          <CopyButton text={hmacHex} label="Copy HMAC" />
        </div>
        <div className="text-xs font-mono text-slate-800 dark:text-slate-200 break-all select-all">
          {hmacHex}
        </div>
      </div>
    </div>
  );
};

// 3. HTML Entity Encoder & Decoder
export const HtmlEntityEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('<div class="header">Hello & Welcome to "PTools"!</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encodeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const decodeHtml = (str: string) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const output = mode === 'encode' ? encodeHtml(input) : decodeHtml(input);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setMode('encode')}
          className={`px-3 py-1.5 rounded-lg ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Encode Special Characters
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-3 py-1.5 rounded-lg ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Decode HTML Entities
        </button>
      </div>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
      />

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
        <div className="text-xs font-semibold text-slate-500">Result:</div>
        <div className="text-xs font-mono text-slate-800 dark:text-slate-200 break-all select-all">
          {output}
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={output} label="Copy Output" />
      </div>
    </div>
  );
};

// 4. ROT13 Cipher
export const Rot13Tool: React.FC = () => {
  const [text, setText] = useState('PTools is an awesome online tools platform!');

  const rot13 = (str: string): string => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const output = rot13(text);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter Text (Reciprocal Cipher)</label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
        <div className="text-xs font-semibold text-slate-500">ROT13 Encoded / Decoded Text:</div>
        <div className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all select-all">
          {output}
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={output} label="Copy ROT13" />
      </div>
    </div>
  );
};

// 5. Morse Code Translator with Audio Beeps
export const MorseCodeTool: React.FC = () => {
  const [text, setText] = useState('HELLO WORLD');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');

  const morseMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorseMap: Record<string, string> = Object.entries(morseMap).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {} as Record<string, string>);

  let output = '';
  if (mode === 'text-to-morse') {
    output = text
      .toUpperCase()
      .split('')
      .map((c) => morseMap[c] || c)
      .join(' ');
  } else {
    output = text
      .split(' ')
      .map((c) => reverseMorseMap[c] || c)
      .join('');
  }

  // Play Morse audio beep
  const playMorseAudio = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const morseStr = mode === 'text-to-morse' ? output : text;
      let time = audioCtx.currentTime;

      for (let i = 0; i < morseStr.length; i++) {
        const char = morseStr[i];
        if (char === '.' || char === '-') {
          const duration = char === '.' ? 0.08 : 0.24;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(750, time);
          gain.gain.setValueAtTime(0.2, time);
          gain.gain.setValueAtTime(0, time + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(time);
          osc.stop(time + duration);
          time += duration + 0.08;
        } else if (char === ' ') {
          time += 0.2;
        } else if (char === '/') {
          time += 0.4;
        }
      }
    } catch {}
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setMode('text-to-morse')}
          className={`px-3 py-1.5 rounded-lg ${mode === 'text-to-morse' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Text to Morse
        </button>
        <button
          onClick={() => setMode('morse-to-text')}
          className={`px-3 py-1.5 rounded-lg ${mode === 'morse-to-text' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Morse to Text
        </button>
      </div>

      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono uppercase"
      />

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Translation</span>
          <button
            onClick={playMorseAudio}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-blue-600 hover:bg-slate-100"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Play Morse Audio</span>
          </button>
        </div>
        <div className="text-sm font-mono text-slate-800 dark:text-slate-200 break-all select-all">
          {output}
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={output} label="Copy Translation" />
      </div>
    </div>
  );
};

// 6. Regex Tester Tool
export const RegexTesterTool: React.FC = () => {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Contact support@ptools.com or hello@pixelary.studio for any assistance.');

  let matches: string[] = [];
  let error = '';

  try {
    const regex = new RegExp(pattern, flags);
    const m = testString.match(regex);
    matches = m ? Array.from(m) : [];
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Regular Expression</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Test String</label>
        <textarea
          rows={4}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
        />
      </div>

      {error ? (
        <div className="p-3 bg-rose-50 text-rose-600 text-xs font-mono rounded-lg">
          Invalid Regex: {error}
        </div>
      ) : (
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {matches.length} {matches.length === 1 ? 'Match' : 'Matches'} Found
          </div>
          <div className="flex flex-wrap gap-2">
            {matches.map((match, i) => (
              <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded font-mono text-xs">
                {match}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
