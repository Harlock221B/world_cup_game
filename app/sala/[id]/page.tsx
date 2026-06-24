'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import Campo from '../../../components/jogo/Campo';
import { selecoesMock, Selecao, Jogador } from '../../../lib/selecoes';

// (Mapeamentos de formação mantidos iguais...)
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

export default function SalaPartida() {
  const params = useParams();
  const router = useRouter();
  const salaId = params.id as string;

  const [formacao, setFormacao] = useState<string>('4-3-3');
  const [dadosSala, setDadosSala] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [meuId, setMeuId] = useState<string>('');

  const [isRolling, setIsRolling] = useState(false);
  const [selecaoSorteada, setSelecaoSorteada] = useState<Selecao | null>(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);
  const [nomeTimeTemp, setNomeTimeTemp] = useState('');

  const [minutoJogo, setMinutoJogo] = useState(0);
  const [placarLocal, setPlacarLocal] = useState<{meu: number, op: number}>({ meu: 0, op: 0 });

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

        if (!dados.nomesTimes?.[localId] && !nomeTimeTemp) setNomeTimeTemp('FC ' + localId.substring(4));
        else if (dados.nomesTimes?.[localId] && !nomeTimeTemp) setNomeTimeTemp(dados.nomesTimes[localId]);

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

  const jogadoresConectados = dadosSala?.jogadores || [];
  const isSolo = jogadoresConectados.length === 1;
  const outroJogadorId = isSolo ? 'CPU' : jogadoresConectados.find((id: string) => id !== meuId) || 'CPU';
  
  const isMeuTurno = dadosSala?.turnoAtual === meuId;
  const isAdmin = dadosSala?.jogadores?.[0] === meuId;
  
  useEffect(() => {
    if (dadosSala?.status === 'draft' && dadosSala?.tempoFim) {
      const interval = setInterval(() => {
        const agora = Date.now();
        const restante = Math.max(0, Math.floor((dadosSala.tempoFim - agora) / 1000));
        setTempoRestante(restante);
        if (restante === 0 && isMeuTurno) executarAutoPick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dadosSala?.status, dadosSala?.tempoFim, isMeuTurno]);

  useEffect(() => {
    if (dadosSala?.status === 'simulacao' && minutoJogo < 90 && dadosSala.resultado) {
      const timer = setTimeout(() => {
        setMinutoJogo(prev => prev + 2);
        const progresso = minutoJogo / 90;
        const meusGolsFinais = dadosSala.resultado[meuId] || 0;
        const opGolsFinais = dadosSala.resultado[outroJogadorId] || 0;

        setPlacarLocal({
          meu: Math.floor(meusGolsFinais * progresso),
          op: Math.floor(opGolsFinais * progresso)
        });
      }, 100);
      return () => clearTimeout(timer);
    } else if (minutoJogo >= 90 && dadosSala?.resultado) {
      setPlacarLocal({ meu: dadosSala.resultado[meuId] || 0, op: dadosSala.resultado[outroJogadorId] || 0 });
    }
  }, [dadosSala?.status, minutoJogo, dadosSala?.resultado]);

  const executarAutoPick = async () => {
    if (!dadosSala) return;
    const todosJogadores = selecoesMock.flatMap(s => s.jogadores);
    const disponiveis = todosJogadores.filter(p => !dadosSala.jogadoresDraftados?.includes(p.id));
    if (disponiveis.length === 0) return; 

    const jogadorAleatorio = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const meuTime = dadosSala.times?.[meuId] || {};
    const todosSlotsIds = ['gol', 'zag1', 'zag2', 'le', 'ld', 'vol', 'mc1', 'mc2', 'pe', 'pd', 'ca'];
    const slotVazioId = todosSlotsIds.find(id => !meuTime[id]);

    if (slotVazioId) await alocarJogador(slotVazioId, jogadorAleatorio);
  };

  const salvarNomeTime = async () => {
    if (!nomeTimeTemp.trim()) return;
    await updateDoc(doc(db, "salas", salaId), { [`nomesTimes.${meuId}`]: nomeTimeTemp.trim() });
  };

  // ⚠️ AQUI ESTÁ A CORREÇÃO PRINCIPAL: SORTEIO DA CPU AUTOMÁTICA
  const handleComecarDraft = async () => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    const timesIniciais: any = {
      [jogadoresConectados[0]]: {} 
    };
    const nomesAtuais = dadosSala.nomesTimes || {};

    if (isSolo) {
      // Se estiver jogando contra a máquina, sorteia uma Seleção Clássica
      const cpuSorteada = selecoesMock[Math.floor(Math.random() * selecoesMock.length)];
      const slotsDefault = ['gol', 'zag1', 'zag2', 'le', 'ld', 'vol', 'mc1', 'mc2', 'pe', 'pd', 'ca'];
      const timeFormatadoCPU: any = {};
      
      // Preenche os 11 slots com os jogadores da seleção sorteada
      slotsDefault.forEach((slot, index) => {
        timeFormatadoCPU[slot] = cpuSorteada.jogadores[index] || cpuSorteada.jogadores[0];
      });

      timesIniciais['CPU'] = timeFormatadoCPU;
      nomesAtuais['CPU'] = `${cpuSorteada.pais} ${cpuSorteada.ano}`;
    } else {
      timesIniciais[jogadoresConectados[1]] = {};
    }

    await updateDoc(doc(db, "salas", salaId), {
      status: 'draft',
      turnoAtual: jogadoresConectados[0], 
      tempoFim: Date.now() + (tempoConfig * 1000), 
      jogadoresDraftados: [], 
      times: timesIniciais,
      nomesTimes: nomesAtuais
    });
  };

  const handleRoll = () => {
    setIsRolling(true);
    setSelecaoSorteada(null);
    setJogadorSelecionado(null);
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * selecoesMock.length);
      setSelecaoSorteada(selecoesMock[indiceAleatorio]);
      setIsRolling(false);
    }, 1000);
  };

  const alocarJogador = async (posId: string, jogador: Jogador) => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    const meuTime = dadosSala.times?.[meuId] || {};
    const novoTime = { ...meuTime, [posId]: jogador };

    const timeOponente = dadosSala.times?.[outroJogadorId] || {};

    const meuAcabou = Object.keys(novoTime).length === 11;
    const opAcabou = Object.keys(timeOponente).length === 11;

    if (meuAcabou && opAcabou) {
      // SE TODOS TERMINAREM (CPU já termina no início), INICIA SIMULAÇÃO
      let ataqueMeu = Object.values(novoTime).reduce((a:any, j:any) => a + j.ataque, 0) / 11;
      let defesaOp = Object.values(timeOponente).reduce((a:any, j:any) => a + j.defesa, 0) / 11;
      let ataqueOp = Object.values(timeOponente).reduce((a:any, j:any) => a + j.ataque, 0) / 11;
      let defesaMeu = Object.values(novoTime).reduce((a:any, j:any) => a + j.defesa, 0) / 11;

      const golsMeu = Math.max(0, Math.round((ataqueMeu - defesaOp) / 5) + Math.floor(Math.random() * 3));
      const golsOp = Math.max(0, Math.round((ataqueOp - defesaMeu) / 5) + Math.floor(Math.random() * 3));

      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id),
        status: 'simulacao', 
        resultado: {
          [meuId]: golsMeu,
          [outroJogadorId]: golsOp
        }
      });
    } else {
      // ⚠️ O TURNO CONTINUA SENDO SEU se for "Solo", ou passa se for contra humano
      const proximoTurno = isSolo ? meuId : outroJogadorId;

      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id), 
        turnoAtual: proximoTurno, 
        tempoFim: Date.now() + (tempoConfig * 1000) 
      });
    }

    setSelecaoSorteada(null); 
    setJogadorSelecionado(null);
  };

  const handleSlotClick = (posId: string) => {
    if (!isMeuTurno) return;
    const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
    if (jogadorSelecionado && !meuTimeEscalado[posId]) {
      alocarJogador(posId, jogadorSelecionado);
    } else if (!jogadorSelecionado && !meuTimeEscalado[posId]) {
      alert("Primeiro, selecione um jogador da lista à esquerda!");
    }
  };

  if (carregando) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 animate-pulse">Conectando...</div>;

  const meuNomeTime = dadosSala?.nomesTimes?.[meuId] || 'Seu Time';
  const oponenteNomeTime = dadosSala?.nomesTimes?.[outroJogadorId] || 'CPU Clássica';

  // ==========================================
  // TELA 3: SIMULAÇÃO DA PARTIDA
  // ==========================================
  if (dadosSala?.status === 'simulacao') {
    const meuTime = dadosSala.times?.[meuId] || {};
    const opTime = dadosSala.times?.[outroJogadorId] || {};
    
    const meuAtaque = Math.round(Object.values(meuTime).reduce((a:any, j:any) => a + j.ataque, 0) / 11) || 0;
    const minhaDefesa = Math.round(Object.values(meuTime).reduce((a:any, j:any) => a + j.defesa, 0) / 11) || 0;
    const opAtaque = Math.round(Object.values(opTime).reduce((a:any, j:any) => a + j.ataque, 0) / 11) || 0;
    const opDefesa = Math.round(Object.values(opTime).reduce((a:any, j:any) => a + j.defesa, 0) / 11) || 0;

    const isFim = minutoJogo >= 90;
    const ganhei = placarLocal.meu > placarLocal.op;
    const empate = placarLocal.meu === placarLocal.op;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-0"></div>
        
        <div className="relative z-10 w-full max-w-4xl text-center mb-12">
          <div className="inline-block bg-slate-900/80 border border-slate-700 px-8 py-3 rounded-full mb-6 shadow-2xl backdrop-blur-md">
            <span className="text-emerald-500 font-mono font-black text-2xl tracking-widest">
              {isFim ? 'FIM DE JOGO' : `${minutoJogo}' MIN`}
            </span>
          </div>

          <div className="flex items-center justify-center gap-10">
            {/* Meu Time */}
            <div className={`flex flex-col items-end transition-all ${isFim && ganhei ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">{meuNomeTime}</h2>
              <div className="flex gap-4 mt-2 opacity-70">
                <span className="text-xs font-mono bg-blue-900/50 text-blue-400 px-2 py-1 rounded">ATA {meuAtaque}</span>
                <span className="text-xs font-mono bg-amber-900/50 text-amber-400 px-2 py-1 rounded">DEF {minhaDefesa}</span>
              </div>
            </div>

            {/* Placar Numérico */}
            <div className="flex items-center gap-6 text-7xl font-black font-mono">
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">
                {placarLocal.meu}
              </div>
              <span className="text-slate-600 text-5xl">X</span>
              <div className="bg-slate-900 border border-slate-700 w-28 h-32 flex items-center justify-center rounded-xl shadow-inner text-white">
                {placarLocal.op}
              </div>
            </div>

            {/* Time Oponente */}
            <div className={`flex flex-col items-start transition-all ${isFim && !ganhei && !empate ? 'scale-110' : ''}`}>
              <h2 className="text-3xl font-black uppercase text-white truncate max-w-[250px]">{oponenteNomeTime}</h2>
              <div className="flex gap-4 mt-2 opacity-70">
                <span className="text-xs font-mono bg-blue-900/50 text-blue-400 px-2 py-1 rounded">ATA {opAtaque}</span>
                <span className="text-xs font-mono bg-amber-900/50 text-amber-400 px-2 py-1 rounded">DEF {opDefesa}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-xl">
          {!isFim ? (
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-500 transition-all duration-100 ease-linear" style={{ width: `${(minutoJogo / 90) * 100}%` }}></div>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl text-center border-2 shadow-2xl
              ${empate ? 'bg-slate-800 border-slate-600' : ganhei ? 'bg-emerald-900/50 border-emerald-500' : 'bg-red-900/50 border-red-500'}`}>
              <h1 className={`text-5xl font-black uppercase tracking-tighter ${empate ? 'text-white' : ganhei ? 'text-emerald-400' : 'text-red-400'}`}>
                {empate ? 'EMPATE TÉCNICO' : ganhei ? 'VITÓRIA HISTÓRICA!' : 'DERROTA ESMAGADORA'}
              </h1>
              <button onClick={() => router.push('/')} className="mt-6 px-8 py-3 bg-white text-slate-900 font-bold uppercase tracking-widest rounded hover:bg-slate-200">
                Voltar ao Lobby
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // TELA 1: PREPARAÇÃO
  // ==========================================
  if (dadosSala?.status === 'aguardando_jogadores') {
    const tamanhoChave = dadosSala.configuracoes?.tamanhoChave || 2; 
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>
        <header className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-10 pb-6 border-b border-slate-800 flex justify-between items-end">
          <div><span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mb-1">Lobby de Torneio</span><h1 className="text-4xl font-black tracking-tighter text-white">SALA: <span className="text-emerald-400">{salaId}</span></h1></div>
        </header>
        <main className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Sua Franquia</h2>
              <input type="text" value={nomeTimeTemp} onChange={(e) => setNomeTimeTemp(e.target.value)} onBlur={salvarNomeTime} placeholder="Digite seu time..." className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 font-black text-white outline-none focus:border-emerald-500" maxLength={20}/>
            </div>
            {isAdmin ? <button onClick={handleComecarDraft} className="w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] bg-emerald-500 text-slate-950 hover:bg-emerald-400">INICIAR DRAFT →</button> : <div className="w-full py-5 rounded-xl font-black uppercase tracking-[0.1em] text-center bg-slate-800 text-slate-400 border border-slate-700">Aguardando Host...</div>}
          </div>
          <div className="w-full md:w-2/3 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6 pb-4 border-b border-slate-800">Participantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: tamanhoChave }).map((_, index) => {
                const isHuman = index < jogadoresConectados.length;
                const jogId = jogadoresConectados[index];
                const isMe = jogId === meuId;
                const nomeTeam = isHuman ? (dadosSala.nomesTimes?.[jogId] || `FC Convidado ${index + 1}`) : `CPU Seleção Histórica`;
                return (
                  <div key={index} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${isMe ? 'bg-emerald-950/30 border-emerald-500/50' : isHuman ? 'bg-blue-950/20 border-blue-900/50' : 'bg-slate-950/50 border-slate-800 border-dashed'}`}>
                    <div className={`w-10 h-10 rounded flex items-center justify-center font-black text-xs ${isMe ? 'bg-emerald-600 text-white' : isHuman ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>{isHuman ? `P${index + 1}` : 'CPU'}</div>
                    <div className="flex-1 min-w-0"><div className="text-base font-black truncate uppercase text-white">{nomeTeam}</div></div>
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
  // TELA 2: GAMEPLAY (DRAFT PARA O PLAYER)
  // ==========================================
  const podeMudarTatica = dadosSala?.configuracoes?.taticaInGame;
  const meuTimeEscalado = dadosSala?.times?.[meuId] || {}; 
  const totalSlots = 11; 
  const totalEscalados = Object.keys(meuTimeEscalado).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans h-screen overflow-hidden flex relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

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
          {isSolo && <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">VS: {oponenteNomeTime}</h2>}
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