import {Monstro} from '../models/Monstros';
import {habilidades} from './Habilidades';
import { efeitos } from './Efeitos';
import { cores } from '../models/cores';

const monstroBase = {
  chanceAcerto: 95,
  chanceEsquiva: 5,
  efeitosAplicados: [],
  perderTurno: false
}

const slime: Monstro = {
    ...monstroBase,
    nome: `${cores.verdeLimao}Slime${cores.reset}`,
    nivel: 1,
    xp: 15,
    dropMoeda: {
        min: 1,
        max: 4
    },
    hp: 70,
    hpMax: 70,
    ataque: 20,
    defesa: 6,
    energia: 20,
    energiaMax: 20,
    habilidades: [
        
    ],
    descricao: 'Um monstro gelatinoso e fraco, mas em grande número pode ser perigoso.',
    chanceCritico: 10
}

const reiSlime: Monstro = {
    ...monstroBase,
    nome: `${cores.verdeLimao}★ Rei Slime ★${cores.reset}`,
    nivel: 8,
    xp: 100,
    dropMoeda: {
        min: 10,
        max: 20
    },
    hp: 170,
    hpMax: 170,
    ataque: 30,
    defesa: 8,
    energia: 30,
    energiaMax: 30,
    habilidades: [
        
    ],
    descricao: 'O líder dos slimes, mais forte e resistente que os outros.',
    chanceCritico: 20
}

const cobra: Monstro = {
    ...monstroBase,
    nome: `${cores.roxo}Cobra${cores.reset}`,
    nivel: 2,
    xp: 20,
    dropMoeda: {
        min: 1,
        max: 6
    },
    hp: 60,
    hpMax: 60,
    ataque: 15,
    efeito: efeitos.veneno,
    defesa: 4,
    energia: 20,
    energiaMax: 20,
    habilidades: [
       
    ],
    descricao: "Parece ser fraca mas é bem perigosa pelo seu veneno",
    chanceCritico: 40
}

const fada: Monstro = {
    ...monstroBase,
    nome: `${cores.magenta}Fada${cores.reset}`,
    nivel: 2,
    xp: 20,
    dropMoeda: {
        min: 1,
        max: 6
    },
    hp: 60,
    hpMax: 60,
    ataque: 10,
    efeito: efeitos.eletrificado,
    defesa: 4,
    energia: 20,
    energiaMax: 20,
    habilidades: [
       
    ],
    descricao: "Parece ser fraca mas é bem perigosa pelo seu sono",
    chanceCritico: 20
}

const rainhaFada: Monstro = {
    ...monstroBase,
    nome: `${cores.magenta}★ Rainha das Fadas ★${cores.reset}`,
    nivel: 10,
    xp: 20,
    dropMoeda: {
        min: 12,
        max: 22
    },
    hp: 250,
    hpMax: 250,
    ataque: 35,
    efeito: efeitos.eletrificado,
    defesa: 14,
    energia: 20,
    energiaMax: 20,
    habilidades: [
       
    ],
    descricao: "Parece ser fraca mas é bem perigosa pelo seu sono",
    chanceCritico: 50
}

const esqueleto: Monstro = {
    ...monstroBase,
    nome: `${cores.cinza}Esqueleto${cores.reset}`,
    nivel: 3,
    xp: 45,
    dropMoeda: {
        min: 3,
        max: 9
    },
    hp: 70,
    hpMax: 70,
    ataque: 30,
    defesa: 8,
    energia: 25,
    energiaMax: 25,
    habilidades: [
        
    ],
    descricao: 'Um monstro esquelético que ataca com armas e é mais resistente que o slime.',
    chanceCritico: 20
}

const magoRuinas: Monstro = {
    ...monstroBase,
    nome: `${cores.azul}Mago das Ruinas${cores.reset}`,
    nivel: 10,
    xp: 85,
    dropMoeda: {
        min: 6,
        max: 14
    },
    hp: 100,
    hpMax: 100,
    ataque: 45,
    efeito: efeitos.fogo,
    defesa: 10,
    energia: 60,
    energiaMax: 60,
    habilidades: [
        
    ],
    descricao: 'Um estudioso que mergulhou fundo nos segredos proibidos das ruínas antigas. O conhecimento o corrompeu, e agora ele defende os segredos que o destruíram.',
    chanceCritico: 10
}

const goblin: Monstro = {
    ...monstroBase,
    nome: `${cores.verde}Goblin${cores.reset}`,
    nivel: 5,
    xp: 65,
    dropMoeda: {
        min: 6,
        max: 14
    },
    hp: 85,
    hpMax: 85,
    ataque: 25,
    defesa: 10,
    energia: 30,
    energiaMax: 30,
    habilidades: [
        
    ],
    descricao: 'Um pequeno monstro verde que ataca em grupo.',
    chanceCritico: 10
}

const reiGoblin: Monstro = {
    ...monstroBase,
    nome: `${cores.verde}★ Rei Goblin ★${cores.reset}`,
    nivel: 15,
    xp: 125,
    dropMoeda: {
        min: 16,
        max: 32
    },
    hp: 200,
    hpMax: 200,
    ataque: 50,
    defesa: 15,
    energia: 35,
    energiaMax: 35,
    habilidades: [
        
    ],
    descricao: 'O líder dos goblins, mais forte e inteligente que os outros.',
    chanceCritico: 25
}

const lich: Monstro = {
    ...monstroBase,
    nome: `${cores.cinza}★ Lich ★${cores.reset}`,
    nivel: 20,
    xp: 150,
    dropMoeda: {
        min: 16,
        max: 33
    },
    hp: 200,
    hpMax: 200,
    ataque: 45,
    defesa: 20,
    energia: 35,
    energiaMax: 35,
    habilidades: [
        
    ],
    descricao: 'Um poderoso feiticeiro que trocou sua alma pela imortalidade. Comanda exércitos de mortos-vivos e guarda segredos que a humanidade nunca deveria conhecer.',
    chanceCritico: 30
}

const mimico: Monstro = {
    ...monstroBase,
    nome: `${cores.amarelo}Mimico${cores.reset}`,
    nivel: 20,
    xp: 125,
    dropMoeda: {
        min: 15,
        max: 30
    },
    hp: 210,
    hpMax: 210,
    ataque: 45,
    defesa: 20,
    energia: 35,
    energiaMax: 35,
    habilidades: [
        
    ],
    descricao: 'Criaturas sinistras que imitam objetos inanimados para atrair e devorar suas presas desavisadas.',
    chanceCritico: 30
}

const orc: Monstro = {
    ...monstroBase,
    nome: `${cores.vermelho}Orc${cores.reset}`,
    nivel: 20,
    xp: 200,
    dropMoeda: {
        min: 40,
        max: 50
    },
    hp: 240,
    hpMax: 240,
    ataque: 60,
    defesa: 18,
    energia: 40,
    energiaMax: 40,
    habilidades: [
        
    ],
    descricao: 'Um monstro grande e forte, conhecido por sua agressividade.',
    chanceCritico: 15
}

const troll: Monstro = {
    ...monstroBase,
    nome: `${cores.verde}Troll${cores.reset}`,
    nivel: 40,
    xp: 450,
    dropMoeda: {
        min: 60,
        max: 85
    },
    hp: 400,
    hpMax: 400,
    ataque: 100,
    defesa: 20,
    energia: 50,
    energiaMax: 50,
    habilidades: [
        
    ],
    descricao: 'Um monstro enorme e resistente, capaz de regenerar suas feridas.',
    chanceCritico: 20
}

const dragao: Monstro = {
    ...monstroBase,
    nome: `${cores.vermelho}★ Dragão ★${cores.reset}`,
    nivel: 100,
    xp: 1250,
    dropMoeda: {
        min: 1000,
        max: 1001
    },
    hp: 1000,
    hpMax: 1000,
    ataque: 200,
    efeito: efeitos.fogo,
    defesa: 50,
    energia: 100,
    energiaMax: 100,
    habilidades: [
        
    ],
    descricao: 'O monstro mais poderoso, capaz de destruir tudo em seu caminho.',
    chanceCritico: 25
}

const monstros: Monstro[] = [
    slime,
    reiSlime,
    cobra,
    fada,
    rainhaFada,
    esqueleto,
    lich,
    goblin,
    reiGoblin,
    magoRuinas,
    mimico,
    orc,
    troll,
    dragao
]

export { monstros }