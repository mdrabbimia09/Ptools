import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { ArrowLeftRight, Layers, Hash } from 'lucide-react';

// 1. Number Base Converter (Binary, Decimal, Hex, Octal)
export const NumberBaseConverter: React.FC = () => {
  const [dec, setDec] = useState('255');
  const [bin, setBin] = useState('11111111');
  const [hex, setHex] = useState('FF');
  const [oct, setOct] = useState('377');

  const updateFromDec = (val: string) => {
    setDec(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      setBin(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOct(num.toString(8));
    }
  };

  const updateFromBin = (val: string) => {
    setBin(val);
    const num = parseInt(val, 2);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setOct(num.toString(8));
    }
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    const num = parseInt(val, 16);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setBin(num.toString(2));
      setOct(num.toString(8));
    }
  };

  const updateFromOct = (val: string) => {
    setOct(val);
    const num = parseInt(val, 8);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setBin(num.toString(2));
      setHex(num.toString(16).toUpperCase());
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="space-y-3">
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Decimal (Base 10)</span>
            <CopyButton text={dec} label="Copy Dec" />
          </div>
          <input
            type="number"
            value={dec}
            onChange={(e) => updateFromDec(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono"
          />
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Binary (Base 2)</span>
            <CopyButton text={bin} label="Copy Bin" />
          </div>
          <input
            type="text"
            value={bin}
            onChange={(e) => updateFromBin(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono"
          />
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Hexadecimal (Base 16)</span>
            <CopyButton text={hex} label="Copy Hex" />
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono uppercase"
          />
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Octal (Base 8)</span>
            <CopyButton text={oct} label="Copy Oct" />
          </div>
          <input
            type="text"
            value={oct}
            onChange={(e) => updateFromOct(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono"
          />
        </div>
      </div>
    </div>
  );
};

// 2. Roman Numeral Converter
export const RomanNumeralConverter: React.FC = () => {
  const [numberVal, setNumberVal] = useState('2026');
  const [romanVal, setRomanVal] = useState('MMXXVI');

  const toRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return 'Enter 1 to 3999';
    const romanMap: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [v, sym] of romanMap) {
      while (num >= v) {
        result += sym;
        num -= v;
      }
    }
    return result;
  };

  const fromRoman = (str: string): number => {
    const clean = str.toUpperCase().trim();
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 100 };
    let total = 0;
    for (let i = 0; i < clean.length; i++) {
      const cur = map[clean[i]] || 0;
      const next = map[clean[i + 1]] || 0;
      if (cur < next) {
        total -= cur;
      } else {
        total += cur;
      }
    }
    return total;
  };

  const handleNumChange = (val: string) => {
    setNumberVal(val);
    const n = parseInt(val, 10);
    if (!isNaN(n)) {
      setRomanVal(toRoman(n));
    }
  };

  const handleRomanChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^IVXLCDM]/g, '');
    setRomanVal(clean);
    if (clean) {
      setNumberVal(fromRoman(clean).toString());
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Number (1 - 3999)</label>
          <input
            type="number"
            min={1}
            max={3999}
            value={numberVal}
            onChange={(e) => handleNumChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Roman Numeral</label>
          <input
            type="text"
            value={romanVal}
            onChange={(e) => handleRomanChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono uppercase"
          />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500">{numberVal} in Roman Numerals:</span>
          <div className="text-3xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {romanVal}
          </div>
        </div>
        <CopyButton text={romanVal} label="Copy Roman" />
      </div>
    </div>
  );
};

// 3. Number to Words Converter
export const NumberToWordsConverter: React.FC = () => {
  const [num, setNum] = useState('14250');
  const [currencyMode, setCurrencyMode] = useState(false);

  const convertNumberToWords = (n: number): string => {
    if (n === 0) return 'zero';
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const helper = (val: number): string => {
      let str = '';
      if (val >= 1000000000) {
        str += helper(Math.floor(val / 1000000000)) + ' billion ';
        val %= 1000000000;
      }
      if (val >= 1000000) {
        str += helper(Math.floor(val / 1000000)) + ' million ';
        val %= 1000000;
      }
      if (val >= 1000) {
        str += helper(Math.floor(val / 1000)) + ' thousand ';
        val %= 1000;
      }
      if (val >= 100) {
        str += helper(Math.floor(val / 100)) + ' hundred ';
        val %= 100;
      }
      if (val >= 20) {
        str += tens[Math.floor(val / 10)] + ' ';
        val %= 10;
      }
      if (val > 0) {
        str += ones[val] + ' ';
      }
      return str.trim();
    };

    return helper(n);
  };

  const parsed = parseFloat(num) || 0;
  const intPart = Math.floor(Math.abs(parsed));
  const decPart = Math.round((Math.abs(parsed) - intPart) * 100);

  let words = convertNumberToWords(intPart);
  if (currencyMode) {
    words = `${words} dollars and ${convertNumberToWords(decPart)} cents`;
  } else if (decPart > 0) {
    words = `${words} point ${convertNumberToWords(decPart)}`;
  }

  // Capitalize first letter
  const formattedWords = words.charAt(0).toUpperCase() + words.slice(1);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter Number</label>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
        />
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={currencyMode}
          onChange={(e) => setCurrencyMode(e.target.checked)}
          className="rounded text-blue-600"
        />
        <span>Currency Format (Dollars & Cents)</span>
      </label>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">In English Words:</div>
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
          {formattedWords}
        </div>
        <div className="flex justify-end pt-2">
          <CopyButton text={formattedWords} label="Copy Words" />
        </div>
      </div>
    </div>
  );
};
