// lib/selecoes.ts

export type Jogador = {
  id: string;
  nome: string;
  posicao: string;
  overall: number;
  ataque: number;
  defesa: number;
};

export type Selecao = {
  id: string;
  pais: string;
  ano: number;
  jogadores: Jogador[];
};

export const selecoesMock: Selecao[] = [
  {
    id: 'br-2002',
    pais: 'Brasil',
    ano: 2002,
    jogadores: [
      { id: 'br-01', nome: 'Ronaldo', posicao: 'ATA', overall: 94, ataque: 96, defesa: 30 },
      { id: 'br-02', nome: 'Rivaldo', posicao: 'MEI', overall: 92, ataque: 92, defesa: 45 },
      { id: 'br-03', nome: 'Ronaldinho', posicao: 'PE', overall: 91, ataque: 90, defesa: 40 },
      { id: 'br-04', nome: 'Cafu', posicao: 'LD', overall: 88, ataque: 82, defesa: 85 },
      { id: 'br-05', nome: 'Roberto Carlos', posicao: 'LE', overall: 90, ataque: 88, defesa: 82 },
      { id: 'br-06', nome: 'Lúcio', posicao: 'ZAG', overall: 87, ataque: 60, defesa: 89 },
      { id: 'br-07', nome: 'Marcos', posicao: 'GOL', overall: 86, ataque: 10, defesa: 88 },
    ]
  },
  {
    id: 'fr-1998',
    pais: 'França',
    ano: 1998,
    jogadores: [
      { id: 'fr-01', nome: 'Zidane', posicao: 'MC', overall: 95, ataque: 92, defesa: 65 },
      { id: 'fr-02', nome: 'Henry', posicao: 'ATA', overall: 89, ataque: 90, defesa: 35 },
      { id: 'fr-03', nome: 'Thuram', posicao: 'LD', overall: 88, ataque: 70, defesa: 90 },
      { id: 'fr-04', nome: 'Desailly', posicao: 'ZAG', overall: 89, ataque: 55, defesa: 92 },
      { id: 'fr-05', nome: 'Barthez', posicao: 'GOL', overall: 87, ataque: 10, defesa: 87 },
      { id: 'fr-06', nome: 'Vieira', posicao: 'VOL', overall: 88, ataque: 75, defesa: 88 },
    ]
  }
];