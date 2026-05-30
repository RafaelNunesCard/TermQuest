import { Personagem } from '../models/Personagem';
import { aleatorio, chance } from './chances';
import { Habilidade } from '../models/Habilidade';
import { efeitos } from '../data/Efeitos';
import { Monstro } from '../models/Monstros';
import { dropMoeda, ehMonstro } from './funMonstros';
import { Guilda } from '../data/Ficha';
import { habilidadesEspeciais } from './habilidadesEspeciais';
import { escolherAcao } from './usuario';
import { colorirTexto } from './interface';
import { cores } from '../models/cores';

function verificarPassiva(guilda: typeof Guilda) {
    const passiva = guilda.membros[0].passiva
    switch(passiva) {
        case 'atk+': 
            for(let membro of guilda.membros) {
                membro.ataque += 8;
            }
            break;
        case '%crit+':
            for(let membro of guilda.membros) {
                membro.chanceCritico += 10;
            }
            break;
        case 'def+':
            for(let membro of guilda.membros) {
                membro.defesa += 8;
            }
            break;
        case 'hp+':
            for(let membro of guilda.membros) {
                membro.hpMax += 10;
                membro.hp = membro.hpMax;
            }
            break;
        default: 
            break;
    }
}

function calcularDano(atacante: Personagem | Monstro, alvo: Personagem | Monstro): number {
    if(aleatorio(1, 100) >= atacante.chanceAcerto) return 0; // Ataque erra

    if(!ehMonstro(atacante) && ehMonstro(alvo) && atacante.passiva === 'steal') {
        const roubo = Math.floor(dropMoeda(1, alvo) * 0.1);
        atacante.ouro += roubo;
        colorirTexto(cores.amarelo, `${atacante.nome} roubou ${roubo} de ${alvo.nome}!`);
    }

    if(!ehMonstro(atacante) && atacante.passiva === 'lifeSteal') {
        const rouboVida = Math.floor(atacante.ataque * 0.3);
        atacante.hp = Math.min(atacante.hp + rouboVida, atacante.hpMax);
        colorirTexto(cores.vermelho, `${atacante.nome} roubou ${rouboVida} de vida com a passiva!`);
    }

    if(ehMonstro(atacante) && atacante.efeito && chance(atacante.efeito.chanceAplicar)){
        alvo.efeitosAplicados.push({...atacante.efeito, duracaoAtual: atacante.efeito.duracaoMax});
        console.log(`${alvo.nome} foi afetado por ${atacante.efeito.nome}!`);
    }

    let danoBase = Math.max(1, atacante.ataque - alvo.defesa);
    
    return danoBase;
}

function calcularDanoHabilidade(atacante: Personagem | Monstro, alvo: Personagem | Monstro, habilidade: Habilidade): number {
    if(aleatorio(1, 100) >= habilidade.chanceAcerto) {
        colorirTexto(cores.vermelho, `${atacante.nome} errou o ataque com ${habilidade.nome}!`);
        return 0; // Ataque erra
    }
    
    if(!ehMonstro(atacante) && atacante.classe === 'Pirata') { 
        // Pirata usa ouro ao invés de energia para suas habilidades
        atacante.ouro -= habilidade.custo;
        const especial = habilidadesEspeciais[habilidade.nome];
        if(especial) return especial(atacante, alvo, habilidade) || 0;
        let danoBase = Math.max(1, habilidade.dano - alvo.defesa);

        return Math.floor(danoBase + (atacante.ataque * 0.25)); // Dano fixo para habilidades de pirata
    }

    const especial = habilidadesEspeciais[habilidade.nome];
    if(especial && !ehMonstro(atacante)) {
        const resultado = especial(atacante, alvo, habilidade);
        atacante.energia -= habilidade.custo; // Gasta energia mesmo que a habilidade seja especial
        if(resultado !== null) return resultado;
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

    return Math.floor(danoBase + (atacante.ataque * 0.25));
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
            case 'Cangaceiro':
                personagem.hpMax += 12;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 7;
                personagem.defesa += 4;
                personagem.energiaMax += 15;
                personagem.energia = personagem.energiaMax;
                break;
            case 'Vampiro':
                personagem.hpMax += 15;
                personagem.hp = personagem.hpMax;
                personagem.ataque += 8;
                personagem.defesa += 5;
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