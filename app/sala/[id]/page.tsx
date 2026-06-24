'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

// Mapeamento dinâmico das posições no campo (X e Y em porcentagem)
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
  '3-5-2': [
    { id: 'gol', label: 'GOL', top: '90%', left: '50%' },
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

export default function SalaPartida() {
  const params = useParams();
  const salaId = params.id;

  const [formacao, setFormacao] = useState<keyof typeof mapFormacoes>('4-3-3');
  const [estilo, setEstilo] = useState('Equilibrado');
  const [isRolling, setIsRolling] = useState(false);

  const posicoesAtuais = mapFormacoes[formacao] || mapFormacoes['4-3-3'];

  const handleRoll = () => {
    setIsRolling(true);
    // Simula o tempo de giro do draft (1.5 segundos)
    setTimeout(() => {
      setIsRolling(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      {/* PAINEL ESQUERDO: HUD Tático */}
      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col z-10 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-1">Central de Comando</h2>
          <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            SALA <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-sm font-mono border border-emerald-500/30">{salaId}</span>
          </div>
        </div>

        {/* Formação */}
        <div className="mb-8">
          <h3 className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Esquema Tático
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(mapFormacoes) as Array<keyof typeof mapFormacoes>).map(f => (
              <button 
                key={f}
                onClick={() => setFormacao(f)}
                className={`py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 border
                  ${formacao === f 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Estilo de Jogo */}
        <div className="mb-8 flex-1">
          <h3 className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div> Mentalidade
          </h3>
          <div className="flex flex-col gap-2">
            {['Defensivo', 'Equilibrado', 'Ofensivo'].map(e => (
              <button 
                key={e}
                onClick={() => setEstilo(e)}
                className={`py-3 px-4 rounded-lg text-sm font-bold text-left transition-all duration-200 border
                  ${estilo === e 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Ação do Draft */}
        <div className="mt-auto pt-4 border-t border-slate-800">
          <button 
            onClick={handleRoll}
            disabled={isRolling}
            className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.15em] transition-all duration-300 flex flex-col items-center justify-center gap-1
              ${isRolling 
                ? 'bg-slate-800 text-slate-500 cursor-wait border border-slate-700' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400'}`}
          >
            {isRolling ? (
              <span className="animate-pulse">Sorteando...</span>
            ) : (
              <>
                <span className="text-lg">Draft Sorteio</span>
                <span className="text-[10px] opacity-70">País e Ano Aleatório</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ÁREA CENTRAL: O Gramado Tático (Estilo Radar) */}
      <main className="flex-1 relative flex items-center justify-center p-8 z-10">
        <div className="relative w-full max-w-2xl aspect-[1/1.4] bg-gradient-to-b from-emerald-900/40 to-green-950/80 rounded-lg border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm">
          
          {/* Marcações do Campo (Neon Style) */}
          <div className="absolute inset-4 border border-white/20 pointer-events-none rounded"></div>
          <div className="absolute top-1/2 left-4 right-4 border-t border-white/20 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full pointer-events-none"></div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-b-0 border-white/20 pointer-events-none"></div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border border-b-0 border-white/20 pointer-events-none"></div>
          <div className="absolute bottom-[calc(1rem+32px)] left-1/2 -translate-x-1/2 w-16 h-16 border-t border-white/20 rounded-t-full pointer-events-none opacity-50"></div>
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-32 border border-t-0 border-white/20 pointer-events-none"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border border-t-0 border-white/20 pointer-events-none"></div>

          {/* Jogadores (Nodos Táticos) */}
          {posicoesAtuais.map((pos) => (
            <div 
              key={pos.id}
              className="absolute w-12 h-12 rounded-full border-2 border-white/30 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-in-out hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:scale-110 group"
              style={{ top: pos.top, left: pos.left }}
            >
              <span className="text-white font-bold text-xs group-hover:text-emerald-400 transition-colors">{pos.label}</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Vazio</span>
            </div>
          ))}
        </div>
      </main>

      {/* PAINEL DIREITO: Box Score / Roster HUD */}
      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-l border-slate-800 p-6 flex flex-col z-10 shadow-2xl">
        <div className="flex justify-between items-end border-b border-slate-700 pb-4 mb-6">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Escalação</h3>
            <div className="text-xl font-black text-white mt-1">0 <span className="text-sm text-slate-500">/ 11 Jogadores</span></div>
          </div>
          <div className="w-10 h-1 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </div>

        {/* Atributos do Time */}
        <div className="flex justify-between mb-6 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Ataque Geral</span>
            <span className="text-lg font-black text-blue-400">--</span>
          </div>
          <div className="w-px bg-slate-700"></div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Defesa Geral</span>
            <span className="text-lg font-black text-amber-400">--</span>
          </div>
        </div>

        {/* Lista de Slots */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {posicoesAtuais.map((pos) => (
            <div key={pos.id} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-lg p-2.5 hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center border border-slate-700 text-xs font-bold text-slate-400 group-hover:text-white group-hover:border-slate-500 transition-colors">
                {pos.label}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-300">Slot Vazio</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Aguardando Draft</div>
              </div>
              <div className="text-xs font-mono text-slate-600 bg-slate-900 px-2 py-1 rounded">
                OVR -
              </div>
            </div>
          ))}
        </div>
      </aside>

    </div>
  );
}