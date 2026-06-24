'use client';

import React from 'react';

// Dicionário de Formações (transferido para cá)
const mapFormacoes: Record<string, { id: string; label: string; top: string; left: string }[]> = {
  '4-3-3': [
    { id: 'gol', label: 'GOL', top: '90%', left: '50%' },
    { id: 'zag1', label: 'ZAG', top: '75%', left: '35%' },
    { id: 'zag2', label: 'ZAG', top: '75%', left: '65%' },
    { id: 'le', label: 'LE', top: '65%', left: '15%' },
    { id: 'ld', label: 'LD', top: '65%', left: '85%' },
    { id: 'vol', label: 'VOL', top: '55%', left: '50%' },
    { id: 'mc1', label: 'MC', top: '45%', left: '30%' },
    { id: 'mc2', label: 'MC', top: '45%', left: '70%' },
    { id: 'pe', label: 'PE', top: '25%', left: '20%' },
    { id: 'pd', label: 'PD', top: '25%', left: '80%' },
    { id: 'ca', label: 'CA', top: '15%', left: '50%' },
  ],
  '4-4-2': [
    { id: 'gol', label: 'GOL', top: '90%', left: '50%' },
    { id: 'zag1', label: 'ZAG', top: '75%', left: '35%' },
    { id: 'zag2', label: 'ZAG', top: '75%', left: '65%' },
    { id: 'le', label: 'LE', top: '65%', left: '15%' },
    { id: 'ld', label: 'LD', top: '65%', left: '85%' },
    { id: 'me', label: 'ME', top: '45%', left: '20%' },
    { id: 'mc1', label: 'MC', top: '50%', left: '40%' },
    { id: 'mc2', label: 'MC', top: '50%', left: '60%' },
    { id: 'md', label: 'MD', top: '45%', left: '80%' },
    { id: 'ata1', label: 'ATA', top: '20%', left: '35%' },
    { id: 'ata2', label: 'ATA', top: '20%', left: '65%' },
  ],
  // Você pode adicionar as outras formações aqui depois...
};

interface CampoProps {
  formacaoAtiva: string;
  // Futuramente, passaremos os jogadores escalados por aqui
  // jogadoresEscalados: Record<string, any>; 
}

export default function Campo({ formacaoAtiva }: CampoProps) {
  // Se a formação não existir no dicionário, usa 4-3-3 como padrão
  const posicoesAtuais = mapFormacoes[formacaoAtiva] || mapFormacoes['4-3-3'];

  return (
    <div className="relative w-full max-w-2xl aspect-[1/1.4] bg-gradient-to-b from-emerald-900/40 to-green-950/80 rounded-lg border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm">
      
      {/* Linhas do Campo (Neon Style) */}
      <div className="absolute inset-4 border border-white/20 pointer-events-none rounded"></div>
      <div className="absolute top-1/2 left-4 right-4 border-t border-white/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full pointer-events-none"></div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-b-0 border-white/20 pointer-events-none"></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border border-b-0 border-white/20 pointer-events-none"></div>
      <div className="absolute bottom-[calc(1rem+32px)] left-1/2 -translate-x-1/2 w-16 h-16 border-t border-white/20 rounded-t-full pointer-events-none opacity-50"></div>
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-t-0 border-white/20 pointer-events-none"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border border-t-0 border-white/20 pointer-events-none"></div>

      {/* Nodos Táticos (Jogadores) */}
      {posicoesAtuais.map((pos) => (
        <div 
          key={pos.id}
          className="absolute w-12 h-12 rounded-full border-2 border-white/30 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-in-out hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:scale-110 group z-10"
          style={{ top: pos.top, left: pos.left }}
        >
          <span className="text-white font-bold text-xs group-hover:text-emerald-400 transition-colors">
            {pos.label}
          </span>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5">Vazio</span>
        </div>
      ))}
    </div>
  );
}