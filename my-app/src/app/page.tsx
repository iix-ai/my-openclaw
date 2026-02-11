'use client';

import { useState, useEffect } from 'react';
import LifeProgress from './components/LifeProgress';
import DeathClock from './components/DeathClock';
import BucketList from './components/BucketList';
import QuoteCard from './components/QuoteCard';

interface UserData {
  birthDate: string;
  expectedAge: number;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('silem-user-data');
    if (saved) {
      setUserData(JSON.parse(saved));
    } else {
      setShowSetup(true);
    }
  }, []);

  const handleSetup = (birthDate: string, expectedAge: number) => {
    const data = { birthDate, expectedAge };
    localStorage.setItem('silem-user-data', JSON.stringify(data));
    setUserData(data);
    setShowSetup(false);
  };

  const handleReset = () => {
    localStorage.removeItem('silem-user-data');
    setUserData(null);
    setShowSetup(true);
  };

  if (showSetup) {
    return <SetupScreen onSetup={handleSetup} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
              死
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">死了么</h1>
              <p className="text-xs text-slate-400">生命倒计时</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            重置
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8">
          <DeathClock userData={userData!} />
        </section>

        {/* Life Progress */}
        <section>
          <LifeProgress userData={userData!} />
        </section>

        {/* Quote */}
        <section>
          <QuoteCard />
        </section>

        {/* Bucket List */}
        <section>
          <BucketList />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500 text-sm">
          <p>珍惜当下，活出精彩</p>
          <p className="mt-2">© 2026 死了么</p>
        </footer>
      </main>
    </div>
  );
}

function SetupScreen({ onSetup }: { onSetup: (birthDate: string, expectedAge: number) => void }) {
  const [birthDate, setBirthDate] = useState('');
  const [expectedAge, setExpectedAge] = useState(80);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onSetup(birthDate, expectedAge);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
            死
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">死了么</h1>
          <p className="text-slate-400">记录生命，珍惜当下</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                出生日期
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                预期寿命: {expectedAge} 岁
              </label>
              <input
                type="range"
                min="50"
                max="120"
                value={expectedAge}
                onChange={(e) => setExpectedAge(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>50岁</span>
                <span>120岁</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            开始计时
          </button>
        </form>
      </div>
    </div>
  );
}
