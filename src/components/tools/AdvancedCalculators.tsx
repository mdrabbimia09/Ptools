import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Calendar, DollarSign, Percent, PieChart, Users, Fuel, Flame, Sparkles } from 'lucide-react';

// 1. Scientific Calculator
export const ScientificCalculator: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [isRad, setIsRad] = useState(true);

  const append = (v: string) => setExpr((prev) => prev + v);
  const clear = () => { setExpr(''); setResult('0'); };
  const backspace = () => setExpr((prev) => prev.slice(0, -1));

  const evaluate = () => {
    try {
      // Safe math evaluation with scientific replacements
      let sanitized = expr
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, isRad ? 'Math.sin(' : 'Math.sin(Math.PI/180*')
        .replace(/cos\(/g, isRad ? 'Math.cos(' : 'Math.cos(Math.PI/180*')
        .replace(/tan\(/g, isRad ? 'Math.tan(' : 'Math.tan(Math.PI/180*')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // Check characters
      if (/[^0-9+\-*/().\s,MathPIEsincoztaglq**]/.test(sanitized)) {
        throw new Error('Invalid input');
      }

      // eslint-disable-next-line no-eval
      const res = Function(`"use strict"; return (${sanitized})`)();
      setResult(Number.isFinite(res) ? Number(res.toFixed(10)).toString() : 'Error');
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-right">
        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono h-5 overflow-x-auto whitespace-nowrap">
          {expr || '0'}
        </div>
        <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white truncate mt-1">
          {result}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pb-1">
        <button
          onClick={() => setIsRad(!isRad)}
          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-mono font-medium hover:bg-slate-200"
        >
          {isRad ? 'RAD' : 'DEG'}
        </button>
        <span className="text-slate-400">Scientific Mode</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 text-xs font-semibold">
        <button onClick={() => append('sin(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">sin</button>
        <button onClick={() => append('cos(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">cos</button>
        <button onClick={() => append('tan(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">tan</button>
        <button onClick={() => append('π')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">π</button>
        <button onClick={clear} className="py-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100">C</button>

        <button onClick={() => append('ln(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">ln</button>
        <button onClick={() => append('log(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">log</button>
        <button onClick={() => append('sqrt(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">√</button>
        <button onClick={() => append('^')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">xʸ</button>
        <button onClick={backspace} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">⌫</button>

        <button onClick={() => append('(')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">(</button>
        <button onClick={() => append(')')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">)</button>
        <button onClick={() => append('e')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">e</button>
        <button onClick={() => append('%')} className="py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">%</button>
        <button onClick={() => append('/')} className="py-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100">÷</button>

        <button onClick={() => append('7')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">7</button>
        <button onClick={() => append('8')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">8</button>
        <button onClick={() => append('9')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">9</button>
        <button onClick={() => append('*')} className="py-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100">×</button>
        <button onClick={() => append('-')} className="py-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100">−</button>

        <button onClick={() => append('4')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">4</button>
        <button onClick={() => append('5')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">5</button>
        <button onClick={() => append('6')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">6</button>
        <button onClick={() => append('+')} className="py-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100">+</button>
        <button onClick={evaluate} className="row-span-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg">=</button>

        <button onClick={() => append('1')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">1</button>
        <button onClick={() => append('2')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">2</button>
        <button onClick={() => append('3')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">3</button>
        <button onClick={() => append('.')} className="py-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-base text-slate-800 dark:text-slate-100">.</button>
      </div>

      <div className="flex justify-end pt-2">
        <CopyButton text={result} label="Copy Result" />
      </div>
    </div>
  );
};

// 2. Loan / Mortgage EMI Calculator
export const LoanEmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('250000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [years, setYears] = useState('15');

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(interestRate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (p > 0 && r > 0 && n > 0) {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayment = emi * n;
    totalInterest = totalPayment - p;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Loan Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl">
          <div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Monthly Payment (EMI)</span>
            <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              ${emi > 0 ? emi.toFixed(2) : '0.00'}
            </div>
          </div>
          <CopyButton text={`$${emi.toFixed(2)}`} label="Copy Monthly EMI" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-xs text-slate-500">Total Interest Payable</div>
            <div className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400 mt-1">
              ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-xs text-slate-500">Total Principal + Interest</div>
            <div className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">
              ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Tip & Split Bill Calculator
export const TipSplitBillCalculator: React.FC = () => {
  const [bill, setBill] = useState('85.00');
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(3);

  const numBill = parseFloat(bill) || 0;
  const tipAmount = (numBill * tipPct) / 100;
  const totalBill = numBill + tipAmount;
  const perPerson = people > 0 ? totalBill / people : totalBill;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bill Amount ($)</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Split Between (People)</label>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Tip Percentage</label>
        <div className="flex gap-2">
          {[10, 15, 18, 20, 25].map((p) => (
            <button
              key={p}
              onClick={() => setTipPct(p)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${tipPct === p ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl">
          <div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Each Person Pays</span>
            <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              ${perPerson.toFixed(2)}
            </div>
          </div>
          <CopyButton text={`$${perPerson.toFixed(2)}`} label="Copy Per Person" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Tip Amount ({tipPct}%):</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Total with Tip:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">${totalBill.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Discount & Sales Tax Calculator
export const DiscountTaxCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('120');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [taxPercent, setTaxPercent] = useState('8.5');

  const price = parseFloat(originalPrice) || 0;
  const discPct = parseFloat(discountPercent) || 0;
  const taxPct = parseFloat(taxPercent) || 0;

  const discountSavings = (price * discPct) / 100;
  const discountedPrice = price - discountSavings;
  const taxAmount = (discountedPrice * taxPct) / 100;
  const finalPrice = discountedPrice + taxAmount;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Original Price ($)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sales Tax / VAT (%)</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl">
          <div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Final Out-of-Pocket Price</span>
            <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              ${finalPrice.toFixed(2)}
            </div>
          </div>
          <CopyButton text={`$${finalPrice.toFixed(2)}`} label="Copy Final Price" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg">
            <span className="text-slate-500">Total Savings:</span>
            <div className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              ${discountSavings.toFixed(2)} ({discPct}%)
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg">
            <span className="text-slate-500">Sales Tax / VAT Added:</span>
            <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              ${taxAmount.toFixed(2)} ({taxPct}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Date Difference & Business Days Calculator
export const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;

  // Business days calculation
  let businessDays = 0;
  if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
    const cur = new Date(Math.min(d1.getTime(), d2.getTime()));
    const target = new Date(Math.max(d1.getTime(), d2.getTime()));
    while (cur < target) {
      cur.setDate(cur.getDate() + 1);
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500">Total Calendar Days</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">{totalDays}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500">Working / Business Days</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{businessDays}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center col-span-2 sm:col-span-1">
          <div className="text-xs text-slate-500">Weeks & Days</div>
          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
            {weeks}w {remDays}d
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Fuel Cost Calculator
export const FuelCostCalculator: React.FC = () => {
  const [distance, setDistance] = useState('350');
  const [efficiency, setEfficiency] = useState('28'); // MPG
  const [pricePerUnit, setPricePerUnit] = useState('3.85'); // per gallon
  const [roundTrip, setRoundTrip] = useState(false);

  const dist = (parseFloat(distance) || 0) * (roundTrip ? 2 : 1);
  const eff = parseFloat(efficiency) || 1;
  const price = parseFloat(pricePerUnit) || 0;

  const fuelNeeded = eff > 0 ? dist / eff : 0;
  const totalCost = fuelNeeded * price;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Distance (Miles/km)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fuel Economy (MPG)</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fuel Price ($/gal)</label>
          <input
            type="number"
            step="0.01"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={roundTrip}
          onChange={(e) => setRoundTrip(e.target.checked)}
          className="rounded text-blue-600"
        />
        <span>Round Trip (Double Distance)</span>
      </label>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500">Estimated Total Trip Cost</span>
          <div className="text-3xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            ${totalCost.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Requires {fuelNeeded.toFixed(1)} gallons of fuel
          </div>
        </div>
        <CopyButton text={`$${totalCost.toFixed(2)}`} label="Copy Total Cost" />
      </div>
    </div>
  );
};
