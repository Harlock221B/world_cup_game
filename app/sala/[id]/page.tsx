'use client';

import { useParams } from 'next/navigation';
import Campo from '../../../components/jogo/Campo';
import LobbyScreen from '../../../components/jogo/LobbyScreen';
import { useSalaPartida } from '../../../hooks/useSalaPartida';
import { mapFormacoes } from '../../../lib/formacoes';
import { Jogador } from '../../../lib/selecoes';

export default function SalaPartida() {
  const params = useParams();
  const salaId = params.id as string;

  const {
    dadosSala, carregando, meuId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado, slotsValidos,
    minutoJogo, placarLocal, handleComecarDraft, handleRoll, handleSlotClick, router
  } = useSalaPartida(salaId);

  if (carregando) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 animate-pulse font-mono">Conectando...</div>;

  // Lógica multi-player para saber quem estamos observando
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

  if (dadosSala?.status === 'simulacao') {
    const isFim = minutoJogo >= 90;
    const ganhei = placarLocal.meu > placarLocal.op;
    const empate = placarLocal.meu === placarLocal.op;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>
        <div className="relative z-10 w-full max-w-4xl text-center mb-12">
          <div className="inline-block bg-slate-900/80 border border-slate-700 px-8 py-3 rounded-full mb-6 shadow-2xl backdrop-blur-md">
            <span className="text-emerald-500 font-mono font-black text-2xl tracking-widest">{isFim ? 'FIM DE JOGO' : `${minutoJogo}' MIN`}</span>
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className={`flex flex-col items-end transition-all ${isFim && ganhei ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">{meuNomeTime}</h2>
            </div>
            <div className="flex items-center gap-6 text-7xl font-black font-mono">
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">{placarLocal.meu}</div>
              <span className="text-slate-600 text-5xl">X</span>
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">{placarLocal.op}</div>
            </div>
            <div className={`flex flex-col items-start transition-all ${isFim && !ganhei && !empate ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">Adversário</h2>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-xl">
          {!isFim ? (
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div className="h-full bg-emerald-500 transition-all duration-100 ease-linear" style={{ width: `${(minutoJogo / 90) * 100}%` }}></div></div>
          ) : (
            <div className={`p-6 rounded-2xl text-center border-2 shadow-2xl ${empate ? 'bg-slate-800 border-slate-600' : ganhei ? 'bg-emerald-900/50 border-emerald-500' : 'bg-red-900/50 border-red-500'}`}>
              <h1 className={`text-5xl font-black uppercase tracking-tighter ${empate ? 'text-white' : ganhei ? 'text-emerald-400' : 'text-red-400'}`}>{empate ? 'EMPATE TÉCNICO' : ganhei ? 'VITÓRIA HISTÓRICA!' : 'DERROTA ESMAGADORA'}</h1>
              <button onClick={() => router.push('/')} className="mt-6 px-8 py-3 bg-white text-slate-900 font-bold uppercase tracking-widest rounded hover:bg-slate-200">Voltar ao Lobby</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // GAMEPLAY (DRAFT ATIVO)
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const draftOponente = dadosSala?.draftInfoSecundaria;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative selection:bg-emerald-500 selection:text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      {/* PAINEL ESQUERDO / PAINEL DO OPONENTE */}
      <aside className="w-96 h-full bg-slate-900/70 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col z-10 shadow-2xl overflow-hidden relative">
        
        {/* === TELA QUANDO FOR A VEZ DO OPONENTE (DESLIZA POR CIMA) === */}
        <div className={`absolute inset-0 bg-slate-900/95 z-50 p-8 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out border-r-4 border-slate-700
          ${!isMeuTurno ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Turno em Progresso</h3>
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-4xl mb-6 shadow-inner">
            ⏳
          </div>
          
          <h2 className="text-2xl font-black text-white uppercase text-center mb-8">{oponenteAtualNome}</h2>

          {/* O QUE O OPONENTE ROLOU */}
          <div className="w-full bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
            {draftOponente?.isRolling ? (
              <div className="animate-pulse">
                <div className="text-4xl mb-3">🎲</div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Sorteando Nação...</div>
              </div>
            ) : draftOponente?.pais ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Nação Sorteada</div>
                <div className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{draftOponente.pais}</div>
                <div className="text-emerald-500 font-mono font-bold text-lg mb-4">{draftOponente.ano}</div>
                <div className="text-[9px] text-amber-500 uppercase font-black bg-amber-500/10 py-1.5 rounded tracking-widest">
                  Escolhendo carta em segredo...
                </div>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest py-4">
                Aguardando Rolagem
              </div>
            )}
          </div>

          <div className="w-full mt-8">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mb-2">
              <span>TEMPO</span>
              <span>00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-slate-500 transition-all duration-1000 ease-linear" style={{ width: `${(tempoRestante / (dadosSala?.configuracoes?.tempoJogada || 30)) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* === TELA NORMAL QUANDO FOR O SEU TURNO === */}
        <div className="p-6 flex flex-col h-full">
          <div className="mb-4 p-4 rounded-xl border text-center bg-emerald-900/20 border-emerald-500/50 shadow-emerald-500/10 shadow-lg">
            <h2 className="font-black text-xl uppercase tracking-tighter text-emerald-400">SEU TURNO</h2>
            <div className="text-4xl font-mono font-black text-white mt-1">00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}</div>
          </div>

          <div className="mb-5">
            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2.5 flex justify-between">
              <span>Esquema Tático</span>{!podeMudarTatica && <span className="text-red-400">FIXO</span>}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['4-3-3', '4-4-2', '3-5-2'].map(f => (
                <button 
                  key={f} onClick={() => podeMudarTatica && setFormacao(f)} disabled={!podeMudarTatica} 
                  className={`py-2 rounded-lg text-xs font-black transition-all border ${formacao === f ? 'bg-blue-600 border-blue-500 text-white transform scale-105' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-slate-950/60 rounded-2xl p-4 flex flex-col overflow-y-auto border border-slate-800 shadow-inner relative">
            {isRolling ? (
              <div className="flex flex-col items-center justify-center h-full"><div className="text-5xl animate-bounce">🎲</div><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-4">Sorteando Base...</p></div>
            ) : selecaoSorteada ? (
              <div className="flex flex-col h-full">
                <div className="mb-3 pb-3 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/50 -mx-4 -mt-4 p-4 rounded-t-2xl">
                  <div><div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Nação Sorteada</div><h4 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{selecaoSorteada.pais}</h4></div>
                  <div className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-lg font-black text-white font-mono shadow-inner">{selecaoSorteada.ano}</div>
                </div>
                <div className="space-y-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                  <p className="text-[9px] text-slate-400 mb-2 uppercase tracking-widest text-center border-b border-slate-800/50 pb-2">Selecione para Escalar</p>
                  {selecaoSorteada.jogadores.map(jog => {
                    const jaEscolhido = dadosSala?.jogadoresDraftados?.includes(jog.id);
                    const isSelecionado = jogadorSelecionado?.id === jog.id;
                    const isGoleiro = jog.posicao === 'GOL';

                    return (
                      <button 
                        key={jog.id} disabled={jaEscolhido} onClick={() => setJogadorSelecionado(isSelecionado ? null : jog)} 
                        className={`w-full text-left border-2 rounded-xl p-2.5 flex justify-between items-center transition-all
                          ${jaEscolhido ? 'border-red-950 bg-red-950/10 opacity-30 cursor-not-allowed' : isSelecionado ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] transform scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'}`}
                      >
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
            <button 
              onClick={handleRoll} disabled={!isMeuTurno || isRolling || totalEscalados === totalSlots || jogadorSelecionado !== null} 
              className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl
                ${(!isMeuTurno || totalEscalados === totalSlots) ? 'bg-slate-900 text-slate-600 border border-slate-800 shadow-none' : jogadorSelecionado ? 'bg-emerald-500 text-slate-950 border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse' : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300'}`}
            >
              {jogadorSelecionado ? 'Escolha no Campo 👉' : 'Rolar Base 🎲'}
            </button>
          </div>
        </div>
      </aside>

      {/* GRAMADO CENTRAL */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
        <div className="flex items-center justify-center w-full mb-6">
          <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-widest bg-slate-900/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-800 shadow-xl">
            {meuNomeTime}
          </h2>
        </div>
        
        {jogadorSelecionado && (
          <div className="absolute top-24 z-50 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">
            Posicione: {jogadorSelecionado.nome} ({jogadorSelecionado.posicao})
          </div>
        )}

        {/* CORREÇÃO DO ERRO DA VERCEL (isAlocando Removido!) */}
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
              <div 
                key={pos.id} 
                onClick={() => handleSlotClick(pos.id)} 
                className={`flex items-center gap-3 border rounded-xl p-2.5 transition-all duration-300 relative overflow-hidden
                  ${atleta ? 'bg-slate-950/80 border-slate-800' : jogadorSelecionado ? isValidSlot ? 'bg-emerald-950/40 border-emerald-500 border-dashed cursor-pointer hover:bg-emerald-900/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-red-950/10 border-red-900/30 opacity-40 cursor-not-allowed scale-[0.98]' : 'bg-slate-900/50 border-slate-800/50 border-dashed'}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-black text-[10px] uppercase shrink-0
                  ${atleta ? 'bg-slate-800 text-slate-300' : 'bg-slate-950 border border-slate-800 text-slate-600'}`}>
                  {pos.label}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold truncate ${atleta ? 'text-slate-100' : 'text-slate-600 uppercase text-[9px] tracking-widest'}`}>
                    {atleta ? atleta.nome : 'Slot Livre'}
                  </div>
                </div>

                {atleta && (
                  <div className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-black text-xs px-2 py-1 rounded">
                    {atleta.overall}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}