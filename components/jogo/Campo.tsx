'use client';

import React from 'react';

const mapFormacoes: Record<string, { id: string; label: string; top: string; left: string }[]> = {
  '4-3-3': [
    { id: 'gol', label: 'GOL', top: '88%', left: '50%' },
    { id: 'zag1', label: 'ZAG', top: '75%', left: '35%' },
    { id: 'zag2', label: 'ZAG', top: '75%', left: '65%' },
    { id: 'le', label: 'LE', top: '65%', left: '15%' },
    { id: 'ld', label: 'LD', top: '65%', left: '85%' },
    { id: 'vol', label: 'VOL', top: '55%', left: '50%' },
    { id: 'mc1', label: 'MC', top: '42%', left: '30%' },
    { id: 'mc2', label: 'MC', top: '42%', left: '70%' },
    { id: 'pe', label: 'PE', top: '25%', left: '20%' },
    { id: 'pd', label: 'PD', top: '25%', left: '80%' },
    { id: 'ca', label: 'CA', top: '15%', left: '50%' },
  ],
  '4-4-2': [
    { id: 'gol', label: 'GOL', top: '88%', left: '50%' },
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
  '3-5-2': [
    { id: 'gol', label: 'GOL', top: '88%', left: '50%' },
    { id: 'zag1', label: 'ZAG', top: '75%', left: '25%' },
    { id: 'zag2', label: 'ZAG', top: '75%', left: '50%' },
    { id: 'zag3', label: 'ZAG', top: '75%', left: '75%' },
    { id: 'ala_e', label: 'ALE', top: '50%', left: '15%' },
    { id: 'vol1', label: 'VOL', top: '60%', left: '40%' },
    { id: 'vol2', label: 'VOL', top: '60%', left: '60%' },
    { id: 'mei', label: 'MEI', top: '40%', left: '50%' },
    { id: 'ala_d', label: 'ALD', top: '50%', left: '85%' },
    { id: 'ata1', label: 'ATA', top: '20%', left: '35%' },
    { id: 'ata2', label: 'ATA', top: '20%', left: '65%' },
  ]
};

interface CampoProps {
  formacaoAtiva: string;
  jogadoresEscalados: Record<string, any>;
  isAlocando?: boolean; // Diz ao campo se o utilizador está com um jogador na mão
  onSlotClick?: (id: string) => void; // Função que dispara quando clica num slot
}

export default function Campo({ formacaoAtiva, jogadoresEscalados, isAlocando, onSlotClick }: CampoProps) {
  const posicoesAtuais = mapFormacoes[formacaoAtiva] || mapFormacoes['4-3-3'];

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
        const slotVazio = !atleta;

        return (
          <div 
            key={pos.id}
            onClick={() => {
              if (onSlotClick) onSlotClick(pos.id);
            }}
            // As classes abaixo garantem a animação fluida (duration-500 ease-in-out)
            // E adicionam o efeito de piscar (animate-pulse) se estiver à espera que o utilizador clique
            className={`absolute w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-10
              ${atleta 
                ? 'bg-slate-900 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-110 cursor-pointer hover:border-emerald-300' 
                : isAlocando 
                  ? 'bg-emerald-900/80 border-emerald-400 animate-pulse cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.6)] scale-110'
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
                <span className={`font-bold text-[10px] ${isAlocando ? 'text-emerald-300' : 'text-white opacity-70'}`}>{pos.label}</span>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5">Vazio</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}