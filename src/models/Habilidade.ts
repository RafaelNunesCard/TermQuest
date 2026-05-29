import { efeito } from "./Efeito"

interface Habilidade {
    nome: string
    dano: number
    tipo: 'Físico' | 'Mágico'
    custo: number
    duracao?: number
    buff?: {
        ataque?: number
        defesa?: number
        velocidade?: number
        taxaCritica?: number
    }
    Efeito?: efeito
    descricao: string
    chanceAcerto: number
    chanceCritico: number
}

export { Habilidade };