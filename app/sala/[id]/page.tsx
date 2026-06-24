'use client';

import { useParams } from 'next/navigation';
import Campo from '../../../components/jogo/Campo';
import LobbyScreen from '../../../components/jogo/LobbyScreen'; // NOSSA NOVA TELA
import { useSalaPartida } from '../../../hooks/useSalaPartida';
import { mapFormacoes } from '../../../lib/formacoes';
import { Jogador } from '../../../lib/selecoes';

export default function SalaPartida() {
  const params = useParams();
  const salaId = params.id as string;

  const {
    dadosSala, carregando, meuId, outroJogadorId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado,
    minutoJogo, placarLocal, handleComecarDraft, handleRoll, handleSlotClick, router
  } = useSalaPartida(salaId);

  if (carregando) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 animate-pulse font-mono">Conectando aos servidores...</div>;

  const meuNomeTime = dadosSala?.nomesTimes?.[meuId] || 'Seu Time';
  const oponenteNomeTime = outroJogadorId ? (dadosSala?.nomesTimes?.[outroJogadorId] || 'CPU') : 'CPU';
  const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
  const timeOponente = outroJogadorId ? dadosSala?.times?.[outroJogadorId] || {} : {};
  const posicoesAtuais = mapFormacoes[formacao] || mapFormacoes['4-3-3'];
  const totalSlots = 11;
  const totalEscalados = Object.keys(meuTimeEscalado).length;

  // ==========================================
  // TELA 1: PREPARAÇÃO (AGORA ISOLADA!)
  // ==========================================
  if (dadosSala?.status === 'aguardando_jogadores') {
    return (
      <LobbyScreen 
        salaId={salaId}
        dadosSala={dadosSala}
        meuId={meuId}
        isAdmin={isAdmin}
        jogadoresConectados={jogadoresConectados}
        nomeTimeTemp={nomeTimeTemp}
        setNomeTimeTemp={setNomeTimeTemp}
        salvarNomeTime={salvarNomeTime}
        handleComecarDraft={handleComecarDraft}
      />
    );
  }

  // ==========================================
  // TELA 2: SIMULAÇÃO DA PARTIDA
  // ==========================================
  if (dadosSala?.status === 'simulacao') {
    const meuTimeTyped = meuTimeEscalado as unknown as Record<string, Jogador>;
    const opTimeTyped = timeOponente as unknown as Record<string, Jogador>;

    const meuAtaque = Math.round(Object.values(meuTimeTyped).reduce((a, j) => a + j.ataque, 0) / 11);
    const minhaDefesa = Math.round(Object.values(meuTimeTyped).reduce((a, j) => a + j.defesa, 0) / 11);
    const opAtaque = Math.round(Object.values(opTimeTyped).reduce((a, j) => a + j.ataque, 0) / 11);
    const opDefesa = Math.round(Object.values(opTimeTyped).reduce((a, j) => a + j.defesa, 0) / 11);

    const isFim = minutoJogo >= 90;
    const ganhei = placarLocal.meu > placarLocal.op;
    const empate = placarLocal.meu === placarLocal.op;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
        {/* MANTIVE A TELA DE SIMULAÇÃO AQUI (Se quiser isolar no futuro, criaremos SimulacaoScreen.tsx) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>
        <div className="relative z-10 w-full max-w-4xl text-center mb-12">
          <div className="inline-block bg-slate-900/80 border border-slate-700 px-8 py-3 rounded-full mb-6 shadow-2xl backdrop-blur-md">
            <span className="text-emerald-500 font-mono font-black text-2xl tracking-widest">{isFim ? 'FIM DE JOGO' : `${minutoJogo}' MIN`}</span>
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className={`flex flex-col items-end transition-all ${isFim && ganhei ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">{meuNomeTime}</h2>
              <div className="flex gap-4 mt-2 opacity-70"><span className="text-xs font-mono bg-blue-900/50 text-blue-400 px-2 py-1 rounded">ATA {meuAtaque}</span><span className="text-xs font-mono bg-amber-900/50 text-amber-400 px-2 py-1 rounded">DEF {minhaDefesa}</span></div>
            </div>
            <div className="flex items-center gap-6 text-7xl font-black font-mono">
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">{placarLocal.meu}</div>
              <span className="text-slate-600 text-5xl">X</span>
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">{placarLocal.op}</div>
            </div>
            <div className={`flex flex-col items-start transition-all ${isFim && !ganhei && !empate ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">{oponenteNomeTime}</h2>
              <div className="flex gap-4 mt-2 opacity-70"><span className="text-xs font-mono bg-blue-900/50 text-blue-400 px-2 py-1 rounded">ATA {opAtaque}</span><span className="text-xs font-mono bg-amber-900/50 text-amber-400 px-2 py-1 rounded">DEF {opDefesa}</span></div>
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

  // ==========================================
  // TELA 3: GAMEPLAY (DRAFT ATIVO)
  // ==========================================
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const totalEscaladosOp = Object.keys(timeOponente).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>

      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col z-10">
        <div className={`mb-4 p-4 rounded-xl border-2 text-center transition-colors ${isMeuTurno ? 'bg-emerald-900/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border-slate-700'}`}>
          <h2 className={`font-black text-xl uppercase ${isMeuTurno ? 'text-emerald-400' : 'text-slate-500'}`}>{isMeuTurno ? 'SEU TURNO' : 'VEZ DO OPONENTE'}</h2>
          <div className="text-4xl font-mono font-black text-white mt-1">00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}</div>
        </div>

        <div className="mb-4">
          <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest mb-2 flex justify-between"><span>Esquema Tático</span>{!podeMudarTatica && <span className="text-red-400">FIXO</span>}</h3>
          <div className="grid grid-cols-3 gap-1.5">
            {['4-3-3', '4-4-2', '3-5-2'].map(f => (
              <button key={f} onClick={() => podeMudarTatica && setFormacao(f)} disabled={!podeMudarTatica} className={`py-1.5 rounded text-xs font-bold transition-all border ${formacao === f ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 border border-slate-800 bg-slate-950/40 rounded-xl p-4 flex flex-col overflow-y-auto mt-2">
          {!isMeuTurno ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50"><span className="text-4xl mb-4">⏳</span><p className="text-[10px] text-slate-400 font-bold uppercase">Aguarde...</p></div>
          ) : isRolling ? (
            <div className="flex flex-col items-center justify-center h-full animate-pulse"><div className="text-3xl animate-spin">🎲</div></div>
          ) : selecaoSorteada ? (
            <div className="flex flex-col h-full">
              <h4 className="text-sm font-black text-white mb-2 pb-2 border-b border-slate-800">{selecaoSorteada.pais}</h4>
              <div className="space-y-1.5 flex-1 overflow-y-auto">
                <p className="text-[9px] text-emerald-400 mb-1 font-bold">1. Selecione a carta<br/>2. Clique no campo para escalar</p>
                {selecaoSorteada.jogadores.map(jog => {
                  const jaEscolhido = dadosSala?.jogadoresDraftados?.includes(jog.id);
                  const isSelecionado = jogadorSelecionado?.id === jog.id;
                  return (
                    <button key={jog.id} disabled={jaEscolhido} onClick={() => setJogadorSelecionado(isSelecionado ? null : jog)} className={`w-full text-left border rounded px-2 py-2 flex justify-between items-center text-xs transition-all ${jaEscolhido ? 'border-red-900/50 bg-slate-900 opacity-30' : isSelecionado ? 'bg-emerald-900/50 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'bg-slate-900 border-slate-800'}`}>
                      <div><span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400 mr-2 uppercase">{jog.posicao}</span><span className={`${jaEscolhido ? 'line-through text-red-400' : isSelecionado ? 'text-white font-bold' : 'text-slate-200'}`}>{jog.nome}</span></div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-slate-500 uppercase">Role o dado</div>
          )}
        </div>

        <div className="mt-4 pt-3">
          <button onClick={handleRoll} disabled={!isMeuTurno || isRolling || totalEscalados === totalSlots || jogadorSelecionado !== null} className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.1em] transition-all ${(!isMeuTurno || totalEscalados === totalSlots) ? 'bg-slate-800 text-slate-600 border-slate-700' : jogadorSelecionado ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 border-emerald-400'}`}>
            {jogadorSelecionado ? 'Clique num slot vazio 👉' : 'Rolar Dado 🎲'}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="flex items-center justify-between w-full max-w-2xl mb-4">
          <h2 className="text-xl font-black text-emerald-400 uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">{meuNomeTime}</h2>
        </div>
        <Campo formacaoAtiva={formacao} jogadoresEscalados={meuTimeEscalado} isAlocando={!!jogadorSelecionado} onSlotClick={handleSlotClick} />
      </main>

      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-l border-slate-800 p-6 flex flex-col z-10">
        <div className="border-b border-slate-700 pb-3 mb-4">
          <h3 className="font-bold text-xs uppercase text-slate-400">Seu Elenco ({totalEscalados}/{totalSlots})</h3>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {['gol', 'zag1', 'zag2', 'le', 'ld', 'vol', 'mc1', 'mc2', 'pe', 'pd', 'ca'].map((posId) => {
            const atleta = meuTimeEscalado[posId];
            return (
              <div key={posId} onClick={() => handleSlotClick(posId)} className={`flex items-center gap-3 border rounded-lg p-2 transition-all duration-300 ${atleta ? 'bg-slate-800/60 border-slate-700' : jogadorSelecionado ? 'bg-emerald-950/40 border-emerald-500 border-dashed cursor-pointer' : 'bg-slate-950/20 border-slate-900 border-dashed'}`}>
                <div className={`w-8 h-8 rounded flex items-center justify-center font-mono font-black text-[10px] uppercase ${atleta ? 'bg-slate-900 text-white' : 'bg-slate-950 text-slate-600'}`}>{posId.substring(0,3)}</div>
                <div className="flex-1 truncate"><div className={`text-sm font-bold ${atleta ? 'text-slate-100' : 'text-slate-600 uppercase text-[10px]'}`}>{atleta ? atleta.nome : 'Slot Livre'}</div></div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}