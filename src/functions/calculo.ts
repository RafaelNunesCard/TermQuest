import { Personagem } from '../models/Personagem';
import { aleatorio, chance } from './chances';
import { Habilidade } from '../models/Habilidade';
import { efeitos } from '../data/Efeitos';
import { Monstro } from '../models/Monstros';
import { ehMonstro } from './funMonstros';
import { Guilda } from '../data/Ficha';
import { habilidadesEspeciais } from './habilidadesEspeciais';

function verificarPassiva(guilda: typeof Guilda) {
    const passiva = guilda.membros[0].passiva
    switch(passiva) {
        case 'atk+': 
            for(let membro of guilda.membros) {
                membro.ataque += 5;
            }
            break;
        case '%crit+':
            for(let membro of guilda.membros) {
                membro.chanceCritico += 10;
            }
            break;
        case 'def+':
            for(let membro of guilda.membros) {
                membro.defesa += 5;
            }
            break;
        case 'hp+':
            for(let membro of guilda.membros) {
                membro.hpMax += 20;
                membro.hp = membro.hpMax;
            }
            break;
        default: 
            break;
    }
}

function calcularDano(atacante: Personagem | Monstro, alvo: Personagem | Monstro): number {
    if(atacante.perderTurno) {
        console.log("Você não pode atacar por conta de um efeito")
        return 0;
    }

    if(ehMonstro(atacante) && atacante.efeito && chance(atacante.efeito.chanceAplicar)){
        alvo.efeitosAplicados.push({...atacante.efeito, duracaoAtual: atacante.efeito.duracaoMax});
        console.log(`${alvo.nome} foi afetado por ${atacante.efeito.nome}!`);
    }

    let danoBase = Math.max(1, atacante.ataque - alvo.defesa);
    danoBase *= chance(atacante.chanceCritico) ? 2 : 1; // Dano crítico

    if(aleatorio(1, 100) >= atacante.chanceAcerto) return 0; // Ataque erra

    return danoBase;
}

function calcularDanoHabilidade(atacante: Personagem | Monstro, alvo: Personagem | Monstro, habilidade: Habilidade): number {
    if(atacante.perderTurno) {
        console.log(`Você não pode usar habilidades por conta da paralisia ou outro efeito!`);
        return 0;
    }

    if(!ehMonstro(atacante) && atacante.classe === 'Pirata') {
        if(atacante.ouro < habilidade.custo) {
            console.log(`${atacante.nome} não tem ouro suficiente para usar ${habilidade.nome}.`);
            return 0;
        }

        if(aleatorio(1, 100) >= habilidade.chanceAcerto) {
            console.log(`${atacante.nome} errou o ataque com ${habilidade.nome}!`);
            return 0; // Ataque erra
        }

        atacante.ouro -= habilidade.custo;const especial = habilidadesEspeciais[habilidade.nome];
        if(especial) return especial(atacante, alvo, habilidade) || 0;
        let danoBase = Math.max(1, habilidade.dano - alvo.defesa);
        danoBase *= chance(habilidade.chanceCritico) ? 2 : 1;

        return danoBase; // Dano fixo para habilidades de pirata
    }

    const especial = habilidadesEspeciais[habilidade.nome];
    if(especial && !ehMonstro(atacante)) {
        const resultado = especial(atacante, alvo, habilidade);
        if(resultado !== null) return resultado;
    }

    if (habilidade.custo > atacante.energia) {
        console.log(`${atacante.nome} não tem energia suficiente para usar ${habilidade.nome}.`);
        return 0;
    }

    if(aleatorio(1, 100) >= habilidade.chanceAcerto) {
        console.log(`${atacante.nome} errou o ataque com ${habilidade.nome}!`);
        return 0; // Ataque erra
    }

    if (habilidade.buff) {
        console.log(`${atacante.nome} usou ${habilidade.nome} e ativou um buff! por ${habilidade.duracao} turnos.`);
        atacante.ataque += habilidade.buff.ataque || 0;
        atacante.defesa += habilidade.buff.defesa || 0;
        
        atacante.energia -= habilidade.custo; 
    }

    if (habilidade.dano < 0) {
        atacante.energia -= habilidade.custo;
        return habilidade.dano; // Cura
    }

    if(habilidade.Efeito && chance(habilidade.Efeito.chanceAplicar)){
        alvo.efeitosAplicados.push({...habilidade.Efeito, duracaoAtual: habilidade.Efeito.duracaoMax});
        console.log(`${alvo.nome} foi afetado por ${habilidade.Efeito.nome}!`);
    }
    
    atacante.energia -= habilidade.custo;
    let danoBase = Math.max(1, habilidade.dano - alvo.defesa);
    danoBase *= chance(habilidade.chanceCritico) ? 1.5 : 1; // Dano crítico

    return danoBase;
}

function seDefender(personagem: Personagem): void {
    console.log(`${personagem.nome} se defende, aumentando temporariamente sua defesa!`);
    personagem.defesa += 5; // Aumenta a defesa temporariamente, você pode ajustar esse valor
    personagem.efeitosAplicados.push(efeitos.defendendo)
}


function maiorNivel(personagens: Personagem[]): Personagem {
    return personagens.reduce((maior, atual) => atual.nivel > maior.nivel ? atual : maior);
}

function calcularXP(xpGanho: number, dificuldade: number): number {
    switch (dificuldade) {
        case 1: return xpGanho; // Fácil
        case 2: return Math.floor(xpGanho * 1.5); // Médio
        case 3: return xpGanho * 2; // Difícil
        case 4: return xpGanho * 3; // Muito Difícil
        default: return xpGanho; // Burrão
    }
}

function evoluirPersonagem(personagem: Personagem, xpGanho: number,): void {
    personagem.xp += xpGanho;
    
    while (personagem.xp >= personagem.xpNecessario) {
        personagem.xp -= personagem.xpNecessario;
        personagem.nivel++;
        personagem.xpNecessario = Math.floor(personagem.xpNecessario * 1.8); // Aumenta o XP necessário para o próximo nível
        switch (personagem.classe) {
            case 'Guerreiro':
                personagem.hpMax += 20;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 5;
                personagem.defesa += 3;
                personagem.energiaMax += 10;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Mago':
                personagem.hpMax += 10;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 7;
                personagem.defesa += 2;
                personagem.energiaMax += 20;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Arqueiro':
                personagem.hpMax += 15;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 6;
                personagem.defesa += 2;
                personagem.energiaMax += 15;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Bardo':
                personagem.hpMax += 10;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 6;
                personagem.defesa += 8;
                personagem.energiaMax += 15;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Curandeiro': 
                personagem.hpMax += 7;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 6;
                personagem.defesa += 7;
                personagem.energiaMax += 24;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Monge':
                personagem.hpMax += 15;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 8;
                personagem.defesa += 7;
                personagem.energiaMax += 10;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Pirata':
                personagem.hpMax += 10;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 7;
                personagem.defesa += 5;
                break
            case 'Paladino':
                personagem.hpMax += 20;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 8;
                personagem.defesa += 7;
                personagem.energiaMax += 10;
                personagem.energia = personagem.energiaMax;
                break;
            default:
                personagem.hpMax += 15;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 5;
                personagem.defesa += 2;
                personagem.energiaMax += 10;
                personagem.energia = personagem.energiaMax;
        }

        console.log(`${personagem.nome} evoluiu para o nível ${personagem.nivel}!\n`);
    }
}


export { calcularDano, verificarPassiva, calcularDanoHabilidade, seDefender, maiorNivel, calcularXP, evoluirPersonagem };