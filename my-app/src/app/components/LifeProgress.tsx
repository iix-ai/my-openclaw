'use client';

import { useState, useEffect } from 'react';

interface UserData {
  birthDate: string;
  expectedAge: number;
}

export default function LifeProgress({ userData }: { userData: UserData }) {
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    weeksLived: 0,
    weeksLeft: 0,
    weekendsLeft: 0,
    monthsLeft: 0,
  });

  useEffect(() => {
    const birth = new Date(userData.birthDate);
    const death = new Date(birth);
    death.setFullYear(birth.getFullYear() + userData.expectedAge);
    
    const now = new Date();
    const totalLife = death.getTime() - birth.getTime();
    const lived = now.getTime() - birth.getTime();
    
    const percentage = (lived / totalLife) * 100;
    setProgress(Math.min(percentage, 100));

    const weeksLived = Math.floor(lived / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = Math.floor(totalLife / (1000 * 60 * 60 * 24 * 7));
    const weeksLeft = totalWeeks - weeksLived;
    
    setStats({
      weeksLived,
      weeksLeft,
      weekendsLeft: weeksLeft * 2,
      monthsLeft: Math.floor(weeksLeft / 4.3),
    });
  }, [userData]);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">生命进度</h2>
        <span className="text-2xl font-bold text-rose-400">{progress.toFixed(1)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox value={stats.weeksLived} label="已活周数" />
        <StatBox value={stats.weeksLeft} label="剩余周数" />
        <StatBox value={stats.weekendsLeft} label="剩余周末" />
        <StatBox value={stats.monthsLeft} label="剩余月份" />
      </div>

      {/* Visualization */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-sm text-slate-400 mb-3">人生可视化 (每格代表一年)</p>
        <YearGrid userData={userData} />
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center p-4 bg-slate-800/50 rounded-xl">
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function YearGrid({ userData }: { userData: UserData }) {
  const [years, setYears] = useState<{ index: number; lived: boolean }[]>([]);

  useEffect(() => {
    const birth = new Date(userData.birthDate);
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthYear = birth.getFullYear();
    const livedYears = currentYear - birthYear;

    const grid = [];
    for (let i = 0; i < userData.expectedAge; i++) {
      grid.push({
        index: i,
        lived: i < livedYears,
      });
    }
    setYears(grid);
  }, [userData]);

  return (
    <div className="grid grid-cols-10 gap-1">
      {years.map((year) => (
        <div
          key={year.index}
          className={`aspect-square rounded-sm ${
            year.lived 
              ? 'bg-gradient-to-br from-rose-500 to-orange-500' 
              : 'bg-slate-800'
          }`}
          title={`${year.index + 1}岁${year.lived ? ' (已过)' : ''}`}
        />
      ))}
    </div>
  );
}
