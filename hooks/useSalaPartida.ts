// hooks/useSalaPartida.ts

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { selecoesMock, Selecao, Jogador } from '../lib/selecoes';
import { mapFormacoes } from '../lib/formacoes';

export function useSalaPartida(salaId: string) {
  const router = useRouter();

  // 1. Estados Táticos e Visuais
  const [formacao, setFormacao] = useState<string>('4-3-3');
  const [estilo, setEstilo] = useState('Equilibrado');
  const [nomeTimeTemp, setNomeTimeTemp] = useState('');

  // 2. Estados Globais e Conexão
  const [dadosSala, setDadosSala] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [meuId, setMeuId] = useState<string>('');

  // 3. Estados do Draft
  const [isRolling, setIsRolling] = useState(false);
  const [selecaoSorteada, setSelecaoSorteada] = useState<Selecao | null>(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);

  // 4. Estados da Simulação
  const [minutoJogo, setMinutoJogo] = useState(0);
  const [placarLocal, setPlacarLocal] = useState<{meu: number, op: number}>({ meu: 0, op: 0 });

  // ==========================================
  // EFEITO 1: CONEXÃO COM O FIREBASE
  // ==========================================
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

  // Constantes Derivadas Baseadas no Firebase
  const isMeuTurno = dadosSala?.turnoAtual === meuId;
  const isAdmin = dadosSala?.jogadores?.[0] === meuId;
  const jogadoresConectados = dadosSala?.jogadores || [];
  const outroJogadorId = jogadoresConectados.find((id: string) => id !== meuId) || meuId;

  // ==========================================
  // EFEITO 2: RELÓGIO DO DRAFT / AUTO-PICK
  // ==========================================
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

  // ==========================================
  // EFEITO 3: MOTOR DE SIMULAÇÃO DOS GOLS
  // ==========================================
  useEffect(() => {
    if (dadosSala?.status === 'simulacao' && minutoJogo < 90 && dadosSala.resultado) {
      const timer = setTimeout(() => {
        setMinutoJogo(prev => prev + 2);
        const progresso = minutoJogo / 90;
        setPlacarLocal({
          meu: Math.floor((dadosSala.resultado[meuId] || 0) * progresso),
          op: Math.floor((dadosSala.resultado[outroJogadorId] || 0) * progresso)
        });
      }, 100);
      return () => clearTimeout(timer);
    } else if (minutoJogo >= 90 && dadosSala?.resultado) {
      setPlacarLocal({ meu: dadosSala.resultado[meuId] || 0, op: dadosSala.resultado[outroJogadorId] || 0 });
    }
  }, [dadosSala?.status, minutoJogo, dadosSala?.resultado]);

  // ==========================================
  // FUNÇÕES DE AÇÃO DO JOGO
  // ==========================================
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
      // CORREÇÃO DUPLA APLICADA AQUI PARA PASSAR NA VERCEL:
      const meuTimeTyped = novoTime as unknown as Record<string, Jogador>;
      const opTimeTyped = timeOponente as unknown as Record<string, Jogador>;

      let ataqueMeu = Object.values(meuTimeTyped).reduce((a, j) => a + j.ataque, 0) / 11;
      let defesaOp = Object.values(opTimeTyped).reduce((a, j) => a + j.defesa, 0) / 11;
      let ataqueOp = Object.values(opTimeTyped).reduce((a, j) => a + j.ataque, 0) / 11;
      let defesaMeu = Object.values(meuTimeTyped).reduce((a, j) => a + j.defesa, 0) / 11;

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
      await updateDoc(doc(db, "salas", salaId), {
        [`times.${meuId}`]: novoTime, 
        jogadoresDraftados: arrayUnion(jogador.id), 
        turnoAtual: outroJogadorId, 
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

  // 5. Retorna as funções e dados necessários para a Tela Visual (page.tsx)
  return {
    dadosSala, carregando, meuId, outroJogadorId, isMeuTurno, isAdmin, jogadoresConectados,
    formacao, setFormacao, estilo, setEstilo, nomeTimeTemp, setNomeTimeTemp, salvarNomeTime,
    isRolling, selecaoSorteada, tempoRestante, jogadorSelecionado, setJogadorSelecionado,
    minutoJogo, placarLocal, handleComecarDraft, handleRoll, handleSlotClick, router
  };
}