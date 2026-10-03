import React, { useState, useEffect } from 'react';
import { adsConfig, hasRealCredentials } from '../../config/ads.config';
import { ShieldCheck, AlertCircle, X, ChevronUp, ChevronDown, Check, RefreshCw } from 'lucide-react';

export const AdDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [containersFound, setContainersFound] = useState(0);

  // Strictly dev only - invisible in production
  if (!import.meta.env.DEV) {
    return null;
  }

  const checkContainers = () => {
    const containers = document.querySelectorAll('[id^="adsterra-placement-"]');
    setContainersFound(containers.length);
  };

  useEffect(() => {
    checkContainers();
    const interval = setInterval(checkContainers, 2000);
    return () => clearInterval(interval);
  }, []);

  const bannerConfigured = hasRealCredentials('banner');
  const nativeConfigured = hasRealCredentials('native');
  const socialBarConfigured = hasRealCredentials('social-bar');

  return (
    <aside aria-label="Ad Diagnostics" className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white shadow-lg border border-slate-700 hover:bg-slate-800 transition-all opacity-90 hover:opacity-100"
          title="Adsterra Debug Diagnostics (Dev Only)"
        >
          <span className={`w-2 h-2 rounded-full ${adsConfig.enableAds ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="font-sans font-medium text-[11px]">Ad Diagnostics</span>
          <ChevronUp className="w-3 h-3 text-slate-400" />
        </button>
      ) : (
        <div className="w-80 bg-slate-900 text-slate-100 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${adsConfig.enableAds ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="font-semibold text-slate-200 text-xs font-sans">Adsterra Diagnostics (Dev)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700"
              aria-label="Close Adsterra diagnostics"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 space-y-2 text-[11px] leading-relaxed">
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">ADS_ENABLED:</span>
              <span className={`font-semibold ${adsConfig.enableAds ? 'text-emerald-400' : 'text-amber-400'}`}>
                {adsConfig.enableAds ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Banner Configured:</span>
              <span className={`font-semibold ${bannerConfigured ? 'text-emerald-400' : 'text-rose-400'}`}>
                {bannerConfigured ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Native Configured:</span>
              <span className={`font-semibold ${nativeConfigured ? 'text-emerald-400' : 'text-slate-500'}`}>
                {nativeConfigured ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Social Bar Configured:</span>
              <span className={`font-semibold ${socialBarConfigured ? 'text-emerald-400' : 'text-slate-500'}`}>
                {socialBarConfigured ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Ad Component Loaded:</span>
              <span className="text-emerald-400 font-semibold">YES</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Container Placements Found:</span>
              <span className="text-slate-200 font-semibold">{containersFound}</span>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 font-sans leading-tight">
              {bannerConfigured ? (
                <p className="text-emerald-400">Live Adsterra invoke scripts ready.</p>
              ) : (
                <p className="text-amber-400">
                  Awaiting real zone ID. Development placeholders are shown. Set <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">VITE_ADS_ENABLED=true</code> & zone keys to display live ads.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
