'use client';

import React from 'react';
// Importamos as formações diretamente do nosso ficheiro centralizado!
import { mapFormacoes } from '../../lib/formacoes';

interface CampoProps {
  formacaoAtiva: string;
  jogadoresEscalados: Record<string, any>;
  slotsValidos?: string[]; // Array com os IDs onde o jogador pode entrar
  onSlotClick?: (id: string) => void;
}

export default function Campo({ formacaoAtiva, jogadoresEscalados, slotsValidos = [], onSlotClick }: CampoProps) {
  const posicoesAtuais = mapFormacoes[formacaoAtiva] || mapFormacoes['4-3-3'];
  const isAlocando = slotsValidos.length > 0;

  return (
    <div className="relative w-full max-w-2xl aspect-[1/1.4] bg-gradient-to-b from-emerald-900/40 to-green-950/80 rounded-lg border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm">
      
      {/* Marcações do Gramado */}
      <div className="absolute inset-4 border border-white/20 pointer-events-none rounded"></div>
      <div className="absolute top-1/2 left-4 right-4 border-t border-white/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-b-0 border-white/20 pointer-events-none"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-t-0 border-white/20 pointer-events-none"></div>

      {/* Nodos Táticos (Slots de Jogadores) */}
      {posicoesAtuais.map((pos) => {
        const atleta = jogadoresEscalados[pos.id];
        const isValido = slotsValidos.includes(pos.id);

        return (
          <div 
            key={pos.id}
            onClick={() => {
              if (onSlotClick) onSlotClick(pos.id);
            }}
            className={`absolute w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-10
              ${atleta 
                ? 'bg-slate-900 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-110 cursor-pointer hover:border-emerald-300' 
                : isAlocando 
                  ? isValido
                    ? 'bg-emerald-900/80 border-emerald-400 animate-pulse cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.6)] scale-110' // Slot compatível!
                    : 'bg-red-950/40 border-red-900/30 opacity-40 cursor-not-allowed scale-90' // Slot incompatível!
                  : 'bg-slate-900/80 border-white/30 cursor-pointer hover:border-white/60 backdrop-blur-md'
              }`}
            style={{ top: pos.top, left: pos.left }}
          >
            {atleta ? (
              <>
                <span className="text-white font-black text-[10px] truncate w-12 text-center leading-tight">
                  {atleta.nome.split(' ')[0]}
                </span>
                <span className="text-emerald-400 font-mono text-[9px] font-bold mt-0.5">{atleta.overall}</span>
              </>
            ) : (
              <>
                <span className={`font-bold text-[10px] ${isValido ? 'text-emerald-300' : 'text-white opacity-70'}`}>{pos.label}</span>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5">Vazio</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}