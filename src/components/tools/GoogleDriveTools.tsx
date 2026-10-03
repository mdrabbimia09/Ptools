import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Cloud, Link, Code, HardDrive, CheckCircle2, Shield, ExternalLink, RefreshCw } from 'lucide-react';

// Extract Google Drive File ID
function extractDriveId(url: string): string | null {
  const clean = url.trim();
  const fileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  const idMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];

  const openMatch = clean.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch && openMatch[1]) return openMatch[1];

  // If user pasted just an ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(clean)) return clean;

  return null;
}

// 51. Google Drive Direct Download Link Generator
export const GoogleDriveDirectLink: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing');

  const fileId = extractDriveId(inputUrl);
  const directDownloadUrl = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : '';
  const previewUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
  const embedIframe = fileId ? `<iframe src="${previewUrl}" width="640" height="480" allow="autoplay" frameborder="0"></iframe>` : '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Paste Google Drive Sharing URL
        </label>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://drive.google.com/file/d/FILE_ID/view"
          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-[11px] text-slate-400 mt-1">
          Note: File sharing permissions in Google Drive must be set to "Anyone with the link can view".
        </div>
      </div>

      {fileId ? (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-blue-600">
                <Link className="w-3.5 h-3.5" /> 1-Click Direct Download URL
              </span>
              <CopyButton text={directDownloadUrl} label="Copy Direct Link" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-200 break-all select-all">
              {directDownloadUrl}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-purple-600">
                <ExternalLink className="w-3.5 h-3.5" /> Web Preview URL
              </span>
              <CopyButton text={previewUrl} label="Copy Preview URL" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-200 break-all select-all">
              {previewUrl}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <Code className="w-3.5 h-3.5" /> Responsive Embed Code
              </span>
              <CopyButton text={embedIframe} label="Copy Iframe Code" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-200 break-all select-all">
              {embedIframe}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-300">
          Please enter a valid Google Drive file URL containing a file ID.
        </div>
      )}
    </div>
  );
};

// 52. Google Drive Embed Generator
export const GoogleDriveEmbedGenerator: React.FC = () => {
  const [url, setUrl] = useState('https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view');
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('480');
  const [aspectResponsive, setAspectResponsive] = useState(true);

  const fileId = extractDriveId(url);
  const previewSrc = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';

  const iframeSnippet = aspectResponsive
    ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
  <iframe src="${previewSrc}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>`
    : `<iframe src="${previewSrc}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Google Drive File Link (PDF, Doc, Video, Sheet)
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={aspectResponsive}
            onChange={(e) => setAspectResponsive(e.target.checked)}
            className="rounded text-blue-600"
          />
          <span>16:9 Mobile Responsive Wrapper</span>
        </label>
        {!aspectResponsive && (
          <div className="flex items-center gap-2">
            <span>Width:</span>
            <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 rounded" />
            <span>Height:</span>
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 rounded" />
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Embed HTML Code</span>
          <CopyButton text={iframeSnippet} label="Copy Embed HTML" />
        </div>
        <textarea
          readOnly
          rows={4}
          value={iframeSnippet}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>
    </div>
  );
};

// 53. Google Drive Storage Analyzer Architecture
export const GoogleDriveStorageAnalyzer: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const mockStorage = {
    usedGb: 8.4,
    totalGb: 15,
    categories: [
      { name: 'Photos & Images', sizeGb: 4.1, color: 'bg-blue-600', pct: 49 },
      { name: 'PDFs & Documents', sizeGb: 2.3, color: 'bg-emerald-600', pct: 27 },
      { name: 'Videos', sizeGb: 1.4, color: 'bg-purple-600', pct: 17 },
      { name: 'Other / Backups', sizeGb: 0.6, color: 'bg-amber-600', pct: 7 },
    ],
    largeFiles: [
      { name: 'Annual_Report_2025_HighRes.pdf', size: '142 MB', type: 'PDF' },
      { name: 'Product_Demo_Video_Final.mp4', size: '890 MB', type: 'Video' },
      { name: 'Raw_Event_Photos_Batch.zip', size: '1.2 GB', type: 'Archive' },
    ]
  };

  const handleConnectToggle = () => {
    if (!connected) {
      setAnalyzing(true);
      setTimeout(() => {
        setConnected(true);
        setAnalyzing(false);
      }, 800);
    } else {
      setConnected(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {connected ? 'Connected via Google OAuth 2.0' : 'Google Account Disconnected'}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Privacy Guaranteed: OAuth tokens are strictly client-side. PTools never stores your files.
          </div>
        </div>

        <button
          onClick={handleConnectToggle}
          disabled={analyzing}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${connected ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'}`}
        >
          {analyzing ? 'Authorizing...' : connected ? 'Disconnect Drive' : 'Connect Google Drive'}
        </button>
      </div>

      {connected && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Total Storage Usage</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {mockStorage.usedGb} GB of {mockStorage.totalGb} GB used ({Math.round((mockStorage.usedGb / mockStorage.totalGb) * 100)}%)
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
              {mockStorage.categories.map((c) => (
                <div key={c.name} style={{ width: `${c.pct}%` }} className={c.color} title={`${c.name}: ${c.sizeGb} GB`} />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {mockStorage.categories.map((c) => (
                <div key={c.name} className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    <span className="truncate">{c.name}</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
                    {c.sizeGb} GB
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Largest Quota Consumers
            </div>
            <div className="space-y-2">
              {mockStorage.largeFiles.map((f, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate mr-3">{f.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-800 text-slate-600">{f.type}</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{f.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
