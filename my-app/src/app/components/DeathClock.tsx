'use client';

import { useState, useEffect } from 'react';

interface UserData {
  birthDate: string;
  expectedAge: number;
}

interface TimeLeft {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export default function DeathClock({ userData }: { userData: UserData }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [livedDays, setLivedDays] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const birth = new Date(userData.birthDate);
      const death = new Date(birth);
      death.setFullYear(birth.getFullYear() + userData.expectedAge);
      
      const now = new Date();
      const diff = death.getTime() - now.getTime();
      
      const lived = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      setLivedDays(lived);
      
      if (diff > 0) {
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({ years, days, hours, minutes, seconds, totalDays });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [userData]);

  if (!timeLeft) return null;

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-slate-400 text-sm">已存活 {livedDays.toLocaleString()} 天</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <TimeBox value={timeLeft.years} label="年" />
        <TimeBox value={timeLeft.days} label="天" />
        <TimeBox value={timeLeft.hours} label="时" />
        <TimeBox value={timeLeft.minutes} label="分" />
        <TimeBox value={timeLeft.seconds} label="秒" isSeconds />
      </div>

      <p className="text-slate-500 text-sm">
        预计还剩 {timeLeft.totalDays.toLocaleString()} 天
      </p>
    </div>
  );
}

function TimeBox({ value, label, isSeconds }: { value: number; label: string; isSeconds?: boolean }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700">
      <div className={`text-3xl md:text-4xl font-bold text-white tabular-nums ${isSeconds ? 'text-rose-400' : ''}`}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-slate-500 text-sm mt-1">{label}</div>
    </div>
  );
}
