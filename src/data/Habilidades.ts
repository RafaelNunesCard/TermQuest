import {Habilidade} from '../models/Habilidade'
import { efeitos } from './Efeitos'

// -------- Habilidades Personagens ------------

// ===== Guerreiro =====
const rage: Habilidade = {
    nome: 'Rage',
    dano: 0,
    tipo: 'Físico',
    custo: 20,
    duracao: 3,
    buff: {
        ataque: 20,
        defesa: -5
    },
    descricao: 'Aumenta o ataque do personagem mas diminui a defesa por 3 turnos.',
    chanceAcerto: 100,
    chanceCritico: 20
}

const cortesRapidos: Habilidade = {
    nome: 'Cortes Rapidos',
    dano: 45,
    tipo: 'Físico',
    custo: 20,
    descricao: 'Lança 3 cortes que causão 15 de dano cada um.',
    Efeito: efeitos.sangramento,
    chanceAcerto: 90,
    chanceCritico: 20
}

const avante: Habilidade = {
    nome: 'Avante',
    dano: 0,
    tipo: 'Físico',
    custo: 60,
    duracao: 3,
    buff: {
        ataque: 35,
        defesa: 25
    },
    descricao: 'Levanta a autoestima do time assim aumentando o dano e a defesa.',
    chanceAcerto: 100,
    chanceCritico: 20
}

// ===== Mago =====
const fireball: Habilidade = {
    nome: 'Fireball',
    dano: 25,
    tipo: 'Mágico',
    custo: 35,
    descricao: 'Lança uma bola de fogo que causa 25 dano mágico ao inimigo e aplica fogo.',
    Efeito: efeitos.fogo,
    chanceAcerto: 85,
    chanceCritico: 10
}

const trovao: Habilidade = {
    nome: 'Trovão',
    dano: 30,
    tipo: 'Mágico',
    custo: 30,
    descricao: 'Lança um trovão que causa 30 de dano mágico ao inimigo e aplica raio.',
    Efeito: efeitos.eletrificado,
    chanceAcerto: 85,
    chanceCritico: 10
}

const doom: Habilidade = {
    nome: 'Doom!',
    dano: 100,
    tipo: 'Mágico',
    custo: 100,
    descricao: 'Cria um buraco negro que da 100 de dano.',
    chanceAcerto: 85,
    chanceCritico: 10
}

// ===== Arqueiro =====
const eletroArrow: Habilidade = {
    nome: 'Eletro Arrow',
    dano: 30,
    tipo: 'Físico',
    custo: 20,
    descricao: 'Dispara uma flecha eletrificada que causa dano físico e tem chance de paralisar o inimigo.',
    Efeito: efeitos.eletrificado,
    chanceAcerto: 90,
    chanceCritico: 20
}

const tirosRapidos: Habilidade = {
    nome: 'Tiros Rápidos',
    dano: 45,
    tipo: 'Físico',
    custo: 25,
    descricao: 'Lança flechas rapidamente causando dano rápido.',
    chanceAcerto: 85,
    chanceCritico: 15
}

const altaPrecisao: Habilidade = {
    nome: 'Alta precisao',
    dano: 0,
    tipo: 'Físico',
    custo: 20,
    descricao: 'Ativa o foco total do arqueiro.',
    chanceAcerto: 100,
    chanceCritico: 15
}

// ===== Bardo =====
const encanto: Habilidade = {
    nome: 'Encanto',
    dano: 10,
    tipo: 'Mágico',
    custo: 20,
    descricao: 'Encanta o inimigo que for acertado.',
    Efeito: efeitos.encanto,
    chanceAcerto: 40,
    chanceCritico: 0
}

const musica: Habilidade = {
    nome: 'Melodia',
    dano: 0,
    tipo: 'Mágico',
    custo: 20,
    buff: {
        ataque: 10,
        defesa: 8
    },
    descricao: 'A melodia é tão bela que insentiva o guerreiro afetado a lutar mais (10 atk, 8 def).',
    chanceAcerto: 100,
    chanceCritico: 0
}

const cypher: Habilidade = {
    nome: 'Cypher',
    dano: 0,
    tipo: 'Mágico',
    custo: 40,
    duracao: 5,
    buff: {
        ataque: 20,
        defesa: 15,
        taxaCritica: 20
    },
    descricao: 'Faz todos do time entrar no mesmo ritmo aumentando (20 atk, 15 def, taxa de crítico).',
    chanceAcerto: 100,
    chanceCritico: 0
}

// ===== Curandeiro =====
const cura: Habilidade = {
    nome: 'Cura',
    dano: -50,
    tipo: 'Mágico',
    custo: 30,
    Efeito: efeitos.cura,
    descricao: 'Cura o personagem em 50 pontos de vida.',
    chanceAcerto: 100,
    chanceCritico: 0
}

const limparStatus: Habilidade = {
    nome: 'Benção Pura',
    dano: -10,
    tipo: 'Mágico',
    custo: 15,
    descricao: 'Limpas os Status negativos do time.',
    chanceAcerto: 100,
    chanceCritico: 0
}

const curaTotal: Habilidade = {
    nome: 'Cura Total',
    dano: -120,
    tipo: 'Mágico',
    custo: 100,
    descricao: 'Cura totamente o time.',
    Efeito: efeitos.cura,
    chanceAcerto: 100,
    chanceCritico: 0
}

// ===== Monge =====
const meditar: Habilidade = {
    nome: 'Meditar',
    dano: -10,
    tipo: 'Mágico',
    custo: 15,
    descricao: 'Limpa status negativos e cura 10 de vida do Monge.',
    Efeito: efeitos.bolha,
    chanceAcerto: 100,
    chanceCritico: 0
}

const socoForte: Habilidade = {
    nome: 'Soco de 1 polegada',
    dano: 50,
    tipo: 'Físico',
    custo: 25,
    descricao: 'Desfere um soco muito forte e preciso no oponente causando 50 de dano.',
    chanceAcerto: 100,
    chanceCritico: 20
}

const sabedoria: Habilidade = {
    nome: 'Expansão da Sabedoria',
    dano: 10,
    tipo: 'Mágico',
    custo: 60,
    descricao: 'Os inimigos absorvem tanto conhecimento que ficam parados pensando por 1 turno junto com o Monge.',
    chanceAcerto: 100,
    chanceCritico: 0
}


// ===== Pirata =====
const ganacia: Habilidade = {
    nome: 'Ganância',
    dano: 10,
    tipo: 'Físico',
    custo: 10,
    descricao: 'Rouba o dinheiro do inimigo e ganha 15 de ouro.',
    chanceAcerto: 80,
    chanceCritico: 0
}

const canhao: Habilidade = {
    nome: 'Canhão',
    dano: 40,
    tipo: 'Físico',
    custo: 25,
    descricao: 'Dispara um tiro de canhão que causa dano físico ao inimigo.',
    Efeito: efeitos.fogo,
    chanceAcerto: 80,
    chanceCritico: 0
}

const cassino: Habilidade = {
    nome: 'Cassino',
    dano: 55,
    tipo: 'Físico',
    custo: 60,
    descricao: 'Joga um dado de 6 lados, se sair 1 ou 2 causa dano ao inimigo, se sair 3 ou 4 diminuir dano do inimigo, se sair 5 ou 6 causa dano em área.',
    chanceAcerto: 100,
    chanceCritico: 0
}

// ===== Paladino =====
const escudoSagrado: Habilidade = {
    nome: 'Escudo Sagrado',
    dano: 0,
    tipo: 'Físico',
    custo: 20,
    duracao: 5,
    buff: {
        defesa: 20
    },
    descricao: 'Cria um escudo sagrado que aumenta a defesa do personagem em 20 por 5 turnos.',
    Efeito: efeitos.bolha,
    chanceAcerto: 100,
    chanceCritico: 0
}

const investidaMilagrosa: Habilidade = {
    nome: 'Investida Milagrosa',
    dano: 40,
    tipo: 'Físico',
    custo: 30,
    descricao: 'Realiza uma investida milagrosa que causa 40 dano físico ao inimigo.',
    chanceAcerto: 90,
    chanceCritico: 20
}

const bençãoDivina: Habilidade = {
    nome: 'Benção Divina',
    dano: -20,
    tipo: 'Mágico',
    custo: 50,
    duracao: 5,
    buff: {
        ataque: 10,
        defesa: 15,
    },
    descricao: 'Concede uma bênção divina que aumenta em 20 a vida máxima do personagem por 5 turnos.',
    chanceAcerto: 100,
    chanceCritico: 0
}

const habilidades = {
    rage,
    avante,
    cortesRapidos,

    fireball,
    trovao,
    doom,

    eletroArrow,
    tirosRapidos,
    altaPrecisao,

    encanto,
    musica,
    cypher,
    
    cura,
    limparStatus,
    curaTotal,

    meditar,
    socoForte,
    sabedoria,

    ganacia,
    canhao,
    cassino,

    escudoSagrado,
    investidaMilagrosa,
    bençãoDivina
}
    
// --------- Habilidades Monstros ------------

export { habilidades }