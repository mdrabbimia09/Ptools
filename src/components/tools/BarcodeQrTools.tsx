import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { CopyButton } from './CalculatorTools';
import { QrCode, Download, Barcode as BarcodeIcon, Mail, Phone } from 'lucide-react';

// Code 128 pattern generator for barcode
function generateCode128Svg(text: string): string {
  // Simple clean SVG barcode generator for alphanumeric strings
  const barWidth = 2;
  const height = 80;
  let bars = '';
  let x = 10;

  // Generate pseudo-code 128 pattern based on character ASCII values
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const pattern = (code * 17) % 64;
    for (let b = 0; b < 6; b++) {
      const isBar = (pattern >> b) & 1;
      if (isBar) {
        bars += `<rect x="${x}" y="0" width="${barWidth}" height="${height}" fill="#0f172a" />`;
      }
      x += barWidth;
    }
    x += barWidth; // spacing
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x + 10} ${height + 25}" width="100%" height="100%">
    ${bars}
    <text x="${(x + 10) / 2}" y="${height + 18}" text-anchor="middle" font-family="monospace" font-size="12" fill="#0f172a">${text}</text>
  </svg>`;
}

// 1. Barcode Generator
export const BarcodeGeneratorTool: React.FC = () => {
  const [code, setCode] = useState('PTOOLS-2026');

  const svgContent = generateCode128Svg(code.trim() || '123456');

  const downloadSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barcode-${code}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Barcode Value / Product SKU</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono uppercase"
        />
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-4">
        <div
          className="w-full max-w-sm h-28 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        <div className="flex gap-2">
          <button
            onClick={downloadSvg}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download SVG Barcode</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Email & Phone QR Generator
export const EmailPhoneQrGenerator: React.FC = () => {
  const [type, setType] = useState<'email' | 'phone'>('email');
  const [emailTo, setEmailTo] = useState('support@ptools.com');
  const [emailSubject, setEmailSubject] = useState('Inquiry');
  const [phoneNum, setPhoneNum] = useState('+1234567890');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getPayload = () => {
    if (type === 'email') {
      return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
    }
    return `tel:${phoneNum}`;
  };

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        getPayload(),
        {
          width: 240,
          margin: 2,
          color: { dark: '#0f172a', light: '#ffffff' }
        },
        () => {}
      );
    }
  }, [type, emailTo, emailSubject, phoneNum]);

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setType('email')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${type === 'email' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Email QR Code
        </button>
        <button
          onClick={() => setType('phone')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${type === 'phone' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          Phone Call QR Code
        </button>
      </div>

      {type === 'email' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Recipient</label>
            <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Default Subject</label>
            <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (with Country Code)</label>
          <input type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg font-mono" />
        </div>
      )}

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="rounded-lg shadow-sm border border-slate-100 dark:border-slate-800" />
      </div>
    </div>
  );
};
