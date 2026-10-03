import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Pipette, Palette, Layers, RefreshCw } from 'lucide-react';

// Helper hex to rgb
function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// 24. Color Picker
export const ColorPickerTool: React.FC = () => {
  const [color, setColor] = useState('#2563EB');

  let rgb = { r: 37, g: 99, b: 235 };
  try {
    rgb = hexToRgb(color);
  } catch {}
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexString = color.toUpperCase();
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Shades generator
  const shades = [-40, -20, 0, 20, 40].map((step) => {
    const newL = Math.max(0, Math.min(100, hsl.l + step));
    return `hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`;
  });

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="relative group shrink-0">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-28 h-28 rounded-2xl cursor-pointer border-0 p-0 overflow-hidden shadow-inner"
          />
        </div>

        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-xs font-semibold text-slate-500">HEX</span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">{hexString}</span>
            <CopyButton text={hexString} />
          </div>
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-xs font-semibold text-slate-500">RGB</span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">{rgbString}</span>
            <CopyButton text={rgbString} />
          </div>
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-xs font-semibold text-slate-500">HSL</span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">{hslString}</span>
            <CopyButton text={hslString} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-slate-500">Tints and Shades</div>
        <div className="grid grid-cols-5 gap-2 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-1 bg-white dark:bg-slate-900">
          {shades.map((s, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: s }}
              className="h-full rounded cursor-pointer transition-transform hover:scale-105"
              title={s}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 25. HEX/RGB Converter
export const HexRgbConverter: React.FC = () => {
  const [hex, setHex] = useState('#2563EB');
  const [r, setR] = useState(37);
  const [g, setG] = useState(99);
  const [b, setB] = useState(235);
  const [alpha, setAlpha] = useState(1);

  const handleHexChange = (val: string) => {
    setHex(val);
    try {
      const rgb = hexToRgb(val);
      if (!isNaN(rgb.r) && !isNaN(rgb.g) && !isNaN(rgb.b)) {
        setR(rgb.r);
        setG(rgb.g);
        setB(rgb.b);
      }
    } catch {}
  };

  const handleRgbChange = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
    const toHex = (c: number) => {
      const h = Math.max(0, Math.min(255, c)).toString(16);
      return h.length === 1 ? '0' + h : h;
    };
    setHex(`#${toHex(newR)}${toHex(newG)}${toHex(newB)}`.toUpperCase());
  };

  const cssRgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div
          className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
          style={{ backgroundColor: cssRgba }}
        />
        <div className="flex-1">
          <div className="text-xs text-slate-500">Live CSS Color Preview</div>
          <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">{cssRgba}</div>
        </div>
        <CopyButton text={cssRgba} label="Copy CSS" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">HEX Value</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 uppercase"
          />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">RGB Channels (0-255)</div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">R</span>
              <input
                type="number"
                min={0}
                max={255}
                value={r}
                onChange={(e) => handleRgbChange(parseInt(e.target.value) || 0, g, b)}
                className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">G</span>
              <input
                type="number"
                min={0}
                max={255}
                value={g}
                onChange={(e) => handleRgbChange(r, parseInt(e.target.value) || 0, b)}
                className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">B</span>
              <input
                type="number"
                min={0}
                max={255}
                value={b}
                onChange={(e) => handleRgbChange(r, g, parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 26. CSS Gradient Generator
export const GradientGenerator: React.FC = () => {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState('#2563EB');
  const [color2, setColor2] = useState('#7C3AED');

  const cssGradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div
        className="w-full h-44 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800 transition-all"
        style={{ background: cssGradient }}
      />

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setType('linear')}
            className={`px-3 py-1 font-medium rounded ${type === 'linear' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-600'}`}
          >
            Linear
          </button>
          <button
            onClick={() => setType('radial')}
            className={`px-3 py-1 font-medium rounded ${type === 'radial' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-600'}`}
          >
            Radial
          </button>
        </div>

        {type === 'linear' && (
          <div className="flex items-center gap-2">
            <span>Angle:</span>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="accent-blue-600 w-24"
            />
            <span className="font-mono">{angle}°</span>
          </div>
        )}

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5">
            <span>Start:</span>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-8 h-8 rounded border-0 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span>End:</span>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-8 h-8 rounded border-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
        <div className="overflow-hidden mr-3">
          <div className="text-xs text-slate-400">CSS Code</div>
          <div className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">
            background: {cssGradient};
          </div>
        </div>
        <CopyButton text={`background: ${cssGradient};`} label="Copy CSS" />
      </div>
    </div>
  );
};
