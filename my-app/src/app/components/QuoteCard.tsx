'use client';

import { useState, useEffect } from 'react';

const quotes = [
  { text: "生命不在于长短，而在于质量。", author: "塞内卡" },
  { text: "珍惜当下，因为这是我们唯一拥有的时刻。", author: "佛陀" },
  { text: "死亡不是生命的终点，遗忘才是。", author: "《寻梦环游记》" },
  { text: "活出你想要记住的人生。", author: "未知" },
  { text: "时间是最公平的，给每个人都是24小时。", author: "赫胥黎" },
  { text: "不要等待机会，而要创造机会。", author: "萧伯纳" },
  { text: "人生最大的遗憾，莫过于轻易地放弃了不该放弃的。", author: "柏拉图" },
  { text: "活在当下，因为过去已逝，未来未至。", author: "奥修" },
  { text: "你的时间有限，不要浪费在重复别人的生活上。", author: "史蒂夫·乔布斯" },
  { text: "生命太短暂，没时间讨厌任何人。", author: "未知" },
];

export default function QuoteCard() {
  const [quote, setQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const refreshQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <blockquote className="text-lg text-slate-300 italic mb-4">
          "{quote.text}"
        </blockquote>
        <cite className="text-sm text-slate-500 not-italic">
          — {quote.author}
        </cite>
      </div>

      <button
        onClick={refreshQuote}
        className="absolute bottom-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
        title="换一句"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}
