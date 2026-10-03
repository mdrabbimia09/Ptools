import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { CopyButton } from './CalculatorTools';
import { Download, Upload, Image as ImageIcon, QrCode as QrIcon, RefreshCw, Sparkles, Check } from 'lucide-react';

// 27. QR Code Generator
export const QrCodeGenerator: React.FC = () => {
  const [type, setType] = useState<'url' | 'text' | 'wifi'>('url');
  const [text, setText] = useState('https://ptools.com');
  const [wifiSsid, setWifiSsid] = useState('Home_WiFi');
  const [wifiPass, setWifiPass] = useState('SecretPassword');
  const [wifiType, setWifiType] = useState('WPA');
  const [qrSize, setQrSize] = useState(280);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getPayload = () => {
    if (type === 'wifi') {
      return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
    }
    return text || 'https://ptools.com';
  };

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        getPayload(),
        {
          width: qrSize,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff'
          }
        },
        () => {}
      );
    }
  }, [text, wifiSsid, wifiPass, wifiType, qrSize, type]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ptools-qrcode.png';
    a.click();
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs">
        <button
          onClick={() => setType('url')}
          className={`px-3 py-1.5 font-medium rounded-md ${type === 'url' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          Website URL
        </button>
        <button
          onClick={() => setType('text')}
          className={`px-3 py-1.5 font-medium rounded-md ${type === 'text' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          Plain Text
        </button>
        <button
          onClick={() => setType('wifi')}
          className={`px-3 py-1.5 font-medium rounded-md ${type === 'wifi' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          Wi-Fi Network
        </button>
      </div>

      {type === 'wifi' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Network Name (SSID)</label>
            <input
              type="text"
              value={wifiSsid}
              onChange={(e) => setWifiSsid(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input
              type="text"
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {type === 'url' ? 'Target Website URL' : 'Content / Text'}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={type === 'url' ? 'https://example.com' : 'Enter text to encode...'}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <canvas ref={canvasRef} className="rounded-lg shadow-sm border border-slate-100 dark:border-slate-800" />
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 28. Image Compressor
export const ImageCompressor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        compress(event.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (src: string, q: number) => {
    setProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              setCompressedUrl(URL.createObjectURL(blob));
            }
            setProcessing(false);
          },
          'image/jpeg',
          q / 100
        );
      }
    };
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    if (imageSrc) {
      compress(imageSrc, q);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    if (kb >= 1024) return (kb / 1024).toFixed(2) + ' MB';
    return kb.toFixed(1) + ' KB';
  };

  const savingsPct = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-white dark:bg-slate-900">
        <input
          type="file"
          id="compress-file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="compress-file" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {imageFile ? imageFile.name : 'Choose an Image to Compress'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WebP (processed 100% locally in browser)</span>
        </label>
      </div>

      {imageSrc && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Compression Quality</span>
              <span className="font-mono font-bold text-blue-600">{quality}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={quality}
              onChange={(e) => handleQualityChange(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-500">Original Size</div>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{formatSize(originalSize)}</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-center">
              <div className="text-xs text-blue-600 dark:text-blue-400">Compressed Size</div>
              <div className="text-lg font-bold font-mono text-blue-700 dark:text-blue-300">
                {formatSize(compressedSize)} <span className="text-xs font-normal">(-{savingsPct}%)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {compressedUrl && (
              <a
                href={compressedUrl}
                download={`compressed-${imageFile?.name || 'image.jpg'}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed Image</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 29. Image Resizer
export const ImageResizer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setOrigWidth(img.width);
          setOrigHeight(img.height);
          setTargetWidth(img.width);
          setTargetHeight(img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (keepAspect && origWidth > 0) {
      setTargetHeight(Math.round((w / origWidth) * origHeight));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (keepAspect && origHeight > 0) {
      setTargetWidth(Math.round((h / origHeight) * origWidth));
    }
  };

  const handleResize = () => {
    if (!imageSrc || targetWidth <= 0 || targetHeight <= 0) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        setResizedUrl(canvas.toDataURL(imageFile?.type || 'image/jpeg', 0.92));
      }
    };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="resize-file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="resize-file" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {imageFile ? imageFile.name : 'Select Image to Resize'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Browser-based canvas resizing</span>
        </label>
      </div>

      {imageSrc && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Width (px)</label>
              <input
                type="number"
                value={targetWidth}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Height (px)</label>
              <input
                type="number"
                value={targetHeight}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Maintain Aspect Ratio (Lock Proportions)</span>
            </label>
            <span className="text-slate-400">Original: {origWidth} × {origHeight}px</span>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleResize}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
            >
              Resize Image
            </button>
            {resizedUrl && (
              <a
                href={resizedUrl}
                download={`resized-${targetWidth}x${targetHeight}.jpg`}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 30, 31, 32: Universal Image Format Converter (JPG to PNG, PNG to JPG, WebP)
export const ImageFormatConverter: React.FC<{ targetFormat: 'png' | 'jpeg' | 'webp'; title: string }> = ({ targetFormat, title }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState(90);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        convert(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const convert = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (targetFormat === 'jpeg') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const mime = `image/${targetFormat}`;
        setConvertedUrl(canvas.toDataURL(mime, quality / 100));
      }
    };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="format-file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="format-file" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {imageFile ? imageFile.name : `Select Image to convert to ${targetFormat.toUpperCase()}`}
          </span>
          <span className="text-xs text-slate-500 mt-1">High-quality client-side pixel conversion</span>
        </label>
      </div>

      {imageFile && (
        <div className="space-y-4">
          {targetFormat === 'jpeg' && (
            <div className="flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span>Background fill for transparent areas:</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-7 h-7 rounded border-0 cursor-pointer"
              />
            </div>
          )}

          <div className="flex justify-center">
            {convertedUrl && (
              <a
                href={convertedUrl}
                download={`converted.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download {targetFormat.toUpperCase()}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 33. Image to Base64
export const ImageToBase64: React.FC = () => {
  const [dataUrl, setDataUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setDataUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const htmlImgTag = dataUrl ? `<img src="${dataUrl}" alt="${fileName}" />` : '';
  const cssBackground = dataUrl ? `background-image: url("${dataUrl}");` : '';

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="b64-img" accept="image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="b64-img" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {fileName ? fileName : 'Upload Image to Convert to Base64'}
          </span>
          <span className="text-xs text-slate-500 mt-1">PNG, JPG, SVG, WebP, GIF</span>
        </label>
      </div>

      {dataUrl && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>Raw Base64 Data URI ({Math.round(dataUrl.length / 1024)} KB)</span>
              <CopyButton text={dataUrl} label="Copy Data URI" />
            </div>
            <textarea
              readOnly
              rows={4}
              value={dataUrl}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>HTML &lt;img&gt; Embed Tag</span>
              <CopyButton text={htmlImgTag} label="Copy HTML Tag" />
            </div>
            <textarea
              readOnly
              rows={2}
              value={htmlImgTag}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>CSS Background Rule</span>
              <CopyButton text={cssBackground} label="Copy CSS" />
            </div>
            <textarea
              readOnly
              rows={2}
              value={cssBackground}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};
