import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Layers, CheckCircle2, AlertCircle } from 'lucide-react';

// 1. CSS Box Shadow Generator
export const CssShadowGenerator: React.FC = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(20);
  const [inset, setInset] = useState(false);

  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100})`;
  const shadowRule = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgbaColor}`;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="h-48 bg-slate-100 dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-800 p-6">
        <div
          className="w-40 h-28 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center font-medium text-xs text-slate-700 dark:text-slate-300 transition-all"
          style={{ boxShadow: shadowRule }}
        >
          Preview Box
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Horizontal Offset</span>
            <span className="font-mono">{x}px</span>
          </div>
          <input type="range" min={-50} max={50} value={x} onChange={(e) => setX(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Vertical Offset</span>
            <span className="font-mono">{y}px</span>
          </div>
          <input type="range" min={-50} max={50} value={y} onChange={(e) => setY(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Blur Radius</span>
            <span className="font-mono">{blur}px</span>
          </div>
          <input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Spread</span>
            <span className="font-mono">{spread}px</span>
          </div>
          <input type="range" min={-50} max={50} value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-2">
          <span>Color:</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-7 h-7 rounded border-0 cursor-pointer" />
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="rounded text-blue-600" />
          <span>Inset Shadow</span>
        </label>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
        <div className="font-mono text-xs text-slate-800 dark:text-slate-200 truncate mr-3">
          box-shadow: {shadowRule};
        </div>
        <CopyButton text={`box-shadow: ${shadowRule};`} label="Copy CSS" />
      </div>
    </div>
  );
};

// 2. WCAG Contrast Checker
export const WcagContrastChecker: React.FC = () => {
  const [fg, setFg] = useState('#2563EB');
  const [bg, setBg] = useState('#FFFFFF');

  const getLuminance = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    const rgb = [(num >> 16) & 255, (num >> 8) & 255, num & 255].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  const passNormalAa = ratio >= 4.5;
  const passNormalAaa = ratio >= 7;
  const passLargeAa = ratio >= 3;
  const passLargeAaa = ratio >= 4.5;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Text Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-9 h-9 rounded border-0 cursor-pointer" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded font-mono uppercase" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Background Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-9 h-9 rounded border-0 cursor-pointer" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded font-mono uppercase" />
          </div>
        </div>
      </div>

      <div
        className="p-8 rounded-2xl border text-center transition-colors"
        style={{ backgroundColor: bg, color: fg }}
      >
        <div className="text-xl font-bold">Contrast Preview Text</div>
        <div className="text-xs mt-1">This is how your text looks over this background</div>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Contrast Ratio</span>
          <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">{ratio.toFixed(2)}:1</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
            <span>Normal Text (AA)</span>
            <span className={passNormalAa ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{passNormalAa ? 'PASS' : 'FAIL'}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
            <span>Normal Text (AAA)</span>
            <span className={passNormalAaa ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{passNormalAaa ? 'PASS' : 'FAIL'}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
            <span>Large Text (AA)</span>
            <span className={passLargeAa ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{passLargeAa ? 'PASS' : 'FAIL'}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
            <span>Large Text (AAA)</span>
            <span className={passLargeAaa ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{passLargeAaa ? 'PASS' : 'FAIL'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Glassmorphism Generator
export const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(25);

  const glassStyle = {
    background: `rgba(255, 255, 255, ${opacity / 100})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const cssString = `background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(255, 255, 255, 0.3);`;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="h-48 rounded-2xl flex items-center justify-center p-6 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 shadow-inner">
        <div style={glassStyle} className="p-6 rounded-2xl shadow-lg text-white font-medium text-center">
          <div className="text-base font-bold">Glassmorphism Card</div>
          <div className="text-xs opacity-80 mt-1">Frosted glass aesthetic</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Blur Intensity</span>
            <span className="font-mono">{blur}px</span>
          </div>
          <input type="range" min={0} max={40} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Transparency</span>
            <span className="font-mono">{opacity}%</span>
          </div>
          <input type="range" min={5} max={80} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Glassmorphism CSS Rules</span>
          <CopyButton text={cssString} label="Copy CSS" />
        </div>
        <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">
          {cssString}
        </pre>
      </div>
    </div>
  );
};
