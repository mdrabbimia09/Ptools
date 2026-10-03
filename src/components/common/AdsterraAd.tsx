import React, { useEffect, useRef, useState } from 'react';
import { AdPlacement, AdType } from '../../types';
import { adsConfig, hasRealCredentials, resolveZoneKey } from '../../config/ads.config';
import { ShieldAlert, AlertCircle, Info } from 'lucide-react';

interface AdsterraAdProps {
  type?: AdType;
  placement: AdPlacement | string;
  responsive?: boolean;
  enabled?: boolean;
  className?: string;
}

export const AdsterraAd: React.FC<AdsterraAdProps> = ({
  type = 'banner',
  placement,
  responsive = true,
  enabled = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const isDev = import.meta.env.DEV;
  const isGlobalEnabled = adsConfig.enableAds && enabled;
  const configured = hasRealCredentials(type, placement);
  const zoneKey = resolveZoneKey(placement, type);

  // Responsive screen width detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine standard ad dimensions
  const getDimensions = (): { width: number; height: number } => {
    if (placement.includes('sidebar') || placement.includes('middle') || placement === 'homeContentBetween') {
      return { width: 300, height: 250 };
    }
    if (isMobile) {
      return { width: 320, height: 50 };
    }
    return { width: 728, height: 90 };
  };

  const { width, height } = getDimensions();

  // Load and inject Adsterra script via isolated sandboxed frame
  useEffect(() => {
    // If ads are not enabled globally or real credentials are not present, do not inject scripts
    if (!isGlobalEnabled || !configured || !zoneKey) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Reset container contents
    container.innerHTML = '';
    setAdBlocked(false);

    try {
      const iframe = document.createElement('iframe');
      iframe.title = `Adsterra Ad ${placement}`;
      iframe.width = `${width}`;
      iframe.height = `${height}`;
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.maxWidth = '100%';
      iframe.scrolling = 'no';

      iframe.onerror = () => {
        setAdBlocked(true);
      };

      container.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                * { box-sizing: border-box; }
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: transparent;
                  overflow: hidden;
                }
              </style>
            </head>
            <body>
              <script type="text/javascript">
                atOptions = {
                  'key' : '${zoneKey}',
                  'format' : 'iframe',
                  'height' : ${height},
                  'width' : ${width},
                  'params' : {}
                };
              <\/script>
              <script type="text/javascript" src="//www.highperformanceformat.com/${zoneKey}/invoke.js" onerror="window.parent.postMessage({ type: 'ADSTERRA_BLOCKED' }, '*')"><\/script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    } catch (err) {
      console.warn(`[Adsterra] Could not initialize ad at placement "${placement}":`, err);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ADSTERRA_BLOCKED') {
        setAdBlocked(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isGlobalEnabled, configured, zoneKey, width, height, placement]);

  // Production with ads disabled: render nothing
  if (!isGlobalEnabled && !isDev) {
    return null;
  }

  // Production with ads enabled but missing real credentials: render nothing to preserve UX
  if (isGlobalEnabled && !configured && !isDev) {
    return null;
  }

  // Development Fallback Placeholder (Clearly marked for dev testing)
  if (!configured || !isGlobalEnabled) {
    if (!isDev) return null;

    return (
      <div
        className={`w-full max-w-full overflow-hidden my-4 px-4 py-3 flex flex-col items-center justify-center transition-all ${className}`}
        aria-label="Advertisement Development Placeholder"
      >
        <div className="w-full max-w-[728px] border-2 border-dashed border-blue-300 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>Adsterra Ad (Development Mode)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Configure your Adsterra zone ID / key in <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[11px] font-mono">ads.config.ts</code> or <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[11px] font-mono">.env</code> to display live ads.
          </p>
          <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Placement: <strong className="font-mono text-slate-700 dark:text-slate-300">{placement}</strong></span>
            <span>·</span>
            <span>Dimensions: <strong className="font-mono text-slate-700 dark:text-slate-300">{width}x{height}</strong></span>
            <span>·</span>
            <span>Status: <span className="text-amber-600 dark:text-amber-400 font-medium">Awaiting Credentials</span></span>
          </div>
        </div>
      </div>
    );
  }

  // Live Ad Container
  return (
    <div
      className={`w-full max-w-full overflow-hidden my-4 flex flex-col items-center justify-center transition-all ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 font-medium select-none">
        Advertisement
      </div>

      <div
        ref={containerRef}
        id={`adsterra-placement-${placement}`}
        className="w-full flex items-center justify-center min-h-[50px] overflow-hidden"
        style={{ maxWidth: `${width}px` }}
      />

      {adBlocked && (
        <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          <ShieldAlert className="w-3 h-3 text-slate-400" />
          <span>Ads may be unavailable because an ad blocker is enabled.</span>
        </div>
      )}
    </div>
  );
};
