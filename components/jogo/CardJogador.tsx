'use client';

import React from 'react';

// Tipagem das propriedades que a carta vai receber
interface CardJogadorProps {
  nome: string;
  posicao: string;
  overall: number;
  pais: string;
  ano: number;
  vazio?: boolean;
  onClick?: () => void;
}

export default function CardJogador({ nome, posicao, overall, pais, ano, vazio = false, onClick }: CardJogadorProps) {
  
  // Se o slot estiver vazio, renderiza um espaço reservado com estilo neon apagado
  if (vazio) {
    return (
      <div 
        onClick={onClick}
        className="w-full h-full min-h-[120px] rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
      >
        <span className="text-slate-500 font-bold text-lg mb-1">{posicao}</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">Livre</span>
      </div>
    );
  }

  // Cor do Overall baseada na pontuação (estilo FIFA)
  const getCorOverall = (nota: number) => {
    if (nota >= 90) return 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]';
    if (nota >= 80) return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]';
    if (nota >= 70) return 'text-blue-400';
    return 'text-slate-300';
  };

  return (
    <div 
      onClick={onClick}
      className="relative w-full min-h-[120px] rounded-xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-3 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all duration-300 group"
    >
      {/* Efeito de brilho no fundo */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors"></div>

      {/* Cabeçalho da Carta */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
          <span className={`text-2xl font-black leading-none ${getCorOverall(overall)}`}>
            {overall}
          </span>
          <span className="text-xs font-bold text-slate-400 mt-1">{posicao}</span>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{pais}</span>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded mt-1 border border-slate-700">{ano}</span>
        </div>
      </div>

      {/* Nome do Jogador */}
      <div className="mt-4 z-10">
        <h4 className="text-sm font-black text-white uppercase tracking-tight truncate group-hover:text-emerald-300 transition-colors">
          {nome}
        </h4>
      </div>
    </div>
  );
}