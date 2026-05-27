import { efeito } from "./Efeito";
import { Habilidade } from "./Habilidade";

interface Monstro {
    nome: string
    nivel: number
    xp: number
    dropMoeda: {
        min: number
        max: number
    }
    hp: number
    hpMax: number
    ataque: number
    efeito?: efeito
    defesa: number
    energia: number
    energiaMax: number
    habilidades?: Habilidade[]
    efeitosAplicados: efeito[]
    perderTurno?: boolean
    descricao: string
    chanceAcerto: number
    chanceEsquiva: number
    chanceCritico: number
}

export { Monstro };