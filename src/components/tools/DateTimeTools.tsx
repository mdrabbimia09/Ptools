import React, { useState, useEffect, useRef } from 'react';
import { CopyButton } from './CalculatorTools';
import { Play, Pause, RotateCcw, Flag, Bell } from 'lucide-react';

// 43. Timestamp Converter
export const TimestampConverter: React.FC = () => {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 19));

  // Current ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const numEpoch = parseInt(epochInput) || 0;
  // If > 100000000000, probably ms, else s
  const dateObj = new Date(numEpoch > 1e11 ? numEpoch : numEpoch * 1000);
  const isValidDate = !isNaN(dateObj.getTime());

  const handleDateToEpoch = () => {
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) {
      setEpochInput(Math.floor(d.getTime() / 1000).toString());
    }
  };

  const getRelativeTime = (d: Date) => {
    const diff = Math.floor((d.getTime() - Date.now()) / 1000);
    const abs = Math.abs(diff);
    let str = '';
    if (abs < 60) str = `${abs} seconds`;
    else if (abs < 3600) str = `${Math.floor(abs / 60)} minutes`;
    else if (abs < 86400) str = `${Math.floor(abs / 3600)} hours`;
    else str = `${Math.floor(abs / 86400)} days`;
    return diff >= 0 ? `in ${str}` : `${str} ago`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between">
        <div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Current Unix Epoch</div>
          <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">{currentEpoch}</div>
        </div>
        <CopyButton text={currentEpoch.toString()} label="Copy Current Epoch" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Unix Timestamp (Seconds or Milliseconds)
          </label>
          <input
            type="number"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Convert Date / Time to Epoch
          </label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
            />
            <button
              onClick={handleDateToEpoch}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium shrink-0"
            >
              Convert
            </button>
          </div>
        </div>
      </div>

      {isValidDate ? (
        <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500">UTC Date & Time:</span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{dateObj.toUTCString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500">Your Local Time:</span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{dateObj.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500">ISO 8601 String:</span>
            <span className="text-xs font-mono text-slate-800 dark:text-slate-200">{dateObj.toISOString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-xs text-slate-500">Relative Time:</span>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">{getRelativeTime(dateObj)}</span>
          </div>
        </div>
      ) : (
        <div className="p-3 text-xs text-rose-500 font-mono">Invalid timestamp value</div>
      )}
    </div>
  );
};

// 44. Countdown Timer
export const CountdownTimer: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 min default
  const [remaining, setRemaining] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  // Web Audio chime generator
  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {}
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            playAlertSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const setPreset = (sec: number) => {
    setIsRunning(false);
    setTotalSeconds(sec);
    setRemaining(sec);
  };

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="flex justify-center gap-2 text-xs">
        <button onClick={() => setPreset(60)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200">1 min</button>
        <button onClick={() => setPreset(300)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200">5 min</button>
        <button onClick={() => setPreset(900)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200">15 min</button>
        <button onClick={() => setPreset(1500)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200">25 min (Pomodoro)</button>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="text-5xl sm:text-6xl font-mono font-bold text-slate-900 dark:text-white tracking-tight">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
        {remaining === 0 && (
          <div className="mt-3 text-sm font-semibold text-rose-500 animate-pulse flex items-center justify-center gap-1.5">
            <Bell className="w-4 h-4" /> Time Expired!
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-colors ${isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={() => { setIsRunning(false); setRemaining(totalSeconds); }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

// 45. Stopwatch
export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleLap = () => {
    if (isRunning) {
      setLaps([time, ...laps]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const format = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="text-5xl sm:text-6xl font-mono font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
          {format(time)}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-colors ${isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? 'Stop' : 'Start'}</span>
        </button>
        <button
          disabled={!isRunning}
          onClick={handleLap}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <Flag className="w-4 h-4" />
          <span>Lap</span>
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {laps.length > 0 && (
        <div className="space-y-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 max-h-56 overflow-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recorded Laps</div>
          {laps.map((l, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-500">Lap {laps.length - idx}</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{format(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
