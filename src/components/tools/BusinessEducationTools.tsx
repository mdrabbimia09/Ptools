import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Receipt, GraduationCap, BookOpen, Clock, Plus, Trash2, Printer } from 'lucide-react';

// 1. Invoice & Receipt Generator
export const InvoiceReceiptGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('Pixelary Studio');
  const [clientName, setClientName] = useState('Acme Corporation');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [taxRate, setTaxRate] = useState(8);
  const [items, setItems] = useState([
    { desc: 'Web Application Design', qty: 1, price: 1200 },
    { desc: 'API Integration & Optimization', qty: 1, price: 800 },
  ]);

  const addItem = () => {
    setItems([...items, { desc: 'New Service Item', qty: 1, price: 100 }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: string, val: any) => {
    const updated = [...items];
    (updated[idx] as any)[field] = val;
    setItems(updated);
  };

  const subtotal = items.reduce((acc, it) => acc + (it.qty * it.price), 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Business Name</label>
          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Client Name</label>
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Invoice Number</label>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading">{businessName}</h3>
            <div className="text-xs text-slate-500">Bill To: {clientName}</div>
          </div>
          <div className="text-right text-xs">
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">{invoiceNumber}</div>
            <div className="text-slate-400">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={it.desc}
                onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
              />
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-center"
              />
              <input
                type="number"
                value={it.price}
                onChange={(e) => updateItem(idx, 'price', parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-right font-mono"
              />
              <button onClick={() => removeItem(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button onClick={addItem} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1">
            <Plus className="w-3.5 h-3.5" /> Add Line Item
          </button>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500">
            <span>Tax Rate (%):</span>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              className="w-16 px-1.5 py-0.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded text-right font-mono"
            />
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Total Balance Due:</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>
    </div>
  );
};

// 2. GPA & CGPA Calculator
export const GpaCgpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState([
    { name: 'Computer Science 101', credits: 4, grade: 'A' },
    { name: 'Linear Algebra', credits: 3, grade: 'A-' },
    { name: 'Physics Laboratory', credits: 3, grade: 'B+' },
    { name: 'Technical Writing', credits: 2, grade: 'A' },
  ]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0,
  };

  const addCourse = () => {
    setCourses([...courses, { name: 'New Course', credits: 3, grade: 'A' }]);
  };

  const removeCourse = (idx: number) => {
    setCourses(courses.filter((_, i) => i !== idx));
  };

  const updateCourse = (idx: number, field: string, val: any) => {
    const updated = [...courses];
    (updated[idx] as any)[field] = val;
    setCourses(updated);
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalPoints = courses.reduce((acc, c) => acc + (c.credits * (gradePoints[c.grade] || 0)), 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="p-6 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl text-center">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Your Semester GPA</span>
        <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
          {gpa.toFixed(2)} <span className="text-sm font-normal text-slate-500">/ 4.00</span>
        </div>
        <div className="text-xs text-slate-500 mt-1">Based on {totalCredits} total credit hours</div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
        <div className="space-y-2">
          {courses.map((c, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={c.name}
                onChange={(e) => updateCourse(idx, 'name', e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
              />
              <input
                type="number"
                min={1}
                max={12}
                value={c.credits}
                onChange={(e) => updateCourse(idx, 'credits', parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-center"
              />
              <select
                value={c.grade}
                onChange={(e) => updateCourse(idx, 'grade', e.target.value)}
                className="w-20 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
              >
                {Object.keys(gradePoints).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <button onClick={() => removeCourse(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <button onClick={addCourse} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1">
          <Plus className="w-3.5 h-3.5" /> Add Course
        </button>
      </div>
    </div>
  );
};

// 3. Academic Citation Generator (APA, MLA, Chicago, BibTeX)
export const AcademicCitationGenerator: React.FC = () => {
  const [style, setStyle] = useState<'APA' | 'MLA' | 'Chicago' | 'BibTeX'>('APA');
  const [authors, setAuthors] = useState('Smith, John, and Jane Doe');
  const [title, setTitle] = useState('The Principles of Modern Computing');
  const [publisher, setPublisher] = useState('Oxford University Press');
  const [year, setYear] = useState('2024');

  let citation = '';
  if (style === 'APA') {
    citation = `${authors} (${year}). *${title}*. ${publisher}.`;
  } else if (style === 'MLA') {
    citation = `${authors}. *${title}*. ${publisher}, ${year}.`;
  } else if (style === 'Chicago') {
    citation = `${authors}. *${title}*. ${publisher}, ${year}.`;
  } else {
    citation = `@book{smith${year},\n  author = {${authors}},\n  title = {${title}},\n  publisher = {${publisher}},\n  year = {${year}}\n}`;
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex gap-2 text-xs">
        {(['APA', 'MLA', 'Chicago', 'BibTeX'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${style === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            {s} Style
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Author(s)</label>
          <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Publication Year</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg font-mono" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Book or Article Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Publisher</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border rounded-lg" />
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Formatted {style} Citation</span>
          <CopyButton text={citation} label="Copy Citation" />
        </div>
        <div className="text-xs font-mono text-slate-800 dark:text-slate-200 select-all whitespace-pre-wrap">
          {citation}
        </div>
      </div>
    </div>
  );
};
