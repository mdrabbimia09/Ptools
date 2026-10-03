import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Globe, Laptop, HardDrive, Wifi, Monitor } from 'lucide-react';

// 1. URL Parser & Query Parameter Inspector
export const UrlParserTool: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://ptools.com:443/tools/image-compressor?format=webp&quality=85&utm_source=twitter#result');

  let parsed: any = null;
  let params: [string, string][] = [];
  let error = '';

  try {
    const u = new URL(urlInput.trim());
    parsed = {
      protocol: u.protocol,
      hostname: u.hostname,
      port: u.port || '(default 80/443)',
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
    };
    params = Array.from(u.searchParams.entries());
  } catch (err: any) {
    error = 'Invalid URL format';
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter URL to Parse</label>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
        />
      </div>

      {error ? (
        <div className="p-3 text-xs text-rose-600 bg-rose-50 rounded-lg">{error}</div>
      ) : parsed && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Protocol</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{parsed.protocol}</span>
            </div>
            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Host / Domain</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{parsed.hostname}</span>
            </div>
            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Port</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{parsed.port}</span>
            </div>
            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Path</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{parsed.pathname}</span>
            </div>
            {parsed.hash && (
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Anchor / Hash</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">{parsed.hash}</span>
              </div>
            )}
          </div>

          {params.length > 0 && (
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Query Parameters ({params.length})
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {params.map(([k, v], idx) => (
                  <div key={idx} className="py-1.5 flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{k}</span>
                    <span className="text-blue-600 dark:text-blue-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 2. User Agent & Device Information
export const UserAgentParserTool: React.FC = () => {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';

  let browser = 'Unknown Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Google Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Apple Safari';
  else if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';

  let os = 'Unknown OS';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  const isMobile = /Mobi|Android/i.test(ua);

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
            <span className="text-xs text-slate-500">Detected Browser</span>
            <div className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5">{browser}</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
            <span className="text-xs text-slate-500">Operating System</span>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">{os}</div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="py-2 flex justify-between">
            <span className="text-slate-500">Device Form Factor:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{isMobile ? 'Mobile Device' : 'Desktop / Laptop'}</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-500">Language:</span>
            <span className="font-mono text-slate-800 dark:text-slate-200">{navigator.language}</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-500">Online Status:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{navigator.onLine ? 'Connected (Online)' : 'Offline'}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Raw User Agent String</span>
          <CopyButton text={ua} label="Copy UA" />
        </div>
        <div className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all select-all">
          {ua}
        </div>
      </div>
    </div>
  );
};

// 3. Screen Resolution & DPI Checker
export const ScreenResolutionDpiTool: React.FC = () => {
  const screenWidth = typeof window !== 'undefined' ? window.screen.width : 1920;
  const screenHeight = typeof window !== 'undefined' ? window.screen.height : 1080;
  const availWidth = typeof window !== 'undefined' ? window.screen.availWidth : 1920;
  const availHeight = typeof window !== 'undefined' ? window.screen.availHeight : 1040;
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const colorDepth = typeof window !== 'undefined' ? window.screen.colorDepth || 24 : 24;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="p-8 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl text-center">
        <div className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
          Your Screen Resolution
        </div>
        <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
          {screenWidth} × {screenHeight} <span className="text-sm font-normal text-slate-500">px</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500">Device Pixel Ratio</div>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">{dpr}x</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500">Available Dimensions</div>
          <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">{availWidth} × {availHeight}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center col-span-2 sm:col-span-1">
          <div className="text-xs text-slate-500">Color Depth</div>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">{colorDepth}-bit</div>
        </div>
      </div>
    </div>
  );
};

// 4. Bandwidth & Download Time Calculator
export const BandwidthDownloadTimeCalculator: React.FC = () => {
  const [fileSize, setFileSize] = useState('10');
  const [fileUnit, setFileUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speed, setSpeed] = useState('100'); // Mbps

  const numSize = parseFloat(fileSize) || 0;
  const numSpeed = parseFloat(speed) || 1; // Mbps

  let totalBits = numSize;
  if (fileUnit === 'MB') totalBits *= 1024 * 1024 * 8;
  else if (fileUnit === 'GB') totalBits *= 1024 * 1024 * 1024 * 8;
  else if (fileUnit === 'TB') totalBits *= 1024 * 1024 * 1024 * 1024 * 8;

  const speedBitsPerSec = numSpeed * 1000 * 1000;
  const totalSeconds = speedBitsPerSec > 0 ? totalBits / speedBitsPerSec : 0;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">File Size</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
            />
            <select
              value={fileUnit}
              onChange={(e) => setFileUnit(e.target.value as any)}
              className="px-2 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shrink-0"
            >
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Internet Speed (Mbps)</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500">Estimated Download Time</span>
          <div className="text-3xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {hours > 0 && `${hours}h `}{minutes}m {seconds}s
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            At continuous {speed} Mbps bandwidth
          </div>
        </div>
        <CopyButton text={`${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`} label="Copy Time" />
      </div>
    </div>
  );
};
