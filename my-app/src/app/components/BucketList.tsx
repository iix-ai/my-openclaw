'use client';

import { useState, useEffect } from 'react';

interface BucketItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function BucketList() {
  const [items, setItems] = useState<BucketItem[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('silem-bucket-list');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('silem-bucket-list', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      const item: BucketItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setItems([...items, item]);
      setNewItem('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">遗愿清单</h2>
        {totalCount > 0 && (
          <span className="text-sm text-slate-400">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      <form onSubmit={addItem} className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="添加想完成的事..."
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          添加
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            还没有添加任何项目，开始规划你的人生吧
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl group"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-slate-600 hover:border-rose-500'
                }`}
              >
                {item.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              
              <span className={`flex-1 ${item.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                {item.text}
              </span>
              
              <button
                onClick={() => deleteItem(item.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
