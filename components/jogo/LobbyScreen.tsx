'use client';

import React, { useState } from 'react';

interface LobbyScreenProps {
  salaId: string;
  dadosSala: any;
  meuId: string;
  isAdmin: boolean;
  jogadoresConectados: string[];
  nomeTimeTemp: string;
  setNomeTimeTemp: (nome: string) => void;
  salvarNomeTime: () => Promise<void>;
  handleComecarDraft: () => void;
}

export default function LobbyScreen({
  salaId,
  dadosSala,
  meuId,
  isAdmin,
  jogadoresConectados,
  nomeTimeTemp,
  setNomeTimeTemp,
  salvarNomeTime,
  handleComecarDraft
}: LobbyScreenProps) {
  const tamanhoChave = dadosSala?.configuracoes?.tamanhoChave || 2;
  
  // Estados para feedback visual ao salvar o nome
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSalvarTime = async () => {
    setIsSaving(true);
    await salvarNomeTime(); // Chama a função que envia para o Firebase
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // Tira o aviso de sucesso após 2s
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative pb-10 selection:bg-emerald-500 selection:text-slate-950">
      {/* Efeito de Fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>
      
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-10 pb-6 border-b border-slate-800/60 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
        <div className="text-center md:text-left">
          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Central de Torneio</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white flex items-center gap-3 justify-center md:justify-start">
            SALA
            <span className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              {salaId}
            </span>
          </h1>
        </div>
        <div className="text-center md:text-right bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Modo de Jogo</div>
          <div className="text-sm font-black text-emerald-400 uppercase mt-0.5">{dadosSala?.configuracoes?.modo} ({tamanhoChave} Times)</div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* LADO ESQUERDO: CONTROLO DA FRANQUIA */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Detalhe de design */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>

            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sua Franquia
            </h2>
            
            <div className="space-y-3">
              <label className="block text-[10px] uppercase text-emerald-500 font-black tracking-wider">Nome do seu Time</label>
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={nomeTimeTemp} 
                  onChange={(e) => setNomeTimeTemp(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSalvarTime()}
                  placeholder="Ex: Galácticos FC" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 font-black text-white outline-none focus:border-emerald-500 transition-colors shadow-inner" 
                  maxLength={20}
                />
                <button 
                  onClick={handleSalvarTime}
                  disabled={isSaving || saved}
                  className={`py-3 px-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                    ${saved 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-500'}`}
                >
                  {isSaving ? 'A Guardar...' : saved ? '✓ Nome Salvo!' : 'Salvar Alteração'}
                </button>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 uppercase tracking-wide text-center">Os outros jogadores verão este nome</p>
            </div>
          </div>

          <div className="pt-4">
            {isAdmin ? (
              <button 
                onClick={handleComecarDraft} 
                className="w-full py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transform hover:-translate-y-1"
              >
                Iniciar Draft 🚀
              </button>
            ) : (
              <div className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.1em] text-center bg-slate-800/50 text-slate-400 border border-slate-700/50 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                <div className="w-5 h-5 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin"></div>
                Aguardando o Host iniciar...
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO: BRACKET DE PARTICIPANTES */}
        <div className="w-full lg:w-2/3 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Participantes Confirmados
            </h2>
            <span className="bg-slate-950 px-3 py-1 rounded text-xs font-mono font-bold text-slate-400 border border-slate-800">
              {jogadoresConectados.length} / {tamanhoChave}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: tamanhoChave }).map((_, index) => {
              const isHuman = index < jogadoresConectados.length;
              const jogId = jogadoresConectados[index];
              const isMe = jogId === meuId;
              const isHost = index === 0;
              
              // Aqui está a magia: Ele pega sempre o nome atualizado do Firebase!
              const nomeTeam = isHuman 
                ? (dadosSala?.nomesTimes?.[jogId] || `Jogador ${index + 1}`) 
                : `CPU Bot ${index + 1}`;
              
              return (
                <div 
                  key={index} 
                  className={`relative p-5 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300
                    ${isMe 
                      ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : isHuman 
                        ? 'bg-blue-950/20 border-blue-900/50' 
                        : 'bg-slate-950/40 border-slate-800 border-dashed opacity-70'}`}
                >
                  {/* Badge de HOST se for o P1 */}
                  {isHost && isHuman && (
                    <div className="absolute -top-2.5 -right-2.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-lg border border-amber-300">
                      HOST
                    </div>
                  )}

                  {/* Ícone de Avatar */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner
                    ${isMe ? 'bg-emerald-500 text-slate-950' : isHuman ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {isHuman ? `P${index + 1}` : 'CPU'}
                  </div>

                  {/* Informações do Time */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-lg font-black truncate uppercase tracking-tight
                      ${isHuman ? 'text-white' : 'text-slate-500'}`}>
                      {nomeTeam}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      {isMe ? (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded font-bold tracking-widest border border-emerald-500/30">
                          SEU TIME
                        </span>
                      ) : isHuman ? (
                        <span className="bg-blue-500/20 text-blue-400 text-[9px] px-1.5 py-0.5 rounded font-bold tracking-widest border border-blue-500/30">
                          HUMANO
                        </span>
                      ) : (
                        <span className="bg-slate-800 text-slate-400 text-[9px] px-1.5 py-0.5 rounded font-bold tracking-widest border border-slate-700">
                          INTELIGÊNCIA ARTIFICIAL
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Aviso se a sala não estiver cheia */}
          {jogadoresConectados.length < tamanhoChave && isAdmin && (
            <div className="mt-6 p-4 rounded-xl border border-amber-900/30 bg-amber-950/20 flex items-center justify-center text-center">
              <p className="text-[11px] text-amber-500 font-bold uppercase tracking-widest">
                Aviso: Pode iniciar o draft mesmo com posições de CPU.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}