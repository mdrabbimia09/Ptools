import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileSpreadsheet, ArrowUp, ArrowDown, Trash2, Download, CheckCircle, Split } from 'lucide-react';

// 34. PDF Merger
export const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter((f) => f.type === 'application/pdf');
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      const temp = newFiles[index];
      newFiles[index] = newFiles[targetIndex];
      newFiles[targetIndex] = temp;
      setFiles(newFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setStatusMessage('Please select at least 2 PDF files to merge.');
      return;
    }
    setProcessing(true);
    setStatusMessage('Merging PDF documents client-side...');
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
      setMergedBlobUrl(URL.createObjectURL(blob));
      setStatusMessage('PDFs successfully combined! Ready for download.');
    } catch (err: any) {
      setStatusMessage('Error combining PDFs: ' + (err.message || 'Corrupted file'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="pdf-merge" accept="application/pdf" multiple onChange={handleFiles} className="hidden" />
        <label htmlFor="pdf-merge" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Select Two or More PDF Files to Merge
          </span>
          <span className="text-xs text-slate-500 mt-1">100% Client-side. No documents are uploaded to any server.</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Files in Merge Order ({files.length})
          </div>
          <div className="space-y-2">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-600 dark:text-slate-300 shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{f.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">({(f.size / 1024).toFixed(1)} KB)</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveFile(idx, 'up')}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded disabled:opacity-30 text-slate-600"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === files.length - 1}
                    onClick={() => moveFile(idx, 'down')}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded disabled:opacity-30 text-slate-600"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500">{statusMessage}</span>
            <div className="flex gap-2">
              <button
                disabled={processing || files.length < 2}
                onClick={mergePdfs}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                {processing ? 'Merging...' : 'Merge PDFs'}
              </button>
              {mergedBlobUrl && (
                <a
                  href={mergedBlobUrl}
                  download="ptools-merged-document.pdf"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Combined PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 35. PDF Splitter
export const PdfSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rangeInput, setRangeInput] = useState('1');
  const [splitUrl, setSplitUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      try {
        const buf = await f.arrayBuffer();
        const pdf = await PDFDocument.load(buf);
        const count = pdf.getPageCount();
        setPageCount(count);
        setRangeInput(count > 1 ? `1-${Math.min(count, 3)}` : '1');
      } catch {
        setStatus('Error loading PDF');
      }
    }
  };

  const handleSplit = async () => {
    if (!file || !pageCount) return;
    setProcessing(true);
    setStatus('Extracting pages...');
    try {
      const buf = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buf);
      const outPdf = await PDFDocument.create();

      // Parse range string e.g. "1-3, 5"
      const pagesToExtract = new Set<number>();
      const parts = rangeInput.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [startStr, endStr] = trimmed.split('-');
          const start = parseInt(startStr);
          const end = parseInt(endStr);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= pageCount) pagesToExtract.add(i - 1);
            }
          }
        } else {
          const p = parseInt(trimmed);
          if (!isNaN(p) && p >= 1 && p <= pageCount) pagesToExtract.add(p - 1);
        }
      }

      if (pagesToExtract.size === 0) {
        setStatus('Please specify valid page numbers.');
        setProcessing(false);
        return;
      }

      const indices = Array.from(pagesToExtract).sort((a, b) => a - b);
      const copied = await outPdf.copyPages(srcPdf, indices);
      copied.forEach((cp) => outPdf.addPage(cp));

      const outBytes = await outPdf.save();
      const blob = new Blob([outBytes as unknown as BlobPart], { type: 'application/pdf' });
      setSplitUrl(URL.createObjectURL(blob));
      setStatus(`Successfully extracted ${indices.length} pages!`);
    } catch (err: any) {
      setStatus('Failed to split PDF: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="split-pdf" accept="application/pdf" onChange={handleFile} className="hidden" />
        <label htmlFor="split-pdf" className="cursor-pointer flex flex-col items-center">
          <Split className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {file ? file.name : 'Upload PDF Document to Split'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Client-side page extraction</span>
        </label>
      </div>

      {file && pageCount !== null && (
        <div className="space-y-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Document Total Pages:</span>
            <span className="font-mono font-bold text-blue-600">{pageCount} pages</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Pages to Extract (e.g. 1-3, 5)
            </label>
            <input
              type="text"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">{status}</span>
            <div className="flex gap-2">
              <button
                disabled={processing}
                onClick={handleSplit}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                {processing ? 'Extracting...' : 'Extract Pages'}
              </button>
              {splitUrl && (
                <a
                  href={splitUrl}
                  download={`extracted-${file.name}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Extracted PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 36. PDF Compressor
export const PdfCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setOrigSize(f.size);
      compress(f);
    }
  };

  const compress = async (f: File) => {
    setProcessing(true);
    try {
      const buf = await f.arrayBuffer();
      // Load and save with pdf-lib objects re-indexed and stream compression enabled
      const pdf = await PDFDocument.load(buf, { updateMetadata: false });
      const savedBytes = await pdf.save({ useObjectStreams: true });
      setCompSize(savedBytes.length);
      const blob = new Blob([savedBytes as unknown as BlobPart], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      // Fallback
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="comp-pdf" accept="application/pdf" onChange={handleFile} className="hidden" />
        <label htmlFor="comp-pdf" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {file ? file.name : 'Upload PDF Document to Optimize'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Re-index object streams client-side with complete privacy</span>
        </label>
      </div>

      {file && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-500">Original Size</div>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                {(origSize / 1024).toFixed(1)} KB
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-center">
              <div className="text-xs text-blue-600 dark:text-blue-400">Optimized Size</div>
              <div className="text-lg font-bold font-mono text-blue-700 dark:text-blue-300">
                {compSize > 0 ? `${(compSize / 1024).toFixed(1)} KB` : 'Processing...'}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`compressed-${file.name}`}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized PDF</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 37. JPG to PDF
export const JpgToPdf: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const generatePdf = async () => {
    if (!images.length) return;
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of images) {
        const buffer = await imgFile.arrayBuffer();
        let embeddedImg;
        if (imgFile.type === 'image/png') {
          embeddedImg = await pdfDoc.embedPng(buffer);
        } else {
          embeddedImg = await pdfDoc.embedJpg(buffer);
        }

        const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
        page.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: embeddedImg.width,
          height: embeddedImg.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      // Error
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 bg-white dark:bg-slate-900">
        <input type="file" id="img-to-pdf" accept="image/*" multiple onChange={handleImages} className="hidden" />
        <label htmlFor="img-to-pdf" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {images.length > 0 ? `${images.length} images selected` : 'Select JPG/PNG Images to Convert to PDF'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Multi-page PDF generation in browser</span>
        </label>
      </div>

      {images.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={generatePdf}
            disabled={processing}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
          >
            {processing ? 'Creating PDF...' : `Generate ${images.length}-Page PDF`}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="ptools-images-document.pdf"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
