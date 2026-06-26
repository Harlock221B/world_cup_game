import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { selecoesMock, Selecao, Jogador } from '../lib/selecoes';
import { mapFormacoes } from '../lib/formacoes';

const mapaPosicoes: Record<string, string[]> = {
  'GOL': ['gol'], 'ZAG': ['zag1', 'zag2', 'zag3'], 'LD': ['ld', 'ala_d', 'md'], 'LE': ['le', 'ala_e', 'me'],
  'VOL': ['vol', 'vol1', 'vol2', 'mc1', 'mc2'], 'MC': ['mc1', 'mc2', 'mei', 'vol', 'vol1', 'vol2'],
  'MEI': ['mei', 'mc1', 'mc2', 'pe', 'pd', 'me', 'md'], 'ME': ['me', 'pe', 'ala_e', 'mc1'],
  'MD': ['md', 'pd', 'ala_d', 'mc2'], 'PE': ['pe', 'me', 'ata1', 'ca'], 'PD': ['pd', 'md', 'ata2', 'ca'],
  'ATA': ['ata1', 'ata2', 'ca', 'pe', 'pd'], 'CA': ['ca', 'ata1', 'ata2']
};

export function useSalaPartida(salaId: string) {
  const router = useRouter();

  const [formacao, setFormacao] = useState<string>('4-3-3');
  const [estilo, setEstilo] = useState('Equilibrado');
  const [nomeTimeTemp, setNomeTimeTemp] = useState('');

  const [dadosSala, setDadosSala] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [meuId, setMeuId] = useState<string>('');

  const [isRolling, setIsRolling] = useState(false);
  const [selecaoSorteada, setSelecaoSorteada] = useState<Selecao | null>(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);

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

  const isMeuTurno = dadosSala?.turnoAtual === meuId;
  const isAdmin = dadosSala?.jogadores?.[0] === meuId;
  const jogadoresConectados = dadosSala?.jogadores || [];
  const outroJogadorId = jogadoresConectados.length > 1 ? jogadoresConectados.find((id: string) => id !== meuId) : 'CPU';
  const slotsValidos = jogadorSelecionado ? (mapaPosicoes[jogadorSelecionado.posicao] || []) : [];

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

  const handlePassarTurno = async () => {
    if (!isMeuTurno) return;
    const indexAtual = jogadoresConectados.indexOf(meuId);
    let proximoIndex = (indexAtual + 1) % jogadoresConectados.length;
    let proximoJogador = jogadoresConectados[proximoIndex] || meuId;

    const todosTimesEscalados = dadosSala.times || {};
    while(Object.keys(todosTimesEscalados[proximoJogador] || {}).length === 11 && proximoJogador !== meuId) {
        proximoIndex = (proximoIndex + 1) % jogadoresConectados.length;
        proximoJogador = jogadoresConectados[proximoIndex];
    }

    setSelecaoSorteada(null);
    setJogadorSelecionado(null);

    await updateDoc(doc(db, "salas", salaId), {
      turnoAtual: proximoJogador,
      picksAtuais: 0,
      draftInfoSecundaria: null,
      tempoFim: Date.now() + ((dadosSala.configuracoes?.tempoJogada || 30) * 1000)
    });
  };

  const executarAutoPick = async () => {
    if (!dadosSala) return;
    const todosJogadores = selecoesMock.flatMap(s => s.jogadores);
    const disponiveis = todosJogadores.filter(p => !dadosSala.jogadoresDraftados?.includes(p.id));
    
    if (disponiveis.length === 0) {
      await handlePassarTurno();
      return; 
    }

    const jogadorAleatorio = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const meuTime = dadosSala.times?.[meuId] || {};
    const possiveisSlots = mapaPosicoes[jogadorAleatorio.posicao] || [];
    const slotVazioId = possiveisSlots.find(id => !meuTime[id]);

    if (slotVazioId) {
      await alocarJogador(slotVazioId, jogadorAleatorio, true); // true = force pass
    } else {
      const slotsDoEsquema = mapFormacoes[formacao].map(p => p.id);
      const slotRealVazio = slotsDoEsquema.find(id => !meuTime[id]);
      if (slotRealVazio) {
        const compativel = disponiveis.find(p => (mapaPosicoes[p.posicao] || []).includes(slotRealVazio));
        if (compativel) await alocarJogador(slotRealVazio, compativel, true);
        else await handlePassarTurno();
      } else {
        await handlePassarTurno();
      }
    }
  };

  const salvarNomeTime = async () => {
    if (!nomeTimeTemp.trim()) return;
    await updateDoc(doc(db, "salas", salaId), { [`nomesTimes.${meuId}`]: nomeTimeTemp.trim() });
  };

  const handleComecarDraft = async () => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    await updateDoc(doc(db, "salas", salaId), {
      status: 'draft', 
      turnoAtual: jogadoresConectados[0], 
      tempoFim: Date.now() + (tempoConfig * 1000), 
      jogadoresDraftados: [], 
      picksAtuais: 0,
      times: jogadoresConectados.reduce((acc:any, id:string) => ({...acc, [id]: {}}), {'CPU': {}})
    });
  };

  const handleJogarNovamente = async () => {
    if (!isAdmin) return;
    await updateDoc(doc(db, "salas", salaId), {
      status: 'aguardando_jogadores',
      jogadoresDraftados: [],
      campanhas: null,
      resultado: null,
      draftInfoSecundaria: null,
      turnoAtual: null,
      picksAtuais: 0,
      times: jogadoresConectados.reduce((acc:any, id:string) => ({...acc, [id]: {}}), {'CPU': {}})
    });
  };

  const handleRoll = async () => {
    setIsRolling(true); setSelecaoSorteada(null); setJogadorSelecionado(null);
    await updateDoc(doc(db, "salas", salaId), { 'draftInfoSecundaria.isRolling': true, 'draftInfoSecundaria.pais': null, 'draftInfoSecundaria.ano': null });
    setTimeout(async () => {
      const sel = selecoesMock[Math.floor(Math.random() * selecoesMock.length)];
      setSelecaoSorteada(sel); setIsRolling(false);
      await updateDoc(doc(db, "salas", salaId), { 'draftInfoSecundaria.isRolling': false, 'draftInfoSecundaria.pais': sel.pais, 'draftInfoSecundaria.ano': sel.ano });
    }, 1000);
  };

  const gerarEventosDaPartida = (golsMeus: number, golsOp: number, meuTimeArray: Jogador[], opTimeArray: Jogador[]) => {
    const eventos = [];
    const ofensivosMeus = meuTimeArray.filter(j => ['ATA', 'CA', 'PE', 'PD', 'MEI', 'MC'].includes(j.posicao));
    const ofensivosOp = opTimeArray.filter(j => ['ATA', 'CA', 'PE', 'PD', 'MEI', 'MC'].includes(j.posicao));
    const finalMeus = ofensivosMeus.length > 0 ? ofensivosMeus : meuTimeArray;
    const finalOp = ofensivosOp.length > 0 ? ofensivosOp : opTimeArray;

    for(let i=0; i < golsMeus; i++) {
      eventos.push({ minuto: Math.floor(Math.random() * 89) + 1, isMeuGolo: true, jogador: finalMeus[Math.floor(Math.random() * finalMeus.length)]?.nome.split(' ')[0] || 'Atacante' });
    }
    for(let i=0; i < golsOp; i++) {
      eventos.push({ minuto: Math.floor(Math.random() * 89) + 1, isMeuGolo: false, jogador: finalOp[Math.floor(Math.random() * finalOp.length)]?.nome.split(' ')[0] || 'Adversário' });
    }
    return eventos.sort((a, b) => a.minuto - b.minuto);
  };

  const simularPartidaUnica = (fase: string, meuTimeArray: Jogador[], opTimeArray: Jogador[], opNome: string, isMataMata: boolean) => {
    let ataqueMeu = meuTimeArray.reduce((a, j) => a + (j.ataque||50), 0) / 11;
    let defesaMeu = meuTimeArray.reduce((a, j) => a + (j.defesa||50), 0) / 11;
    let ataqueOp = opTimeArray.reduce((a, j) => a + (j.ataque||50), 0) / 11;
    let defesaOp = opTimeArray.reduce((a, j) => a + (j.defesa||50), 0) / 11;

    const diffMeu = Math.max(0, (ataqueMeu - defesaOp) / 8);
    const diffOp = Math.max(0, (ataqueOp - defesaMeu) / 8);

    let golsMeus = Math.round(diffMeu) + (Math.random() > 0.6 ? 1 : 0);
    let golsOp = Math.round(diffOp) + (Math.random() > 0.7 ? 1 : 0);

    if (isMataMata && golsMeus === golsOp) {
      if (Math.random() > 0.5) golsMeus++; else golsOp++;
    }

    return { fase, oponente: opNome, golsMeus, golsOp, eventos: gerarEventosDaPartida(golsMeus, golsOp, meuTimeArray, opTimeArray) };
  };

  const gerarCampanhaCompleta = (meuTimeArray: Jogador[], tamanhoChave: number) => {
    const partidas = [];
    let pontosGrupo = 0;
    let classificado = true;

    const getCPUTime = () => {
      const randomSel = selecoesMock[Math.floor(Math.random() * selecoesMock.length)];
      return { nome: `${randomSel.pais} ${randomSel.ano}`, time: randomSel.jogadores.slice(0, 11) };
    };

    if (tamanhoChave >= 4) {
      for (let i = 1; i <= 3; i++) {
        const cpu = getCPUTime();
        const p = simularPartidaUnica(`GRUPOS (JOGO ${i})`, meuTimeArray, cpu.time, cpu.nome, false);
        partidas.push(p);
        if (p.golsMeus > p.golsOp) pontosGrupo += 3;
        else if (p.golsMeus === p.golsOp) pontosGrupo += 1;
      }
      classificado = pontosGrupo >= 4;
    }

    if (classificado) {
      if (tamanhoChave >= 16) {
        const cpu = getCPUTime();
        const p = simularPartidaUnica('OITAVAS DE FINAL', meuTimeArray, cpu.time, cpu.nome, true);
        partidas.push(p);
        if (p.golsMeus < p.golsOp) classificado = false;
      }
      if (classificado && tamanhoChave >= 8) {
        const cpu = getCPUTime();
        const p = simularPartidaUnica('QUARTAS DE FINAL', meuTimeArray, cpu.time, cpu.nome, true);
        partidas.push(p);
        if (p.golsMeus < p.golsOp) classificado = false;
      }
      if (classificado && tamanhoChave >= 4) {
        const cpu = getCPUTime();
        const p = simularPartidaUnica('SEMIFINAL', meuTimeArray, cpu.time, cpu.nome, true);
        partidas.push(p);
        if (p.golsMeus < p.golsOp) classificado = false;
      }
      if (classificado) {
        const cpu = getCPUTime();
        const p = simularPartidaUnica('GRANDE FINAL', meuTimeArray, cpu.time, cpu.nome, true);
        partidas.push(p);
      }
    }

    return { partidas, pontosGrupo, campeao: classificado && partidas[partidas.length-1].golsMeus > partidas[partidas.length-1].golsOp };
  };

  const alocarJogador = async (posId: string, jogador: Jogador, forcePass = false) => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    const meuTime = dadosSala.times?.[meuId] || {};
    const novoTime = { ...meuTime, [posId]: jogador };
    
    const picksAtuais = (dadosSala.picksAtuais || 0) + 1;
    const euAcabei = Object.keys(novoTime).length === 11;

    const indexAtual = jogadoresConectados.indexOf(meuId);
    let proximoIndex = (indexAtual + 1) % jogadoresConectados.length;
    let proximoJogador = jogadoresConectados[proximoIndex] || meuId;

    let todosTimesEscalados = { ...dadosSala.times, [meuId]: novoTime };
    const humanosAcabaram = jogadoresConectados.every((id: string) => Object.keys(todosTimesEscalados[id] || {}).length === 11);

    if (humanosAcabaram) {
      const tamanhoChave = dadosSala.configuracoes?.tamanhoChave || 2;
      const campanhasGlobais: Record<string, any> = {};

      jogadoresConectados.forEach((id: string) => {
        const timeObj = todosTimesEscalados[id] as unknown as Record<string, Jogador>;
        const timeArray = Object.values(timeObj);
        campanhasGlobais[id] = gerarCampanhaCompleta(timeArray, tamanhoChave);
      });

      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id),
        status: 'simulacao',
        draftInfoSecundaria: null,
        campanhas: campanhasGlobais
      });
    } else if (euAcabei || picksAtuais >= 3 || forcePass) {
      // Passa o turno (esgotou as 3 picks ou completou o time)
      while(Object.keys(todosTimesEscalados[proximoJogador] || {}).length === 11 && proximoJogador !== meuId) {
          proximoIndex = (proximoIndex + 1) % jogadoresConectados.length;
          proximoJogador = jogadoresConectados[proximoIndex];
      }

      setSelecaoSorteada(null); 
      setJogadorSelecionado(null);

      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id), 
        turnoAtual: proximoJogador, 
        picksAtuais: 0,
        draftInfoSecundaria: null, 
        tempoFim: Date.now() + (tempoConfig * 1000) 
      });
    } else {
      // Continua no mesmo turno (ainda tem picks)
      setJogadorSelecionado(null);
      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id),
        picksAtuais: picksAtuais
      });
    }
  };

  const handleSlotClick = (posId: string) => {
    if (!isMeuTurno || !jogadorSelecionado || !slotsValidos.includes(posId)) return;
    const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
    if (!meuTimeEscalado[posId]) alocarJogador(posId, jogadorSelecionado);
  };

  const handleMudarFormacao = async (novaFormacao: string) => {
    if (formacao === novaFormacao) return; 
    setFormacao(novaFormacao);
    const meuTimeAtual = dadosSala?.times?.[meuId] || {};
    const slotsAtualizados = mapFormacoes[novaFormacao].map(p => p.id);
    const novoTime: Record<string, Jogador> = {};
    const orfaos: Jogador[] = []; 
    Object.keys(meuTimeAtual).forEach(posId => {
      if (slotsAtualizados.includes(posId)) novoTime[posId] = meuTimeAtual[posId];
      else orfaos.push(meuTimeAtual[posId]);
    });
    orfaos.forEach(jogadorOrfao => {
      const slotsPossiveis = mapaPosicoes[jogadorOrfao.posicao] || [];
      const slotLivreCompativel = slotsAtualizados.find(id => slotsPossiveis.includes(id) && !novoTime[id]);
      if (slotLivreCompativel) novoTime[slotLivreCompativel] = jogadorOrfao;
    });
    await updateDoc(doc(db, "salas", salaId), { [`times.${meuId}`]: novoTime });
  };

  return {
    dadosSala, carregando, meuId, outroJogadorId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao: handleMudarFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado, slotsValidos,
    handleComecarDraft, handleRoll, handleSlotClick, handlePassarTurno, handleJogarNovamente, router
  };
}