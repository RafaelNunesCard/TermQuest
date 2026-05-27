import { Item } from '../models/item';

// ===== Equipamentos =====
const espadaQuebrada: Item = {
    nome: "Espada Quebrada",
    tipo: "Equipamento",
    descricao: "Aumenta 7 de dano",
    valor: 35,
    efeito: {
        ataque: 7
    }
}

const escudoQuebrado: Item = {
    nome: "Escudo Quebrado",
    tipo: "Equipamento",
    descricao: "Aumenta 6 de defesa",
    valor: 35,
    efeito: {
        defesa: 6
    }
}

const armaduraFerro: Item = {
    nome: "Armadura de Ferro",
    tipo: "Equipamento",
    descricao: "Aumenta 20 de defesa",
    valor: 90,
    efeito: {
        defesa: 20
    }
}


// ===== Poções =====
const pocaoPMana: Item = {
    nome: "Poção pequena de Mana",
    tipo: "Poção",
    descricao: "Recupera 15 de mana",
    valor: 15,
    efeito: {
        energia: 15
    }
}

const pocaoMMana: Item = {
    nome: "Poção média de Mana",
    tipo: "Poção",
    descricao: "Recupera 40 de mana",
    valor: 35,
    efeito: {
        energia: 40
    }
}

const pocaoPHp: Item = {
    nome: "Poção pequena de Vida",
    tipo: 'Poção',
    descricao: 'Recupera 12 de vida',
    valor: 20,
    efeito: {
        hp: 12
    }
}

const pocaoMHp: Item = {
    nome: "Poção média de Vida",
    tipo: 'Poção',
    descricao: 'Recupera 40 de vida',
    valor: 60,
    efeito: {
        hp: 40
    }
}

// ===== Chaves =====


const Itens = [
    espadaQuebrada,
    escudoQuebrado,
    armaduraFerro,

    pocaoPMana,
    pocaoMMana,
    pocaoPHp,
    pocaoMHp,
]

export { Itens }