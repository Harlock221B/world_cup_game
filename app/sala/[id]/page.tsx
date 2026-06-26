'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Campo from '../../../components/jogo/Campo';
import LobbyScreen from '../../../components/jogo/LobbyScreen';
import { useSalaPartida } from '../../../hooks/useSalaPartida';
import { mapFormacoes } from '../../../lib/formacoes';

export default function SalaPartida() {
  const params = useParams();
  const salaId = params.id as string;

  const {
    dadosSala, carregando, meuId, outroJogadorId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado, slotsValidos,
    handleComecarDraft, handleRoll, handleSlotClick, handlePassarTurno, handleJogarNovamente, router
  } = useSalaPartida(salaId);

  // RELÓGIO DE ANIMAÇÃO DA CAMPANHA
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchMinute, setMatchMinute] = useState(0);

  useEffect(() => {
    if (dadosSala?.status === 'simulacao') {
       const campanha = dadosSala.campanhas?.[meuId];
       if (!campanha || !campanha.partidas) return;

       if (matchIndex < campanha.partidas.length) {
          const timer = setTimeout(() => {
             setMatchMinute(m => m + 3);
          }, 30);
          if (matchMinute >= 90) {
             setMatchIndex(i => i + 1);
             setMatchMinute(0);
          }
          return () => clearTimeout(timer);
       }
    }
  }, [dadosSala?.status, matchIndex, matchMinute, dadosSala?.campanhas, meuId]);

  if (carregando) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-emerald-500 animate-pulse font-mono">Conectando...</div>;

  const turnoAtualId = dadosSala?.turnoAtual || meuId;
  const oponenteAtualNome = dadosSala?.nomesTimes?.[turnoAtualId] || 'Adversário';
  const meuNomeTime = dadosSala?.nomesTimes?.[meuId] || 'Seu Time';
  
  const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
  const posicoesAtuais = mapFormacoes[formacao] || mapFormacoes['4-3-3'];
  const totalSlots = 11;
  const totalEscalados = Object.keys(meuTimeEscalado).length;

  if (dadosSala?.status === 'aguardando_jogadores') {
    return (
      <LobbyScreen 
        salaId={salaId} dadosSala={dadosSala} meuId={meuId} isAdmin={isAdmin} jogadoresConectados={jogadoresConectados}
        nomeTimeTemp={nomeTimeTemp} setNomeTimeTemp={setNomeTimeTemp} salvarNomeTime={salvarNomeTime} handleComecarDraft={handleComecarDraft}
      />
    );
  }

  // ==========================================
  // TELA DE SIMULAÇÃO (A CAMPANHA)
  // ==========================================
  if (dadosSala?.status === 'simulacao') {
    const campanha = dadosSala?.campanhas?.[meuId];
    if (!campanha) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Processando Resultados...</div>;

    const partidas = campanha.partidas || [];
    const campeao = campanha.campeao;
    const isTotalmenteTerminado = matchIndex >= partidas.length;
    
    const totalGolsPro = partidas.reduce((acc: number, p: any) => acc + p.golsMeus, 0);
    const totalGolsSofridos = partidas.reduce((acc: number, p: any) => acc + p.golsOp, 0);
    const vitorias = partidas.filter((p: any) => p.golsMeus > p.golsOp).length;

    return (
      <div className="min-h-screen bg-[#06090F] text-slate-200 py-12 px-4 selection:bg-emerald-500 selection:text-[#06090F] relative overflow-y-auto">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
            <div>
              <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">Modo Torneio Automático</span>
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase">A Campanha</h1>
            </div>
            <div><span className="px-4 py-2 bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest rounded text-slate-400">Resultado Final</span></div>
          </div>

          <div className="space-y-4">
            {partidas.map((partida: any, index: number) => {
              if (index > matchIndex) return null; 
              
              const isCurrent = index === matchIndex;
              const minVisivel = isCurrent ? matchMinute : 90;
              
              const eventosExibidos = partida.eventos.filter((e:any) => e.minuto <= minVisivel);
              const golsMeusAtuais = eventosExibidos.filter((e:any) => e.isMeuGolo);
              const golsOpAtuais = eventosExibidos.filter((e:any) => !e.isMeuGolo);
              
              const vitoria = golsMeusAtuais.length > golsOpAtuais.length;
              const empate = golsMeusAtuais.length === golsOpAtuais.length;

              return (
                <div key={index} className="bg-[#0B101A] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800/60">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 w-24 leading-tight">{partida.fase.replace('(', '\n(')}</div>
                      <span className="text-xs font-black text-slate-600">VS</span>
                      <span className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{partida.oponente}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 self-end md:self-auto">
                      <div className={`text-3xl font-black font-mono tracking-tighter ${vitoria && !isCurrent ? 'text-emerald-500' : empate && !isCurrent ? 'text-slate-400' : (!vitoria && !empate && !isCurrent) ? 'text-red-500' : 'text-slate-300'}`}>
                        {golsMeusAtuais.length} - {golsOpAtuais.length}
                      </div>
                      <div className={`w-6 h-6 flex items-center justify-center font-black ${isCurrent ? 'text-slate-400 text-xs' : vitoria ? 'text-emerald-500 text-xl' : empate ? 'text-slate-600 text-xl' : 'text-red-500 text-xl'}`}>
                        {isCurrent ? `${minVisivel}'` : vitoria ? '✓' : empate ? '-' : '✗'}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-[#080B12] text-[10px] md:text-xs flex flex-col md:flex-row tracking-widest uppercase font-bold">
                    <div className="flex-1 flex gap-2 items-center">
                      <span className="text-slate-600">Gols Seus:</span>
                      <div className="text-emerald-400 flex flex-wrap gap-1.5">
                        {golsMeusAtuais.map((e:any, i:number) => <span key={i}>{e.jogador} ({e.minuto}')</span>)}
                        {golsMeusAtuais.length === 0 && <span className="text-slate-700">Nenhum</span>}
                      </div>
                    </div>
                    <div className="flex-1 flex gap-2 items-center md:border-l border-slate-800/80 md:pl-5 mt-3 md:mt-0">
                      <span className="text-slate-600">Gols Deles:</span>
                      <div className="text-red-500 flex flex-wrap gap-1.5">
                        {golsOpAtuais.map((e:any, i:number) => <span key={i}>{e.jogador} ({e.minuto}')</span>)}
                        {golsOpAtuais.length === 0 && <span className="text-slate-700">Nenhum</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isTotalmenteTerminado && (
            <div className="mt-10 mb-20 animate-in zoom-in fade-in duration-700">
              <div className={`rounded-xl p-8 border-2 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 ${campeao ? 'bg-[#0B101A] border-emerald-500' : 'bg-[#0B101A] border-red-900/50'}`}>
                <div className="text-center md:text-left">
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${campeao ? 'text-emerald-500' : 'text-red-500'}`}>{campeao ? 'CAMPEÃO DO TORNEIO' : 'ELIMINADO'}</h3>
                  <div className="text-7xl font-black text-white tracking-tighter font-mono">{vitorias} VITÓRIAS</div>
                </div>
                <div className="flex gap-8 text-center md:text-left md:border-l border-slate-800 md:pl-10">
                  <div>
                    <div className="text-4xl font-black text-emerald-500">{totalGolsPro}</div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">Gols Marcados</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-red-500">{totalGolsSofridos}</div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">Gols Sofridos</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-4">
                {isAdmin ? (
                  <button onClick={handleJogarNovamente} className="px-10 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    Jogar Novamente (Mesma Sala) 🔄
                  </button>
                ) : (
                  <div className="px-10 py-5 bg-slate-800 text-slate-400 font-black uppercase tracking-widest rounded-xl border border-slate-700 flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                    Aguardando Host Criar Revanche...
                  </div>
                )}
                <button onClick={() => router.push('/')} className="px-10 py-5 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all">
                  Sair
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // GAMEPLAY (DRAFT ATIVO COM 3 PICKS)
  // ==========================================
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const draftOponente = dadosSala?.draftInfoSecundaria;
  const picksDisponiveis = 3 - (dadosSala?.picksAtuais || 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative selection:bg-emerald-500 selection:text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      {/* PAINEL ESQUERDO / PAINEL DO OPONENTE */}
      <aside className="w-96 h-full bg-slate-900/70 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col z-10 shadow-2xl overflow-hidden relative">
        <div className={`absolute inset-0 bg-slate-900/95 z-50 p-8 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out border-r-4 border-slate-700 ${!isMeuTurno ? 'translate-x-0' : '-translate-x-full'}`}>
          <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Turno em Progresso</h3>
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-4xl mb-6 shadow-inner">⏳</div>
          <h2 className="text-2xl font-black text-white uppercase text-center mb-8">{oponenteAtualNome}</h2>
          <div className="w-full bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
            {draftOponente?.isRolling ? (
              <div className="animate-pulse"><div className="text-4xl mb-3">🎲</div><div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Sorteando Nação...</div></div>
            ) : draftOponente?.pais ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Nação Sorteada</div>
                <div className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{draftOponente.pais}</div>
                <div className="text-emerald-500 font-mono font-bold text-lg mb-4">{draftOponente.ano}</div>
                <div className="text-[9px] text-amber-500 uppercase font-black bg-amber-500/10 py-1.5 rounded tracking-widest">A Escolher Jogadores...</div>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest py-4">Aguardando Rolagem</div>
            )}
          </div>
          <div className="w-full mt-8">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mb-2"><span>TEMPO</span><span>00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}</span></div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-500 transition-all duration-1000 ease-linear" style={{ width: `${(tempoRestante / (dadosSala?.configuracoes?.tempoJogada || 30)) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="mb-4 p-4 rounded-xl border text-center bg-emerald-900/20 border-emerald-500/50 shadow-emerald-500/10 shadow-lg">
            <h2 className="font-black text-xl uppercase tracking-tighter text-emerald-400">SEU TURNO</h2>
            <div className="text-4xl font-mono font-black text-white mt-1">00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}</div>
          </div>
          
          <div className="mb-5">
            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2.5 flex justify-between"><span>Esquema Tático</span>{!podeMudarTatica && <span className="text-red-400">FIXO</span>}</h3>
            <div className="grid grid-cols-3 gap-2">
              {['4-3-3', '4-4-2', '3-5-2'].map(f => (
                <button key={f} onClick={() => podeMudarTatica && setFormacao(f)} disabled={!podeMudarTatica} className={`py-2 rounded-lg text-xs font-black transition-all border ${formacao === f ? 'bg-blue-600 border-blue-500 text-white transform scale-105' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-slate-950/60 rounded-2xl flex flex-col overflow-y-auto border border-slate-800 shadow-inner relative">
            {isRolling ? (
              <div className="flex flex-col items-center justify-center h-full"><div className="text-5xl animate-bounce">🎲</div><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-4">Sorteando Base...</p></div>
            ) : selecaoSorteada ? (
              <div className="flex flex-col h-full">
                <div className="p-4 bg-slate-900/50 border-b border-slate-800/80 flex justify-between items-center rounded-t-2xl">
                  <div><div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Nação Sorteada</div><h4 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{selecaoSorteada.pais}</h4></div>
                  <div className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-lg font-black text-white font-mono shadow-inner">{selecaoSorteada.ano}</div>
                </div>
                
                {/* AVISO DOS 3 PICKS */}
                <div className="bg-emerald-950/40 text-emerald-400 text-[10px] uppercase tracking-widest font-black text-center py-2 border-b border-emerald-900/50">
                  ESCOLHAS RESTANTES: {picksDisponiveis}
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {selecaoSorteada.jogadores.map(jog => {
                    const jaEscolhido = dadosSala?.jogadoresDraftados?.includes(jog.id);
                    const isSelecionado = jogadorSelecionado?.id === jog.id;
                    const isGoleiro = jog.posicao === 'GOL';
                    return (
                      <button key={jog.id} disabled={jaEscolhido} onClick={() => setJogadorSelecionado(isSelecionado ? null : jog)} className={`w-full text-left border-2 rounded-xl p-2.5 flex justify-between items-center transition-all ${jaEscolhido ? 'border-red-950 bg-red-950/10 opacity-30 cursor-not-allowed' : isSelecionado ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] transform scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-black ${isGoleiro ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-400'}`}>{jog.posicao}</span>
                          <div className="flex flex-col"><span className={`text-sm font-bold truncate max-w-[120px] ${jaEscolhido ? 'line-through text-red-500' : isSelecionado ? 'text-white' : 'text-slate-200'}`}>{jog.nome}</span></div>
                        </div>
                        <div className="flex flex-col items-end"><span className={`font-mono font-black text-sm ${isSelecionado ? 'text-emerald-400' : 'text-slate-400'}`}>{jog.overall}</span><span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">OVR</span></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[10px] text-slate-500 font-bold uppercase tracking-widest">Aguardando Rolagem</div>
            )}
          </div>

          <div className="mt-5">
            {selecaoSorteada ? (
              <button onClick={handlePassarTurno} className="w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] bg-amber-600 text-slate-950 hover:bg-amber-500 shadow-lg transition-all transform hover:-translate-y-1">
                Encerrar Turno ⏭️
              </button>
            ) : (
              <button onClick={handleRoll} disabled={!isMeuTurno || isRolling || totalEscalados === totalSlots} className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl ${(!isMeuTurno || totalEscalados === totalSlots) ? 'bg-slate-900 text-slate-600 border border-slate-800 shadow-none' : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 transform hover:-translate-y-1'}`}>
                Rolar Base 🎲
              </button>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
        <div className="flex items-center justify-center w-full mb-6">
          <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-widest bg-slate-900/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-800 shadow-xl">{meuNomeTime}</h2>
        </div>
        {jogadorSelecionado && <div className="absolute top-24 z-50 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">Posicione: {jogadorSelecionado.nome} ({jogadorSelecionado.posicao})</div>}
        <Campo formacaoAtiva={formacao} jogadoresEscalados={meuTimeEscalado} slotsValidos={slotsValidos} onSlotClick={handleSlotClick} />
      </main>

      <aside className="w-80 h-full bg-slate-900/70 backdrop-blur-2xl border-l border-slate-800/80 p-6 flex flex-col z-10 shadow-2xl">
        <div className="border-b border-slate-800/80 pb-4 mb-5">
          <h3 className="font-bold text-[10px] uppercase text-emerald-500 tracking-[0.2em]">Seu Elenco (Escalados)</h3>
          <div className="text-2xl font-black text-white mt-1">{totalEscalados} <span className="text-sm text-slate-500 font-normal">/ {totalSlots} Atletas</span></div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
          {posicoesAtuais.map((pos) => {
            const atleta = meuTimeEscalado[pos.id];
            const isValidSlot = jogadorSelecionado ? slotsValidos.includes(pos.id) : false;
            return (
              <div key={pos.id} onClick={() => handleSlotClick(pos.id)} className={`flex items-center gap-3 border rounded-xl p-2.5 transition-all duration-300 relative overflow-hidden ${atleta ? 'bg-slate-950/80 border-slate-800' : jogadorSelecionado ? isValidSlot ? 'bg-emerald-950/40 border-emerald-500 border-dashed cursor-pointer hover:bg-emerald-900/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-red-950/10 border-red-900/30 opacity-40 cursor-not-allowed scale-[0.98]' : 'bg-slate-900/50 border-slate-800/50 border-dashed'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-black text-[10px] uppercase shrink-0 ${atleta ? 'bg-slate-800 text-slate-300' : 'bg-slate-950 border border-slate-800 text-slate-600'}`}>{pos.label}</div>
                <div className="flex-1 min-w-0"><div className={`text-sm font-bold truncate ${atleta ? 'text-slate-100' : 'text-slate-600 uppercase text-[9px] tracking-widest'}`}>{atleta ? atleta.nome : 'Slot Livre'}</div></div>
                {atleta && <div className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-black text-xs px-2 py-1 rounded">{atleta.overall}</div>}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}