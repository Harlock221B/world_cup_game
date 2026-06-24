'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importa apenas a base de dados (db)
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore'; 

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function HomeLobby() {
  const router = useRouter();

  const [modoAtivo, setModoAtivo] = useState('matamata');
  const [dificuldade, setDificuldade] = useState('classico');
  const [tamanhoChave, setTamanhoChave] = useState(8);
  const [taticaInGame, setTaticaInGame] = useState(true);
  const [draftModo, setDraftModo] = useState('turnos');
  const [tempoJogada, setTempoJogada] = useState(30);
  
  const [isCarregando, setIsCarregando] = useState(false);

  // Cria a sala DIRETAMENTE sem pedir login
  const handleCriarSala = async () => {
    setIsCarregando(true);
    
    try {
      const salaGerada = Math.random().toString(36).substring(2, 8).toUpperCase();
      console.log("A criar sala aberta:", salaGerada);
      
      await setDoc(doc(db, "salas", salaGerada), {
        id: salaGerada,
        status: 'aguardando_jogadores',
        criadaEm: new Date().toISOString(),
        configuracoes: {
          modo: modoAtivo,
          dificuldade: dificuldade,
          tamanhoChave: tamanhoChave,
          taticaInGame: taticaInGame,
          draftModo: draftModo,
          tempoJogada: tempoJogada
        },
        jogadoresConectados: 1
      });

      router.push(`/sala/${salaGerada}`);
      
    } catch (error) {
      console.error("Erro ao criar a sala:", error);
      alert("Erro ao ligar à base de dados. Veja a consola (F12).");
    } finally {
      setIsCarregando(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col relative selection:bg-emerald-500 selection:text-slate-950 pb-20">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      <Header />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Escolha o Torneio</h2>

          <button onClick={() => setModoAtivo('local')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${modoAtivo === 'local' ? 'bg-slate-800/80 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-black ${modoAtivo === 'local' ? 'text-emerald-400' : 'text-slate-700'}`}>01</span>
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Modo Local</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Jogadores no mesmo PC</p>
              </div>
            </div>
          </button>

          <button onClick={() => setModoAtivo('final')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${modoAtivo === 'final' ? 'bg-slate-800/80 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-black ${modoAtivo === 'final' ? 'text-blue-400' : 'text-slate-700'}`}>02</span>
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Final de Copa</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">1 Jogo Direto</p>
              </div>
            </div>
          </button>

          <button onClick={() => setModoAtivo('matamata')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${modoAtivo === 'matamata' ? 'bg-slate-800/80 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-black ${modoAtivo === 'matamata' ? 'text-amber-400' : 'text-slate-700'}`}>03</span>
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Mata-Mata</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Chave de Torneio (CPU)</p>
              </div>
            </div>
          </button>
        </div>

        {/* COLUNA DIREITA */}
        <div className="md:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
          
          <div className="border-b border-slate-800 pb-4 mb-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Parâmetros da Partida</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {modoAtivo === 'matamata' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Base de Dados (Dificuldade)</label>
                    <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                      <button onClick={() => setDificuldade('classico')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${dificuldade === 'classico' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Clássico</button>
                      <button onClick={() => setDificuldade('almanaque')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${dificuldade === 'almanaque' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>De Almanaque</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Tamanho da Chave</label>
                    <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                      {[4, 8, 16].map(size => (
                        <button key={size} onClick={() => setTamanhoChave(size)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${tamanhoChave === size ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{size} Times</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-emerald-500 uppercase mb-2">Táticas In-Game</label>
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                  <button onClick={() => setTaticaInGame(true)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${taticaInGame ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-500 hover:text-slate-300'}`}>Permitido (Dinâmico)</button>
                  <button onClick={() => setTaticaInGame(false)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${!taticaInGame ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Bloqueado (Fixo)</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Tempo do Turno</label>
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                  {[20, 30, 45].map(time => (
                    <button key={time} onClick={() => setTempoJogada(time)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${tempoJogada === time ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{time}s</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Modo do Draft</label>
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                  <button onClick={() => setDraftModo('turnos')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${draftModo === 'turnos' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Por Turnos</button>
                  <button onClick={() => setDraftModo('juntos')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${draftModo === 'juntos' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Todos Juntos</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 relative z-50">
            <button 
              onClick={handleCriarSala}
              disabled={isCarregando}
              className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 border 
                ${isCarregando 
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-wait shadow-none' 
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] border-emerald-400'
                }`}
            >
              {isCarregando ? 'A LIGAR AO SERVIDOR...' : 'INICIAR PARTIDA'}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}