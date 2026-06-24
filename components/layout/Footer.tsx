'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const [codigoSala, setCodigoSala] = useState('');

  const handleEntrarSala = () => {
    if (codigoSala.trim().length >= 3) {
      router.push(`/sala/${codigoSala.toUpperCase()}`);
    }
  };

  return (
    <footer className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Join Server</span>
          <span className="text-sm font-semibold text-slate-300">Entrar em uma sala existente</span>
        </div>
        <div className="flex w-full md:w-auto">
          <input 
            type="text" 
            placeholder="CÓDIGO DA SALA" 
            value={codigoSala}
            onChange={(e) => setCodigoSala(e.target.value.toUpperCase())}
            className="bg-slate-950 border border-slate-700 px-4 py-3 font-mono font-bold uppercase tracking-widest outline-none text-white rounded-l-lg focus:border-emerald-500 transition-colors w-full md:w-48 placeholder:text-slate-700"
          />
          <button 
            onClick={handleEntrarSala}
            className="px-6 bg-slate-800 text-white font-bold uppercase tracking-widest rounded-r-lg border-y border-r border-slate-700 hover:bg-slate-700 transition-colors text-sm"
          >
            Conectar
          </button>
        </div>
      </div>
    </footer>
  );
}