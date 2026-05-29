import { Habilidade } from "./Habilidade";
import { efeito } from "./Efeito"
import { Item } from "./item";

type Classe = 'Guerreiro' | 'Mago' | 'Arqueiro' | 'Bardo' | 'Curandeiro' | 'Monge' | 'Pirata' | 'Paladino' | 'Cangaceiro'
type Passiva = '2xp' | 'def+' | 'atk+' | 'hp+' | '2gold' | '%crit+' | 'steal'

interface Personagem {
    nome: string
    classe: Classe
    passiva?: Passiva
    explicarPassiva?: string
    nivel: number
    xp: number
    xpNecessario: number
    hp: number
    hpMax: number
    ataque: number
    defesa: number
    energia: number
    energiaMax: number
    inventario: Item[]
    ouro: number
    habilidades: Habilidade[]
    efeitosAplicados: efeito[]
    perderTurno?: boolean
    chanceAcerto: number
    chanceEsquiva: number
    chanceCritico: number
}

export { Personagem };