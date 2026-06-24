'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import Campo from '../../../components/jogo/Campo';
import { selecoesMock, Selecao, Jogador } from '../../../lib/selecoes';

const mapFormacoes: Record<string, any[]> = {
  '4-3-3': [{ id: 'gol', label: 'GOL', top: '90%', left: '50%' }], // Placeholder, Campo.tsx tem o mapeamento real
  '4-4-2': [],
  '3-5-2': []
};

export default function SalaPartida() {
  const params = useParams();
  const router = useRouter();
  const salaId = params.id as string;

  // Estados Táticos
  const [formacao, setFormacao] = useState<string>('4-3-3');
  const [estilo, setEstilo] = useState('Equilibrado');
  
  const [dadosSala, setDadosSala] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [meuId, setMeuId] = useState<string>('');

  // Estados do Draft
  const [isRolling, setIsRolling] = useState(false);
  const [selecaoSorteada, setSelecaoSorteada] = useState<Selecao | null>(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  
  // NOVO: Jogador que está "na mão" para ser colocado no campo
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);
  const [nomeTimeTemp, setNomeTimeTemp] = useState('');

  // CONEXÃO COM FIREBASE
  useEffect(() => {
    if (!salaId) return;

    let localId = sessionStorage.getItem('jogadorId');
    if (!localId) {
      localId = 'JOG_' + Math.random().toString(36).substring(2, 6).toUpperCase();
      sessionStorage.setItem('jogadorId', localId);
    }
    setMeuId(localId);

    const docRef = doc(db, "salas", salaId);
    const unsub = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setDadosSala(dados);
        setCarregando(false);

        if (!dados.nomesTimes?.[localId] && !nomeTimeTemp) {
          setNomeTimeTemp('FC ' + localId.substring(4));
        } else if (dados.nomesTimes?.[localId] && !nomeTimeTemp) {
          setNomeTimeTemp(dados.nomesTimes[localId]);
        }

        if (dados.status === 'aguardando_jogadores') {
          const jogadoresAtuais = dados.jogadores || [];
          if (!jogadoresAtuais.includes(localId) && jogadoresAtuais.length < (dados.configuracoes?.tamanhoChave || 2)) {
            await updateDoc(docRef, { jogadores: arrayUnion(localId) });
          }
        }
      } else {
        alert("Sala não encontrada!");
        router.push('/');
      }
    });
    return () => unsub();
  }, [salaId, router]);

  const isMeuTurno = dadosSala?.turnoAtual === meuId;
  
  // SISTEMA DE TIMEOUT E AUTO-PICK
  useEffect(() => {
    if (dadosSala?.status === 'draft' && dadosSala?.tempoFim) {
      const interval = setInterval(() => {
        const agora = Date.now();
        const restante = Math.max(0, Math.floor((dadosSala.tempoFim - agora) / 1000));
        setTempoRestante(restante);

        if (restante === 0 && isMeuTurno) {
          executarAutoPick();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dadosSala?.status, dadosSala?.tempoFim, isMeuTurno]);

  // AUTO-PICK SE O TEMPO ACABAR
  const executarAutoPick = async () => {
    if (!dadosSala) return;
    const todosJogadores = selecoesMock.flatMap(s => s.jogadores);
    const disponiveis = todosJogadores.filter(p => !dadosSala.jogadoresDraftados?.includes(p.id));
    if (disponiveis.length === 0) return; 

    const jogadorAleatorio = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const meuTime = dadosSala.times?.[meuId] || {};
    
    // Procura por ID e não por label para funcionar com o Campo.tsx mapeado
    const posicoes = Object.keys(meuTime); // posições que já têm jogador
    
    // Lista de todos os IDs de slots possíveis (do Campo.tsx)
    const todosSlotsIds = ['gol', 'zag1', 'zag2', 'le', 'ld', 'vol', 'mc1', 'mc2', 'pe', 'pd', 'ca'];
    const slotVazioId = todosSlotsIds.find(id => !meuTime[id]);

    if (slotVazioId) {
      await alocarJogador(slotVazioId, jogadorAleatorio);
    }
  };

  const salvarNomeTime = async () => {
    if (!nomeTimeTemp.trim()) return;
    await updateDoc(doc(db, "salas", salaId), {
      [`nomesTimes.${meuId}`]: nomeTimeTemp.trim()
    });
  };

  const handleComecarDraft = async () => {
    const jogadoresConectados = dadosSala.jogadores || [];
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;

    await updateDoc(doc(db, "salas", salaId), {
      status: 'draft',
      turnoAtual: jogadoresConectados[0], 
      tempoFim: Date.now() + (tempoConfig * 1000), 
      jogadoresDraftados: [], 
      times: { [jogadoresConectados[0]]: {}, [jogadoresConectados[1] || 'CPU']: {} }
    });
  };

  const handleRoll = () => {
    setIsRolling(true);
    setSelecaoSorteada(null);
    setJogadorSelecionado(null); // Limpa a seleção se rolar o dado
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * selecoesMock.length);
      setSelecaoSorteada(selecoesMock[indiceAleatorio]);
      setIsRolling(false);
    }, 1000);
  };

  // ALOCA O JOGADOR NO SLOT ESPECÍFICO
  const alocarJogador = async (posId: string, jogador: Jogador) => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    const meuTime = dadosSala.times?.[meuId] || {};
    const novoTime = { ...meuTime, [posId]: jogador };

    const jogadoresConectados = dadosSala.jogadores || [];
    const outroJogador = jogadoresConectados.find((id: string) => id !== meuId) || meuId;

    await updateDoc(doc(db, "salas", salaId), {
      [`times.${meuId}`]: novoTime, 
      jogadoresDraftados: arrayUnion(jogador.id), 
      turnoAtual: outroJogador, 
      tempoFim: Date.now() + (tempoConfig * 1000) 
    });

    setSelecaoSorteada(null); 
    setJogadorSelecionado(null);
  };

  if (carregando) return <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-emerald-500 font-mono text-xl animate-pulse">Conectando...</div>;

  // ==========================================
  // TELA 1: PREPARAÇÃO
  // ==========================================
  if (dadosSala?.status === 'aguardando_jogadores') {
    // ... [MANTIDO EXATAMENTE O SEU LOBBY DE ESPERA AQUI PARA NÃO FICAR MUITO LONGO]
    const jogadoresConectados = dadosSala.jogadores || [];
    const tamanhoChave = dadosSala.configuracoes?.tamanhoChave || 2; 
    const isAdmin = jogadoresConectados[0] === meuId;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>
        <header className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-10 pb-6 border-b border-slate-800 flex justify-between items-end">
          <div><span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mb-1">Lobby de Torneio</span><h1 className="text-4xl font-black tracking-tighter text-white">SALA: <span className="text-emerald-400">{salaId}</span></h1></div>
          <div className="text-right"><div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Modo: {dadosSala.configuracoes?.modo}</div><div className="text-sm font-black text-white uppercase mt-1">Copa {tamanhoChave} Times</div></div>
        </header>
        <main className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Sua Franquia</h2>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-2">Nome do Time</label>
              <input type="text" value={nomeTimeTemp} onChange={(e) => setNomeTimeTemp(e.target.value)} onBlur={salvarNomeTime} placeholder="Digite seu time..." className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 font-black text-white outline-none focus:border-emerald-500 transition-colors" maxLength={20}/>
            </div>
            {isAdmin ? <button onClick={handleComecarDraft} className="w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/10">INICIAR DRAFT →</button> : <div className="w-full py-5 rounded-xl font-black uppercase tracking-[0.1em] text-center bg-slate-800 text-slate-400 border border-slate-700">Aguardando Host...</div>}
          </div>
          <div className="w-full md:w-2/3 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6 pb-4 border-b border-slate-800">Participantes da Chave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: tamanhoChave }).map((_, index) => {
                const isHuman = index < jogadoresConectados.length;
                const jogId = jogadoresConectados[index];
                const isMe = jogId === meuId;
                const nomeTeam = isHuman ? (dadosSala.nomesTimes?.[jogId] || `FC Convidado ${index + 1}`) : `CPU Bot ${index + 1}`;
                return (
                  <div key={index} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${isMe ? 'bg-emerald-950/30 border-emerald-500/50' : isHuman ? 'bg-blue-950/20 border-blue-900/50' : 'bg-slate-950/50 border-slate-800 border-dashed'}`}>
                    <div className={`w-10 h-10 rounded flex items-center justify-center font-black text-xs ${isMe ? 'bg-emerald-600 text-white' : isHuman ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>{isHuman ? `P${index + 1}` : 'CPU'}</div>
                    <div className="flex-1 min-w-0"><div className={`text-base font-black truncate uppercase ${isHuman ? 'text-white' : 'text-slate-500'}`}>{nomeTeam}</div><div className={`text-[10px] font-mono tracking-widest mt-0.5 ${isHuman ? 'text-emerald-400' : 'text-slate-600'}`}>{isMe ? 'VOCÊ' : isHuman ? 'HUMANO CONECTADO' : 'IA'}</div></div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // TELA 2: GAMEPLAY ATIVO
  // ==========================================
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const meuTimeEscalado = dadosSala?.times?.[meuId] || {}; 
  const totalSlots = 11; // 11 posições no campo
  const totalEscalados = Object.keys(meuTimeEscalado).length;

  const outroJogadorId = dadosSala?.jogadores?.find((id: string) => id !== meuId);
  const timeOponente = outroJogadorId ? dadosSala?.times?.[outroJogadorId] || {} : {};
  const totalEscaladosOp = Object.keys(timeOponente).length;
  const mediaAtaqueOp = totalEscaladosOp > 0 ? Math.round(Object.values(timeOponente).reduce((acc: any, j: any) => acc + j.ataque, 0) / totalEscaladosOp) : '--';
  const mediaDefesaOp = totalEscaladosOp > 0 ? Math.round(Object.values(timeOponente).reduce((acc: any, j: any) => acc + j.defesa, 0) / totalEscaladosOp) : '--';
  const meuNomeTime = dadosSala?.nomesTimes?.[meuId] || 'Meu Time';
  const oponenteNomeTime = outroJogadorId ? (dadosSala?.nomesTimes?.[outroJogadorId] || 'Oponente') : 'CPU';

  // Lógica quando o utilizador clica num slot vazio no campo
  const handleSlotClick = (posId: string) => {
    if (!isMeuTurno) return;
    
    // Se clicou num slot que já tem jogador, podíamos implementar substituição aqui.
    // Por enquanto, só permite alocar se tiver um jogador selecionado e o slot estiver vazio
    if (jogadorSelecionado && !meuTimeEscalado[posId]) {
      alocarJogador(posId, jogadorSelecionado);
    } else if (!jogadorSelecionado && !meuTimeEscalado[posId]) {
      alert("Primeiro, selecione um jogador da lista à esquerda!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

      {/* PAINEL ESQUERDO: TÁTICA E SORTEIO */}
      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col z-10">
        
        <div className={`mb-4 p-4 rounded-xl border-2 text-center transition-colors ${isMeuTurno ? 'bg-emerald-900/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border-slate-700'}`}>
          <h2 className={`font-black text-xl uppercase ${isMeuTurno ? 'text-emerald-400' : 'text-slate-500'}`}>
            {isMeuTurno ? 'SEU TURNO' : 'VEZ DO OPONENTE'}
          </h2>
          <div className="text-4xl font-mono font-black text-white mt-1">
            00:{tempoRestante < 10 ? `0${tempoRestante}` : tempoRestante}
          </div>
        </div>

        {/* CONTROLES TÁTICOS VOLTARAM PARA AQUI */}
        <div className="mb-4">
          <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest mb-2 flex justify-between">
            <span>Esquema Tático</span>
            {!podeMudarTatica && <span className="text-red-400">FIXO</span>}
          </h3>
          <div className="grid grid-cols-3 gap-1.5">
            {['4-3-3', '4-4-2', '3-5-2'].map(f => (
              <button 
                key={f}
                onClick={() => podeMudarTatica && setFormacao(f)}
                disabled={!podeMudarTatica}
                className={`py-1.5 rounded text-xs font-bold transition-all border
                  ${formacao === f ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest mb-2">Comportamento</h3>
          <div className="grid grid-cols-3 gap-1.5">
            {['Defensivo', 'Equilibrado', 'Ofensivo'].map(e => (
              <button 
                key={e} onClick={() => setEstilo(e)}
                className={`py-1.5 rounded text-[10px] font-bold transition-all border
                  ${estilo === e ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 border border-slate-800 bg-slate-950/40 rounded-xl p-4 flex flex-col overflow-y-auto mt-2">
          {!isMeuTurno ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50"><span className="text-4xl mb-4">⏳</span><p className="text-[10px] text-slate-400 font-bold uppercase">Aguarde o adversário...</p></div>
          ) : isRolling ? (
            <div className="flex flex-col items-center justify-center h-full animate-pulse"><div className="text-3xl animate-spin">🎲</div></div>
          ) : selecaoSorteada ? (
            <div className="flex flex-col h-full">
              <h4 className="text-sm font-black text-white mb-2 pb-2 border-b border-slate-800">
                {selecaoSorteada.pais} ({selecaoSorteada.ano})
              </h4>
              <div className="space-y-1.5 flex-1 overflow-y-auto">
                <p className="text-[9px] text-emerald-400 mb-1 font-bold">1. Selecione a carta<br/>2. Clique no campo para escalar</p>
                {selecaoSorteada.jogadores.map(jog => {
                  const jaEscolhido = dadosSala?.jogadoresDraftados?.includes(jog.id);
                  const isSelecionado = jogadorSelecionado?.id === jog.id;

                  return (
                    <button
                      key={jog.id}
                      disabled={jaEscolhido}
                      onClick={() => setJogadorSelecionado(isSelecionado ? null : jog)}
                      className={`w-full text-left border rounded px-2 py-2 flex justify-between items-center text-xs transition-all
                        ${jaEscolhido ? 'border-red-900/50 bg-slate-900 opacity-30 cursor-not-allowed' 
                          : isSelecionado ? 'bg-emerald-900/50 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
                          : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'}`}
                    >
                      <div>
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400 mr-2 uppercase">{jog.posicao}</span>
                        <span className={`${jaEscolhido ? 'line-through text-red-400' : isSelecionado ? 'text-white font-bold' : 'text-slate-200'}`}>{jog.nome}</span>
                      </div>
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
          <button 
            onClick={handleRoll}
            disabled={!isMeuTurno || isRolling || totalEscalados === totalSlots || jogadorSelecionado !== null}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.1em] transition-all 
              ${(!isMeuTurno || totalEscalados === totalSlots)
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' 
                : jogadorSelecionado 
                  ? 'bg-amber-500 text-slate-900 border border-amber-400'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 border border-emerald-400'}`}
          >
            {jogadorSelecionado ? 'Clique num slot vazio 👉' : 'Rolar Dado 🎲'}
          </button>
        </div>
      </aside>

      {/* ÁREA CENTRAL: GRAMADO */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="flex items-center justify-between w-full max-w-2xl mb-4">
          <h2 className="text-xl font-black text-emerald-400 uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">
            {meuNomeTime}
          </h2>
          {jogadorSelecionado && (
            <div className="bg-emerald-900/40 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-full font-bold text-sm animate-pulse flex items-center gap-2">
              <span>Colocando {jogadorSelecionado.nome}</span>
              <button onClick={() => setJogadorSelecionado(null)} className="ml-2 text-slate-400 hover:text-white text-xs underline">Cancelar</button>
            </div>
          )}
        </div>
        
        {/* O Campo agora recebe a formação real, os jogadores e a ordem para "piscar" e receber cliques */}
        <Campo 
          formacaoAtiva={formacao} 
          jogadoresEscalados={meuTimeEscalado} 
          isAlocando={!!jogadorSelecionado}
          onSlotClick={handleSlotClick}
        />
      </main>

      {/* PAINEL DIREITO: ELENCOS */}
      <aside className="w-80 h-full bg-slate-900/60 backdrop-blur-xl border-l border-slate-800 p-6 flex flex-col z-10">
        {outroJogadorId && (
          <div className="mb-6 p-3 bg-red-950/20 border border-red-900/40 rounded-lg">
            <h3 className="text-[10px] uppercase text-red-400 font-bold mb-2 tracking-widest flex items-center justify-between gap-2"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>{oponenteNomeTime}</span><span>({totalEscaladosOp}/{totalSlots})</span></h3>
            <div className="flex justify-between">
              <div className="flex flex-col"><span className="text-[9px] uppercase text-slate-500 font-bold">Ataque</span><span className="text-sm font-black text-white font-mono">{mediaAtaqueOp}</span></div>
              <div className="flex flex-col text-right"><span className="text-[9px] uppercase text-slate-500 font-bold">Defesa</span><span className="text-sm font-black text-white font-mono">{mediaDefesaOp}</span></div>
            </div>
          </div>
        )}

        <div className="border-b border-slate-700 pb-3 mb-4">
          <h3 className="font-bold text-xs uppercase text-slate-400">Seu Elenco ({totalEscalados}/{totalSlots})</h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {/* Mostra a lista dos slots vazios ou preenchidos, também clicáveis para facilitar! */}
          {['gol', 'zag1', 'zag2', 'le', 'ld', 'vol', 'mc1', 'mc2', 'pe', 'pd', 'ca'].map((posId) => {
            const atleta = meuTimeEscalado[posId];
            return (
              <div 
                key={posId} 
                onClick={() => handleSlotClick(posId)}
                className={`flex items-center gap-3 border rounded-lg p-2 transition-all duration-300
                  ${atleta ? 'bg-slate-800/60 border-slate-700' : jogadorSelecionado ? 'bg-emerald-950/40 border-emerald-500 border-dashed cursor-pointer hover:bg-emerald-900/60' : 'bg-slate-950/20 border-slate-900 border-dashed'}`}
              >
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