export interface Jogador {
  id: string;
  nome: string;
  posicao: 'GOL' | 'ZAG' | 'LD' | 'LE' | 'VOL' | 'MC' | 'MEI' | 'ME' | 'MD' | 'PE' | 'PD' | 'ATA' | 'CA';
  overall: number;
  ataque: number;
  defesa: number;
}

export interface Selecao {
  id: string;
  pais: string;
  ano: number;
  jogadores: Jogador[];
}

export const selecoesMock: Selecao[] = [
  {
    id: 'br-2002',
    pais: 'Brasil',
    ano: 2002,
    jogadores: [
      { id: 'marcos', nome: 'Marcos', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'cafu', nome: 'Cafu', posicao: 'LD', overall: 88, ataque: 85, defesa: 80 },
      { id: 'lucio', nome: 'Lúcio', posicao: 'ZAG', overall: 89, ataque: 60, defesa: 90 },
      { id: 'roque', nome: 'Roque Júnior', posicao: 'ZAG', overall: 85, ataque: 40, defesa: 85 },
      { id: 'roberto', nome: 'Roberto Carlos', posicao: 'LE', overall: 92, ataque: 90, defesa: 75 },
      { id: 'gilberto', nome: 'Gilberto Silva', posicao: 'VOL', overall: 86, ataque: 65, defesa: 88 },
      { id: 'kleberson', nome: 'Kleberson', posicao: 'MC', overall: 84, ataque: 78, defesa: 75 },
      { id: 'ronaldinho', nome: 'Ronaldinho', posicao: 'MEI', overall: 94, ataque: 95, defesa: 40 },
      { id: 'rivaldo', nome: 'Rivaldo', posicao: 'MEI', overall: 93, ataque: 92, defesa: 45 },
      { id: 'ronaldo', nome: 'Ronaldo', posicao: 'CA', overall: 96, ataque: 98, defesa: 20 },
      { id: 'dida', nome: 'Dida', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 }, // Reserva
      { id: 'beletti', nome: 'Belletti', posicao: 'LD', overall: 82, ataque: 75, defesa: 70 }, // Reserva
      { id: 'juninho', nome: 'Juninho P.', posicao: 'MC', overall: 85, ataque: 85, defesa: 50 }, // Reserva
      { id: 'denilson', nome: 'Denílson', posicao: 'PE', overall: 83, ataque: 84, defesa: 30 }, // Reserva
      { id: 'edilson', nome: 'Edilson', posicao: 'ATA', overall: 81, ataque: 80, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'fr-1998',
    pais: 'França',
    ano: 1998,
    jogadores: [
      { id: 'barthez', nome: 'Barthez', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'thuram', nome: 'Thuram', posicao: 'LD', overall: 90, ataque: 70, defesa: 92 },
      { id: 'desailly', nome: 'Desailly', posicao: 'ZAG', overall: 90, ataque: 50, defesa: 93 },
      { id: 'blanc', nome: 'Laurent Blanc', posicao: 'ZAG', overall: 88, ataque: 55, defesa: 90 },
      { id: 'lizarazu', nome: 'Lizarazu', posicao: 'LE', overall: 86, ataque: 78, defesa: 82 },
      { id: 'deschamps', nome: 'Deschamps', posicao: 'VOL', overall: 87, ataque: 60, defesa: 88 },
      { id: 'petit', nome: 'Petit', posicao: 'VOL', overall: 85, ataque: 70, defesa: 85 },
      { id: 'karembeu', nome: 'Karembeu', posicao: 'MD', overall: 84, ataque: 75, defesa: 80 },
      { id: 'zidane', nome: 'Zidane', posicao: 'MEI', overall: 95, ataque: 94, defesa: 50 },
      { id: 'djorkaeff', nome: 'Djorkaeff', posicao: 'ME', overall: 87, ataque: 88, defesa: 45 },
      { id: 'guivarch', nome: 'Guivarc\'h', posicao: 'CA', overall: 82, ataque: 80, defesa: 30 },
      { id: 'lama', nome: 'Lama', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'candela', nome: 'Candela', posicao: 'LE', overall: 81, ataque: 75, defesa: 78 }, // Reserva
      { id: 'vieira', nome: 'Vieira', posicao: 'MC', overall: 89, ataque: 75, defesa: 89 }, // Reserva
      { id: 'pires', nome: 'Pires', posicao: 'MD', overall: 84, ataque: 85, defesa: 45 }, // Reserva
      { id: 'trezeguet', nome: 'Trezeguet', posicao: 'ATA', overall: 86, ataque: 88, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'it-2006',
    pais: 'Itália',
    ano: 2006,
    jogadores: [
      { id: 'buffon', nome: 'Buffon', posicao: 'GOL', overall: 94, ataque: 20, defesa: 95 },
      { id: 'zambrotta', nome: 'Zambrotta', posicao: 'LD', overall: 88, ataque: 82, defesa: 85 },
      { id: 'cannavaro', nome: 'Cannavaro', posicao: 'ZAG', overall: 93, ataque: 40, defesa: 96 },
      { id: 'materazzi', nome: 'Materazzi', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'grosso', nome: 'Grosso', posicao: 'LE', overall: 85, ataque: 75, defesa: 82 },
      { id: 'gattuso', nome: 'Gattuso', posicao: 'VOL', overall: 88, ataque: 60, defesa: 92 },
      { id: 'pirlo', nome: 'Pirlo', posicao: 'MC', overall: 92, ataque: 88, defesa: 70 },
      { id: 'camoranesi', nome: 'Camoranesi', posicao: 'MD', overall: 86, ataque: 82, defesa: 75 },
      { id: 'totti', nome: 'Totti', posicao: 'MEI', overall: 91, ataque: 90, defesa: 40 },
      { id: 'perrotta', nome: 'Perrotta', posicao: 'ME', overall: 84, ataque: 78, defesa: 78 },
      { id: 'toni', nome: 'Luca Toni', posicao: 'CA', overall: 89, ataque: 90, defesa: 20 },
      { id: 'peruzzi', nome: 'Peruzzi', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'nesta', nome: 'Nesta', posicao: 'ZAG', overall: 90, ataque: 40, defesa: 93 }, // Reserva
      { id: 'de_rossi', nome: 'De Rossi', posicao: 'VOL', overall: 87, ataque: 75, defesa: 85 }, // Reserva
      { id: 'del_piero', nome: 'Del Piero', posicao: 'ATA', overall: 89, ataque: 89, defesa: 30 }, // Reserva
      { id: 'inzaghi', nome: 'Inzaghi', posicao: 'CA', overall: 87, ataque: 88, defesa: 20 }, // Reserva
    ]
  },
  {
    id: 'de-2014',
    pais: 'Alemanha',
    ano: 2014,
    jogadores: [
      { id: 'neuer', nome: 'Neuer', posicao: 'GOL', overall: 92, ataque: 30, defesa: 93 },
      { id: 'lahm', nome: 'Lahm', posicao: 'LD', overall: 91, ataque: 80, defesa: 90 },
      { id: 'boateng', nome: 'Boateng', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 91 },
      { id: 'hummels', nome: 'Hummels', posicao: 'ZAG', overall: 88, ataque: 55, defesa: 89 },
      { id: 'howedes', nome: 'Höwedes', posicao: 'LE', overall: 83, ataque: 60, defesa: 84 },
      { id: 'schweinsteiger', nome: 'Schweinsteiger', posicao: 'VOL', overall: 88, ataque: 80, defesa: 85 },
      { id: 'khedira', nome: 'Khedira', posicao: 'MC', overall: 86, ataque: 75, defesa: 82 },
      { id: 'kroos', nome: 'Kroos', posicao: 'MC', overall: 90, ataque: 85, defesa: 78 },
      { id: 'muller', nome: 'T. Müller', posicao: 'ATA', overall: 89, ataque: 91, defesa: 50 },
      { id: 'ozil', nome: 'Özil', posicao: 'MEI', overall: 87, ataque: 88, defesa: 40 },
      { id: 'klose', nome: 'Klose', posicao: 'CA', overall: 86, ataque: 87, defesa: 30 },
      { id: 'weidenfeller', nome: 'Weidenfeller', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'mertesacker', nome: 'Mertesacker', posicao: 'ZAG', overall: 83, ataque: 40, defesa: 85 }, // Reserva
      { id: 'gotze', nome: 'Götze', posicao: 'MEI', overall: 86, ataque: 87, defesa: 45 }, // Reserva
      { id: 'schurrle', nome: 'Schürrle', posicao: 'PE', overall: 84, ataque: 85, defesa: 40 }, // Reserva
      { id: 'podolski', nome: 'Podolski', posicao: 'ATA', overall: 82, ataque: 84, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'es-2010',
    pais: 'Espanha',
    ano: 2010,
    jogadores: [
      { id: 'casillas', nome: 'Casillas', posicao: 'GOL', overall: 92, ataque: 20, defesa: 93 },
      { id: 'ramos', nome: 'Sergio Ramos', posicao: 'LD', overall: 89, ataque: 80, defesa: 88 },
      { id: 'pique', nome: 'Piqué', posicao: 'ZAG', overall: 88, ataque: 50, defesa: 90 },
      { id: 'puyol', nome: 'Puyol', posicao: 'ZAG', overall: 89, ataque: 45, defesa: 92 },
      { id: 'capdevila', nome: 'Capdevila', posicao: 'LE', overall: 83, ataque: 70, defesa: 82 },
      { id: 'busquets', nome: 'Busquets', posicao: 'VOL', overall: 88, ataque: 65, defesa: 89 },
      { id: 'xabi', nome: 'Xabi Alonso', posicao: 'MC', overall: 89, ataque: 78, defesa: 85 },
      { id: 'xavi', nome: 'Xavi', posicao: 'MEI', overall: 94, ataque: 90, defesa: 60 },
      { id: 'iniesta', nome: 'Iniesta', posicao: 'MEI', overall: 93, ataque: 91, defesa: 65 },
      { id: 'pedro', nome: 'Pedro', posicao: 'PE', overall: 85, ataque: 86, defesa: 45 },
      { id: 'villa', nome: 'David Villa', posicao: 'CA', overall: 91, ataque: 92, defesa: 35 },
      { id: 'valdes', nome: 'Valdés', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'marchena', nome: 'Marchena', posicao: 'ZAG', overall: 82, ataque: 40, defesa: 84 }, // Reserva
      { id: 'fabregas', nome: 'Fàbregas', posicao: 'MEI', overall: 88, ataque: 87, defesa: 60 }, // Reserva
      { id: 'silva', nome: 'David Silva', posicao: 'PD', overall: 88, ataque: 89, defesa: 45 }, // Reserva
      { id: 'torres', nome: 'Fernando Torres', posicao: 'ATA', overall: 88, ataque: 89, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'ar-1986',
    pais: 'Argentina',
    ano: 1986,
    jogadores: [
      { id: 'pumpido', nome: 'Pumpido', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'cuciuffo', nome: 'Cuciuffo', posicao: 'LD', overall: 80, ataque: 65, defesa: 81 },
      { id: 'brown', nome: 'Brown', posicao: 'ZAG', overall: 81, ataque: 50, defesa: 83 },
      { id: 'ruggeri', nome: 'Ruggeri', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 86 },
      { id: 'olarticoechea', nome: 'Olarticoechea', posicao: 'LE', overall: 80, ataque: 70, defesa: 80 },
      { id: 'batista', nome: 'Batista', posicao: 'VOL', overall: 81, ataque: 60, defesa: 83 },
      { id: 'giusti', nome: 'Giusti', posicao: 'MC', overall: 80, ataque: 70, defesa: 78 },
      { id: 'burruchaga', nome: 'Burruchaga', posicao: 'MEI', overall: 85, ataque: 84, defesa: 60 },
      { id: 'maradona', nome: 'Maradona', posicao: 'MEI', overall: 99, ataque: 98, defesa: 40 },
      { id: 'enrique', nome: 'Enrique', posicao: 'ME', overall: 79, ataque: 75, defesa: 75 },
      { id: 'valdano', nome: 'Valdano', posicao: 'CA', overall: 86, ataque: 87, defesa: 30 },
      { id: 'islas', nome: 'Islas', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'trossero', nome: 'Trossero', posicao: 'ZAG', overall: 79, ataque: 40, defesa: 81 }, // Reserva
      { id: 'bochini', nome: 'Bochini', posicao: 'MEI', overall: 82, ataque: 83, defesa: 35 }, // Reserva
      { id: 'borghi', nome: 'Borghi', posicao: 'MEI', overall: 80, ataque: 81, defesa: 30 }, // Reserva
      { id: 'pasculli', nome: 'Pasculli', posicao: 'ATA', overall: 80, ataque: 82, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'br-1970',
    pais: 'Brasil',
    ano: 1970,
    jogadores: [
      { id: 'felix', nome: 'Félix', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 },
      { id: 'carlos-alberto', nome: 'C. Alberto', posicao: 'LD', overall: 92, ataque: 88, defesa: 89 },
      { id: 'brito', nome: 'Brito', posicao: 'ZAG', overall: 86, ataque: 40, defesa: 88 },
      { id: 'piazza', nome: 'Piazza', posicao: 'ZAG', overall: 87, ataque: 50, defesa: 89 },
      { id: 'everaldo', nome: 'Everaldo', posicao: 'LE', overall: 84, ataque: 75, defesa: 84 },
      { id: 'clodoaldo', nome: 'Clodoaldo', posicao: 'VOL', overall: 87, ataque: 70, defesa: 88 },
      { id: 'gerson', nome: 'Gérson', posicao: 'MC', overall: 93, ataque: 90, defesa: 65 },
      { id: 'rivelino', nome: 'Rivellino', posicao: 'MEI', overall: 93, ataque: 94, defesa: 50 },
      { id: 'jairzinho', nome: 'Jairzinho', posicao: 'PD', overall: 94, ataque: 95, defesa: 45 },
      { id: 'pele', nome: 'Pelé', posicao: 'MEI', overall: 99, ataque: 99, defesa: 50 },
      { id: 'tostao', nome: 'Tostão', posicao: 'ATA', overall: 90, ataque: 91, defesa: 30 },
      { id: 'leao', nome: 'Leão', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'fontana', nome: 'Fontana', posicao: 'ZAG', overall: 81, ataque: 40, defesa: 83 }, // Reserva
      { id: 'marco-antonio', nome: 'Marco Antônio', posicao: 'LE', overall: 82, ataque: 78, defesa: 80 }, // Reserva
      { id: 'paulo-cesar', nome: 'Paulo César', posicao: 'PE', overall: 85, ataque: 86, defesa: 35 }, // Reserva
      { id: 'dario', nome: 'Dario', posicao: 'CA', overall: 83, ataque: 85, defesa: 20 }, // Reserva
    ]
  },
  {
    id: 'pt-2024',
    pais: 'Portugal',
    ano: 2024,
    jogadores: [
      { id: 'costa', nome: 'Diogo Costa', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'cancelo', nome: 'Cancelo', posicao: 'LD', overall: 86, ataque: 85, defesa: 78 },
      { id: 'ruben', nome: 'Rúben Dias', posicao: 'ZAG', overall: 89, ataque: 55, defesa: 90 },
      { id: 'pepe', nome: 'Pepe', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 },
      { id: 'nuno-mendes', nome: 'Nuno Mendes', posicao: 'LE', overall: 85, ataque: 82, defesa: 78 },
      { id: 'palhinha', nome: 'Palhinha', posicao: 'VOL', overall: 86, ataque: 65, defesa: 89 },
      { id: 'vitinha', nome: 'Vitinha', posicao: 'MC', overall: 87, ataque: 84, defesa: 75 },
      { id: 'bruno', nome: 'Bruno Fernandes', posicao: 'MEI', overall: 88, ataque: 90, defesa: 65 },
      { id: 'silva', nome: 'Bernardo Silva', posicao: 'PD', overall: 89, ataque: 88, defesa: 60 },
      { id: 'leao-p', nome: 'Rafael Leão', posicao: 'PE', overall: 86, ataque: 89, defesa: 35 },
      { id: 'ronaldo-c', nome: 'C. Ronaldo', posicao: 'CA', overall: 90, ataque: 92, defesa: 30 },
      { id: 'patricio', nome: 'Rui Patrício', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'dalot', nome: 'Dalot', posicao: 'LD', overall: 83, ataque: 78, defesa: 79 }, // Reserva
      { id: 'ruben-neves', nome: 'Rúben Neves', posicao: 'VOL', overall: 83, ataque: 75, defesa: 78 }, // Reserva
      { id: 'joao-felix', nome: 'João Félix', posicao: 'MEI', overall: 83, ataque: 85, defesa: 40 }, // Reserva
      { id: 'goncalo', nome: 'Gonçalo Ramos', posicao: 'CA', overall: 82, ataque: 84, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'hu-1962',
    pais: 'Hungria',
    ano: 1962,
    jogadores: [
      { id: 'grocsics', nome: 'Grosics', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'majtényi', nome: 'Mátrai', posicao: 'LD', overall: 81, ataque: 70, defesa: 82 },
      { id: 'mészöly', nome: 'Mészöly', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 },
      { id: 'sipos', nome: 'Sipos', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 },
      { id: 'slovák', nome: 'Slovák', posicao: 'LE', overall: 80, ataque: 65, defesa: 80 },
      { id: 'sipos-f', nome: 'Sipos F.', posicao: 'VOL', overall: 81, ataque: 60, defesa: 82 },
      { id: 'göröcs', nome: 'Göröcs', posicao: 'MC', overall: 83, ataque: 80, defesa: 55 },
      { id: 'albert', nome: 'Flórián Albert', posicao: 'MEI', overall: 90, ataque: 91, defesa: 45 },
      { id: 'rakosi', nome: 'Rákosi', posicao: 'PD', overall: 80, ataque: 78, defesa: 50 },
      { id: 'tichy', nome: 'Lajos Tichy', posicao: 'ATA', overall: 88, ataque: 89, defesa: 25 },
      { id: 'fenyvesi', nome: 'Fenyvesi', posicao: 'PE', overall: 81, ataque: 80, defesa: 40 },
      { id: 'szentmihalyi', nome: 'Szentmihályi', posicao: 'GOL', overall: 79, ataque: 20, defesa: 80 }, // Reserva
      { id: 'solymosi', nome: 'Solymosi', posicao: 'ZAG', overall: 80, ataque: 45, defesa: 81 }, // Reserva
      { id: 'nagy', nome: 'Nagy', posicao: 'VOL', overall: 79, ataque: 60, defesa: 78 }, // Reserva
      { id: 'monostori', nome: 'Monostori', posicao: 'ATA', overall: 80, ataque: 82, defesa: 30 }, // Reserva
      { id: 'bene', nome: 'Ferenc Bene', posicao: 'ATA', overall: 82, ataque: 84, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'hu-1954',
    pais: 'Hungria',
    ano: 1954,
    jogadores: [
      { id: 'grosics', nome: 'Grosics', posicao: 'GOL', overall: 89, ataque: 20, defesa: 90 },
      { id: 'buzanszky', nome: 'Buzánszky', posicao: 'LD', overall: 84, ataque: 70, defesa: 85 },
      { id: 'lorant', nome: 'Lóránt', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 88 },
      { id: 'lantos', nome: 'Lantos', posicao: 'LE', overall: 83, ataque: 75, defesa: 82 },
      { id: 'bozsik', nome: 'Bozsik', posicao: 'VOL', overall: 91, ataque: 85, defesa: 85 },
      { id: 'zakarias', nome: 'Zakariás', posicao: 'VOL', overall: 84, ataque: 60, defesa: 86 },
      { id: 'budai', nome: 'Budai', posicao: 'MD', overall: 83, ataque: 82, defesa: 50 },
      { id: 'kocsis', nome: 'Kocsis', posicao: 'ATA', overall: 94, ataque: 96, defesa: 30 },
      { id: 'hidegkuti', nome: 'Hidegkuti', posicao: 'MEI', overall: 92, ataque: 93, defesa: 50 },
      { id: 'czibor', nome: 'Czibor', posicao: 'PE', overall: 88, ataque: 89, defesa: 40 },
      { id: 'puskas', nome: 'Puskás', posicao: 'CA', overall: 98, ataque: 99, defesa: 35 },
      { id: 'gellér', nome: 'Gellér', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'palotas', nome: 'Palotás', posicao: 'ATA', overall: 82, ataque: 83, defesa: 25 }, // Reserva
      { id: 'toth', nome: 'Tóth', posicao: 'PE', overall: 80, ataque: 81, defesa: 30 }, // Reserva
      { id: 'varhidi', nome: 'Várhidi', posicao: 'ZAG', overall: 79, ataque: 40, defesa: 80 }, // Reserva
      { id: 'csordas', nome: 'Csordás', posicao: 'ATA', overall: 80, ataque: 81, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'de-1990',
    pais: 'Alemanha',
    ano: 1990,
    jogadores: [
      { id: 'illgner', nome: 'Illgner', posicao: 'GOL', overall: 86, ataque: 20, defesa: 87 },
      { id: 'brehme', nome: 'Brehme', posicao: 'LD', overall: 89, ataque: 85, defesa: 84 },
      { id: 'kohler', nome: 'Kohler', posicao: 'ZAG', overall: 88, ataque: 40, defesa: 91 },
      { id: 'augenthaler', nome: 'Augenthaler', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'buchwald', nome: 'Buchwald', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 87 },
      { id: 'matthaus', nome: 'Matthäus', posicao: 'MC', overall: 94, ataque: 90, defesa: 85 },
      { id: 'hassler', nome: 'Hässler', posicao: 'MEI', overall: 87, ataque: 86, defesa: 55 },
      { id: 'littbarski', nome: 'Littbarski', posicao: 'MD', overall: 85, ataque: 87, defesa: 45 },
      { id: 'voeller', nome: 'Völler', posicao: 'ATA', overall: 87, ataque: 88, defesa: 30 },
      { id: 'klinnsman', nome: 'Klinsmann', posicao: 'CA', overall: 89, ataque: 90, defesa: 35 },
      { id: 'berthold', nome: 'Berthold', posicao: 'VOL', overall: 83, ataque: 60, defesa: 83 },
      { id: 'aumann', nome: 'Aumann', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'reuter', nome: 'Reuter', posicao: 'LD', overall: 82, ataque: 78, defesa: 78 }, // Reserva
      { id: 'bein', nome: 'Bein', posicao: 'MEI', overall: 81, ataque: 82, defesa: 40 }, // Reserva
      { id: 'thon', nome: 'Thon', posicao: 'MC', overall: 83, ataque: 75, defesa: 75 }, // Reserva
      { id: 'riedle', nome: 'Riedle', posicao: 'ATA', overall: 82, ataque: 83, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'fr-2024',
    pais: 'França',
    ano: 2024,
    jogadores: [
      { id: 'maignan', nome: 'Maignan', posicao: 'GOL', overall: 89, ataque: 20, defesa: 90 },
      { id: 'kounde', nome: 'Koundé', posicao: 'LD', overall: 85, ataque: 75, defesa: 86 },
      { id: 'saliba', nome: 'Saliba', posicao: 'ZAG', overall: 87, ataque: 50, defesa: 89 },
      { id: 'upamecano', nome: 'Upamecano', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 87 },
      { id: 'theo', nome: 'Theo Hernández', posicao: 'LE', overall: 86, ataque: 84, defesa: 78 },
      { id: 'tchouameni', nome: 'Tchouaméni', posicao: 'VOL', overall: 87, ataque: 70, defesa: 88 },
      { id: 'kante', nome: 'Kanté', posicao: 'MC', overall: 86, ataque: 75, defesa: 90 },
      { id: 'rabiot', nome: 'Rabiot', posicao: 'MC', overall: 84, ataque: 78, defesa: 80 },
      { id: 'dembele', nome: 'Dembélé', posicao: 'PD', overall: 86, ataque: 89, defesa: 35 },
      { id: 'mbappe', nome: 'Mbappé', posicao: 'PE', overall: 94, ataque: 96, defesa: 30 },
      { id: 'thuram-m', nome: 'M. Thuram', posicao: 'CA', overall: 84, ataque: 85, defesa: 30 },
      { id: 'samba', nome: 'Samba', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'pavard', nome: 'Pavard', posicao: 'ZAG', overall: 83, ataque: 65, defesa: 84 }, // Reserva
      { id: 'camavinga', nome: 'Camavinga', posicao: 'MC', overall: 85, ataque: 78, defesa: 83 }, // Reserva
      { id: 'griezmann', nome: 'Griezmann', posicao: 'MEI', overall: 88, ataque: 88, defesa: 60 }, // Reserva
      { id: 'giroud', nome: 'Giroud', posicao: 'CA', overall: 83, ataque: 85, defesa: 20 }, // Reserva
    ]
  },
  {
    id: 'it-1982',
    pais: 'Itália',
    ano: 1982,
    jogadores: [
      { id: 'zoff', nome: 'Zoff', posicao: 'GOL', overall: 90, ataque: 20, defesa: 92 },
      { id: 'gentile', nome: 'Gentile', posicao: 'ZAG', overall: 87, ataque: 40, defesa: 91 },
      { id: 'scirea', nome: 'Scirea', posicao: 'ZAG', overall: 91, ataque: 60, defesa: 92 },
      { id: 'collovati', nome: 'Collovati', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'cabrini', nome: 'Cabrini', posicao: 'LE', overall: 86, ataque: 78, defesa: 83 },
      { id: 'oriali', nome: 'Oriali', posicao: 'VOL', overall: 83, ataque: 65, defesa: 84 },
      { id: 'tardelli', nome: 'Tardelli', posicao: 'MC', overall: 88, ataque: 78, defesa: 86 },
      { id: 'conti', nome: 'Conti', posicao: 'MD', overall: 87, ataque: 86, defesa: 50 },
      { id: 'antognoni', nome: 'Antognoni', posicao: 'MEI', overall: 86, ataque: 85, defesa: 55 },
      { id: 'graziani', nome: 'Graziani', posicao: 'PE', overall: 83, ataque: 82, defesa: 40 },
      { id: 'rossi', nome: 'Paolo Rossi', posicao: 'CA', overall: 91, ataque: 93, defesa: 25 },
      { id: 'galli', nome: 'Galli', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'bergomi', nome: 'Bergomi', posicao: 'ZAG', overall: 82, ataque: 40, defesa: 85 }, // Reserva
      { id: 'marini', nome: 'Marini', posicao: 'MC', overall: 80, ataque: 70, defesa: 80 }, // Reserva
      { id: 'altobelli', nome: 'Altobelli', posicao: 'ATA', overall: 84, ataque: 86, defesa: 25 }, // Reserva
      { id: 'causio', nome: 'Causio', posicao: 'PD', overall: 82, ataque: 83, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'nl-1974',
    pais: 'Holanda',
    ano: 1974,
    jogadores: [
      { id: 'jongbloed', nome: 'Jongbloed', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 },
      { id: 'suurbier', nome: 'Suurbier', posicao: 'LD', overall: 84, ataque: 75, defesa: 80 },
      { id: 'rijkaard-j', nome: 'Hulshoff', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 86 },
      { id: 'haan', nome: 'Arie Haan', posicao: 'ZAG', overall: 86, ataque: 75, defesa: 82 },
      { id: 'krol', nome: 'Krol', posicao: 'LE', overall: 87, ataque: 78, defesa: 84 },
      { id: 'jansen', nome: 'Jansen', posicao: 'VOL', overall: 85, ataque: 72, defesa: 84 },
      { id: 'neeskens', nome: 'Neeskens', posicao: 'MC', overall: 90, ataque: 85, defesa: 86 },
      { id: 'van_hanegem', nome: 'Van Hanegem', posicao: 'MEI', overall: 88, ataque: 86, defesa: 60 },
      { id: 'rep', nome: 'Johnny Rep', posicao: 'PD', overall: 86, ataque: 88, defesa: 40 },
      { id: 'cruyff', nome: 'Cruyff', posicao: 'ATA', overall: 98, ataque: 97, defesa: 55 },
      { id: 'rensenbrink', nome: 'Rensenbrink', posicao: 'PE', overall: 87, ataque: 89, defesa: 35 },
      { id: 'schrijvers', nome: 'Schrijvers', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'venburg', nome: 'Vanenburg', posicao: 'MC', overall: 81, ataque: 79, defesa: 45 }, // Reserva
      { id: 'keizer', nome: 'Keizer', posicao: 'PE', overall: 83, ataque: 84, defesa: 30 }, // Reserva
      { id: 'suurbier-j', nome: 'Jansen W', posicao: 'MC', overall: 80, ataque: 75, defesa: 75 }, // Reserva
      { id: 'de_jong', nome: 'De Jong', posicao: 'CA', overall: 79, ataque: 80, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'fr-2006',
    pais: 'França',
    ano: 2006,
    jogadores: [
      { id: 'barthez-06', nome: 'Barthez', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'sagnol', nome: 'Sagnol', posicao: 'LD', overall: 85, ataque: 78, defesa: 84 },
      { id: 'thuram-06', nome: 'Thuram', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 91 },
      { id: 'gallas', nome: 'Gallas', posicao: 'ZAG', overall: 87, ataque: 55, defesa: 89 },
      { id: 'abidal', nome: 'Abidal', posicao: 'LE', overall: 84, ataque: 65, defesa: 85 },
      { id: 'vieira-06', nome: 'Vieira', posicao: 'VOL', overall: 90, ataque: 78, defesa: 90 },
      { id: 'makelele', nome: 'Makelele', posicao: 'VOL', overall: 89, ataque: 60, defesa: 93 },
      { id: 'ribery', nome: 'Ribéry', posicao: 'MD', overall: 86, ataque: 87, defesa: 45 },
      { id: 'zidane-06', nome: 'Zidane', posicao: 'MEI', overall: 96, ataque: 95, defesa: 60 },
      { id: 'malouda', nome: 'Malouda', posicao: 'ME', overall: 84, ataque: 85, defesa: 50 },
      { id: 'henry', nome: 'Thierry Henry', posicao: 'CA', overall: 93, ataque: 95, defesa: 30 },
      { id: 'coupet', nome: 'Coupet', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'sylvestre', nome: 'Sylvestre', posicao: 'ZAG', overall: 81, ataque: 40, defesa: 82 }, // Reserva
      { id: 'diarra', nome: 'Diarra', posicao: 'MC', overall: 82, ataque: 70, defesa: 83 }, // Reserva
      { id: 'wiltord', nome: 'Wiltord', posicao: 'PD', overall: 83, ataque: 84, defesa: 40 }, // Reserva
      { id: 'trezeguet-06', nome: 'Trezeguet', posicao: 'CA', overall: 87, ataque: 89, defesa: 20 }, // Reserva
    ]
  },
  {
    id: 'en-1966',
    pais: 'Inglaterra',
    ano: 1966,
    jogadores: [
      { id: 'banks', nome: 'Gordon Banks', posicao: 'GOL', overall: 90, ataque: 20, defesa: 91 },
      { id: 'cohen', nome: 'Cohen', posicao: 'LD', overall: 82, ataque: 70, defesa: 83 },
      { id: 'moore', nome: 'Bobby Moore', posicao: 'ZAG', overall: 93, ataque: 55, defesa: 95 },
      { id: 'jack-c', nome: 'Jack Charlton', posicao: 'ZAG', overall: 86, ataque: 45, defesa: 88 },
      { id: 'wilson', nome: 'Wilson', posicao: 'LE', overall: 81, ataque: 65, defesa: 82 },
      { id: 'nobby', nome: 'Nobby Stiles', posicao: 'VOL', overall: 84, ataque: 60, defesa: 87 },
      { id: 'bobby-c', nome: 'Bobby Charlton', posicao: 'MEI', overall: 92, ataque: 91, defesa: 60 },
      { id: 'peters', nome: 'Martin Peters', posicao: 'ME', overall: 85, ataque: 84, defesa: 65 },
      { id: 'ball', nome: 'Alan Ball', posicao: 'MD', overall: 84, ataque: 82, defesa: 60 },
      { id: 'hunt', nome: 'Roger Hunt', posicao: 'ATA', overall: 85, ataque: 86, defesa: 30 },
      { id: 'hurst', nome: 'Geoff Hurst', posicao: 'CA', overall: 87, ataque: 88, defesa: 30 },
      { id: 'stepney', nome: 'Stepney', posicao: 'GOL', overall: 79, ataque: 20, defesa: 80 }, // Reserva
      { id: 'wilson-r', nome: 'Ray Wilson', posicao: 'LE', overall: 80, ataque: 60, defesa: 81 }, // Reserva
      { id: 'greaves', nome: 'Jimmy Greaves', posicao: 'ATA', overall: 88, ataque: 90, defesa: 25 }, // Reserva
      { id: 'callaghan', nome: 'Callaghan', posicao: 'MD', overall: 81, ataque: 80, defesa: 50 }, // Reserva
      { id: 'connelly', nome: 'Connelly', posicao: 'PD', overall: 80, ataque: 81, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'ur-1950',
    pais: 'Uruguai',
    ano: 1950,
    jogadores: [
      { id: 'maspoli', nome: 'Maspoli', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'matthias', nome: 'Matthias González', posicao: 'LD', overall: 82, ataque: 60, defesa: 84 },
      { id: 'tejera', nome: 'Tejera', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'gambetta', nome: 'Gambetta', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 85 },
      { id: 'andrade', nome: 'Andrade', posicao: 'LE', overall: 81, ataque: 65, defesa: 82 },
      { id: 'obdulio', nome: 'Obdulio Varela', posicao: 'VOL', overall: 91, ataque: 70, defesa: 92 },
      { id: 'perez', nome: 'Julio Pérez', posicao: 'MC', overall: 84, ataque: 78, defesa: 75 },
      { id: 'ghiggia', nome: 'Ghiggia', posicao: 'PD', overall: 88, ataque: 89, defesa: 45 },
      { id: 'schiaffino', nome: 'Schiaffino', posicao: 'MEI', overall: 93, ataque: 92, defesa: 60 },
      { id: 'vidall', nome: 'Vidall', posicao: 'PE', overall: 82, ataque: 83, defesa: 40 },
      { id: 'miguez', nome: 'Míguez', posicao: 'CA', overall: 87, ataque: 88, defesa: 30 },
      { id: 'bazan', nome: 'Bazán', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'pini', nome: 'Pini', posicao: 'ZAG', overall: 79, ataque: 40, defesa: 81 }, // Reserva
      { id: 'vancini', nome: 'Vancini', posicao: 'VOL', overall: 80, ataque: 65, defesa: 80 }, // Reserva
      { id: 'abaddie', nome: 'Abaddie', posicao: 'PD', overall: 81, ataque: 82, defesa: 35 }, // Reserva
      { id: 'pereyra', nome: 'Pereyra', posicao: 'ATA', overall: 80, ataque: 81, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'de-1974',
    pais: 'Alemanha',
    ano: 1974,
    jogadores: [
      { id: 'maier', nome: 'Sepp Maier', posicao: 'GOL', overall: 91, ataque: 20, defesa: 92 },
      { id: 'vogts', nome: 'Berti Vogts', posicao: 'LD', overall: 87, ataque: 70, defesa: 89 },
      { id: 'beckenbauer', nome: 'Beckenbauer', posicao: 'ZAG', overall: 97, ataque: 80, defesa: 97 },
      { id: 'schwarzenbeck', nome: 'Schwarzenbeck', posicao: 'ZAG', overall: 84, ataque: 40, defesa: 86 },
      { id: 'breitner', nome: 'Breitner', posicao: 'LE', overall: 88, ataque: 85, defesa: 83 },
      { id: 'bonhof', nome: 'Bonhof', posicao: 'VOL', overall: 85, ataque: 75, defesa: 84 },
      { id: 'hoeness', nome: 'Hoeneß', posicao: 'MC', overall: 86, ataque: 84, defesa: 60 },
      { id: 'overath', nome: 'Overath', posicao: 'MEI', overall: 88, ataque: 87, defesa: 55 },
      { id: 'grabowski', nome: 'Grabowski', posicao: 'PD', overall: 85, ataque: 86, defesa: 45 },
      { id: 'muller-g', nome: 'Gerd Müller', posicao: 'CA', overall: 95, ataque: 98, defesa: 25 },
      { id: 'holzenbein', nome: 'Hölzenbein', posicao: 'PE', overall: 84, ataque: 85, defesa: 35 },
      { id: 'nimene', nome: 'Nigbur', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'cullmann', nome: 'Cullmann', posicao: 'VOL', overall: 81, ataque: 70, defesa: 80 }, // Reserva
      { id: 'flohe', nome: 'Flohe', posicao: 'MC', overall: 82, ataque: 80, defesa: 50 }, // Reserva
      { id: 'heynckes', nome: 'Jupp Heynckes', posicao: 'ATA', overall: 87, ataque: 88, defesa: 30 }, // Reserva
      { id: 'wimmer', nome: 'Wimmer', posicao: 'ME', overall: 81, ataque: 80, defesa: 40 }, // Reserva
    ]
  },
  {
    id: 'pt-2004',
    pais: 'Portugal',
    ano: 2004,
    jogadores: [
      { id: 'ricardo', nome: 'Ricardo', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'seitaridis', nome: 'Miguel', posicao: 'LD', overall: 83, ataque: 78, defesa: 80 },
      { id: 'carvalho', nome: 'Ricardo Carvalho', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 91 },
      { id: 'andrade', nome: 'Jorge Andrade', posicao: 'ZAG', overall: 85, ataque: 40, defesa: 87 },
      { id: 'valente', nome: 'Nuno Valente', posicao: 'LE', overall: 82, ataque: 75, defesa: 80 },
      { id: 'costinha', nome: 'Costinha', posicao: 'VOL', overall: 84, ataque: 60, defesa: 87 },
      { id: 'maniche', nome: 'Maniche', posicao: 'MC', overall: 86, ataque: 82, defesa: 81 },
      { id: 'deco', nome: 'Deco', posicao: 'MEI', overall: 91, ataque: 90, defesa: 65 },
      { id: 'figo', nome: 'Luis Figo', posicao: 'PD', overall: 92, ataque: 91, defesa: 50 },
      { id: 'ronaldo-04', nome: 'C. Ronaldo', posicao: 'PE', overall: 87, ataque: 88, defesa: 40 },
      { id: 'pauleta', nome: 'Pauleta', posicao: 'CA', overall: 86, ataque: 87, defesa: 25 },
      { id: 'baia', nome: 'Vítor Baía', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 }, // Reserva
      { id: 'couto', nome: 'Fernando Couto', posicao: 'ZAG', overall: 82, ataque: 40, defesa: 84 }, // Reserva
      { id: 'petit-04', nome: 'Petit', posicao: 'VOL', overall: 83, ataque: 75, defesa: 82 }, // Reserva
      { id: 'rui-costa', nome: 'Rui Costa', posicao: 'MEI', overall: 88, ataque: 89, defesa: 50 }, // Reserva
      { id: 'nuno-gomes', nome: 'Nuno Gomes', posicao: 'ATA', overall: 83, ataque: 84, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'fr-1984',
    pais: 'França',
    ano: 1984,
    jogadores: [
      { id: 'bats', nome: 'Joël Bats', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 },
      { id: 'battiston', nome: 'Battiston', posicao: 'LD', overall: 84, ataque: 78, defesa: 81 },
      { id: 'bossis', nome: 'Bossis', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'le_roux', nome: 'Le Roux', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 85 },
      { id: 'amoros', nome: 'Amoros', posicao: 'LE', overall: 84, ataque: 75, defesa: 83 },
      { id: 'tigana', nome: 'Jean Tigana', posicao: 'MC', overall: 89, ataque: 80, defesa: 85 },
      { id: 'giresse', nome: 'Alain Giresse', posicao: 'MEI', overall: 90, ataque: 88, defesa: 60 },
      { id: 'platini', nome: 'Michel Platini', posicao: 'MEI', overall: 97, ataque: 96, defesa: 55 },
      { id: 'fernandez', nome: 'Luis Fernandez', posicao: 'VOL', overall: 85, ataque: 75, defesa: 84 },
      { id: 'six', nome: 'Didier Six', posicao: 'PE', overall: 83, ataque: 84, defesa: 35 },
      { id: 'lacombe', nome: 'Lacombe', posicao: 'CA', overall: 84, ataque: 85, defesa: 30 },
      { id: 'bergeroo', nome: 'Bergeroo', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'domergue', nome: 'Domergue', posicao: 'LE', overall: 81, ataque: 70, defesa: 80 }, // Reserva
      { id: 'genghini', nome: 'Genghini', posicao: 'MEI', overall: 82, ataque: 83, defesa: 45 }, // Reserva
      { id: 'rocheteau', nome: 'Rocheteau', posicao: 'PD', overall: 83, ataque: 84, defesa: 35 }, // Reserva
      { id: 'bellone', nome: 'Bellone', posicao: 'ATA', overall: 81, ataque: 82, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'br-1982',
    pais: 'Brasil',
    ano: 1982,
    jogadores: [
      { id: 'waldir', nome: 'Waldir Peres', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 },
      { id: 'leandro', nome: 'Leandro', posicao: 'LD', overall: 89, ataque: 88, defesa: 82 },
      { id: 'oscar', nome: 'Oscar', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'luizinho', nome: 'Luizinho', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'junior', nome: 'Júnior', posicao: 'LE', overall: 91, ataque: 89, defesa: 80 },
      { id: 'cerezo', nome: 'Toninho Cerezo', posicao: 'VOL', overall: 88, ataque: 80, defesa: 85 },
      { id: 'falcao', nome: 'Falcão', posicao: 'MC', overall: 92, ataque: 88, defesa: 85 },
      { id: 'socrates', nome: 'Sócrates', posicao: 'MEI', overall: 93, ataque: 92, defesa: 60 },
      { id: 'zico', nome: 'Zico', posicao: 'MEI', overall: 96, ataque: 97, defesa: 45 },
      { id: 'eder', nome: 'Éder', posicao: 'PE', overall: 87, ataque: 88, defesa: 35 },
      { id: 'serginho', nome: 'S. Chulapa', posicao: 'CA', overall: 83, ataque: 85, defesa: 30 },
      { id: 'paulo-sergio', nome: 'Paulo Sérgio', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'edinho', nome: 'Edinho', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 85 }, // Reserva
      { id: 'batista', nome: 'Batista', posicao: 'VOL', overall: 83, ataque: 65, defesa: 84 }, // Reserva
      { id: 'renato', nome: 'Renato', posicao: 'MC', overall: 82, ataque: 80, defesa: 60 }, // Reserva
      { id: 'dinamite', nome: 'Roberto Dinamite', posicao: 'CA', overall: 85, ataque: 87, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'ar-2022',
    pais: 'Argentina',
    ano: 2022,
    jogadores: [
      { id: 'dibu', nome: 'E. Martínez', posicao: 'GOL', overall: 88, ataque: 20, defesa: 90 },
      { id: 'molina', nome: 'Molina', posicao: 'LD', overall: 84, ataque: 78, defesa: 82 },
      { id: 'romero', nome: 'C. Romero', posicao: 'ZAG', overall: 87, ataque: 50, defesa: 89 },
      { id: 'otamendi', nome: 'Otamendi', posicao: 'ZAG', overall: 86, ataque: 55, defesa: 88 },
      { id: 'tagliafico', nome: 'Tagliafico', posicao: 'LE', overall: 83, ataque: 70, defesa: 84 },
      { id: 'enzo', nome: 'E. Fernández', posicao: 'VOL', overall: 86, ataque: 80, defesa: 82 },
      { id: 'depaul', nome: 'De Paul', posicao: 'MC', overall: 87, ataque: 82, defesa: 85 },
      { id: 'macallister', nome: 'Mac Allister', posicao: 'MC', overall: 85, ataque: 84, defesa: 78 },
      { id: 'dimaria', nome: 'Di María', posicao: 'PE', overall: 88, ataque: 89, defesa: 45 },
      { id: 'messi', nome: 'Lionel Messi', posicao: 'MEI', overall: 96, ataque: 97, defesa: 35 },
      { id: 'alvarez', nome: 'J. Álvarez', posicao: 'CA', overall: 86, ataque: 88, defesa: 40 },
      { id: 'armani', nome: 'Armani', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'lisandro', nome: 'Li. Martínez', posicao: 'ZAG', overall: 85, ataque: 60, defesa: 86 }, // Reserva
      { id: 'paredes', nome: 'Paredes', posicao: 'VOL', overall: 83, ataque: 75, defesa: 80 }, // Reserva
      { id: 'dybala', nome: 'Dybala', posicao: 'MEI', overall: 86, ataque: 88, defesa: 30 }, // Reserva
      { id: 'lautaro', nome: 'Lautaro', posicao: 'CA', overall: 86, ataque: 87, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'nl-1988',
    pais: 'Holanda',
    ano: 1988,
    jogadores: [
      { id: 'vanbreukelen', nome: 'Van Breukelen', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'vanaerle', nome: 'Van Aerle', posicao: 'LD', overall: 82, ataque: 70, defesa: 83 },
      { id: 'rkoeman', nome: 'R. Koeman', posicao: 'ZAG', overall: 91, ataque: 85, defesa: 90 },
      { id: 'rijkaard', nome: 'F. Rijkaard', posicao: 'ZAG', overall: 92, ataque: 80, defesa: 93 },
      { id: 'vantiggelen', nome: 'Van Tiggelen', posicao: 'LE', overall: 83, ataque: 65, defesa: 84 },
      { id: 'wouters', nome: 'Wouters', posicao: 'VOL', overall: 85, ataque: 70, defesa: 86 },
      { id: 'muhren', nome: 'Mühren', posicao: 'MC', overall: 84, ataque: 82, defesa: 75 },
      { id: 'ekoeman', nome: 'E. Koeman', posicao: 'MC', overall: 83, ataque: 80, defesa: 78 },
      { id: 'vanenburg', nome: 'Vanenburg', posicao: 'MD', overall: 85, ataque: 86, defesa: 50 },
      { id: 'gullit', nome: 'R. Gullit', posicao: 'MEI', overall: 94, ataque: 93, defesa: 70 },
      { id: 'vanbasten', nome: 'Van Basten', posicao: 'CA', overall: 95, ataque: 97, defesa: 30 },
      { id: 'hiele', nome: 'Hiele', posicao: 'GOL', overall: 79, ataque: 20, defesa: 80 }, // Reserva
      { id: 'suvrijn', nome: 'Suvrijn', posicao: 'ZAG', overall: 80, ataque: 45, defesa: 81 }, // Reserva
      { id: 'bosman', nome: 'Bosman', posicao: 'MC', overall: 81, ataque: 75, defesa: 70 }, // Reserva
      { id: 'boskamp', nome: 'Boskamp', posicao: 'PE', overall: 80, ataque: 82, defesa: 35 }, // Reserva
      { id: 'kieft', nome: 'Kieft', posicao: 'ATA', overall: 83, ataque: 85, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'br-1958',
    pais: 'Brasil',
    ano: 1958,
    jogadores: [
      { id: 'gilmar', nome: 'Gilmar', posicao: 'GOL', overall: 89, ataque: 20, defesa: 90 },
      { id: 'djalma', nome: 'Djalma Santos', posicao: 'LD', overall: 91, ataque: 85, defesa: 90 },
      { id: 'bellini', nome: 'Bellini', posicao: 'ZAG', overall: 87, ataque: 40, defesa: 89 },
      { id: 'orlando', nome: 'Orlando', posicao: 'ZAG', overall: 86, ataque: 45, defesa: 88 },
      { id: 'nilton', nome: 'Nílton Santos', posicao: 'LE', overall: 92, ataque: 88, defesa: 89 },
      { id: 'zito', nome: 'Zito', posicao: 'VOL', overall: 87, ataque: 70, defesa: 88 },
      { id: 'didi', nome: 'Didi', posicao: 'MC', overall: 93, ataque: 92, defesa: 75 },
      { id: 'garrincha', nome: 'Garrincha', posicao: 'PD', overall: 96, ataque: 97, defesa: 40 },
      { id: 'zagallo', nome: 'Zagallo', posicao: 'PE', overall: 88, ataque: 87, defesa: 65 },
      { id: 'pele58', nome: 'Pelé', posicao: 'ATA', overall: 95, ataque: 96, defesa: 45 },
      { id: 'vava', nome: 'Vavá', posicao: 'CA', overall: 89, ataque: 91, defesa: 30 },
      { id: 'castilho', nome: 'Castilho', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 }, // Reserva
      { id: 'mauro', nome: 'Mauro', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 }, // Reserva
      { id: 'dino', nome: 'Dino Sani', posicao: 'VOL', overall: 84, ataque: 75, defesa: 82 }, // Reserva
      { id: 'pepe58', nome: 'Pepe', posicao: 'PE', overall: 86, ataque: 88, defesa: 35 }, // Reserva
      { id: 'mazzola', nome: 'Mazzola', posicao: 'CA', overall: 87, ataque: 89, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'fr-2018',
    pais: 'França',
    ano: 2018,
    jogadores: [
      { id: 'lloris', nome: 'H. Lloris', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'pavard18', nome: 'Pavard', posicao: 'LD', overall: 84, ataque: 78, defesa: 85 },
      { id: 'varane', nome: 'Varane', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 90 },
      { id: 'umtiti', nome: 'Umtiti', posicao: 'ZAG', overall: 86, ataque: 55, defesa: 87 },
      { id: 'lucas', nome: 'L. Hernández', posicao: 'LE', overall: 85, ataque: 82, defesa: 83 },
      { id: 'kante18', nome: 'Kanté', posicao: 'VOL', overall: 90, ataque: 75, defesa: 92 },
      { id: 'pogba', nome: 'Pogba', posicao: 'MC', overall: 89, ataque: 88, defesa: 80 },
      { id: 'matuidi', nome: 'Matuidi', posicao: 'ME', overall: 85, ataque: 78, defesa: 85 },
      { id: 'mbappe18', nome: 'Mbappé', posicao: 'PD', overall: 92, ataque: 94, defesa: 35 },
      { id: 'griezmann18', nome: 'Griezmann', posicao: 'MEI', overall: 90, ataque: 91, defesa: 65 },
      { id: 'giroud18', nome: 'Giroud', posicao: 'CA', overall: 84, ataque: 85, defesa: 40 },
      { id: 'mandanda', nome: 'Mandanda', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'kimpembe', nome: 'Kimpembe', posicao: 'ZAG', overall: 84, ataque: 45, defesa: 85 }, // Reserva
      { id: 'tolisso', nome: 'Tolisso', posicao: 'MC', overall: 83, ataque: 80, defesa: 78 }, // Reserva
      { id: 'fekir', nome: 'Fekir', posicao: 'MEI', overall: 84, ataque: 85, defesa: 45 }, // Reserva
      { id: 'dembele18', nome: 'Dembélé', posicao: 'PE', overall: 84, ataque: 87, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'br-1994',
    pais: 'Brasil',
    ano: 1994,
    jogadores: [
      { id: 'taffarel', nome: 'Taffarel', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'jorginho', nome: 'Jorginho', posicao: 'LD', overall: 86, ataque: 84, defesa: 80 },
      { id: 'aldair', nome: 'Aldair', posicao: 'ZAG', overall: 88, ataque: 45, defesa: 90 },
      { id: 'marcio-santos', nome: 'Márcio Santos', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'branco', nome: 'Branco', posicao: 'LE', overall: 85, ataque: 84, defesa: 81 },
      { id: 'mauro-silva', nome: 'Mauro Silva', posicao: 'VOL', overall: 87, ataque: 65, defesa: 89 },
      { id: 'dunga', nome: 'Dunga', posicao: 'VOL', overall: 88, ataque: 70, defesa: 88 },
      { id: 'mazinho', nome: 'Mazinho', posicao: 'MC', overall: 84, ataque: 78, defesa: 80 },
      { id: 'zinho', nome: 'Zinho', posicao: 'MEI', overall: 83, ataque: 80, defesa: 60 },
      { id: 'bebeto', nome: 'Bebeto', posicao: 'ATA', overall: 90, ataque: 91, defesa: 35 },
      { id: 'romario94', nome: 'Romário', posicao: 'CA', overall: 96, ataque: 98, defesa: 25 },
      { id: 'zetti', nome: 'Zetti', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'cafu94', nome: 'Cafu', posicao: 'LD', overall: 84, ataque: 82, defesa: 78 }, // Reserva
      { id: 'ricardo-rocha', nome: 'Ricardo Rocha', posicao: 'ZAG', overall: 84, ataque: 40, defesa: 86 }, // Reserva
      { id: 'rai', nome: 'Raí', posicao: 'MEI', overall: 87, ataque: 88, defesa: 50 }, // Reserva
      { id: 'ronaldo94', nome: 'Ronaldo', posicao: 'CA', overall: 83, ataque: 85, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'es-2024',
    pais: 'Espanha',
    ano: 2024,
    jogadores: [
      { id: 'unai-simon', nome: 'Unai Simón', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'carvajal', nome: 'Carvajal', posicao: 'LD', overall: 88, ataque: 82, defesa: 86 },
      { id: 'le-normand', nome: 'Le Normand', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 84 },
      { id: 'laporte', nome: 'Laporte', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 86 },
      { id: 'cucurella', nome: 'Cucurella', posicao: 'LE', overall: 84, ataque: 78, defesa: 82 },
      { id: 'rodri', nome: 'Rodri', posicao: 'VOL', overall: 92, ataque: 85, defesa: 90 },
      { id: 'fabian', nome: 'Fabián Ruiz', posicao: 'MC', overall: 86, ataque: 84, defesa: 78 },
      { id: 'olmo', nome: 'Dani Olmo', posicao: 'MEI', overall: 86, ataque: 87, defesa: 60 },
      { id: 'yamal', nome: 'Lamine Yamal', posicao: 'PD', overall: 85, ataque: 88, defesa: 45 },
      { id: 'nico', nome: 'Nico Williams', posicao: 'PE', overall: 85, ataque: 87, defesa: 40 },
      { id: 'morata', nome: 'Morata', posicao: 'CA', overall: 84, ataque: 86, defesa: 35 },
      { id: 'raya', nome: 'David Raya', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 }, // Reserva
      { id: 'nacho', nome: 'Nacho', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 83 }, // Reserva
      { id: 'zubimendi', nome: 'Zubimendi', posicao: 'VOL', overall: 84, ataque: 75, defesa: 83 }, // Reserva
      { id: 'pedri', nome: 'Pedri', posicao: 'MC', overall: 86, ataque: 85, defesa: 65 }, // Reserva
      { id: 'oyarzabal', nome: 'Oyarzabal', posicao: 'ATA', overall: 83, ataque: 84, defesa: 40 }, // Reserva
    ]
  },
  {
    id: 'ar-1978',
    pais: 'Argentina',
    ano: 1978,
    jogadores: [
      { id: 'fillol', nome: 'Fillol', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'olguin', nome: 'Olguín', posicao: 'LD', overall: 82, ataque: 75, defesa: 80 },
      { id: 'galvan', nome: 'Galván', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 85 },
      { id: 'passarella', nome: 'Passarella', posicao: 'ZAG', overall: 90, ataque: 80, defesa: 92 },
      { id: 'tarantini', nome: 'Tarantini', posicao: 'LE', overall: 84, ataque: 78, defesa: 82 },
      { id: 'gallego', nome: 'Gallego', posicao: 'VOL', overall: 85, ataque: 65, defesa: 86 },
      { id: 'ardiles', nome: 'Ardiles', posicao: 'MC', overall: 86, ataque: 84, defesa: 75 },
      { id: 'valencia', nome: 'Valencia', posicao: 'MEI', overall: 83, ataque: 82, defesa: 60 },
      { id: 'bertoni', nome: 'Bertoni', posicao: 'PD', overall: 84, ataque: 85, defesa: 40 },
      { id: 'ortiz', nome: 'Ortiz', posicao: 'PE', overall: 83, ataque: 84, defesa: 40 },
      { id: 'kempes', nome: 'Mario Kempes', posicao: 'CA', overall: 92, ataque: 94, defesa: 35 },
      { id: 'baley', nome: 'Baley', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'killer', nome: 'Killer', posicao: 'ZAG', overall: 80, ataque: 40, defesa: 81 }, // Reserva
      { id: 'villa78', nome: 'Villa', posicao: 'MC', overall: 81, ataque: 78, defesa: 65 }, // Reserva
      { id: 'houseman', nome: 'Houseman', posicao: 'PD', overall: 83, ataque: 85, defesa: 35 }, // Reserva
      { id: 'luque', nome: 'Luque', posicao: 'CA', overall: 85, ataque: 87, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'nl-2010',
    pais: 'Holanda',
    ano: 2010,
    jogadores: [
      { id: 'stekelenburg', nome: 'Stekelenburg', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'vanderwiel', nome: 'Van der Wiel', posicao: 'LD', overall: 82, ataque: 78, defesa: 80 },
      { id: 'heitinga', nome: 'Heitinga', posicao: 'ZAG', overall: 82, ataque: 50, defesa: 83 },
      { id: 'mathijsen', nome: 'Mathijsen', posicao: 'ZAG', overall: 81, ataque: 45, defesa: 82 },
      { id: 'vanbronckhorst', nome: 'V. Bronckhorst', posicao: 'LE', overall: 84, ataque: 82, defesa: 81 },
      { id: 'vanbommel', nome: 'Van Bommel', posicao: 'VOL', overall: 84, ataque: 70, defesa: 86 },
      { id: 'dejong10', nome: 'De Jong', posicao: 'VOL', overall: 83, ataque: 60, defesa: 85 },
      { id: 'sneijder', nome: 'Sneijder', posicao: 'MEI', overall: 91, ataque: 92, defesa: 55 },
      { id: 'robben', nome: 'Robben', posicao: 'PD', overall: 90, ataque: 93, defesa: 40 },
      { id: 'kuyt', nome: 'Kuyt', posicao: 'PE', overall: 85, ataque: 84, defesa: 65 },
      { id: 'vanpersie', nome: 'Van Persie', posicao: 'CA', overall: 88, ataque: 90, defesa: 35 },
      { id: 'vorm', nome: 'Vorm', posicao: 'GOL', overall: 79, ataque: 20, defesa: 80 }, // Reserva
      { id: 'boulahrouz', nome: 'Boulahrouz', posicao: 'ZAG', overall: 79, ataque: 45, defesa: 81 }, // Reserva
      { id: 'vandervaart', nome: 'Van der Vaart', posicao: 'MEI', overall: 85, ataque: 86, defesa: 50 }, // Reserva
      { id: 'elia', nome: 'Elia', posicao: 'PE', overall: 81, ataque: 84, defesa: 30 }, // Reserva
      { id: 'huntelaar', nome: 'Huntelaar', posicao: 'CA', overall: 83, ataque: 86, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'hr-2018',
    pais: 'Croácia',
    ano: 2018,
    jogadores: [
      { id: 'subasic', nome: 'Subašić', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'vrsaljko', nome: 'Vrsaljko', posicao: 'LD', overall: 82, ataque: 78, defesa: 80 },
      { id: 'lovren', nome: 'Lovren', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 83 },
      { id: 'vida', nome: 'Vida', posicao: 'ZAG', overall: 81, ataque: 50, defesa: 82 },
      { id: 'strinic', nome: 'Strinić', posicao: 'LE', overall: 79, ataque: 70, defesa: 78 },
      { id: 'brozovic', nome: 'Brozović', posicao: 'VOL', overall: 85, ataque: 75, defesa: 86 },
      { id: 'rakitic', nome: 'Rakitić', posicao: 'MC', overall: 88, ataque: 86, defesa: 75 },
      { id: 'modric', nome: 'Modrić', posicao: 'MC', overall: 92, ataque: 90, defesa: 78 },
      { id: 'rebic', nome: 'Rebić', posicao: 'PD', overall: 82, ataque: 84, defesa: 45 },
      { id: 'perisic', nome: 'Perišić', posicao: 'PE', overall: 86, ataque: 87, defesa: 55 },
      { id: 'mandzukic', nome: 'Mandžukić', posicao: 'CA', overall: 85, ataque: 86, defesa: 50 },
      { id: 'livakovic', nome: 'Livaković', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'corluka', nome: 'Ćorluka', posicao: 'ZAG', overall: 80, ataque: 40, defesa: 82 }, // Reserva
      { id: 'kovacic', nome: 'Kovačić', posicao: 'MC', overall: 83, ataque: 80, defesa: 70 }, // Reserva
      { id: 'pjaca', nome: 'Pjaca', posicao: 'PE', overall: 79, ataque: 80, defesa: 35 }, // Reserva
      { id: 'kramaric', nome: 'Kramarić', posicao: 'ATA', overall: 82, ataque: 84, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'pt-2016',
    pais: 'Portugal',
    ano: 2016,
    jogadores: [
      { id: 'patricio16', nome: 'Rui Patrício', posicao: 'GOL', overall: 86, ataque: 20, defesa: 87 },
      { id: 'cedric', nome: 'Cédric', posicao: 'LD', overall: 81, ataque: 75, defesa: 80 },
      { id: 'pepe16', nome: 'Pepe', posicao: 'ZAG', overall: 88, ataque: 50, defesa: 91 },
      { id: 'fonte', nome: 'José Fonte', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 85 },
      { id: 'guerreiro', nome: 'Guerreiro', posicao: 'LE', overall: 84, ataque: 82, defesa: 80 },
      { id: 'william', nome: 'W. Carvalho', posicao: 'VOL', overall: 84, ataque: 65, defesa: 86 },
      { id: 'adrien', nome: 'Adrien Silva', posicao: 'MC', overall: 83, ataque: 78, defesa: 82 },
      { id: 'renato', nome: 'R. Sanches', posicao: 'MC', overall: 84, ataque: 82, defesa: 75 },
      { id: 'joao-mario', nome: 'João Mário', posicao: 'MD', overall: 83, ataque: 80, defesa: 70 },
      { id: 'nani', nome: 'Nani', posicao: 'PE', overall: 86, ataque: 87, defesa: 45 },
      { id: 'ronaldo16', nome: 'C. Ronaldo', posicao: 'CA', overall: 94, ataque: 96, defesa: 35 },
      { id: 'lopes', nome: 'A. Lopes', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'bruno-alves', nome: 'Bruno Alves', posicao: 'ZAG', overall: 82, ataque: 50, defesa: 84 }, // Reserva
      { id: 'moutinho16', nome: 'Moutinho', posicao: 'MC', overall: 85, ataque: 83, defesa: 70 }, // Reserva
      { id: 'quaresma', nome: 'Quaresma', posicao: 'PD', overall: 85, ataque: 87, defesa: 35 }, // Reserva
      { id: 'eder16', nome: 'Éder', posicao: 'CA', overall: 80, ataque: 82, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'br-1962',
    pais: 'Brasil',
    ano: 1962,
    jogadores: [
      { id: 'gilmar62', nome: 'Gilmar', posicao: 'GOL', overall: 89, ataque: 20, defesa: 90 },
      { id: 'djalma62', nome: 'Djalma Santos', posicao: 'LD', overall: 91, ataque: 84, defesa: 90 },
      { id: 'mauro62', nome: 'Mauro', posicao: 'ZAG', overall: 87, ataque: 40, defesa: 89 },
      { id: 'zozimo', nome: 'Zózimo', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'nilton62', nome: 'Nílton Santos', posicao: 'LE', overall: 91, ataque: 85, defesa: 89 },
      { id: 'zito62', nome: 'Zito', posicao: 'VOL', overall: 86, ataque: 65, defesa: 87 },
      { id: 'didi62', nome: 'Didi', posicao: 'MC', overall: 92, ataque: 90, defesa: 75 },
      { id: 'garrincha62', nome: 'Garrincha', posicao: 'PD', overall: 97, ataque: 98, defesa: 40 },
      { id: 'zagallo62', nome: 'Zagallo', posicao: 'PE', overall: 88, ataque: 86, defesa: 65 },
      { id: 'vava62', nome: 'Vavá', posicao: 'CA', overall: 89, ataque: 91, defesa: 35 },
      { id: 'amarildo', nome: 'Amarildo', posicao: 'ATA', overall: 87, ataque: 89, defesa: 30 },
      { id: 'castilho62', nome: 'Castilho', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 }, // Reserva
      { id: 'bellini62', nome: 'Bellini', posicao: 'ZAG', overall: 86, ataque: 40, defesa: 88 }, // Reserva
      { id: 'mengalvio', nome: 'Mengálvio', posicao: 'MC', overall: 82, ataque: 80, defesa: 60 }, // Reserva
      { id: 'pele62', nome: 'Pelé', posicao: 'MEI', overall: 98, ataque: 99, defesa: 50 }, // Reserva (Lesionado na vida real, mas no banco do seu jogo!)
      { id: 'coutinho', nome: 'Coutinho', posicao: 'CA', overall: 88, ataque: 90, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'be-2018',
    pais: 'Bélgica',
    ano: 2018,
    jogadores: [
      { id: 'courtois', nome: 'Courtois', posicao: 'GOL', overall: 90, ataque: 20, defesa: 91 },
      { id: 'meunier', nome: 'Meunier', posicao: 'LD', overall: 84, ataque: 80, defesa: 82 },
      { id: 'alderweireld', nome: 'Alderweireld', posicao: 'ZAG', overall: 87, ataque: 60, defesa: 88 },
      { id: 'kompany', nome: 'Kompany', posicao: 'ZAG', overall: 86, ataque: 55, defesa: 87 },
      { id: 'vertonghen', nome: 'Vertonghen', posicao: 'LE', overall: 86, ataque: 70, defesa: 87 },
      { id: 'witsel', nome: 'Witsel', posicao: 'VOL', overall: 85, ataque: 72, defesa: 85 },
      { id: 'fellaini', nome: 'Fellaini', posicao: 'MC', overall: 83, ataque: 78, defesa: 82 },
      { id: 'debruyne', nome: 'De Bruyne', posicao: 'MEI', overall: 92, ataque: 93, defesa: 65 },
      { id: 'hazard', nome: 'E. Hazard', posicao: 'PE', overall: 92, ataque: 93, defesa: 40 },
      { id: 'mertens', nome: 'Mertens', posicao: 'PD', overall: 86, ataque: 88, defesa: 35 },
      { id: 'lukaku', nome: 'Lukaku', posicao: 'CA', overall: 88, ataque: 90, defesa: 35 },
      { id: 'mignolet', nome: 'Mignolet', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'vermaelen', nome: 'Vermaelen', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 }, // Reserva
      { id: 'dembele-m', nome: 'Dembélé', posicao: 'MC', overall: 85, ataque: 82, defesa: 80 }, // Reserva
      { id: 'carrasco', nome: 'Carrasco', posicao: 'PE', overall: 83, ataque: 85, defesa: 45 }, // Reserva
      { id: 'batshuayi', nome: 'Batshuayi', posicao: 'CA', overall: 82, ataque: 84, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'it-2021',
    pais: 'Itália',
    ano: 2021,
    jogadores: [
      { id: 'donnarumma', nome: 'Donnarumma', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'dilorenzo', nome: 'Di Lorenzo', posicao: 'LD', overall: 83, ataque: 78, defesa: 82 },
      { id: 'bonucci', nome: 'Bonucci', posicao: 'ZAG', overall: 87, ataque: 65, defesa: 88 },
      { id: 'chiellini', nome: 'Chiellini', posicao: 'ZAG', overall: 88, ataque: 50, defesa: 90 },
      { id: 'spinazzola', nome: 'Spinazzola', posicao: 'LE', overall: 84, ataque: 82, defesa: 80 },
      { id: 'jorginho21', nome: 'Jorginho', posicao: 'VOL', overall: 87, ataque: 75, defesa: 84 },
      { id: 'barella', nome: 'Barella', posicao: 'MC', overall: 86, ataque: 82, defesa: 80 },
      { id: 'verratti', nome: 'Verratti', posicao: 'MC', overall: 87, ataque: 84, defesa: 82 },
      { id: 'chiesa', nome: 'Chiesa', posicao: 'PD', overall: 86, ataque: 88, defesa: 45 },
      { id: 'insigne', nome: 'Insigne', posicao: 'PE', overall: 85, ataque: 87, defesa: 40 },
      { id: 'immobile', nome: 'Immobile', posicao: 'CA', overall: 86, ataque: 88, defesa: 35 },
      { id: 'sirigu', nome: 'Sirigu', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'bastoni', nome: 'Bastoni', posicao: 'ZAG', overall: 84, ataque: 55, defesa: 86 }, // Reserva
      { id: 'locatelli', nome: 'Locatelli', posicao: 'MC', overall: 83, ataque: 80, defesa: 78 }, // Reserva
      { id: 'berardi', nome: 'Berardi', posicao: 'PD', overall: 83, ataque: 84, defesa: 45 }, // Reserva
      { id: 'belotti', nome: 'Belotti', posicao: 'CA', overall: 82, ataque: 83, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'uy-2010',
    pais: 'Uruguai',
    ano: 2010,
    jogadores: [
      { id: 'muslera', nome: 'Muslera', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'maxi', nome: 'M. Pereira', posicao: 'LD', overall: 82, ataque: 78, defesa: 80 },
      { id: 'lugano', nome: 'Lugano', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 87 },
      { id: 'godin', nome: 'Godín', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'fucile', nome: 'Fucile', posicao: 'LE', overall: 80, ataque: 70, defesa: 81 },
      { id: 'perez', nome: 'Diego Pérez', posicao: 'VOL', overall: 82, ataque: 60, defesa: 85 },
      { id: 'arevalo', nome: 'Arévalo Ríos', posicao: 'VOL', overall: 83, ataque: 65, defesa: 86 },
      { id: 'alvaro', nome: 'Á. Pereira', posicao: 'ME', overall: 81, ataque: 78, defesa: 75 },
      { id: 'forlan', nome: 'D. Forlán', posicao: 'MEI', overall: 91, ataque: 93, defesa: 45 },
      { id: 'suarez10', nome: 'L. Suárez', posicao: 'ATA', overall: 88, ataque: 90, defesa: 40 },
      { id: 'cavani', nome: 'E. Cavani', posicao: 'CA', overall: 87, ataque: 89, defesa: 40 },
      { id: 'silva10', nome: 'M. Silva', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'caceres', nome: 'Cáceres', posicao: 'ZAG', overall: 82, ataque: 65, defesa: 83 }, // Reserva
      { id: 'gargano', nome: 'Gargano', posicao: 'VOL', overall: 80, ataque: 68, defesa: 81 }, // Reserva
      { id: 'lodeiro', nome: 'Lodeiro', posicao: 'MEI', overall: 79, ataque: 80, defesa: 45 }, // Reserva
      { id: 'abreu', nome: 'Loco Abreu', posicao: 'CA', overall: 81, ataque: 83, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'nl-1998',
    pais: 'Holanda',
    ano: 1998,
    jogadores: [
      { id: 'vandersar', nome: 'Van der Sar', posicao: 'GOL', overall: 90, ataque: 20, defesa: 91 },
      { id: 'reiziger', nome: 'Reiziger', posicao: 'LD', overall: 84, ataque: 75, defesa: 85 },
      { id: 'stam', nome: 'Jaap Stam', posicao: 'ZAG', overall: 91, ataque: 50, defesa: 93 },
      { id: 'fdeboer', nome: 'F. de Boer', posicao: 'ZAG', overall: 89, ataque: 75, defesa: 89 },
      { id: 'numan', nome: 'Numan', posicao: 'LE', overall: 83, ataque: 78, defesa: 82 },
      { id: 'jonk', nome: 'Wim Jonk', posicao: 'VOL', overall: 84, ataque: 75, defesa: 82 },
      { id: 'davids', nome: 'E. Davids', posicao: 'MC', overall: 90, ataque: 84, defesa: 89 },
      { id: 'seedorf', nome: 'C. Seedorf', posicao: 'MEI', overall: 89, ataque: 88, defesa: 75 },
      { id: 'rdeboer', nome: 'R. de Boer', posicao: 'MD', overall: 86, ataque: 85, defesa: 60 },
      { id: 'bergkamp', nome: 'D. Bergkamp', posicao: 'ATA', overall: 93, ataque: 94, defesa: 40 },
      { id: 'kluivert', nome: 'P. Kluivert', posicao: 'CA', overall: 88, ataque: 90, defesa: 35 },
      { id: 'hesp', nome: 'Hesp', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'bogarde', nome: 'Bogarde', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 83 }, // Reserva
      { id: 'cocu', nome: 'Cocu', posicao: 'MC', overall: 87, ataque: 82, defesa: 84 }, // Reserva
      { id: 'overmars', nome: 'Overmars', posicao: 'PE', overall: 88, ataque: 89, defesa: 35 }, // Reserva
      { id: 'vanhooijdonk', nome: 'Van Hooijdonk', posicao: 'CA', overall: 84, ataque: 86, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'de-2002',
    pais: 'Alemanha',
    ano: 2002,
    jogadores: [
      { id: 'kahn', nome: 'Oliver Kahn', posicao: 'GOL', overall: 94, ataque: 20, defesa: 96 },
      { id: 'linke', nome: 'Linke', posicao: 'ZAG', overall: 83, ataque: 40, defesa: 85 },
      { id: 'ramelow', nome: 'Ramelow', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 86 },
      { id: 'metzelder', nome: 'Metzelder', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'frings', nome: 'Frings', posicao: 'MD', overall: 86, ataque: 80, defesa: 82 },
      { id: 'hamann', nome: 'Hamann', posicao: 'VOL', overall: 85, ataque: 65, defesa: 86 },
      { id: 'jeremies', nome: 'Jeremies', posicao: 'MC', overall: 84, ataque: 70, defesa: 85 },
      { id: 'ziege', nome: 'Ziege', posicao: 'ME', overall: 84, ataque: 82, defesa: 78 },
      { id: 'ballack', nome: 'M. Ballack', posicao: 'MEI', overall: 91, ataque: 90, defesa: 82 },
      { id: 'neuville', nome: 'Neuville', posicao: 'ATA', overall: 83, ataque: 84, defesa: 35 },
      { id: 'klose02', nome: 'M. Klose', posicao: 'CA', overall: 87, ataque: 89, defesa: 35 },
      { id: 'lehmann', nome: 'Lehmann', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 }, // Reserva
      { id: 'rehmer', nome: 'Rehmer', posicao: 'ZAG', overall: 80, ataque: 40, defesa: 81 }, // Reserva
      { id: 'schneider', nome: 'B. Schneider', posicao: 'MD', overall: 86, ataque: 85, defesa: 60 }, // Reserva
      { id: 'bode', nome: 'Bode', posicao: 'PE', overall: 82, ataque: 83, defesa: 45 }, // Reserva
      { id: 'bierhoff', nome: 'Bierhoff', posicao: 'CA', overall: 84, ataque: 86, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'en-1990',
    pais: 'Inglaterra',
    ano: 1990,
    jogadores: [
      { id: 'shilton', nome: 'P. Shilton', posicao: 'GOL', overall: 86, ataque: 20, defesa: 87 },
      { id: 'parker', nome: 'Parker', posicao: 'LD', overall: 81, ataque: 70, defesa: 82 },
      { id: 'walker', nome: 'Des Walker', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'butcher', nome: 'Butcher', posicao: 'ZAG', overall: 84, ataque: 40, defesa: 86 },
      { id: 'pearce', nome: 'S. Pearce', posicao: 'LE', overall: 86, ataque: 78, defesa: 87 },
      { id: 'wright', nome: 'M. Wright', posicao: 'VOL', overall: 82, ataque: 55, defesa: 84 },
      { id: 'platt', nome: 'David Platt', posicao: 'MC', overall: 85, ataque: 84, defesa: 75 },
      { id: 'gascoigne', nome: 'P. Gascoigne', posicao: 'MEI', overall: 89, ataque: 88, defesa: 55 },
      { id: 'waddle', nome: 'C. Waddle', posicao: 'ME', overall: 84, ataque: 85, defesa: 45 },
      { id: 'beardsley', nome: 'Beardsley', posicao: 'ATA', overall: 85, ataque: 86, defesa: 40 },
      { id: 'lineker', nome: 'G. Lineker', posicao: 'CA', overall: 89, ataque: 91, defesa: 35 },
      { id: 'woods', nome: 'Woods', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'adams', nome: 'T. Adams', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 }, // Reserva
      { id: 'robson', nome: 'B. Robson', posicao: 'MC', overall: 86, ataque: 82, defesa: 80 }, // Reserva
      { id: 'barnes', nome: 'J. Barnes', posicao: 'PE', overall: 85, ataque: 86, defesa: 40 }, // Reserva
      { id: 'bull', nome: 'S. Bull', posicao: 'CA', overall: 81, ataque: 82, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'co-2014',
    pais: 'Colômbia',
    ano: 2014,
    jogadores: [
      { id: 'ospina', nome: 'Ospina', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'zuniga', nome: 'Zúñiga', posicao: 'LD', overall: 82, ataque: 78, defesa: 80 },
      { id: 'zapata', nome: 'C. Zapata', posicao: 'ZAG', overall: 81, ataque: 45, defesa: 83 },
      { id: 'yepes', nome: 'Yepes', posicao: 'ZAG', overall: 83, ataque: 55, defesa: 84 },
      { id: 'armero', nome: 'Armero', posicao: 'LE', overall: 80, ataque: 78, defesa: 78 },
      { id: 'sanchez', nome: 'C. Sánchez', posicao: 'VOL', overall: 82, ataque: 60, defesa: 84 },
      { id: 'aguilar', nome: 'Aguilar', posicao: 'MC', overall: 80, ataque: 75, defesa: 78 },
      { id: 'cuadrado', nome: 'Cuadrado', posicao: 'MD', overall: 86, ataque: 87, defesa: 65 },
      { id: 'james', nome: 'James Rodríguez', posicao: 'MEI', overall: 89, ataque: 91, defesa: 50 },
      { id: 'ibarbo', nome: 'Ibarbo', posicao: 'PE', overall: 79, ataque: 80, defesa: 40 },
      { id: 'teo', nome: 'T. Gutiérrez', posicao: 'CA', overall: 81, ataque: 83, defesa: 35 },
      { id: 'vargas', nome: 'Vargas', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'arias', nome: 'Arias', posicao: 'LD', overall: 80, ataque: 75, defesa: 78 }, // Reserva
      { id: 'guarin', nome: 'Guarín', posicao: 'MC', overall: 82, ataque: 81, defesa: 75 }, // Reserva
      { id: 'quintero', nome: 'Quintero', posicao: 'MEI', overall: 80, ataque: 82, defesa: 40 }, // Reserva
      { id: 'jackson', nome: 'J. Martínez', posicao: 'CA', overall: 83, ataque: 85, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'ar-1990',
    pais: 'Argentina',
    ano: 1990,
    jogadores: [
      { id: 'goycochea', nome: 'Goycochea', posicao: 'GOL', overall: 84, ataque: 20, defesa: 86 },
      { id: 'simon', nome: 'Simón', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 },
      { id: 'serrizuela', nome: 'Serrizuela', posicao: 'ZAG', overall: 81, ataque: 55, defesa: 82 },
      { id: 'ruggeri90', nome: 'Ruggeri', posicao: 'ZAG', overall: 87, ataque: 50, defesa: 89 },
      { id: 'lorenzo', nome: 'Lorenzo', posicao: 'LD', overall: 80, ataque: 65, defesa: 82 },
      { id: 'basualdo', nome: 'Basualdo', posicao: 'VOL', overall: 81, ataque: 70, defesa: 82 },
      { id: 'batista90', nome: 'Batista', posicao: 'VOL', overall: 82, ataque: 60, defesa: 84 },
      { id: 'burruchaga90', nome: 'Burruchaga', posicao: 'MC', overall: 84, ataque: 82, defesa: 65 },
      { id: 'troglio', nome: 'Troglio', posicao: 'MEI', overall: 81, ataque: 80, defesa: 60 },
      { id: 'maradona90', nome: 'Maradona', posicao: 'MEI', overall: 95, ataque: 94, defesa: 40 },
      { id: 'caniggia', nome: 'Caniggia', posicao: 'ATA', overall: 87, ataque: 89, defesa: 30 },
      { id: 'pumpido90', nome: 'Pumpido', posicao: 'GOL', overall: 81, ataque: 20, defesa: 82 }, // Reserva
      { id: 'monzon', nome: 'Monzón', posicao: 'LE', overall: 80, ataque: 70, defesa: 80 }, // Reserva
      { id: 'giusti90', nome: 'Giusti', posicao: 'MC', overall: 81, ataque: 72, defesa: 78 }, // Reserva
      { id: 'calderon', nome: 'Calderón', posicao: 'ME', overall: 79, ataque: 78, defesa: 45 }, // Reserva
      { id: 'balbo', nome: 'Balbo', posicao: 'CA', overall: 82, ataque: 84, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'sn-2002',
    pais: 'Senegal',
    ano: 2002,
    jogadores: [
      { id: 'sylva', nome: 'Tony Sylva', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'coly', nome: 'Coly', posicao: 'LD', overall: 80, ataque: 70, defesa: 81 },
      { id: 'diatta', nome: 'Diatta', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 },
      { id: 'cisse', nome: 'A. Cissé', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 85 },
      { id: 'daf', nome: 'Daf', posicao: 'LE', overall: 80, ataque: 65, defesa: 81 },
      { id: 'diao', nome: 'Diao', posicao: 'VOL', overall: 82, ataque: 65, defesa: 84 },
      { id: 'boubadiop', nome: 'Bouba Diop', posicao: 'VOL', overall: 84, ataque: 75, defesa: 85 },
      { id: 'ndour', nome: 'N\'Dour', posicao: 'MC', overall: 79, ataque: 70, defesa: 75 },
      { id: 'fadiga', nome: 'Fadiga', posicao: 'MEI', overall: 85, ataque: 86, defesa: 45 },
      { id: 'camara', nome: 'H. Camara', posicao: 'ATA', overall: 84, ataque: 85, defesa: 35 },
      { id: 'diouf', nome: 'El Hadji Diouf', posicao: 'CA', overall: 87, ataque: 89, defesa: 30 },
      { id: 'diallo', nome: 'Diallo', posicao: 'GOL', overall: 76, ataque: 20, defesa: 77 }, // Reserva
      { id: 'beye', nome: 'Beye', posicao: 'LD', overall: 79, ataque: 70, defesa: 78 }, // Reserva
      { id: 'faye', nome: 'A. Faye', posicao: 'MC', overall: 78, ataque: 65, defesa: 79 }, // Reserva
      { id: 'thiaw', nome: 'Thiaw', posicao: 'ATA', overall: 79, ataque: 80, defesa: 35 }, // Reserva
      { id: 'niang', nome: 'Niang', posicao: 'CA', overall: 80, ataque: 81, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'cm-1990',
    pais: 'Camarões',
    ano: 1990,
    jogadores: [
      { id: 'nkono', nome: 'N\'Kono', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 },
      { id: 'tataw', nome: 'Tataw', posicao: 'LD', overall: 81, ataque: 65, defesa: 82 },
      { id: 'kunde', nome: 'Kundé', posicao: 'ZAG', overall: 84, ataque: 60, defesa: 85 },
      { id: 'ndip', nome: 'Ndip', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 },
      { id: 'ebongue', nome: 'Ebongué', posicao: 'LE', overall: 80, ataque: 65, defesa: 81 },
      { id: 'mbouh', nome: 'M\'Bouh', posicao: 'VOL', overall: 82, ataque: 60, defesa: 84 },
      { id: 'kanabiyik', nome: 'Kana-Biyik', posicao: 'MC', overall: 83, ataque: 75, defesa: 82 },
      { id: 'mfede', nome: 'Mfédé', posicao: 'MEI', overall: 84, ataque: 85, defesa: 50 },
      { id: 'makanaky', nome: 'Makanaky', posicao: 'PD', overall: 82, ataque: 84, defesa: 45 },
      { id: 'omambiyik', nome: 'Omam-Biyik', posicao: 'ATA', overall: 86, ataque: 88, defesa: 40 },
      { id: 'milla', nome: 'Roger Milla', posicao: 'CA', overall: 89, ataque: 92, defesa: 30 },
      { id: 'bell', nome: 'Bell', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'onana', nome: 'Onana', posicao: 'ZAG', overall: 79, ataque: 40, defesa: 80 }, // Reserva
      { id: 'libiih', nome: 'Libiih', posicao: 'VOL', overall: 80, ataque: 60, defesa: 81 }, // Reserva
      { id: 'pagal', nome: 'Pagal', posicao: 'LE', overall: 78, ataque: 65, defesa: 79 }, // Reserva
      { id: 'ekeke', nome: 'Ekéké', posicao: 'CA', overall: 80, ataque: 82, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'gr-2004',
    pais: 'Grécia',
    ano: 2004,
    jogadores: [
      { id: 'nikopolidis', nome: 'Nikopolidis', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'seitaridis-gr', nome: 'Seitaridis', posicao: 'LD', overall: 85, ataque: 78, defesa: 84 },
      { id: 'dellas', nome: 'Dellas', posicao: 'ZAG', overall: 86, ataque: 55, defesa: 88 },
      { id: 'kapsis', nome: 'Kapsis', posicao: 'ZAG', overall: 84, ataque: 40, defesa: 86 },
      { id: 'fyssas', nome: 'Fyssas', posicao: 'LE', overall: 82, ataque: 70, defesa: 84 },
      { id: 'zagorakis', nome: 'Zagorakis', posicao: 'VOL', overall: 87, ataque: 75, defesa: 88 },
      { id: 'basinas', nome: 'Basinas', posicao: 'MC', overall: 85, ataque: 80, defesa: 84 },
      { id: 'katsouranis', nome: 'Katsouranis', posicao: 'MC', overall: 84, ataque: 78, defesa: 85 },
      { id: 'karagounis', nome: 'Karagounis', posicao: 'MEI', overall: 86, ataque: 85, defesa: 70 },
      { id: 'giannakopoulos', nome: 'Giannakopoulos', posicao: 'MD', overall: 83, ataque: 84, defesa: 60 },
      { id: 'charisteas', nome: 'Charisteas', posicao: 'CA', overall: 86, ataque: 88, defesa: 40 },
      { id: 'chalkias', nome: 'Chalkias', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'dabizas', nome: 'Dabizas', posicao: 'ZAG', overall: 80, ataque: 45, defesa: 82 }, // Reserva
      { id: 'tsartas', nome: 'Tsartas', posicao: 'MEI', overall: 82, ataque: 84, defesa: 45 }, // Reserva
      { id: 'vryzas', nome: 'Vryzas', posicao: 'ATA', overall: 81, ataque: 82, defesa: 35 }, // Reserva
      { id: 'nikolaidis', nome: 'Nikolaidis', posicao: 'CA', overall: 82, ataque: 83, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'dk-1992',
    pais: 'Dinamarca',
    ano: 1992,
    jogadores: [
      { id: 'schmeichel', nome: 'P. Schmeichel', posicao: 'GOL', overall: 91, ataque: 20, defesa: 93 },
      { id: 'sivebaek', nome: 'Sivebæk', posicao: 'LD', overall: 82, ataque: 70, defesa: 83 },
      { id: 'olsen', nome: 'L. Olsen', posicao: 'ZAG', overall: 84, ataque: 45, defesa: 86 },
      { id: 'nielsen', nome: 'K. Nielsen', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 85 },
      { id: 'christofte', nome: 'Christofte', posicao: 'LE', overall: 81, ataque: 65, defesa: 82 },
      { id: 'jensen', nome: 'John Jensen', posicao: 'VOL', overall: 83, ataque: 75, defesa: 84 },
      { id: 'vilfort', nome: 'Vilfort', posicao: 'MC', overall: 85, ataque: 82, defesa: 80 },
      { id: 'larsen', nome: 'H. Larsen', posicao: 'MEI', overall: 84, ataque: 84, defesa: 60 },
      { id: 'blaudrup', nome: 'B. Laudrup', posicao: 'ATA', overall: 90, ataque: 92, defesa: 40 },
      { id: 'povlsen', nome: 'Povlsen', posicao: 'ATA', overall: 84, ataque: 85, defesa: 35 },
      { id: 'elstrup', nome: 'Elstrup', posicao: 'CA', overall: 82, ataque: 84, defesa: 30 },
      { id: 'krogh', nome: 'Krogh', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'piechnik', nome: 'Piechnik', posicao: 'ZAG', overall: 80, ataque: 40, defesa: 82 }, // Reserva
      { id: 'molby', nome: 'Mølby', posicao: 'MC', overall: 81, ataque: 75, defesa: 70 }, // Reserva
      { id: 'frank', nome: 'Frank', posicao: 'ATA', overall: 79, ataque: 80, defesa: 30 }, // Reserva
      { id: 'christensen', nome: 'Christensen', posicao: 'CA', overall: 78, ataque: 80, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'hr-1998',
    pais: 'Croácia',
    ano: 1998,
    jogadores: [
      { id: 'ladic', nome: 'Ladić', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 },
      { id: 'simic', nome: 'Šimić', posicao: 'LD', overall: 84, ataque: 70, defesa: 85 },
      { id: 'stimac', nome: 'Štimac', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'bilic', nome: 'Bilić', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'jarni', nome: 'Jarni', posicao: 'LE', overall: 87, ataque: 84, defesa: 83 },
      { id: 'soldo', nome: 'Soldo', posicao: 'VOL', overall: 84, ataque: 65, defesa: 86 },
      { id: 'asanovic', nome: 'Asanović', posicao: 'MC', overall: 86, ataque: 85, defesa: 70 },
      { id: 'boban', nome: 'Boban', posicao: 'MEI', overall: 90, ataque: 89, defesa: 65 },
      { id: 'stanic', nome: 'Stanić', posicao: 'MD', overall: 84, ataque: 82, defesa: 60 },
      { id: 'vlaovic', nome: 'Vlaović', posicao: 'ATA', overall: 84, ataque: 85, defesa: 35 },
      { id: 'suker', nome: 'Davor Šuker', posicao: 'CA', overall: 92, ataque: 95, defesa: 30 },
      { id: 'mrmic', nome: 'Mrmić', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'tudor', nome: 'Tudor', posicao: 'ZAG', overall: 82, ataque: 55, defesa: 84 }, // Reserva
      { id: 'prosinecki', nome: 'Prosinečki', posicao: 'MEI', overall: 88, ataque: 89, defesa: 45 }, // Reserva
      { id: 'jurcic', nome: 'Jurčić', posicao: 'VOL', overall: 80, ataque: 60, defesa: 82 }, // Reserva
      { id: 'maric', nome: 'Marić', posicao: 'CA', overall: 80, ataque: 82, defesa: 25 }, // Reserva
    ]
  },
  {
    id: 'it-1994',
    pais: 'Itália',
    ano: 1994,
    jogadores: [
      { id: 'pagliuca', nome: 'Pagliuca', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'mussi', nome: 'Mussi', posicao: 'LD', overall: 82, ataque: 70, defesa: 84 },
      { id: 'baresi', nome: 'F. Baresi', posicao: 'ZAG', overall: 94, ataque: 60, defesa: 96 },
      { id: 'costacurta', nome: 'Costacurta', posicao: 'ZAG', overall: 89, ataque: 45, defesa: 92 },
      { id: 'maldini94', nome: 'P. Maldini', posicao: 'LE', overall: 95, ataque: 80, defesa: 96 },
      { id: 'albertini', nome: 'Albertini', posicao: 'VOL', overall: 88, ataque: 82, defesa: 87 },
      { id: 'dbaggio', nome: 'Dino Baggio', posicao: 'MC', overall: 86, ataque: 80, defesa: 85 },
      { id: 'berti', nome: 'Berti', posicao: 'MC', overall: 84, ataque: 78, defesa: 82 },
      { id: 'donadoni', nome: 'Donadoni', posicao: 'MD', overall: 87, ataque: 86, defesa: 60 },
      { id: 'rbaggio', nome: 'R. Baggio', posicao: 'ATA', overall: 95, ataque: 96, defesa: 40 },
      { id: 'massaro', nome: 'Massaro', posicao: 'CA', overall: 85, ataque: 86, defesa: 35 },
      { id: 'marchegiani', nome: 'Marchegiani', posicao: 'GOL', overall: 83, ataque: 20, defesa: 84 }, // Reserva
      { id: 'tassotti', nome: 'Tassotti', posicao: 'LD', overall: 85, ataque: 70, defesa: 87 }, // Reserva
      { id: 'apolloni', nome: 'Apolloni', posicao: 'ZAG', overall: 82, ataque: 40, defesa: 84 }, // Reserva
      { id: 'signori', nome: 'Signori', posicao: 'PE', overall: 86, ataque: 88, defesa: 35 }, // Reserva
      { id: 'zola', nome: 'Zola', posicao: 'ATA', overall: 87, ataque: 89, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'ar-2014',
    pais: 'Argentina',
    ano: 2014,
    jogadores: [
      { id: 'romero14', nome: 'S. Romero', posicao: 'GOL', overall: 84, ataque: 20, defesa: 85 },
      { id: 'zabaleta', nome: 'Zabaleta', posicao: 'LD', overall: 85, ataque: 75, defesa: 86 },
      { id: 'garay', nome: 'Garay', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'demichelis', nome: 'Demichelis', posicao: 'ZAG', overall: 84, ataque: 45, defesa: 86 },
      { id: 'rojo', nome: 'Rojo', posicao: 'LE', overall: 83, ataque: 75, defesa: 84 },
      { id: 'mascherano', nome: 'Mascherano', posicao: 'VOL', overall: 89, ataque: 65, defesa: 92 },
      { id: 'biglia', nome: 'Biglia', posicao: 'MC', overall: 83, ataque: 75, defesa: 82 },
      { id: 'enzo-perez', nome: 'Enzo Pérez', posicao: 'MC', overall: 82, ataque: 80, defesa: 78 },
      { id: 'dimaria14', nome: 'Di María', posicao: 'PE', overall: 88, ataque: 90, defesa: 45 },
      { id: 'messi14', nome: 'Lionel Messi', posicao: 'MEI', overall: 98, ataque: 99, defesa: 35 },
      { id: 'higuain', nome: 'Higuaín', posicao: 'CA', overall: 87, ataque: 89, defesa: 35 },
      { id: 'andujar', nome: 'Andújar', posicao: 'GOL', overall: 80, ataque: 20, defesa: 81 }, // Reserva
      { id: 'campagnaro', nome: 'Campagnaro', posicao: 'ZAG', overall: 81, ataque: 45, defesa: 83 }, // Reserva
      { id: 'gago', nome: 'Gago', posicao: 'VOL', overall: 82, ataque: 78, defesa: 75 }, // Reserva
      { id: 'lavezzi', nome: 'Lavezzi', posicao: 'PD', overall: 84, ataque: 86, defesa: 40 }, // Reserva
      { id: 'aguero', nome: 'Agüero', posicao: 'ATA', overall: 88, ataque: 90, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'fr-2000',
    pais: 'França',
    ano: 2000,
    jogadores: [
      { id: 'barthez00', nome: 'Barthez', posicao: 'GOL', overall: 88, ataque: 20, defesa: 89 },
      { id: 'thuram00', nome: 'Thuram', posicao: 'LD', overall: 91, ataque: 75, defesa: 93 },
      { id: 'blanc00', nome: 'Blanc', posicao: 'ZAG', overall: 89, ataque: 55, defesa: 91 },
      { id: 'desailly00', nome: 'Desailly', posicao: 'ZAG', overall: 91, ataque: 50, defesa: 94 },
      { id: 'lizarazu00', nome: 'Lizarazu', posicao: 'LE', overall: 87, ataque: 80, defesa: 85 },
      { id: 'deschamps00', nome: 'Deschamps', posicao: 'VOL', overall: 88, ataque: 65, defesa: 89 },
      { id: 'vieira00', nome: 'Vieira', posicao: 'MC', overall: 90, ataque: 82, defesa: 90 },
      { id: 'djorkaeff00', nome: 'Djorkaeff', posicao: 'MEI', overall: 87, ataque: 88, defesa: 50 },
      { id: 'zidane00', nome: 'Zidane', posicao: 'MEI', overall: 97, ataque: 96, defesa: 60 },
      { id: 'henry00', nome: 'Henry', posicao: 'PE', overall: 92, ataque: 94, defesa: 35 },
      { id: 'trezeguet00', nome: 'Trezeguet', posicao: 'CA', overall: 88, ataque: 90, defesa: 30 },
      { id: 'lama00', nome: 'Lama', posicao: 'GOL', overall: 82, ataque: 20, defesa: 83 }, // Reserva
      { id: 'leboeuf', nome: 'Leboeuf', posicao: 'ZAG', overall: 84, ataque: 60, defesa: 85 }, // Reserva
      { id: 'petit00', nome: 'Petit', posicao: 'VOL', overall: 86, ataque: 75, defesa: 84 }, // Reserva
      { id: 'pires00', nome: 'Pirès', posicao: 'ME', overall: 87, ataque: 88, defesa: 45 }, // Reserva
      { id: 'wiltord00', nome: 'Wiltord', posicao: 'ATA', overall: 85, ataque: 87, defesa: 35 }, // Reserva
    ]
  },
  {
    id: 'cl-2015',
    pais: 'Chile',
    ano: 2015,
    jogadores: [
      { id: 'bravo', nome: 'C. Bravo', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 },
      { id: 'isla', nome: 'Isla', posicao: 'LD', overall: 82, ataque: 78, defesa: 80 },
      { id: 'medel', nome: 'Medel', posicao: 'ZAG', overall: 85, ataque: 60, defesa: 87 },
      { id: 'jara', nome: 'Jara', posicao: 'ZAG', overall: 80, ataque: 50, defesa: 81 },
      { id: 'beausejour', nome: 'Beausejour', posicao: 'LE', overall: 81, ataque: 75, defesa: 78 },
      { id: 'diaz', nome: 'M. Díaz', posicao: 'VOL', overall: 83, ataque: 70, defesa: 84 },
      { id: 'aranguiz', nome: 'Aránguiz', posicao: 'MC', overall: 84, ataque: 82, defesa: 80 },
      { id: 'vidal', nome: 'A. Vidal', posicao: 'MC', overall: 89, ataque: 87, defesa: 88 },
      { id: 'valdivia', nome: 'Valdivia', posicao: 'MEI', overall: 84, ataque: 85, defesa: 45 },
      { id: 'sanchez15', nome: 'A. Sánchez', posicao: 'ATA', overall: 89, ataque: 90, defesa: 45 },
      { id: 'vargas15', nome: 'E. Vargas', posicao: 'CA', overall: 85, ataque: 87, defesa: 35 },
      { id: 'herrera', nome: 'J. Herrera', posicao: 'GOL', overall: 78, ataque: 20, defesa: 79 }, // Reserva
      { id: 'mena', nome: 'Mena', posicao: 'LE', overall: 79, ataque: 75, defesa: 77 }, // Reserva
      { id: 'silva15', nome: 'F. Silva', posicao: 'VOL', overall: 80, ataque: 60, defesa: 81 }, // Reserva
      { id: 'pizarro', nome: 'D. Pizarro', posicao: 'MC', overall: 81, ataque: 82, defesa: 65 }, // Reserva
      { id: 'pinilla', nome: 'Pinilla', posicao: 'CA', overall: 79, ataque: 82, defesa: 30 }, // Reserva
    ]
  },
  {
    id: 'de-1996',
    pais: 'Alemanha',
    ano: 1996,
    jogadores: [
      { id: 'kopke', nome: 'Köpke', posicao: 'GOL', overall: 87, ataque: 20, defesa: 88 },
      { id: 'reuter96', nome: 'Reuter', posicao: 'LD', overall: 84, ataque: 75, defesa: 85 },
      { id: 'sammer', nome: 'M. Sammer', posicao: 'ZAG', overall: 92, ataque: 78, defesa: 94 },
      { id: 'helmer', nome: 'Helmer', posicao: 'ZAG', overall: 86, ataque: 50, defesa: 88 },
      { id: 'ziege96', nome: 'Ziege', posicao: 'LE', overall: 85, ataque: 82, defesa: 83 },
      { id: 'eilts', nome: 'Eilts', posicao: 'VOL', overall: 84, ataque: 60, defesa: 87 },
      { id: 'hassler96', nome: 'Häßler', posicao: 'MD', overall: 86, ataque: 85, defesa: 55 },
      { id: 'scholl', nome: 'M. Scholl', posicao: 'MEI', overall: 86, ataque: 87, defesa: 50 },
      { id: 'moller', nome: 'A. Möller', posicao: 'MEI', overall: 88, ataque: 88, defesa: 50 },
      { id: 'klinsmann96', nome: 'Klinsmann', posicao: 'ATA', overall: 90, ataque: 92, defesa: 35 },
      { id: 'bierhoff96', nome: 'Bierhoff', posicao: 'CA', overall: 87, ataque: 89, defesa: 30 },
      { id: 'kahn96', nome: 'O. Kahn', posicao: 'GOL', overall: 85, ataque: 20, defesa: 86 }, // Reserva
      { id: 'babbel', nome: 'Babbel', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 85 }, // Reserva
      { id: 'strunz', nome: 'Strunz', posicao: 'MC', overall: 81, ataque: 70, defesa: 80 }, // Reserva
      { id: 'bobic', nome: 'Bobic', posicao: 'ATA', overall: 82, ataque: 84, defesa: 30 }, // Reserva
      { id: 'kuntz', nome: 'Kuntz', posicao: 'CA', overall: 83, ataque: 85, defesa: 35 }, // Reserva
    ]
  }
  
];