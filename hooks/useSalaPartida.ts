// hooks/useSalaPartida.ts

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { selecoesMock, Selecao, Jogador } from '../lib/selecoes';
import { mapFormacoes } from '../lib/formacoes';

const mapaPosicoes: Record<string, string[]> = {
  'GOL': ['gol'],
  'ZAG': ['zag1', 'zag2', 'zag3'],
  'LD':  ['ld', 'ala_d', 'md'],
  'LE':  ['le', 'ala_e', 'me'],
  'VOL': ['vol', 'vol1', 'vol2', 'mc1', 'mc2'],
  'MC':  ['mc1', 'mc2', 'mei', 'vol', 'vol1', 'vol2'],
  'MEI': ['mei', 'mc1', 'mc2', 'pe', 'pd', 'me', 'md'],
  'ME':  ['me', 'pe', 'ala_e', 'mc1'],
  'MD':  ['md', 'pd', 'ala_d', 'mc2'],
  'PE':  ['pe', 'me', 'ata1', 'ca'],
  'PD':  ['pd', 'md', 'ata2', 'ca'],
  'ATA': ['ata1', 'ata2', 'ca', 'pe', 'pd'],
  'CA':  ['ca', 'ata1', 'ata2']
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

  const isMeuTurno = dadosSala?.turnoAtual === meuId;
  const isAdmin = dadosSala?.jogadores?.[0] === meuId;
  const jogadoresConectados = dadosSala?.jogadores || [];
  
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

  // AÇÕES
  const executarAutoPick = async () => {
    if (!dadosSala) return;
    const todosJogadores = selecoesMock.flatMap(s => s.jogadores);
    const disponiveis = todosJogadores.filter(p => !dadosSala.jogadoresDraftados?.includes(p.id));
    if (disponiveis.length === 0) return; 

    const jogadorAleatorio = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const meuTime = dadosSala.times?.[meuId] || {};
    
    const possiveisSlots = mapaPosicoes[jogadorAleatorio.posicao] || [];
    const slotVazioId = possiveisSlots.find(id => !meuTime[id]);

    if (slotVazioId) {
      await alocarJogador(slotVazioId, jogadorAleatorio);
    } else {
      const slotsDoEsquema = mapFormacoes[formacao].map(p => p.id);
      const slotRealVazio = slotsDoEsquema.find(id => !meuTime[id]);
      if (slotRealVazio) {
        const compativel = disponiveis.find(p => (mapaPosicoes[p.posicao] || []).includes(slotRealVazio));
        if (compativel) await alocarJogador(slotRealVazio, compativel);
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
      times: { [jogadoresConectados[0]]: {}, [jogadoresConectados[1] || 'CPU']: {} }
    });
  };

  // BROADCAST DO ROLAR DADO PARA OS OUTROS VEREM (CENSURADO)
  const handleRoll = async () => {
    setIsRolling(true);
    setSelecaoSorteada(null);
    setJogadorSelecionado(null);

    // Avisa todos que você está a rolar
    await updateDoc(doc(db, "salas", salaId), {
      'draftInfoSecundaria.isRolling': true,
      'draftInfoSecundaria.pais': null,
      'draftInfoSecundaria.ano': null
    });

    setTimeout(async () => {
      const indiceAleatorio = Math.floor(Math.random() * selecoesMock.length);
      const sel = selecoesMock[indiceAleatorio];
      setSelecaoSorteada(sel);
      setIsRolling(false);

      // Partilha a nação sorteada, mas ESCONDE os jogadores dos adversários!
      await updateDoc(doc(db, "salas", salaId), {
        'draftInfoSecundaria.isRolling': false,
        'draftInfoSecundaria.pais': sel.pais,
        'draftInfoSecundaria.ano': sel.ano
      });
    }, 1000);
  };

  const alocarJogador = async (posId: string, jogador: Jogador) => {
    const tempoConfig = dadosSala.configuracoes.tempoJogada || 30;
    const meuTime = dadosSala.times?.[meuId] || {};
    const novoTime = { ...meuTime, [posId]: jogador };
    
    // LÓGICA DE TURNOS MULTI-PLAYER (Suporta 2, 3, 4+ jogadores)
    const indexAtual = jogadoresConectados.indexOf(meuId);
    const proximoIndex = (indexAtual + 1) % jogadoresConectados.length;
    const proximoJogador = jogadoresConectados[proximoIndex];

    const todosTimesEscalados = { ...dadosSala.times, [meuId]: novoTime };
    
    // Verifica se TODOS os humanos terminaram de montar os seus 11 jogadores
    const todosAcabaram = jogadoresConectados.every((id: string) => Object.keys(todosTimesEscalados[id] || {}).length === 11);

    if (todosAcabaram) {
      // Como a simulação atual é 1v1, pegamos no primeiro e segundo jogador
      const p1 = jogadoresConectados[0];
      const p2 = jogadoresConectados[1] || 'CPU';
      
      const p1Time = todosTimesEscalados[p1] as unknown as Record<string, Jogador>;
      const p2Time = todosTimesEscalados[p2] as unknown as Record<string, Jogador>;

      let ataqueP1 = Object.values(p1Time).reduce((a, j) => a + j.ataque, 0) / 11;
      let defesaP2 = Object.values(p2Time).reduce((a, j) => a + j.defesa, 0) / 11;
      let ataqueP2 = Object.values(p2Time).reduce((a, j) => a + j.ataque, 0) / 11;
      let defesaP1 = Object.values(p1Time).reduce((a, j) => a + j.defesa, 0) / 11;

      const golsP1 = Math.max(0, Math.round((ataqueP1 - defesaP2) / 5) + Math.floor(Math.random() * 3));
      const golsP2 = Math.max(0, Math.round((ataqueP2 - defesaP1) / 5) + Math.floor(Math.random() * 3));

      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id),
        status: 'simulacao',
        draftInfoSecundaria: null, // Limpa o painel de espionagem
        resultado: { [p1]: golsP1, [p2]: golsP2 }
      });
    } else {
      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id), 
        turnoAtual: proximoJogador, // Passa para a próxima pessoa da roda
        draftInfoSecundaria: null, // Limpa para o próximo rolar
        tempoFim: Date.now() + (tempoConfig * 1000) 
      });
    }

    setSelecaoSorteada(null); 
    setJogadorSelecionado(null);
  };

  const handleSlotClick = (posId: string) => {
    if (!isMeuTurno || !jogadorSelecionado || !slotsValidos.includes(posId)) return;
    const meuTimeEscalado = dadosSala?.times?.[meuId] || {};
    if (!meuTimeEscalado[posId]) alocarJogador(posId, jogadorSelecionado);
  };

  const handleMudarFormacao = async (novaFormacao: string) => { /* Mantido igual */
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
    dadosSala, carregando, meuId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao: handleMudarFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado, slotsValidos,
    minutoJogo, placarLocal, handleComecarDraft, handleRoll, handleSlotClick, router
  };
}