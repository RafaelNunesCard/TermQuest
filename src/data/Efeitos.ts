import { efeito } from '../models/Efeito'


// ===== Efeitos Agressivos =====

const fogo: efeito = {
    nome: "Fogo",
    tipo: "Queimadura",
    valor: 24,
    chanceAplicar: 60,
    duracaoMax: 4,
    duracaoAtual: 0,
    descricao: "Fogo aplica queimadura 24 de dano por 4 turnos"
}

const veneno: efeito = {
    nome: "Veneno",
    tipo: "Veneno",
    valor: 15,
    chanceAplicar: 60,
    duracaoMax: 5,
    duracaoAtual: 0,
    descricao: "Veneno dura 5 turnos e da 15 de dano"
}

const sangramento: efeito = {
    nome: "Sangramento",
    tipo: "Sangramento",
    valor: 15,
    chanceAplicar: 60,
    duracaoMax: 4,
    duracaoAtual: 0,
    descricao: "Sangramento dura 4 turnos e da 20 de dano"
}

const encanto: efeito = {
    nome: "Encanto",
    tipo: "Hipnose",
    valor: 1,
    chanceAplicar: 45,
    duracaoMax: 3,
    duracaoAtual: 0,
    descricao: "Encanto dura 3 turnos e faz o inimigo atacar outro inimigo"
}

const eletrificado: efeito = {
    nome: "Eletrificado",
    tipo: "Paralisia",
    valor: 1,
    chanceAplicar: 35,
    duracaoMax: 2,
    duracaoAtual: 0,
    descricao: "Perde 2 turnos"
}


// ===== Efeitos Passivos =====

const bolha: efeito = {
    nome: "Bolha Defensiva",
    tipo: "Escudo",
    valor: 25,
    chanceAplicar: 100,
    duracaoMax: 3,
    duracaoAtual: 0,
    descricao: "Aplica uma bolha que aumenta a defesa em 25"
}


const defendendo: efeito = {
    nome: "Defendendo",
    tipo: "Escudo",
    valor: 25,
    chanceAplicar: 100,
    duracaoMax: 1,
    duracaoAtual: 0,
    descricao: "Personagem está se defendendo"
}

const cura: efeito = {
    nome: "Cura",
    tipo: "Cura",
    valor: 15,
    chanceAplicar: 60,
    duracaoMax: 3,
    duracaoAtual: 0,
    descricao: "Cura 15 de vida por 3 turnos"
}


let efeitos = {
    fogo,
    veneno,
    eletrificado,
    sangramento,
    encanto,

    cura,
    bolha,
    defendendo,
}

export { efeitos }