import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, ArrowUpDown } from 'lucide-react';

// Copy Helper Button
export const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
};

// 1. Basic Calculator
export const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  const handleDigit = (digit: string) => {
    if (overwrite || display === '0') {
      setDisplay(digit);
      setOverwrite(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (overwrite) {
      setDisplay('0.');
      setOverwrite(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: string) => {
    if (operation && prev !== null && !overwrite) {
      calculate();
    }
    setPrev(display);
    setOperation(op);
    setOverwrite(true);
  };

  const calculate = () => {
    if (!operation || prev === null) return;
    const num1 = parseFloat(prev);
    const num2 = parseFloat(display);
    let res = 0;
    switch (operation) {
      case '+': res = num1 + num2; break;
      case '-': res = num1 - num2; break;
      case '×': res = num1 * num2; break;
      case '÷': res = num2 === 0 ? NaN : num1 / num2; break;
    }
    const finalVal = isNaN(res) ? 'Error' : parseFloat(res.toFixed(10)).toString();
    setDisplay(finalVal);
    setPrev(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOperation(null);
    setOverwrite(false);
  };

  const handleBackspace = () => {
    if (overwrite) {
      setDisplay('0');
      setOverwrite(false);
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    if (display === '0' || display === 'Error') return;
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handlePercent = () => {
    const val = parseFloat(display) / 100;
    setDisplay(val.toString());
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDecimal();
      if (e.key === '+') handleOp('+');
      if (e.key === '-') handleOp('-');
      if (e.key === '*') handleOp('×');
      if (e.key === '/') { e.preventDefault(); handleOp('÷'); }
      if (e.key === 'Enter' || e.key === '=') calculate();
      if (e.key === 'Escape' || e.key.toLowerCase() === 'c') handleClear();
      if (e.key === 'Backspace') handleBackspace();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-right">
        <div className="text-xs text-slate-400 dark:text-slate-500 h-4 font-mono">
          {prev !== null && operation ? `${prev} ${operation}` : ''}
        </div>
        <div className="text-3xl font-mono font-semibold tracking-tight text-slate-900 dark:text-white truncate">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="py-3 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">C</button>
        <button onClick={handleBackspace} className="py-3 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">⌫</button>
        <button onClick={handlePercent} className="py-3 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">%</button>
        <button onClick={() => handleOp('÷')} className="py-3 text-base font-bold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">÷</button>

        <button onClick={() => handleDigit('7')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">7</button>
        <button onClick={() => handleDigit('8')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">8</button>
        <button onClick={() => handleDigit('9')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">9</button>
        <button onClick={() => handleOp('×')} className="py-3 text-base font-bold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">×</button>

        <button onClick={() => handleDigit('4')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">4</button>
        <button onClick={() => handleDigit('5')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">5</button>
        <button onClick={() => handleDigit('6')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">6</button>
        <button onClick={() => handleOp('-')} className="py-3 text-base font-bold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">−</button>

        <button onClick={() => handleDigit('1')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">1</button>
        <button onClick={() => handleDigit('2')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">2</button>
        <button onClick={() => handleDigit('3')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">3</button>
        <button onClick={() => handleOp('+')} className="py-3 text-base font-bold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">+</button>

        <button onClick={handleToggleSign} className="py-3 text-sm font-semibold rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">±</button>
        <button onClick={() => handleDigit('0')} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">0</button>
        <button onClick={handleDecimal} className="py-3 text-lg font-medium rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-100">.</button>
        <button onClick={calculate} className="py-3 text-base font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm">=</button>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
        <span>Keyboard shortcuts enabled</span>
        <CopyButton text={display} label="Copy Display" />
      </div>
    </div>
  );
};

// 2. Percentage Calculator
export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState('15');
  const [val2, setVal2] = useState('120');
  const [mode, setMode] = useState<'of' | 'isWhat' | 'change'>('of');

  const num1 = parseFloat(val1) || 0;
  const num2 = parseFloat(val2) || 0;

  let result = 0;
  let formula = '';

  if (mode === 'of') {
    result = (num1 / 100) * num2;
    formula = `(${num1} / 100) × ${num2} = ${result}`;
  } else if (mode === 'isWhat') {
    result = num2 !== 0 ? (num1 / num2) * 100 : 0;
    formula = `(${num1} / ${num2}) × 100 = ${result.toFixed(2)}%`;
  } else {
    result = num1 !== 0 ? ((num2 - num1) / num1) * 100 : 0;
    formula = `((${num2} - ${num1}) / ${num1}) × 100 = ${result.toFixed(2)}%`;
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setMode('of')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'of' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setMode('isWhat')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'isWhat' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          X is what % of Y?
        </button>
        <button
          onClick={() => setMode('change')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'change' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          % Increase / Decrease
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {mode === 'of' ? 'Percentage (X%)' : mode === 'isWhat' ? 'Value (X)' : 'Initial Value (from)'}
          </label>
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {mode === 'of' ? 'Total (Y)' : mode === 'isWhat' ? 'Total (Y)' : 'Final Value (to)'}
          </label>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Calculated Result</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
            {mode === 'of' ? result.toFixed(2) : `${result.toFixed(2)}%`}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1">
            {formula}
          </div>
        </div>
        <CopyButton text={mode === 'of' ? result.toFixed(2) : `${result.toFixed(2)}%`} />
      </div>
    </div>
  );
};

// 3. Age Calculator
export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const b = new Date(birthDate);
  const t = new Date(targetDate);

  const isValid = !isNaN(b.getTime()) && !isNaN(t.getTime()) && t >= b;

  let years = 0, months = 0, days = 0, totalDays = 0, totalHours = 0;
  let nextBdayDays = 0;
  let bornDayOfWeek = '';

  if (isValid) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    bornDayOfWeek = daysOfWeek[b.getUTCDay()];

    const diffMs = t.getTime() - b.getTime();
    totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    totalHours = totalDays * 24;

    years = t.getFullYear() - b.getFullYear();
    months = t.getMonth() - b.getMonth();
    days = t.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const nextBday = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday < t) {
      nextBday.setFullYear(t.getFullYear() + 1);
    }
    nextBdayDays = Math.ceil((nextBday.getTime() - t.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Age as of Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {isValid ? (
        <div className="space-y-4">
          <div className="p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-center">
            <span className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">Your Exact Age</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {years} <span className="text-base font-normal text-slate-500">years</span> {months} <span className="text-base font-normal text-slate-500">months</span> {days} <span className="text-base font-normal text-slate-500">days</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-500">Total Days</div>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">{totalDays.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-500">Total Hours</div>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">{totalHours.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-500">Next Birthday</div>
              <div className="text-lg font-bold font-mono text-blue-600 dark:text-blue-400">{nextBdayDays} days</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-500">Day Born</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{bornDayOfWeek}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-700 dark:text-amber-300 text-center">
          Please select a birth date that is prior to the comparison date.
        </div>
      )}
    </div>
  );
};

// 4. BMI Calculator
export const BmiCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [weightLbs, setWeightLbs] = useState('154');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  let bmi = 0;
  if (unit === 'metric') {
    const w = parseFloat(weightKg) || 0;
    const h = (parseFloat(heightCm) || 0) / 100;
    if (h > 0) bmi = w / (h * h);
  } else {
    const w = parseFloat(weightLbs) || 0;
    const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
    if (totalInches > 0) bmi = (703 * w) / (totalInches * totalInches);
  }

  let status = 'Normal weight';
  let statusColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';

  if (bmi < 18.5) {
    status = 'Underweight';
    statusColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (bmi >= 25 && bmi < 29.9) {
    status = 'Overweight';
    statusColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (bmi >= 30) {
    status = 'Obesity';
    statusColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setUnit('metric')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          Metric (kg / cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          Imperial (lbs / ft & in)
        </button>
      </div>

      {unit === 'metric' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight (lbs)</label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Height (Feet)</label>
            <input
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Height (Inches)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
      )}

      <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${statusColor}`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold">Your BMI Result</span>
          <div className="text-3xl font-bold font-mono tracking-tight mt-0.5">
            {bmi > 0 ? bmi.toFixed(1) : '--'}
          </div>
          <div className="text-sm font-semibold mt-1">Classification: {status}</div>
        </div>
        <div className="text-xs text-right space-y-1">
          <div>Healthy BMI: 18.5 – 24.9</div>
          <div>Underweight: &lt; 18.5</div>
          <div>Overweight: 25 – 29.9</div>
          <div>Obese: &ge; 30</div>
        </div>
      </div>
    </div>
  );
};

// 5. Unit Converter
export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp' | 'data' | 'speed'>('length');
  const [val, setVal] = useState('10');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const unitOptions: Record<string, string[]> = {
    length: ['meters', 'feet', 'kilometers', 'miles', 'inches', 'centimeters', 'yards'],
    weight: ['kilograms', 'pounds', 'grams', 'ounces', 'metric tons'],
    temp: ['celsius', 'fahrenheit', 'kelvin'],
    data: ['bytes', 'kilobytes (KB)', 'megabytes (MB)', 'gigabytes (GB)', 'terabytes (TB)'],
    speed: ['km/h', 'mph', 'm/s', 'knots']
  };

  // Switch units when category changes
  const handleCatChange = (cat: 'length' | 'weight' | 'temp' | 'data' | 'speed') => {
    setCategory(cat);
    const opts = unitOptions[cat];
    setFromUnit(opts[0]);
    setToUnit(opts[1] || opts[0]);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const convert = (value: number, from: string, to: string, cat: string): number => {
    if (from === to) return value;
    if (cat === 'temp') {
      let c = value;
      if (from === 'fahrenheit') c = (value - 32) * (5 / 9);
      if (from === 'kelvin') c = value - 273.15;
      if (to === 'celsius') return c;
      if (to === 'fahrenheit') return (c * (9 / 5)) + 32;
      if (to === 'kelvin') return c + 273.15;
      return value;
    }

    // Normalized factors
    const factors: Record<string, Record<string, number>> = {
      length: {
        meters: 1,
        feet: 0.3048,
        kilometers: 1000,
        miles: 1609.344,
        inches: 0.0254,
        centimeters: 0.01,
        yards: 0.9144
      },
      weight: {
        kilograms: 1,
        pounds: 0.45359237,
        grams: 0.001,
        ounces: 0.0283495,
        'metric tons': 1000
      },
      data: {
        bytes: 1,
        'kilobytes (KB)': 1024,
        'megabytes (MB)': 1024 * 1024,
        'gigabytes (GB)': 1024 * 1024 * 1024,
        'terabytes (TB)': 1024 * 1024 * 1024 * 1024
      },
      speed: {
        'm/s': 1,
        'km/h': 0.27777778,
        mph: 0.44704,
        knots: 0.514444
      }
    };

    const catFactors = factors[cat];
    if (!catFactors) return value;
    const baseVal = value * (catFactors[from] || 1);
    return baseVal / (catFactors[to] || 1);
  };

  const inputNum = parseFloat(val) || 0;
  const resultNum = convert(inputNum, fromUnit, toUnit, category);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(['length', 'weight', 'temp', 'data', 'speed'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCatChange(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">From</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono mb-2"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg capitalize"
          >
            {unitOptions[category].map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="relative">
          <div className="flex justify-center -mb-2 sm:mb-0">
            <button
              onClick={handleSwap}
              title="Swap units"
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">To</label>
            <div className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-blue-600 dark:text-blue-400 font-bold truncate mb-2">
              {resultNum.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg capitalize"
            >
              {unitOptions[category].map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{val} {fromUnit}</span> = <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{resultNum.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}</span>
        </div>
        <CopyButton text={resultNum.toString()} label="Copy Number" />
      </div>
    </div>
  );
};
