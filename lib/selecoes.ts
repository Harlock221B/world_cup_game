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
  // ==========================================
  // SELEÇÕES CLÁSSICAS / HISTÓRICAS
  // ==========================================
  {
    id: 'br-1958',
    pais: 'Brasil',
    ano: 1958,
    jogadores: [
      { id: 'br58-01', nome: 'Pelé', posicao: 'ATA', overall: 96, ataque: 98, defesa: 35 },
      { id: 'br58-02', nome: 'Garrincha', posicao: 'PD', overall: 94, ataque: 96, defesa: 30 },
      { id: 'br58-03', nome: 'Vavá', posicao: 'ATA', overall: 88, ataque: 90, defesa: 40 },
      { id: 'br58-04', nome: 'Didi', posicao: 'MC', overall: 91, ataque: 88, defesa: 70 },
      { id: 'br58-05', nome: 'Zito', posicao: 'VOL', overall: 86, ataque: 70, defesa: 85 },
      { id: 'br58-06', nome: 'Nilton Santos', posicao: 'LE', overall: 92, ataque: 85, defesa: 88 },
      { id: 'br58-07', nome: 'Djalma Santos', posicao: 'LD', overall: 91, ataque: 80, defesa: 90 },
      { id: 'br58-08', nome: 'Bellini', posicao: 'ZAG', overall: 87, ataque: 40, defesa: 89 },
      { id: 'br58-09', nome: 'Orlando', posicao: 'ZAG', overall: 85, ataque: 40, defesa: 86 },
      { id: 'br58-10', nome: 'Zagallo', posicao: 'PE', overall: 86, ataque: 84, defesa: 65 },
      { id: 'br58-11', nome: 'Gilmar', posicao: 'GOL', overall: 88, ataque: 15, defesa: 88 },
    ]
  },
  {
    id: 'br-1970',
    pais: 'Brasil',
    ano: 1970,
    jogadores: [
      { id: 'br70-01', nome: 'Pelé', posicao: 'MEI', overall: 98, ataque: 99, defesa: 40 },
      { id: 'br70-02', nome: 'Jairzinho', posicao: 'PD', overall: 92, ataque: 94, defesa: 45 },
      { id: 'br70-03', nome: 'Tostão', posicao: 'ATA', overall: 91, ataque: 92, defesa: 40 },
      { id: 'br70-04', nome: 'Rivelino', posicao: 'PE', overall: 92, ataque: 93, defesa: 50 },
      { id: 'br70-05', nome: 'Gérson', posicao: 'MC', overall: 90, ataque: 88, defesa: 75 },
      { id: 'br70-06', nome: 'Clodoaldo', posicao: 'VOL', overall: 87, ataque: 75, defesa: 88 },
      { id: 'br70-07', nome: 'Carlos Alberto', posicao: 'LD', overall: 93, ataque: 86, defesa: 90 },
      { id: 'br70-08', nome: 'Everaldo', posicao: 'LE', overall: 85, ataque: 75, defesa: 86 },
      { id: 'br70-09', nome: 'Brito', posicao: 'ZAG', overall: 84, ataque: 45, defesa: 86 },
      { id: 'br70-10', nome: 'Piazza', posicao: 'ZAG', overall: 86, ataque: 60, defesa: 87 },
      { id: 'br70-11', nome: 'Félix', posicao: 'GOL', overall: 82, ataque: 10, defesa: 82 },
    ]
  },
  {
    id: 'ar-1986',
    pais: 'Argentina',
    ano: 1986,
    jogadores: [
      { id: 'ar86-01', nome: 'Maradona', posicao: 'MEI', overall: 97, ataque: 98, defesa: 35 },
      { id: 'ar86-02', nome: 'Valdano', posicao: 'ATA', overall: 87, ataque: 89, defesa: 40 },
      { id: 'ar86-03', nome: 'Burruchaga', posicao: 'MC', overall: 86, ataque: 85, defesa: 65 },
      { id: 'ar86-04', nome: 'Ruggeri', posicao: 'ZAG', overall: 88, ataque: 50, defesa: 90 },
      { id: 'ar86-05', nome: 'Brown', posicao: 'ZAG', overall: 84, ataque: 45, defesa: 86 },
      { id: 'ar86-06', nome: 'Pumpido', posicao: 'GOL', overall: 83, ataque: 10, defesa: 83 },
    ]
  },
  {
    id: 'fr-1998',
    pais: 'França',
    ano: 1998,
    jogadores: [
      { id: 'fr98-01', nome: 'Zidane', posicao: 'MEI', overall: 95, ataque: 92, defesa: 60 },
      { id: 'fr98-02', nome: 'Henry', posicao: 'ATA', overall: 89, ataque: 90, defesa: 35 },
      { id: 'fr98-03', nome: 'Deschamps', posicao: 'VOL', overall: 87, ataque: 70, defesa: 88 },
      { id: 'fr98-04', nome: 'Thuram', posicao: 'LD', overall: 89, ataque: 75, defesa: 92 },
      { id: 'fr98-05', nome: 'Blanc', posicao: 'ZAG', overall: 88, ataque: 60, defesa: 90 },
      { id: 'fr98-06', nome: 'Desailly', posicao: 'ZAG', overall: 90, ataque: 55, defesa: 94 },
      { id: 'fr98-07', nome: 'Lizarazu', posicao: 'LE', overall: 86, ataque: 80, defesa: 85 },
      { id: 'fr98-08', nome: 'Barthez', posicao: 'GOL', overall: 87, ataque: 10, defesa: 87 },
    ]
  },
  {
    id: 'br-2002',
    pais: 'Brasil',
    ano: 2002,
    jogadores: [
      { id: 'br02-01', nome: 'Ronaldo', posicao: 'ATA', overall: 94, ataque: 96, defesa: 30 },
      { id: 'br02-02', nome: 'Rivaldo', posicao: 'MEI', overall: 92, ataque: 93, defesa: 45 },
      { id: 'br02-03', nome: 'Ronaldinho', posicao: 'MEI', overall: 91, ataque: 92, defesa: 40 },
      { id: 'br02-04', nome: 'Cafu', posicao: 'LD', overall: 89, ataque: 84, defesa: 86 },
      { id: 'br02-05', nome: 'Roberto Carlos', posicao: 'LE', overall: 90, ataque: 88, defesa: 82 },
      { id: 'br02-06', nome: 'Gilberto Silva', posicao: 'VOL', overall: 86, ataque: 70, defesa: 88 },
      { id: 'br02-07', nome: 'Lúcio', posicao: 'ZAG', overall: 88, ataque: 65, defesa: 90 },
      { id: 'br02-08', nome: 'Roque Júnior', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 86 },
      { id: 'br02-09', nome: 'Edmílson', posicao: 'ZAG', overall: 85, ataque: 65, defesa: 85 },
      { id: 'br02-10', nome: 'Kléberson', posicao: 'MC', overall: 83, ataque: 78, defesa: 75 },
      { id: 'br02-11', nome: 'Marcos', posicao: 'GOL', overall: 86, ataque: 15, defesa: 88 },
    ]
  },
  {
    id: 'es-2010',
    pais: 'Espanha',
    ano: 2010,
    jogadores: [
      { id: 'es10-01', nome: 'Villa', posicao: 'ATA', overall: 89, ataque: 92, defesa: 35 },
      { id: 'es10-02', nome: 'Iniesta', posicao: 'MEI', overall: 92, ataque: 90, defesa: 60 },
      { id: 'es10-03', nome: 'Xavi', posicao: 'MC', overall: 93, ataque: 88, defesa: 65 },
      { id: 'es10-04', nome: 'Busquets', posicao: 'VOL', overall: 87, ataque: 70, defesa: 88 },
      { id: 'es10-05', nome: 'Puyol', posicao: 'ZAG', overall: 89, ataque: 55, defesa: 93 },
      { id: 'es10-06', nome: 'Piqué', posicao: 'ZAG', overall: 87, ataque: 65, defesa: 88 },
      { id: 'es10-07', nome: 'Sergio Ramos', posicao: 'LD', overall: 88, ataque: 80, defesa: 88 },
      { id: 'es10-08', nome: 'Casillas', posicao: 'GOL', overall: 91, ataque: 10, defesa: 91 },
    ]
  },
  {
    id: 'al-2014',
    pais: 'Alemanha',
    ano: 2014,
    jogadores: [
      { id: 'al14-01', nome: 'Müller', posicao: 'ATA', overall: 88, ataque: 90, defesa: 50 },
      { id: 'al14-02', nome: 'Klose', posicao: 'ATA', overall: 86, ataque: 89, defesa: 35 },
      { id: 'al14-03', nome: 'Kroos', posicao: 'MC', overall: 89, ataque: 86, defesa: 70 },
      { id: 'al14-04', nome: 'Schweinsteiger', posicao: 'VOL', overall: 88, ataque: 82, defesa: 84 },
      { id: 'al14-05', nome: 'Lahm', posicao: 'LD', overall: 89, ataque: 82, defesa: 88 },
      { id: 'al14-06', nome: 'Hummels', posicao: 'ZAG', overall: 88, ataque: 65, defesa: 90 },
      { id: 'al14-07', nome: 'Neuer', posicao: 'GOL', overall: 92, ataque: 20, defesa: 92 },
    ]
  },

  // ==========================================
  // SELEÇÕES ATUAIS (2022 / 2024)
  // ==========================================
  {
    id: 'ar-2022',
    pais: 'Argentina',
    ano: 2022,
    jogadores: [
      { id: 'ar22-01', nome: 'Messi', posicao: 'PD', overall: 93, ataque: 95, defesa: 30 },
      { id: 'ar22-02', nome: 'Julián Álvarez', posicao: 'ATA', overall: 85, ataque: 87, defesa: 50 },
      { id: 'ar22-03', nome: 'Di María', posicao: 'PE', overall: 86, ataque: 88, defesa: 45 },
      { id: 'ar22-04', nome: 'Enzo Fernández', posicao: 'MC', overall: 84, ataque: 82, defesa: 80 },
      { id: 'ar22-05', nome: 'De Paul', posicao: 'MC', overall: 84, ataque: 80, defesa: 82 },
      { id: 'ar22-06', nome: 'Otamendi', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 85 },
      { id: 'ar22-07', nome: 'Romero', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 87 },
      { id: 'ar22-08', nome: 'Dibu Martínez', posicao: 'GOL', overall: 86, ataque: 15, defesa: 86 },
    ]
  },
  {
    id: 'br-2024',
    pais: 'Brasil',
    ano: 2024,
    jogadores: [
      { id: 'br24-01', nome: 'Vini Jr.', posicao: 'PE', overall: 90, ataque: 92, defesa: 35 },
      { id: 'br24-02', nome: 'Rodrygo', posicao: 'PD', overall: 86, ataque: 88, defesa: 40 },
      { id: 'br24-03', nome: 'Endrick', posicao: 'ATA', overall: 80, ataque: 83, defesa: 30 },
      { id: 'br24-04', nome: 'Lucas Paquetá', posicao: 'MEI', overall: 84, ataque: 85, defesa: 70 },
      { id: 'br24-05', nome: 'Bruno Guimarães', posicao: 'VOL', overall: 85, ataque: 80, defesa: 84 },
      { id: 'br24-06', nome: 'Marquinhos', posicao: 'ZAG', overall: 87, ataque: 60, defesa: 88 },
      { id: 'br24-07', nome: 'Gabriel Magalhães', posicao: 'ZAG', overall: 85, ataque: 55, defesa: 86 },
      { id: 'br24-08', nome: 'Danilo', posicao: 'LD', overall: 81, ataque: 70, defesa: 82 },
      { id: 'br24-09', nome: 'Alisson', posicao: 'GOL', overall: 89, ataque: 15, defesa: 89 },
    ]
  },
  {
    id: 'in-2024',
    pais: 'Inglaterra',
    ano: 2024,
    jogadores: [
      { id: 'in24-01', nome: 'Harry Kane', posicao: 'ATA', overall: 90, ataque: 92, defesa: 45 },
      { id: 'in24-02', nome: 'Jude Bellingham', posicao: 'MEI', overall: 88, ataque: 89, defesa: 78 },
      { id: 'in24-03', nome: 'Saka', posicao: 'PD', overall: 87, ataque: 88, defesa: 55 },
      { id: 'in24-04', nome: 'Foden', posicao: 'PE', overall: 86, ataque: 87, defesa: 50 },
      { id: 'in24-05', nome: 'Declan Rice', posicao: 'VOL', overall: 87, ataque: 75, defesa: 88 },
      { id: 'in24-06', nome: 'Stones', posicao: 'ZAG', overall: 85, ataque: 65, defesa: 86 },
      { id: 'in24-07', nome: 'Walker', posicao: 'LD', overall: 86, ataque: 78, defesa: 85 },
      { id: 'in24-08', nome: 'Pickford', posicao: 'GOL', overall: 83, ataque: 15, defesa: 83 },
    ]
  },
  {
    id: 'ur-1930',
    pais: 'Uruguai',
    ano: 1930, // Primeiro campeão do mundo
    jogadores: [
      { id: 'ur30-01', nome: 'Hector Castro', posicao: 'ATA', overall: 88, ataque: 90, defesa: 35 },
      { id: 'ur30-02', nome: 'Pedro Cea', posicao: 'ATA', overall: 89, ataque: 91, defesa: 40 },
      { id: 'ur30-03', nome: 'Hector Scarone', posicao: 'MEI', overall: 91, ataque: 92, defesa: 45 },
      { id: 'ur30-04', nome: 'José Andrade', posicao: 'VOL', overall: 93, ataque: 80, defesa: 92 },
      { id: 'ur30-05', nome: 'José Nasazzi', posicao: 'ZAG', overall: 92, ataque: 50, defesa: 94 },
      { id: 'ur30-06', nome: 'Enrique Ballestrero', posicao: 'GOL', overall: 86, ataque: 10, defesa: 86 },
    ]
  },
  {
    id: 'it-1938',
    pais: 'Itália',
    ano: 1938, // Bicampeã mundial na era clássica
    jogadores: [
      { id: 'it38-01', nome: 'Giuseppe Meazza', posicao: 'ATA', overall: 95, ataque: 96, defesa: 40 },
      { id: 'it38-02', nome: 'Silvio Piola', posicao: 'ATA', overall: 93, ataque: 95, defesa: 35 },
      { id: 'it38-03', nome: 'Giovanni Ferrari', posicao: 'MEI', overall: 89, ataque: 87, defesa: 60 },
      { id: 'it38-04', nome: 'Ugo Locatelli', posicao: 'VOL', overall: 87, ataque: 70, defesa: 86 },
      { id: 'it38-05', nome: 'Pietro Rava', posicao: 'ZAG', overall: 88, ataque: 45, defesa: 90 },
      { id: 'it38-06', nome: 'Aldo Olivieri', posicao: 'GOL', overall: 87, ataque: 10, defesa: 87 },
    ]
  },
  {
    id: 'hl-1974',
    pais: 'Holanda',
    ano: 1974, // O "Carrossel Holandês" de Cruyff
    jogadores: [
      { id: 'hl74-01', nome: 'Johan Cruyff', posicao: 'ATA', overall: 97, ataque: 98, defesa: 50 },
      { id: 'hl74-02', nome: 'Rob Rensenbrink', posicao: 'PE', overall: 89, ataque: 91, defesa: 40 },
      { id: 'hl74-03', nome: 'Johnny Rep', posicao: 'PD', overall: 88, ataque: 90, defesa: 42 },
      { id: 'hl74-04', nome: 'Johan Neeskens', posicao: 'MC', overall: 92, ataque: 88, defesa: 80 },
      { id: 'hl74-05', nome: 'Wim van Hanegem', posicao: 'MC', overall: 88, ataque: 84, defesa: 75 },
      { id: 'hl74-06', nome: 'Ruud Krol', posicao: 'LE', overall: 91, ataque: 82, defesa: 90 },
      { id: 'hl74-07', nome: 'Wim Suurbier', posicao: 'LD', overall: 86, ataque: 78, defesa: 84 },
      { id: 'hl74-08', nome: 'Wim Rijsbergen', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 87 },
      { id: 'hl74-09', nome: 'Jan Jongbloed', posicao: 'GOL', overall: 80, ataque: 15, defesa: 80 },
    ]
  },
  {
    id: 'it-1982',
    pais: 'Itália',
    ano: 1982, // A algoz do Brasil de 82 e campeã
    jogadores: [
      { id: 'it82-01', nome: 'Paolo Rossi', posicao: 'ATA', overall: 92, ataque: 95, defesa: 32 },
      { id: 'it82-02', nome: 'Bruno Conti', posicao: 'PD', overall: 89, ataque: 90, defesa: 45 },
      { id: 'it82-03', nome: 'Marco Tardelli', posicao: 'MC', overall: 88, ataque: 82, defesa: 84 },
      { id: 'it82-04', nome: 'Claudio Gentile', posicao: 'ZAG', overall: 89, ataque: 40, defesa: 93 },
      { id: 'it82-05', nome: 'Gaetano Scirea', posicao: 'ZAG', overall: 92, ataque: 65, defesa: 94 },
      { id: 'it82-06', nome: 'Antonio Cabrini', posicao: 'LE', overall: 87, ataque: 80, defesa: 85 },
      { id: 'it82-07', nome: 'Dino Zoff', posicao: 'GOL', overall: 92, ataque: 10, defesa: 92 },
    ]
  },
  {
    id: 'br-1994',
    pais: 'Brasil',
    ano: 1994, // O tetra nos EUA
    jogadores: [
      { id: 'br94-01', nome: 'Romário', posicao: 'ATA', overall: 95, ataque: 98, defesa: 30 },
      { id: 'br94-02', nome: 'Bebeto', posicao: 'ATA', overall: 89, ataque: 91, defesa: 40 },
      { id: 'br94-03', nome: 'Zinho', posicao: 'MEI', overall: 84, ataque: 82, defesa: 60 },
      { id: 'br94-04', nome: 'Mazinho', posicao: 'MC', overall: 84, ataque: 78, defesa: 80 },
      { id: 'br94-05', nome: 'Dunga', posicao: 'VOL', overall: 88, ataque: 72, defesa: 90 },
      { id: 'br94-06', nome: 'Mauro Silva', posicao: 'VOL', overall: 87, ataque: 65, defesa: 89 },
      { id: 'br94-07', nome: 'Branco', posicao: 'LE', overall: 85, ataque: 83, defesa: 78 },
      { id: 'br94-08', nome: 'Jorginho', posicao: 'LD', overall: 87, ataque: 82, defesa: 83 },
      { id: 'br94-09', nome: 'Aldair', posicao: 'ZAG', overall: 88, ataque: 50, defesa: 90 },
      { id: 'br94-10', nome: 'Márcio Santos', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 86 },
      { id: 'br94-11', nome: 'Taffarel', posicao: 'GOL', overall: 88, ataque: 15, defesa: 89 },
    ]
  },
  {
    id: 'it-2006',
    pais: 'Itália',
    ano: 2006, // A fantástica defesa tetracampeã
    jogadores: [
      { id: 'it06-01', nome: 'Luca Toni', posicao: 'ATA', overall: 86, ataque: 89, defesa: 30 },
      { id: 'it06-02', nome: 'Francesco Totti', posicao: 'MEI', overall: 90, ataque: 91, defesa: 45 },
      { id: 'it06-03', nome: 'Andrea Pirlo', posicao: 'MC', overall: 92, ataque: 88, defesa: 72 },
      { id: 'it06-04', nome: 'Gennaro Gattuso', posicao: 'VOL', overall: 87, ataque: 60, defesa: 90 },
      { id: 'it06-05', nome: 'Fabio Cannavaro', posicao: 'ZAG', overall: 93, ataque: 45, defesa: 96 },
      { id: 'it06-06', nome: 'Alessandro Nesta', posicao: 'ZAG', overall: 90, ataque: 40, defesa: 92 },
      { id: 'it06-07', nome: 'Gianluca Zambrotta', posicao: 'LD', overall: 86, ataque: 80, defesa: 85 },
      { id: 'it06-08', nome: 'Fabio Grosso', posicao: 'LE', overall: 84, ataque: 78, defesa: 82 },
      { id: 'it06-09', nome: 'Gianluigi Buffon', posicao: 'GOL', overall: 93, ataque: 10, defesa: 93 },
    ]
  },

  // ==========================================
  // MAIS SELEÇÕES ATUAIS (PROXIMAS ÀS ATUAIS)
  // ==========================================
  {
    id: 'fr-2024',
    pais: 'França',
    ano: 2024,
    jogadores: [
      { id: 'fr24-01', nome: 'Kylian Mbappé', posicao: 'ATA', overall: 93, ataque: 96, defesa: 36 },
      { id: 'fr24-02', nome: 'Ousmane Dembélé', posicao: 'PD', overall: 85, ataque: 86, defesa: 35 },
      { id: 'fr24-03', nome: 'Antoine Griezmann', posicao: 'MEI', overall: 88, ataque: 87, defesa: 65 },
      { id: 'fr24-04', nome: 'Aurélien Tchouaméni', posicao: 'VOL', overall: 85, ataque: 75, defesa: 85 },
      { id: 'fr24-05', nome: 'Eduardo Camavinga', posicao: 'MC', overall: 84, ataque: 79, defesa: 82 },
      { id: 'fr24-06', nome: 'Dayot Upamecano', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 85 },
      { id: 'fr24-07', nome: 'William Saliba', posicao: 'ZAG', overall: 87, ataque: 55, defesa: 89 },
      { id: 'fr24-08', nome: 'Theo Hernández', posicao: 'LE', overall: 86, ataque: 83, defesa: 81 },
      { id: 'fr24-09', nome: 'Mike Maignan', posicao: 'GOL', overall: 87, ataque: 15, defesa: 87 },
    ]
  },
  {
    id: 'pt-2024',
    pais: 'Portugal',
    ano: 2024,
    jogadores: [
      { id: 'pt24-01', nome: 'Cristiano Ronaldo', posicao: 'ATA', overall: 87, ataque: 90, defesa: 28 },
      { id: 'pt24-02', nome: 'Rafael Leão', posicao: 'PE', overall: 86, ataque: 88, defesa: 35 },
      { id: 'pt24-03', nome: 'Bernardo Silva', posicao: 'PD', overall: 88, ataque: 85, defesa: 68 },
      { id: 'pt24-04', nome: 'Bruno Fernandes', posicao: 'MEI', overall: 88, ataque: 88, defesa: 65 },
      { id: 'pt24-05', nome: 'Vitinha', posicao: 'MC', overall: 85, ataque: 81, defesa: 76 },
      { id: 'pt24-06', nome: 'João Palhinha', posicao: 'VOL', overall: 84, ataque: 68, defesa: 86 },
      { id: 'pt24-07', nome: 'Rúben Dias', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 90 },
      { id: 'pt24-08', nome: 'João Cancelo', posicao: 'LD', overall: 85, ataque: 84, defesa: 78 },
      { id: 'pt24-09', nome: 'Diogo Costa', posicao: 'GOL', overall: 85, ataque: 15, defesa: 85 },
    ]
  },
  {
    id: 'es-2024',
    pais: 'Espanha',
    ano: 2024, // Campeã da Eurocopa recente
    jogadores: [
      { id: 'es24-01', nome: 'Alvaro Morata', posicao: 'ATA', overall: 83, ataque: 85, defesa: 40 },
      { id: 'es24-02', nome: 'Lamine Yamal', posicao: 'PD', overall: 84, ataque: 86, defesa: 45 },
      { id: 'es24-03', nome: 'Nico Williams', posicao: 'PE', overall: 84, ataque: 85, defesa: 42 },
      { id: 'es24-04', nome: 'Dani Olmo', posicao: 'MEI', overall: 85, ataque: 86, defesa: 55 },
      { id: 'es24-05', nome: 'Rodri', posicao: 'VOL', overall: 91, ataque: 82, defesa: 91 },
      { id: 'es24-06', nome: 'Fabián Ruiz', posicao: 'MC', overall: 83, ataque: 81, defesa: 75 },
      { id: 'es24-07', nome: 'Aymeric Laporte', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 84 },
      { id: 'es24-08', nome: 'Robin Le Normand', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 83 },
      { id: 'es24-09', nome: 'Dani Carvajal', posicao: 'LD', overall: 85, ataque: 78, defesa: 84 },
      { id: 'es24-10', nome: 'Unai Simón', posicao: 'GOL', overall: 85, ataque: 15, defesa: 85 },
    ]
  },
  {
    id: 'al-2024',
    pais: 'Alemanha',
    ano: 2024,
    jogadores: [
      { id: 'al24-01', nome: 'Kai Havertz', posicao: 'ATA', overall: 84, ataque: 85, defesa: 45 },
      { id: 'al24-02', nome: 'Florian Wirtz', posicao: 'MEI', overall: 87, ataque: 88, defesa: 50 },
      { id: 'al24-03', nome: 'Jamal Musiala', posicao: 'MEI', overall: 87, ataque: 89, defesa: 48 },
      { id: 'al24-04', nome: 'Ilkay Gündogan', posicao: 'MC', overall: 85, ataque: 83, defesa: 72 },
      { id: 'al24-05', nome: 'Toni Kroos', posicao: 'MC', overall: 86, ataque: 80, defesa: 70 }, // Última dança
      { id: 'al24-06', nome: 'Robert Andrich', posicao: 'VOL', overall: 81, ataque: 70, defesa: 82 },
      { id: 'al24-07', nome: 'Antonio Rüdiger', posicao: 'ZAG', overall: 87, ataque: 55, defesa: 88 },
      { id: 'al24-08', nome: 'Jonathan Tah', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 84 },
      { id: 'al24-09', nome: 'Joshua Kimmich', posicao: 'LD', overall: 85, ataque: 80, defesa: 82 },
      { id: 'al24-10', nome: 'Manuel Neuer', posicao: 'GOL', overall: 86, ataque: 20, defesa: 86 },
    ]
  },
  {
    id: 'hu-1954',
    pais: 'Hungria',
    ano: 1954, // O "Time de Ouro"
    jogadores: [
      { id: 'hu54-01', nome: 'Ferenc Puskás', posicao: 'ATA', overall: 96, ataque: 97, defesa: 35 },
      { id: 'hu54-02', nome: 'Sándor Kocsis', posicao: 'ATA', overall: 92, ataque: 94, defesa: 30 },
      { id: 'hu54-03', nome: 'Nándor Hidegkuti', posicao: 'MEI', overall: 90, ataque: 91, defesa: 45 },
      { id: 'hu54-04', nome: 'Zoltán Czibor', posicao: 'PE', overall: 89, ataque: 90, defesa: 40 },
      { id: 'hu54-05', nome: 'József Bozsik', posicao: 'MC', overall: 91, ataque: 86, defesa: 80 },
      { id: 'hu54-06', nome: 'Gyula Grosics', posicao: 'GOL', overall: 88, ataque: 10, defesa: 88 }
    ]
  },
  {
    id: 'in-1966',
    pais: 'Inglaterra',
    ano: 1966, // Campeã Mundial
    jogadores: [
      { id: 'in66-01', nome: 'Bobby Charlton', posicao: 'MEI', overall: 94, ataque: 93, defesa: 65 },
      { id: 'in66-02', nome: 'Geoff Hurst', posicao: 'ATA', overall: 88, ataque: 90, defesa: 40 },
      { id: 'in66-03', nome: 'Bobby Moore', posicao: 'ZAG', overall: 94, ataque: 65, defesa: 96 },
      { id: 'in66-04', nome: 'Nobby Stiles', posicao: 'VOL', overall: 85, ataque: 60, defesa: 88 },
      { id: 'in66-05', nome: 'Gordon Banks', posicao: 'GOL', overall: 92, ataque: 15, defesa: 92 }
    ]
  },
  {
    id: 'br-1982',
    pais: 'Brasil',
    ano: 1982, // A mágica seleção de Telê Santana
    jogadores: [
      { id: 'br82-01', nome: 'Zico', posicao: 'MEI', overall: 95, ataque: 96, defesa: 45 },
      { id: 'br82-02', nome: 'Sócrates', posicao: 'MC', overall: 92, ataque: 90, defesa: 65 },
      { id: 'br82-03', nome: 'Falcão', posicao: 'VOL', overall: 91, ataque: 86, defesa: 82 },
      { id: 'br82-04', nome: 'Toninho Cerezo', posicao: 'VOL', overall: 89, ataque: 82, defesa: 80 },
      { id: 'br82-05', nome: 'Júnior', posicao: 'LE', overall: 90, ataque: 88, defesa: 82 },
      { id: 'br82-06', nome: 'Leandro', posicao: 'LD', overall: 88, ataque: 85, defesa: 84 },
      { id: 'br82-07', nome: 'Éder', posicao: 'PE', overall: 86, ataque: 88, defesa: 35 },
      { id: 'br82-08', nome: 'Waldir Peres', posicao: 'GOL', overall: 81, ataque: 10, defesa: 81 }
    ]
  },
  {
    id: 'hl-1988',
    pais: 'Holanda',
    ano: 1988, // Campeã da Eurocopa
    jogadores: [
      { id: 'hl88-01', nome: 'Marco van Basten', posicao: 'ATA', overall: 94, ataque: 96, defesa: 35 },
      { id: 'hl88-02', nome: 'Ruud Gullit', posicao: 'MEI', overall: 93, ataque: 92, defesa: 75 },
      { id: 'hl88-03', nome: 'Frank Rijkaard', posicao: 'VOL', overall: 92, ataque: 82, defesa: 92 },
      { id: 'hl88-04', nome: 'Ronald Koeman', posicao: 'ZAG', overall: 90, ataque: 88, defesa: 88 },
      { id: 'hl88-05', nome: 'Hans van Breukelen', posicao: 'GOL', overall: 86, ataque: 15, defesa: 86 }
    ]
  },
  {
    id: 'hl-2010',
    pais: 'Holanda',
    ano: 2010, // Vice-campeã
    jogadores: [
      { id: 'hl10-01', nome: 'Arjen Robben', posicao: 'PD', overall: 90, ataque: 92, defesa: 35 },
      { id: 'hl10-02', nome: 'Wesley Sneijder', posicao: 'MEI', overall: 91, ataque: 90, defesa: 55 },
      { id: 'hl10-03', nome: 'Robin van Persie', posicao: 'ATA', overall: 88, ataque: 91, defesa: 38 },
      { id: 'hl10-04', nome: 'Dirk Kuyt', posicao: 'PE', overall: 84, ataque: 82, defesa: 75 },
      { id: 'hl10-05', nome: 'Mark van Bommel', posicao: 'VOL', overall: 85, ataque: 65, defesa: 86 },
      { id: 'hl10-06', nome: 'Nigel de Jong', posicao: 'VOL', overall: 83, ataque: 60, defesa: 85 },
      { id: 'hl10-07', nome: 'Giovanni van Bronckhorst', posicao: 'LE', overall: 85, ataque: 82, defesa: 81 },
      { id: 'hl10-08', nome: 'Maarten Stekelenburg', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'ur-2010',
    pais: 'Uruguai',
    ano: 2010, // Semifinalista inesquecível
    jogadores: [
      { id: 'ur10-01', nome: 'Diego Forlán', posicao: 'ATA', overall: 90, ataque: 92, defesa: 45 },
      { id: 'ur10-02', nome: 'Luis Suárez', posicao: 'ATA', overall: 88, ataque: 90, defesa: 45 },
      { id: 'ur10-03', nome: 'Edinson Cavani', posicao: 'ATA', overall: 86, ataque: 88, defesa: 50 },
      { id: 'ur10-04', nome: 'Egidio Arévalo Ríos', posicao: 'VOL', overall: 81, ataque: 55, defesa: 84 },
      { id: 'ur10-05', nome: 'Diego Lugano', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 87 },
      { id: 'ur10-06', nome: 'Diego Godín', posicao: 'ZAG', overall: 83, ataque: 45, defesa: 86 },
      { id: 'ur10-07', nome: 'Fernando Muslera', posicao: 'GOL', overall: 83, ataque: 10, defesa: 83 }
    ]
  },
  {
    id: 'cr-2018',
    pais: 'Croácia',
    ano: 2018, // Vice-campeã
    jogadores: [
      { id: 'cr18-01', nome: 'Luka Modrić', posicao: 'MC', overall: 92, ataque: 88, defesa: 75 },
      { id: 'cr18-02', nome: 'Ivan Rakitić', posicao: 'MC', overall: 87, ataque: 84, defesa: 72 },
      { id: 'cr18-03', nome: 'Ivan Perišić', posicao: 'PE', overall: 86, ataque: 85, defesa: 65 },
      { id: 'cr18-04', nome: 'Mario Mandžukić', posicao: 'ATA', overall: 85, ataque: 86, defesa: 60 },
      { id: 'cr18-05', nome: 'Marcelo Brozović', posicao: 'VOL', overall: 84, ataque: 70, defesa: 84 },
      { id: 'cr18-06', nome: 'Domagoj Vida', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 83 },
      { id: 'cr18-07', nome: 'Danijel Subašić', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'be-2018',
    pais: 'Bélgica',
    ano: 2018, // A famosa "Geração Belga"
    jogadores: [
      { id: 'be18-01', nome: 'Kevin De Bruyne', posicao: 'MEI', overall: 91, ataque: 90, defesa: 60 },
      { id: 'be18-02', nome: 'Eden Hazard', posicao: 'PE', overall: 91, ataque: 92, defesa: 35 },
      { id: 'be18-03', nome: 'Romelu Lukaku', posicao: 'ATA', overall: 88, ataque: 89, defesa: 35 },
      { id: 'be18-04', nome: 'Axel Witsel', posicao: 'VOL', overall: 84, ataque: 70, defesa: 84 },
      { id: 'be18-05', nome: 'Vincent Kompany', posicao: 'ZAG', overall: 87, ataque: 55, defesa: 88 },
      { id: 'be18-06', nome: 'Jan Vertonghen', posicao: 'ZAG', overall: 86, ataque: 60, defesa: 86 },
      { id: 'be18-07', nome: 'Thibaut Courtois', posicao: 'GOL', overall: 90, ataque: 15, defesa: 90 }
    ]
  },
  {
    id: 'ma-2022',
    pais: 'Marrocos',
    ano: 2022, // Semifinalista histórica
    jogadores: [
      { id: 'ma22-01', nome: 'Hakim Ziyech', posicao: 'PD', overall: 84, ataque: 85, defesa: 50 },
      { id: 'ma22-02', nome: 'Youssef En-Nesyri', posicao: 'ATA', overall: 82, ataque: 83, defesa: 45 },
      { id: 'ma22-03', nome: 'Sofyan Amrabat', posicao: 'VOL', overall: 84, ataque: 65, defesa: 86 },
      { id: 'ma22-04', nome: 'Azzedine Ounahi', posicao: 'MC', overall: 81, ataque: 78, defesa: 65 },
      { id: 'ma22-05', nome: 'Achraf Hakimi', posicao: 'LD', overall: 86, ataque: 85, defesa: 80 },
      { id: 'ma22-06', nome: 'Romain Saïss', posicao: 'ZAG', overall: 82, ataque: 45, defesa: 84 },
      { id: 'ma22-07', nome: 'Yassine Bounou', posicao: 'GOL', overall: 85, ataque: 10, defesa: 85 }
    ]
  },
  {
    id: 'pt-1966',
    pais: 'Portugal',
    ano: 1966, // Os "Magriços" e o 3º lugar
    jogadores: [
      { id: 'pt66-01', nome: 'Eusébio', posicao: 'ATA', overall: 95, ataque: 97, defesa: 30 },
      { id: 'pt66-02', nome: 'Mário Coluna', posicao: 'MC', overall: 90, ataque: 88, defesa: 75 },
      { id: 'pt66-03', nome: 'José Augusto', posicao: 'PD', overall: 86, ataque: 88, defesa: 40 },
      { id: 'pt66-04', nome: 'António Simões', posicao: 'PE', overall: 87, ataque: 86, defesa: 45 },
      { id: 'pt66-05', nome: 'Vicente Lucas', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 88 },
      { id: 'pt66-06', nome: 'José Pereira', posicao: 'GOL', overall: 83, ataque: 10, defesa: 83 }
    ]
  },
  {
    id: 'ur-1960', // URSS (Usando sigla provisória)
    pais: 'União Soviética',
    ano: 1960, // Campeões da primeira Eurocopa
    jogadores: [
      { id: 'us60-01', nome: 'Lev Yashin', posicao: 'GOL', overall: 96, ataque: 15, defesa: 96 },
      { id: 'us60-02', nome: 'Valentin Ivanov', posicao: 'ATA', overall: 88, ataque: 90, defesa: 45 },
      { id: 'us60-03', nome: 'Viktor Ponedelnik', posicao: 'ATA', overall: 86, ataque: 88, defesa: 40 },
      { id: 'us60-04', nome: 'Igor Netto', posicao: 'VOL', overall: 89, ataque: 75, defesa: 88 },
      { id: 'us60-05', nome: 'Anatoli Maslyonkin', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 }
    ]
  },
  {
    id: 'fr-1984',
    pais: 'França',
    ano: 1984, // O "Quadrado Mágico" Campeão da Euro
    jogadores: [
      { id: 'fr84-01', nome: 'Michel Platini', posicao: 'MEI', overall: 95, ataque: 96, defesa: 50 },
      { id: 'fr84-02', nome: 'Alain Giresse', posicao: 'MC', overall: 89, ataque: 88, defesa: 65 },
      { id: 'fr84-03', nome: 'Jean Tigana', posicao: 'VOL', overall: 90, ataque: 80, defesa: 88 },
      { id: 'fr84-04', nome: 'Luis Fernández', posicao: 'VOL', overall: 87, ataque: 75, defesa: 85 },
      { id: 'fr84-05', nome: 'Maxime Bossis', posicao: 'ZAG', overall: 88, ataque: 60, defesa: 90 },
      { id: 'fr84-06', nome: 'Joël Bats', posicao: 'GOL', overall: 85, ataque: 10, defesa: 85 }
    ]
  },
  {
    id: 'cm-1990',
    pais: 'Camarões',
    ano: 1990, // A sensação da Copa da Itália
    jogadores: [
      { id: 'cm90-01', nome: 'Roger Milla', posicao: 'ATA', overall: 87, ataque: 90, defesa: 35 },
      { id: 'cm90-02', nome: 'François Omam-Biyik', posicao: 'ATA', overall: 83, ataque: 85, defesa: 40 },
      { id: 'cm90-03', nome: 'Cyrille Makanaky', posicao: 'MEI', overall: 81, ataque: 82, defesa: 55 },
      { id: 'cm90-04', nome: 'Stephen Tataw', posicao: 'LD', overall: 82, ataque: 70, defesa: 84 },
      { id: 'cm90-05', nome: 'Thomas N\'Kono', posicao: 'GOL', overall: 86, ataque: 10, defesa: 86 }
    ]
  },
  {
    id: 'al-1990',
    pais: 'Alemanha Ocidental',
    ano: 1990, // O Tri mundial
    jogadores: [
      { id: 'al90-01', nome: 'Lothar Matthäus', posicao: 'MC', overall: 94, ataque: 90, defesa: 90 },
      { id: 'al90-02', nome: 'Jürgen Klinsmann', posicao: 'ATA', overall: 90, ataque: 92, defesa: 40 },
      { id: 'al90-03', nome: 'Rudi Völler', posicao: 'ATA', overall: 89, ataque: 91, defesa: 45 },
      { id: 'al90-04', nome: 'Andreas Brehme', posicao: 'LE', overall: 90, ataque: 88, defesa: 87 },
      { id: 'al90-05', nome: 'Jürgen Kohler', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 92 },
      { id: 'al90-06', nome: 'Bodo Illgner', posicao: 'GOL', overall: 86, ataque: 10, defesa: 86 }
    ]
  },
  {
    id: 'dn-1992',
    pais: 'Dinamarca',
    ano: 1992, // O milagre da Euro 92
    jogadores: [
      { id: 'dn92-01', nome: 'Brian Laudrup', posicao: 'ATA', overall: 89, ataque: 91, defesa: 40 },
      { id: 'dn92-02', nome: 'Henrik Larsen', posicao: 'MC', overall: 83, ataque: 84, defesa: 70 },
      { id: 'dn92-03', nome: 'John Jensen', posicao: 'VOL', overall: 82, ataque: 75, defesa: 83 },
      { id: 'dn92-04', nome: 'Lars Olsen', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 86 },
      { id: 'dn92-05', nome: 'Peter Schmeichel', posicao: 'GOL', overall: 92, ataque: 15, defesa: 92 }
    ]
  },
  {
    id: 'it-1994',
    pais: 'Itália',
    ano: 1994, // Vice-campeã com a genialidade de Baggio
    jogadores: [
      { id: 'it94-01', nome: 'Roberto Baggio', posicao: 'ATA', overall: 93, ataque: 95, defesa: 35 },
      { id: 'it94-02', nome: 'Demetrio Albertini', posicao: 'MC', overall: 88, ataque: 82, defesa: 85 },
      { id: 'it94-03', nome: 'Paolo Maldini', posicao: 'LE', overall: 94, ataque: 80, defesa: 96 },
      { id: 'it94-04', nome: 'Franco Baresi', posicao: 'ZAG', overall: 94, ataque: 65, defesa: 97 },
      { id: 'it94-05', nome: 'Mauro Tassotti', posicao: 'LD', overall: 86, ataque: 78, defesa: 88 },
      { id: 'it94-06', nome: 'Gianluca Pagliuca', posicao: 'GOL', overall: 88, ataque: 10, defesa: 88 }
    ]
  },
  {
    id: 'ng-1996',
    pais: 'Nigéria',
    ano: 1996, // Campeões Olímpicos ("Super Águias")
    jogadores: [
      { id: 'ng96-01', nome: 'Nwankwo Kanu', posicao: 'ATA', overall: 86, ataque: 88, defesa: 35 },
      { id: 'ng96-02', nome: 'Jay-Jay Okocha', posicao: 'MEI', overall: 87, ataque: 89, defesa: 50 },
      { id: 'ng96-03', nome: 'Victor Ikpeba', posicao: 'ATA', overall: 83, ataque: 85, defesa: 40 },
      { id: 'ng96-04', nome: 'Sunday Oliseh', posicao: 'VOL', overall: 84, ataque: 78, defesa: 84 },
      { id: 'ng96-05', nome: 'Taribo West', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 },
      { id: 'ng96-06', nome: 'Celestine Babayaro', posicao: 'LE', overall: 83, ataque: 78, defesa: 81 }
    ]
  },
  {
    id: 'sn-2002',
    pais: 'Senegal',
    ano: 2002, // A surpresa da Copa de 2002
    jogadores: [
      { id: 'sn02-01', nome: 'El Hadji Diouf', posicao: 'ATA', overall: 85, ataque: 87, defesa: 40 },
      { id: 'sn02-02', nome: 'Henri Camara', posicao: 'ATA', overall: 82, ataque: 85, defesa: 35 },
      { id: 'sn02-03', nome: 'Khalilou Fadiga', posicao: 'MEI', overall: 83, ataque: 84, defesa: 50 },
      { id: 'sn02-04', nome: 'Papa Bouba Diop', posicao: 'VOL', overall: 82, ataque: 75, defesa: 84 },
      { id: 'sn02-05', nome: 'Aliou Cissé', posicao: 'ZAG', overall: 81, ataque: 55, defesa: 83 },
      { id: 'sn02-06', nome: 'Tony Sylva', posicao: 'GOL', overall: 81, ataque: 10, defesa: 81 }
    ]
  },
  {
    id: 'kr-2002',
    pais: 'Coréia do Sul',
    ano: 2002, // Semifinalista histórica em casa
    jogadores: [
      { id: 'kr02-01', nome: 'Ahn Jung-hwan', posicao: 'ATA', overall: 83, ataque: 85, defesa: 45 },
      { id: 'kr02-02', nome: 'Park Ji-sung', posicao: 'MEI', overall: 86, ataque: 84, defesa: 75 },
      { id: 'kr02-03', nome: 'Seol Ki-hyeon', posicao: 'PE', overall: 80, ataque: 82, defesa: 50 },
      { id: 'kr02-04', nome: 'Yoo Sang-chul', posicao: 'MC', overall: 82, ataque: 78, defesa: 80 },
      { id: 'kr02-05', nome: 'Hong Myung-bo', posicao: 'ZAG', overall: 85, ataque: 70, defesa: 86 },
      { id: 'kr02-06', nome: 'Lee Woon-jae', posicao: 'GOL', overall: 82, ataque: 10, defesa: 82 }
    ]
  },
  {
    id: 'gr-2004',
    pais: 'Grécia',
    ano: 2004, // A maior zebra da história da Euro
    jogadores: [
      { id: 'gr04-01', nome: 'Angelos Charisteas', posicao: 'ATA', overall: 82, ataque: 85, defesa: 45 },
      { id: 'gr04-02', nome: 'Theodoros Zagorakis', posicao: 'MC', overall: 84, ataque: 78, defesa: 82 },
      { id: 'gr04-03', nome: 'Giorgos Karagounis', posicao: 'MEI', overall: 83, ataque: 80, defesa: 75 },
      { id: 'gr04-04', nome: 'Traianos Dellas', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 86 },
      { id: 'gr04-05', nome: 'Giourkas Seitaridis', posicao: 'LD', overall: 82, ataque: 75, defesa: 82 },
      { id: 'gr04-06', nome: 'Antonios Nikopolidis', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'co-2014',
    pais: 'Colômbia',
    ano: 2014, // O encanto no Brasil
    jogadores: [
      { id: 'co14-01', nome: 'James Rodríguez', posicao: 'MEI', overall: 89, ataque: 91, defesa: 50 },
      { id: 'co14-02', nome: 'Radamel Falcao', posicao: 'ATA', overall: 88, ataque: 91, defesa: 40 }, // Icônico dessa geração
      { id: 'co14-03', nome: 'Juan Cuadrado', posicao: 'PD', overall: 86, ataque: 87, defesa: 65 },
      { id: 'co14-04', nome: 'Carlos Sánchez', posicao: 'VOL', overall: 82, ataque: 65, defesa: 84 },
      { id: 'co14-05', nome: 'Mario Yepes', posicao: 'ZAG', overall: 84, ataque: 55, defesa: 86 },
      { id: 'co14-06', nome: 'David Ospina', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'cl-2015',
    pais: 'Chile',
    ano: 2015, // Geração de Ouro (Bicampeã da Copa América)
    jogadores: [
      { id: 'cl15-01', nome: 'Alexis Sánchez', posicao: 'ATA', overall: 88, ataque: 90, defesa: 55 },
      { id: 'cl15-02', nome: 'Eduardo Vargas', posicao: 'ATA', overall: 83, ataque: 85, defesa: 45 },
      { id: 'cl15-03', nome: 'Arturo Vidal', posicao: 'MC', overall: 89, ataque: 86, defesa: 87 },
      { id: 'cl15-04', nome: 'Charles Aránguiz', posicao: 'MC', overall: 84, ataque: 80, defesa: 82 },
      { id: 'cl15-05', nome: 'Gary Medel', posicao: 'ZAG', overall: 85, ataque: 65, defesa: 88 },
      { id: 'cl15-06', nome: 'Claudio Bravo', posicao: 'GOL', overall: 86, ataque: 15, defesa: 86 }
    ]
  },
  {
    id: 'pt-1966',
    pais: 'Portugal',
    ano: 1966, // Os "Magriços" e o 3º lugar
    jogadores: [
      { id: 'pt66-01', nome: 'Eusébio', posicao: 'ATA', overall: 95, ataque: 97, defesa: 30 },
      { id: 'pt66-02', nome: 'Mário Coluna', posicao: 'MC', overall: 90, ataque: 88, defesa: 75 },
      { id: 'pt66-03', nome: 'José Augusto', posicao: 'PD', overall: 86, ataque: 88, defesa: 40 },
      { id: 'pt66-04', nome: 'António Simões', posicao: 'PE', overall: 87, ataque: 86, defesa: 45 },
      { id: 'pt66-05', nome: 'Vicente Lucas', posicao: 'ZAG', overall: 85, ataque: 45, defesa: 88 },
      { id: 'pt66-06', nome: 'José Pereira', posicao: 'GOL', overall: 83, ataque: 10, defesa: 83 }
    ]
  },
  {
    id: 'ur-1960', // URSS (Usando sigla provisória)
    pais: 'União Soviética',
    ano: 1960, // Campeões da primeira Eurocopa
    jogadores: [
      { id: 'us60-01', nome: 'Lev Yashin', posicao: 'GOL', overall: 96, ataque: 15, defesa: 96 },
      { id: 'us60-02', nome: 'Valentin Ivanov', posicao: 'ATA', overall: 88, ataque: 90, defesa: 45 },
      { id: 'us60-03', nome: 'Viktor Ponedelnik', posicao: 'ATA', overall: 86, ataque: 88, defesa: 40 },
      { id: 'us60-04', nome: 'Igor Netto', posicao: 'VOL', overall: 89, ataque: 75, defesa: 88 },
      { id: 'us60-05', nome: 'Anatoli Maslyonkin', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 }
    ]
  },
  {
    id: 'fr-1984',
    pais: 'França',
    ano: 1984, // O "Quadrado Mágico" Campeão da Euro
    jogadores: [
      { id: 'fr84-01', nome: 'Michel Platini', posicao: 'MEI', overall: 95, ataque: 96, defesa: 50 },
      { id: 'fr84-02', nome: 'Alain Giresse', posicao: 'MC', overall: 89, ataque: 88, defesa: 65 },
      { id: 'fr84-03', nome: 'Jean Tigana', posicao: 'VOL', overall: 90, ataque: 80, defesa: 88 },
      { id: 'fr84-04', nome: 'Luis Fernández', posicao: 'VOL', overall: 87, ataque: 75, defesa: 85 },
      { id: 'fr84-05', nome: 'Maxime Bossis', posicao: 'ZAG', overall: 88, ataque: 60, defesa: 90 },
      { id: 'fr84-06', nome: 'Joël Bats', posicao: 'GOL', overall: 85, ataque: 10, defesa: 85 }
    ]
  },
  {
    id: 'cm-1990',
    pais: 'Camarões',
    ano: 1990, // A sensação da Copa da Itália
    jogadores: [
      { id: 'cm90-01', nome: 'Roger Milla', posicao: 'ATA', overall: 87, ataque: 90, defesa: 35 },
      { id: 'cm90-02', nome: 'François Omam-Biyik', posicao: 'ATA', overall: 83, ataque: 85, defesa: 40 },
      { id: 'cm90-03', nome: 'Cyrille Makanaky', posicao: 'MEI', overall: 81, ataque: 82, defesa: 55 },
      { id: 'cm90-04', nome: 'Stephen Tataw', posicao: 'LD', overall: 82, ataque: 70, defesa: 84 },
      { id: 'cm90-05', nome: 'Thomas N\'Kono', posicao: 'GOL', overall: 86, ataque: 10, defesa: 86 }
    ]
  },
  {
    id: 'al-1990',
    pais: 'Alemanha Ocidental',
    ano: 1990, // O Tri mundial
    jogadores: [
      { id: 'al90-01', nome: 'Lothar Matthäus', posicao: 'MC', overall: 94, ataque: 90, defesa: 90 },
      { id: 'al90-02', nome: 'Jürgen Klinsmann', posicao: 'ATA', overall: 90, ataque: 92, defesa: 40 },
      { id: 'al90-03', nome: 'Rudi Völler', posicao: 'ATA', overall: 89, ataque: 91, defesa: 45 },
      { id: 'al90-04', nome: 'Andreas Brehme', posicao: 'LE', overall: 90, ataque: 88, defesa: 87 },
      { id: 'al90-05', nome: 'Jürgen Kohler', posicao: 'ZAG', overall: 89, ataque: 50, defesa: 92 },
      { id: 'al90-06', nome: 'Bodo Illgner', posicao: 'GOL', overall: 86, ataque: 10, defesa: 86 }
    ]
  },
  {
    id: 'dn-1992',
    pais: 'Dinamarca',
    ano: 1992, // O milagre da Euro 92
    jogadores: [
      { id: 'dn92-01', nome: 'Brian Laudrup', posicao: 'ATA', overall: 89, ataque: 91, defesa: 40 },
      { id: 'dn92-02', nome: 'Henrik Larsen', posicao: 'MC', overall: 83, ataque: 84, defesa: 70 },
      { id: 'dn92-03', nome: 'John Jensen', posicao: 'VOL', overall: 82, ataque: 75, defesa: 83 },
      { id: 'dn92-04', nome: 'Lars Olsen', posicao: 'ZAG', overall: 84, ataque: 50, defesa: 86 },
      { id: 'dn92-05', nome: 'Peter Schmeichel', posicao: 'GOL', overall: 92, ataque: 15, defesa: 92 }
    ]
  },
  {
    id: 'it-1994',
    pais: 'Itália',
    ano: 1994, // Vice-campeã com a genialidade de Baggio
    jogadores: [
      { id: 'it94-01', nome: 'Roberto Baggio', posicao: 'ATA', overall: 93, ataque: 95, defesa: 35 },
      { id: 'it94-02', nome: 'Demetrio Albertini', posicao: 'MC', overall: 88, ataque: 82, defesa: 85 },
      { id: 'it94-03', nome: 'Paolo Maldini', posicao: 'LE', overall: 94, ataque: 80, defesa: 96 },
      { id: 'it94-04', nome: 'Franco Baresi', posicao: 'ZAG', overall: 94, ataque: 65, defesa: 97 },
      { id: 'it94-05', nome: 'Mauro Tassotti', posicao: 'LD', overall: 86, ataque: 78, defesa: 88 },
      { id: 'it94-06', nome: 'Gianluca Pagliuca', posicao: 'GOL', overall: 88, ataque: 10, defesa: 88 }
    ]
  },
  {
    id: 'ng-1996',
    pais: 'Nigéria',
    ano: 1996, // Campeões Olímpicos ("Super Águias")
    jogadores: [
      { id: 'ng96-01', nome: 'Nwankwo Kanu', posicao: 'ATA', overall: 86, ataque: 88, defesa: 35 },
      { id: 'ng96-02', nome: 'Jay-Jay Okocha', posicao: 'MEI', overall: 87, ataque: 89, defesa: 50 },
      { id: 'ng96-03', nome: 'Victor Ikpeba', posicao: 'ATA', overall: 83, ataque: 85, defesa: 40 },
      { id: 'ng96-04', nome: 'Sunday Oliseh', posicao: 'VOL', overall: 84, ataque: 78, defesa: 84 },
      { id: 'ng96-05', nome: 'Taribo West', posicao: 'ZAG', overall: 85, ataque: 50, defesa: 87 },
      { id: 'ng96-06', nome: 'Celestine Babayaro', posicao: 'LE', overall: 83, ataque: 78, defesa: 81 }
    ]
  },
  {
    id: 'sn-2002',
    pais: 'Senegal',
    ano: 2002, // A surpresa da Copa de 2002
    jogadores: [
      { id: 'sn02-01', nome: 'El Hadji Diouf', posicao: 'ATA', overall: 85, ataque: 87, defesa: 40 },
      { id: 'sn02-02', nome: 'Henri Camara', posicao: 'ATA', overall: 82, ataque: 85, defesa: 35 },
      { id: 'sn02-03', nome: 'Khalilou Fadiga', posicao: 'MEI', overall: 83, ataque: 84, defesa: 50 },
      { id: 'sn02-04', nome: 'Papa Bouba Diop', posicao: 'VOL', overall: 82, ataque: 75, defesa: 84 },
      { id: 'sn02-05', nome: 'Aliou Cissé', posicao: 'ZAG', overall: 81, ataque: 55, defesa: 83 },
      { id: 'sn02-06', nome: 'Tony Sylva', posicao: 'GOL', overall: 81, ataque: 10, defesa: 81 }
    ]
  },
  {
    id: 'kr-2002',
    pais: 'Coréia do Sul',
    ano: 2002, // Semifinalista histórica em casa
    jogadores: [
      { id: 'kr02-01', nome: 'Ahn Jung-hwan', posicao: 'ATA', overall: 83, ataque: 85, defesa: 45 },
      { id: 'kr02-02', nome: 'Park Ji-sung', posicao: 'MEI', overall: 86, ataque: 84, defesa: 75 },
      { id: 'kr02-03', nome: 'Seol Ki-hyeon', posicao: 'PE', overall: 80, ataque: 82, defesa: 50 },
      { id: 'kr02-04', nome: 'Yoo Sang-chul', posicao: 'MC', overall: 82, ataque: 78, defesa: 80 },
      { id: 'kr02-05', nome: 'Hong Myung-bo', posicao: 'ZAG', overall: 85, ataque: 70, defesa: 86 },
      { id: 'kr02-06', nome: 'Lee Woon-jae', posicao: 'GOL', overall: 82, ataque: 10, defesa: 82 }
    ]
  },
  {
    id: 'gr-2004',
    pais: 'Grécia',
    ano: 2004, // A maior zebra da história da Euro
    jogadores: [
      { id: 'gr04-01', nome: 'Angelos Charisteas', posicao: 'ATA', overall: 82, ataque: 85, defesa: 45 },
      { id: 'gr04-02', nome: 'Theodoros Zagorakis', posicao: 'MC', overall: 84, ataque: 78, defesa: 82 },
      { id: 'gr04-03', nome: 'Giorgos Karagounis', posicao: 'MEI', overall: 83, ataque: 80, defesa: 75 },
      { id: 'gr04-04', nome: 'Traianos Dellas', posicao: 'ZAG', overall: 83, ataque: 50, defesa: 86 },
      { id: 'gr04-05', nome: 'Giourkas Seitaridis', posicao: 'LD', overall: 82, ataque: 75, defesa: 82 },
      { id: 'gr04-06', nome: 'Antonios Nikopolidis', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'co-2014',
    pais: 'Colômbia',
    ano: 2014, // O encanto no Brasil
    jogadores: [
      { id: 'co14-01', nome: 'James Rodríguez', posicao: 'MEI', overall: 89, ataque: 91, defesa: 50 },
      { id: 'co14-02', nome: 'Radamel Falcao', posicao: 'ATA', overall: 88, ataque: 91, defesa: 40 }, // Icônico dessa geração
      { id: 'co14-03', nome: 'Juan Cuadrado', posicao: 'PD', overall: 86, ataque: 87, defesa: 65 },
      { id: 'co14-04', nome: 'Carlos Sánchez', posicao: 'VOL', overall: 82, ataque: 65, defesa: 84 },
      { id: 'co14-05', nome: 'Mario Yepes', posicao: 'ZAG', overall: 84, ataque: 55, defesa: 86 },
      { id: 'co14-06', nome: 'David Ospina', posicao: 'GOL', overall: 84, ataque: 10, defesa: 84 }
    ]
  },
  {
    id: 'cl-2015',
    pais: 'Chile',
    ano: 2015, // Geração de Ouro (Bicampeã da Copa América)
    jogadores: [
      { id: 'cl15-01', nome: 'Alexis Sánchez', posicao: 'ATA', overall: 88, ataque: 90, defesa: 55 },
      { id: 'cl15-02', nome: 'Eduardo Vargas', posicao: 'ATA', overall: 83, ataque: 85, defesa: 45 },
      { id: 'cl15-03', nome: 'Arturo Vidal', posicao: 'MC', overall: 89, ataque: 86, defesa: 87 },
      { id: 'cl15-04', nome: 'Charles Aránguiz', posicao: 'MC', overall: 84, ataque: 80, defesa: 82 },
      { id: 'cl15-05', nome: 'Gary Medel', posicao: 'ZAG', overall: 85, ataque: 65, defesa: 88 },
      { id: 'cl15-06', nome: 'Claudio Bravo', posicao: 'GOL', overall: 86, ataque: 15, defesa: 86 }
    ]
  }
];