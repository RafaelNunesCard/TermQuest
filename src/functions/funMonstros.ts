import { Monstro } from '../models/Monstros';
import { aleatorio } from './chances';
import { Personagem } from '../models/Personagem';

function ehMonstro(atacante: Personagem | Monstro): atacante is Monstro {
    return 'efeito' in atacante;
}

function escolherMonstro(dificuldade: number, monstros: any[]): Monstro | null {
    let monstrosDisponiveis = monstros.filter(m => m.nivel <= dificuldade);

    let monstroEscolhido = monstrosDisponiveis[aleatorio(0, monstrosDisponiveis.length - 1)];
    
    return { ...monstroEscolhido };
}

function dropMoeda(dificuldade: number , monstro: Monstro) : number {
    let moeda = aleatorio(monstro.dropMoeda.min, monstro.dropMoeda.max);

    if(dificuldade < 10) return moeda

    if(dificuldade < 40) return moeda * 1.25

    if(dificuldade < 100) return moeda * 1.5

    return moeda * 2;
}

export { escolherMonstro, dropMoeda, ehMonstro };