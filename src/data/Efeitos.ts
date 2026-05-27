import { efeito } from '../models/Efeito'

const cura: efeito = {
    nome: "Cura",
    tipo: "Cura",
    valor: 15,
    chanceAplicar: 60,
    duracaoMax: 3,
    duracaoAtual: 0,
    descricao: "Cura 15 de vida por 3 turnos"
}

const fogo: efeito = {
    nome: "Fogo",
    tipo: "Queimadura",
    valor: 25,
    chanceAplicar: 60,
    duracaoMax: 4,
    duracaoAtual: 0,
    descricao: "Fogo aplica queimadura 24 de dano por 4 turnos"
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

const veneno: efeito = {
    nome: "Veneno",
    tipo: "Veneno",
    valor: 15,
    chanceAplicar: 60,
    duracaoMax: 5,
    duracaoAtual: 0,
    descricao: "Veneno dura 5 turnos e da 15 de dano"
}

const eletrificado: efeito = {
    nome: "Eletrificado",
    tipo: "Paralisia",
    valor: 1,
    chanceAplicar: 40,
    duracaoMax: 2,
    duracaoAtual: 0,
    descricao: "Perde 2 turnos"
}

const bolha: efeito = {
    nome: "Bolha Defenciva",
    tipo: "Escudo",
    valor: 25,
    chanceAplicar: 100,
    duracaoMax: 3,
    duracaoAtual: 0,
    descricao: "Aplica uma bolha que aumenta a defesa em 25"
}

let efeitos = [
    cura,
    fogo,
    veneno,
    eletrificado,
    bolha,
    defendendo,
]

export { efeitos }