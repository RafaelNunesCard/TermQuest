import { Item } from '../models/item';
import { efeitos } from './Efeitos';

const espadaQuebrada = {
    nome: "Espada Quebrada",
    tipo: "Equipamento",
    descricao: "Aumenta 10 de dano",
    valor: 30
}

const pocaoMana = {
    nome: "Poção de Mana",
    tipo: "Poção",
    descricao: "Recupera 15 de mana",
    valor: 15,
    efeito: {
        energia: 15
    }
}


const Itens = [
    espadaQuebrada,
    pocaoMana
]

export { Itens }