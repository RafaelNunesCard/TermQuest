interface Item {
    nome: string
    tipo: 'Poção' | 'Equipamento' | 'Chave'
    descricao: string
    valor: number // preço na loja
    efeito: {
        hp?: number
        energia?: number
        ataque?: number
        defesa?: number
    }
}

export { Item }