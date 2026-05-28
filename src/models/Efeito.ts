type TiposDeEfeito = "Veneno" | "Paralisia" | "Queimadura" | "Escudo" | "Cura" | "Sangramento" | "Hipnose"

interface efeito {
    nome: string
    tipo: TiposDeEfeito
    valor: number           // Dano ou cura por turno
    chanceAplicar: number
    duracaoMax: number
    duracaoAtual: number
    descricao: string
}

export { efeito }