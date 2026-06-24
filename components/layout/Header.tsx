import React from 'react';

export default function Header() {
  return (
    <header className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-10 pb-6 border-b border-slate-800">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mb-1">
            Server Central
          </span>
          <h1 className="text-5xl font-black tracking-tighter text-white leading-none flex items-center gap-2">
            DRAFT <span className="bg-emerald-500 text-slate-950 px-3 rounded-lg pb-1 shadow-[0_0_20px_rgba(16,185,129,0.4)]">7x0</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-bold text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors uppercase tracking-widest">
            Perfil
          </button>
          <button className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-bold text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors uppercase tracking-widest">
            Ajustes ⚙
          </button>
        </div>
      </div>
    </header>
  );
}