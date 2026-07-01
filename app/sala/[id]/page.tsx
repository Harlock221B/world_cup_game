'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Campo from '../../../components/jogo/Campo';
import LobbyScreen from '../../../components/jogo/LobbyScreen';
import { useSalaPartida } from '../../../hooks/useSalaPartida';
import { mapFormacoes } from '../../../lib/formacoes';
import { Jogador } from '../../../lib/selecoes';

export default function SalaPartida() {
  const params = useParams();
  const salaId = params.id as string;

  const {
    dadosSala, carregando, meuId, outroJogadorId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado, slotsValidos,
    handleComecarDraft, handleRoll, handleSlotClick, handlePassarTurno, handleJogarNovamente, router
  } = useSalaPartida(salaId);

  // ESTADOS DA SIMULAÇÃO "JOGO A JOGO"
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchMinute, setMatchMinute] = useState(0);
  const [isSimulandoPartida, setIsSimulandoPartida] = useState(false);

  // Cronômetro da Simulação Manual/Controlada
  useEffect(() => {
    if (dadosSala?.status === 'simulacao') {
       const campanha = dadosSala.campanhas?.[meuId];
       if (!campanha || !campanha.partidas) return;

       if (isSimulandoPartida && matchIndex < campanha.partidas.length) {
          const timer = setTimeout(() => {
             setMatchMinute(m => m + 2); // Avança 2 minutos por frame
          }, 40); // Velocidade do cronômetro
          
          if (matchMinute >= 90) {
             setIsSimulandoPartida(false); // Para ao chegar aos 90
             setMatchMinute(90);
          }
          return () => clearTimeout(timer);
       }
    }
  }, [dadosSala?.status, isSimulandoPartida, matchIndex, matchMinute, dadosSala?.campanhas, meuId]);

  const handleProximaPartida = (totalPartidas: number) => {
    if (matchIndex < totalPartidas - 1) {
       setMatchIndex(i => i + 1);
       setMatchMinute(0);
    } else {
       setMatchIndex(i => i + 1); // Avança para a tela final de resultados
    }
  };

  if (carregando) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-emerald-500 animate-pulse font-mono">Conectando...</div>;

  const turnoAtualId = dadosSala?.turnoAtual || meuId;
  const oponenteAtualNome = dadosSala?.nomesTimes?.[turnoAtualId] || 'Adversário';
  const meuNomeTime = dadosSala?.nomesTimes?.[meuId] || 'Seu Time';
  
  const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
  const posicoesAtuais = mapFormacoes[formacao] || mapFormacoes['4-3-3'];
  const totalSlots = 11;
  const totalEscalados = Object.keys(meuTimeEscalado).length;

  // Lógica de cálculo de média compartilhada
  const calcularMedias = (timeObj: any) => {
    const arrayTime = Object.values(timeObj).filter(Boolean) as Jogador[];
    if (arrayTime.length === 0) return { ataque: 0, defesa: 0, overall: 0 };
    const ataqueMedia = Math.round(arrayTime.reduce((a, j) => a + (j.ataque || 50), 0) / 11);
    const defesaMedia = Math.round(arrayTime.reduce((a, j) => a + (j.defesa || 50), 0) / 11);
    const overallMedia = Math.round((ataqueMedia + defesaMedia) / 2);
    return { ataque: ataqueMedia, defesa: defesaMedia, overall: overallMedia };
  };

  if (dadosSala?.status === 'aguardando_jogadores') {
    return (
      <LobbyScreen 
        salaId={salaId} dadosSala={dadosSala} meuId={meuId} isAdmin={isAdmin} jogadoresConectados={jogadoresConectados}
        nomeTimeTemp={nomeTimeTemp} setNomeTimeTemp={setNomeTimeTemp} salvarNomeTime={salvarNomeTime} handleComecarDraft={handleComecarDraft}
      />
    );
  }

  // ==========================================
  // TELA DE SIMULAÇÃO DA CAMPANHA
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
        
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <div className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
            <div>
              <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">Modo Torneio Automático</span>
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase">A Campanha</h1>
            </div>
            <div>
              <span className="px-4 py-2 bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest rounded text-slate-400">
                Partida {Math.min(matchIndex + 1, partidas.length)} de {partidas.length}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {partidas.map((partida: any, index: number) => {
              if (index > matchIndex) return null; 
              
              const isCurrent = index === matchIndex;
              const minVisivel = isCurrent ? matchMinute : 90;
              
              // Unifica e ordena os eventos na linha do tempo
              const eventosExibidos = partida.eventos
                .filter((e:any) => e.minuto <= minVisivel)
                .sort((a:any, b:any) => a.minuto - b.minuto);

              const golsMeusAtuais = eventosExibidos.filter((e:any) => e.isMeuGolo);
              const golsOpAtuais = eventosExibidos.filter((e:any) => !e.isMeuGolo);
              
              const vitoria = golsMeusAtuais.length > golsOpAtuais.length;
              const empate = golsMeusAtuais.length === golsOpAtuais.length;

              return (
                <div key={index} className={`bg-[#0B101A] border-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${isCurrent ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-800/80 opacity-60'}`}>
                  
                  {/* CABEÇALHO DA PARTIDA (PLACAR) */}
                  <div className="p-6 flex flex-col md:flex-row items-center justify-between border-b border-slate-800/60 bg-slate-900/40">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 w-1/3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Você</span>
                      <span className="text-xl font-black text-white uppercase tracking-tighter text-center md:text-left">{meuNomeTime}</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center w-1/3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{partida.fase}</div>
                      <div className="flex items-center gap-4">
                        <span className={`text-5xl font-black font-mono tracking-tighter ${isCurrent ? 'text-white' : vitoria ? 'text-emerald-500' : empate ? 'text-slate-400' : 'text-red-500'}`}>
                          {golsMeusAtuais.length}
                        </span>
                        <span className="text-2xl font-black text-slate-600">x</span>
                        <span className={`text-5xl font-black font-mono tracking-tighter ${isCurrent ? 'text-white' : !vitoria && !empate ? 'text-emerald-500' : empate ? 'text-slate-400' : 'text-red-500'}`}>
                          {golsOpAtuais.length}
                        </span>
                      </div>
                      <div className="mt-2 w-full max-w-[150px]">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mb-1">
                          <span>TEMPO</span><span>{minVisivel}'</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(minVisivel / 90) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 w-1/3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Adversário CPU</span>
                      <span className="text-xl font-black text-white uppercase tracking-tighter text-center md:text-right">{partida.oponente}</span>
                    </div>
                  </div>

                  {/* LINHA DO TEMPO UNIFICADA */}
                  <div className="p-6 bg-[#080B12]">
                    <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4 text-center">Eventos da Partida</h4>
                    
                    <div className="flex flex-col gap-3 min-h-[100px] max-h-[300px] overflow-y-auto custom-scrollbar px-2">
                      {eventosExibidos.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-600 text-xs font-bold uppercase tracking-widest">
                          {minVisivel > 0 ? 'Jogo truncado no meio campo...' : 'Aguardando apito inicial'}
                        </div>
                      ) : (
                        eventosExibidos.map((ev: any, idx: number) => (
                          <div key={idx} className={`flex items-center w-full ${ev.isMeuGolo ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${ev.isMeuGolo ? 'bg-emerald-950/30 border border-emerald-900/50 flex-row' : 'bg-red-950/30 border border-red-900/50 flex-row-reverse'}`}>
                              <span className="text-sm font-black text-slate-400 font-mono">{ev.minuto}'</span>
                              <span className="text-xl drop-shadow-lg">⚽</span>
                              <span className={`text-sm font-bold uppercase tracking-wider ${ev.isMeuGolo ? 'text-emerald-400' : 'text-red-400'}`}>
                                {ev.jogador}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* CONTROLES DA PARTIDA ATUAL (PLAY / NEXT) */}
                  {isCurrent && (
                    <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-center items-center">
                      {!isSimulandoPartida && matchMinute === 0 && (
                        <button onClick={() => setIsSimulandoPartida(true)} className="px-8 py-3 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-lg hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          ▶️ Iniciar Partida
                        </button>
                      )}
                      
                      {isSimulandoPartida && (
                        <div className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-lg text-emerald-400 font-bold uppercase tracking-widest">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                          Simulando {matchMinute}'
                        </div>
                      )}

                      {!isSimulandoPartida && matchMinute >= 90 && (
                        <button onClick={() => handleProximaPartida(partidas.length)} className="px-8 py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded-lg hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                          {index === partidas.length - 1 ? '🏆 Ver Resultados Finais' : '⏭️ Próxima Partida'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TELA FINAL DE RESULTADOS */}
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
  // GAMEPLAY (DRAFT ATIVO COM PICKS)
  // ==========================================
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const draftOponente = dadosSala?.draftInfoSecundaria;
  const picksDisponiveis = 3 - (dadosSala?.picksAtuais || 0);
  const mediasDraft = calcularMedias(meuTimeEscalado); 

  // Bloqueio de posições preenchidas
  const isPosicaoLotada = (posicaoJogador: string) => {
    let vagasTotais = 0;
    let vagasOcupadas = 0;
    posicoesAtuais.forEach(slot => {
      if (slot.label === posicaoJogador) {
        vagasTotais++;
        if (meuTimeEscalado[slot.id]) vagasOcupadas++;
      }
    });
    if (vagasTotais === 0) return false; 
    return vagasOcupadas >= vagasTotais;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* BARRA DE PROGRESSO GLOBAL NO TOPO DA TELA */}
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-900 z-50">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${isMeuTurno ? 'bg-emerald-500 shadow-[0_0_15px_#10B981]' : 'bg-amber-500 shadow-[0_0_15px_#F59E0B]'}`} 
          style={{ width: `${(tempoRestante / (dadosSala?.configuracoes?.tempoJogada || 30)) * 100}%` }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      <aside className="w-96 h-full bg-slate-900/70 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col z-10 shadow-2xl overflow-hidden relative mt-2">
        
        {/* TELA DE ESPERA DO TURNO DO OPONENTE */}
        <div className={`absolute inset-0 bg-slate-900/95 z-50 p-8 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out border-r-4 border-slate-700 ${!isMeuTurno ? 'translate-x-0' : '-translate-x-full'}`}>
          <h3 className="text-amber-500 font-black text-xs uppercase tracking-[0.3em] mb-8 animate-pulse">TURNO DO ADVERSÁRIO</h3>
          <h2 className="text-3xl font-black text-white uppercase text-center mb-8">{oponenteAtualNome}</h2>
          <div className="w-full bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
            {draftOponente?.isRolling ? (
              <div className="animate-pulse"><div className="text-4xl mb-3">🎲</div><div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Sorteando Nação...</div></div>
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
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="mb-4 p-4 rounded-xl border text-center bg-emerald-900/20 border-emerald-500/50 shadow-emerald-500/10 shadow-lg">
            <h2 className="font-black text-2xl uppercase tracking-tighter text-emerald-400">SEU TURNO</h2>
            <p className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mt-1">Escale seu time com sabedoria</p>
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
                
                <div className="bg-emerald-950/40 text-emerald-400 text-[10px] uppercase tracking-widest font-black text-center py-2 border-b border-emerald-900/50">
                  ESCOLHAS RESTANTES: {picksDisponiveis}
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {selecaoSorteada.jogadores.map(jog => {
                    const jaEscolhido = dadosSala?.jogadoresDraftados?.includes(jog.id);
                    const isSelecionado = jogadorSelecionado?.id === jog.id;
                    const isGoleiro = jog.posicao === 'GOL';

                    // 1. Bloqueia se a posição já está preenchida
                    const posicaoLotada = isPosicaoLotada(jog.posicao);
                    
                    // 2. Bloqueia se o jogador (mesmo nome) já está escalado no seu time vindo de outro ano
                    const jaPossuiOutraVersao = Object.values(meuTimeEscalado).some(
                      (j: any) => j && j.nome === jog.nome && j.id !== jog.id
                    );

                    const bloqueado = jaEscolhido || posicaoLotada || jaPossuiOutraVersao;

                    return (
                      <button 
                        key={jog.id} 
                        disabled={bloqueado} 
                        onClick={() => setJogadorSelecionado(isSelecionado ? null : jog)} 
                        className={`relative w-full text-left border-2 rounded-xl p-2.5 flex justify-between items-center transition-all overflow-hidden ${
                          jaEscolhido 
                            ? 'border-red-950 bg-red-950/10 opacity-30 cursor-not-allowed grayscale' 
                            : jaPossuiOutraVersao
                              ? 'border-purple-900 bg-purple-950/20 opacity-40 cursor-not-allowed grayscale'
                              : posicaoLotada
                                ? 'border-slate-800 bg-slate-900/50 opacity-40 cursor-not-allowed grayscale'
                                : isSelecionado 
                                  ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] transform scale-[1.02]' 
                                  : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800'
                        }`}
                      >
                        {/* ETIQUETAS DE STATUS */}
                        {jaEscolhido && (
                          <span className="absolute top-0 right-0 px-2 py-0.5 text-[8px] font-black text-white bg-red-600 rounded-bl-lg">
                            INDISPONÍVEL
                          </span>
                        )}
                        {jaPossuiOutraVersao && !jaEscolhido && (
                          <span className="absolute top-0 right-0 px-2 py-0.5 text-[8px] font-black text-white bg-purple-600 rounded-bl-lg">
                            OUTRA VERSÃO ESCALADA
                          </span>
                        )}
                        {posicaoLotada && !jaEscolhido && !jaPossuiOutraVersao && (
                          <span className="absolute top-0 right-0 px-2 py-0.5 text-[8px] font-black text-white bg-slate-600 rounded-bl-lg">
                            VAGA PREENCHIDA
                          </span>
                        )}

                        <div className="flex items-center gap-2 max-w-[50%]">
                          <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-[9px] font-black ${isGoleiro ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-400'}`}>
                            {jog.posicao}
                          </span>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold truncate max-w-[90px] ${bloqueado ? 'text-slate-500' : isSelecionado ? 'text-white' : 'text-slate-200'}`}>
                              {jog.nome}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <div className="flex flex-col items-center">
                            <span className={`font-mono font-black text-[11px] ${bloqueado ? 'text-slate-700' : 'text-red-400'}`}>{jog.ataque || 50}</span>
                            <span className="text-[7px] text-slate-500 uppercase font-bold tracking-widest">ATQ</span>
                          </div>
                          <div className="flex flex-col items-center border-r border-slate-700/50 pr-3">
                            <span className={`font-mono font-black text-[11px] ${bloqueado ? 'text-slate-700' : 'text-blue-400'}`}>{jog.defesa || 50}</span>
                            <span className="text-[7px] text-slate-500 uppercase font-bold tracking-widest">DEF</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`font-mono font-black text-sm ${bloqueado ? 'text-slate-600' : isSelecionado ? 'text-emerald-400' : 'text-slate-200'}`}>
                              {jog.overall}
                            </span>
                            <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">OVR</span>
                          </div>
                        </div>
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
            <button 
              onClick={selecaoSorteada ? handlePassarTurno : handleRoll} 
              disabled={!isMeuTurno || (isRolling && !selecaoSorteada) || totalEscalados === totalSlots} 
              className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl ${
                (!isMeuTurno || totalEscalados === totalSlots) 
                ? 'bg-slate-900 text-slate-600 border border-slate-800 shadow-none' 
                : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 transform hover:-translate-y-1'
              }`}
            >
              {selecaoSorteada ? 'Rolar Novamente 🎲' : 'Rolar Base 🎲'}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative mt-2">
        <div className="flex items-center justify-center w-full mb-6">
          <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-widest bg-slate-900/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-800 shadow-xl">{meuNomeTime}</h2>
        </div>
        {jogadorSelecionado && <div className="absolute top-28 z-50 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">Posicione: {jogadorSelecionado.nome} ({jogadorSelecionado.posicao})</div>}
        <Campo formacaoAtiva={formacao} jogadoresEscalados={meuTimeEscalado} slotsValidos={slotsValidos} onSlotClick={handleSlotClick} />
      </main>

      <aside className="w-80 h-full bg-slate-900/70 backdrop-blur-2xl border-l border-slate-800/80 p-6 flex flex-col z-10 shadow-2xl mt-2">
        
        {/* BOX SCORE */}
        <div className="flex justify-between items-end border-b border-slate-700 pb-4 mb-4">
          <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Box Score · {totalEscalados}/11</span>
          <span className="text-5xl font-black tracking-tighter text-emerald-400">{mediasDraft.overall}</span>
        </div>

        <div className="flex gap-6 mb-6">
          <div>
            <span className="text-3xl font-black text-white">{mediasDraft.ataque}</span>
            <span className="text-[9px] uppercase tracking-widest font-bold ml-1 text-slate-500">Ataque</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white">{mediasDraft.defesa}</span>
            <span className="text-[9px] uppercase tracking-widest font-bold ml-1 text-slate-500">Defesa</span>
          </div>
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