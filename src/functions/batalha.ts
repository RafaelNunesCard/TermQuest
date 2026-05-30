import { Personagem } from '../models/Personagem';
import { Monstro } from '../models/Monstros';
import { Guilda } from '../data/Ficha';
import { escolherMonstro, dropMoeda } from './funMonstros';
import { calcularDano, calcularXP, evoluirPersonagem, calcularDanoHabilidade, seDefender, maiorNivel } from './calculo';
import { consumirItem, escolhaPersonagem, escolherAcao, escolherAlvo, escolherHabilidade } from './usuario';
import { status, colorirTexto, barraProgresso, esperar } from './interface';
import { limparEfeitos, processarEfeitos } from './processarEfeitos';
import { cores } from '../models/cores';
import { chance } from './chances';

async function batalha(guilda: string, grupo: Personagem[], monstros: Monstro[], nivelDificuldade: number, andar: number) {
    let nivelBase = maiorNivel(grupo).nivel;
    let dificuldade = Math.floor(nivelBase * 1.5) + nivelDificuldade + andar;

    console.log(`A ${guilda} entrou em uma batalha contra monstros de dificuldade ${dificuldade}.`)
    await esperar(1000);
    
    let monstro1 = escolherMonstro(dificuldade, monstros);
    let monstro2 = escolherMonstro(dificuldade, monstros);
    let monstro3 = escolherMonstro(dificuldade, monstros);

    let grupoMonstros = [monstro1, monstro2, monstro3].filter(m => m !== null) as Monstro[];

    if (grupoMonstros.length === 0) {
        console.log("Nenhum monstro encontrado para essa dificuldade.");
        return true;
    }

    const tetoPorNivel: Record<number, number> = {
        1:  1.5,  // Slime no máximo 1.5x
        5:  2.0,  // Goblin no máximo 2x
        20: 2.5,  // Orc no máximo 2.5x
        40: 3.0,  // Troll no máximo 3x
    }

    for (let monstro of grupoMonstros) {
        let teto = tetoPorNivel[monstro.nivel] ?? 2.0;
        let escala = Math.min(1 + (andar * 0.05), teto);
        
        monstro.hp = Math.floor(monstro.hp * escala);
        monstro.hpMax = monstro.hp;
        monstro.ataque = Math.floor(monstro.ataque * escala);
        monstro.defesa = Math.floor(monstro.defesa * escala);

        await esperar(600);
        limparEfeitos(monstro);
        console.log(`Um ${monstro.nome} foi encontrado na dungeon.`);
    }

    let turno = 1;

    while (grupo.length > 0 && grupoMonstros.length > 0) {
        await esperar(1000);
        colorirTexto(cores.laranja ,`\n---- Turno ${turno} ----\n`);
        grupoMonstros = grupoMonstros.filter(m => m.hp > 0); // Remove os monstros derrotados
        grupo = grupo.filter(p => p.hp > 0); // Remove personagens derrotados
        await status(grupo, grupoMonstros);
        
        // Grupo ataca o monstro
        for (let personagem of grupo) {
            if(grupoMonstros.length === 0) break;
            let resposta = 'atacar';
            if(personagem.perderTurno) console.log(`${personagem.nome} perdeu o turno por causa da paralisia!`);

            let monstroAlvo = escolherAlvo(personagem, grupoMonstros);
            if(personagem.classe !== 'Sumon') resposta = escolherAcao(personagem);
            await fazerAcao(resposta, personagem, monstroAlvo);

            if (monstroAlvo.hp <= 0) {
                console.log(`${personagem.nome} derrotou o ${monstroAlvo.nome}!`);
                let ouroGanho = dropMoeda(dificuldade, monstroAlvo);
                personagem.ouro += ouroGanho;
                colorirTexto(cores.laranja, `${personagem.nome} ganhou ${Math.floor(ouroGanho)} ouro!`);
                if(Guilda.membros[0].passiva === '2gold') {
                    personagem.ouro += Math.floor(ouroGanho * 0.5);
                    colorirTexto(cores.laranja, `Passiva da guilda ativa! ${personagem.nome} ganhou mais ${Math.floor(ouroGanho * 0.5)} ouro!`);
                }
                
                let xpGanho = (calcularXP(monstroAlvo.xp, nivelDificuldade) - monstroAlvo.hp) / grupo.length; // Divide o XP ganho entre os membros do grupo
                if(Guilda.membros[0].passiva === '2xp') xpGanho *= 2;
                for (let p of grupo) {
                    console.log(`${p.nome} ganhou ${Math.floor(xpGanho)} de XP.`);
                    evoluirPersonagem(p, xpGanho); 
                    colorirTexto(cores.verde ,`${p.nome} barra de XP: ${barraProgresso(p.xp, p.xpNecessario, 10)}\n`);
                }
                grupoMonstros = grupoMonstros.filter(m => m.hp > 0); // Remove os monstros derrotados
                continue;
            }
            await esperar(1000);
        }

        for (let personagem of grupo) await processarEfeitos(personagem);
        grupoMonstros = grupoMonstros.filter(m => m.hp > 0);
        grupo = grupo.filter(p => p.hp > 0); // Remove personagens
        
        // Monstro ataca de volta
        console.log("-----------------------------");
        colorirTexto(cores.amarelo ,"\nOs monstros contra-atacam!\n");
        for (let monstro of grupoMonstros) {
            if(grupo.length === 0 ) break;

            let personagemAlvo = grupo[Math.floor(Math.random() * grupo.length)];
            let dano = calcularDano(monstro, personagemAlvo);
            
            if (dano === 0) {
                console.log(`${monstro.nome} errou o ataque!`);
            } else {
                personagemAlvo.hp -= dano;
                console.log(`${monstro.nome} causou ${dano} de dano no ${personagemAlvo.nome}.`);
            }

            if (personagemAlvo.hp <= 0) {
                console.log(`${monstro.nome} derrotou o ${personagemAlvo.nome}!`);
            }
            await esperar(500);
            grupo = grupo.filter(p => p.hp > 0); // Remove personagens
        }

        for (let monstro of grupoMonstros) await processarEfeitos(monstro);

        turno++;
    }
    console.log("");
    if(grupo.length === 0){
        console.log(`A guilda ${guilda} foi derrotada...`)
        return false;
    }
    Guilda.membros = Guilda.membros.filter(p => p.classe !== 'Sumon'); // Se sobrou algum sumon, tira ele do grupo para não aparecer na próxima batalha
    console.log(`A ${guilda} venceu a batalha!`);
    return true;
}

async function fazerAcao(resposta: string, personagem: Personagem, monstro: Monstro): Promise<void> {
    let dano;
    let critico;
    switch (resposta) {
        case 'atacar':
            console.log('Você escolheu atacar!\n');
            dano = calcularDano(personagem, monstro);
            if (dano === 0) {
                console.log(`${personagem.nome} errou o ataque!`);
            }
            critico = chance(personagem.chanceCritico) ? 1.5 : 1;
            monstro.hp -= dano * critico;
            console.log(`${personagem.nome} causou ${dano} ${critico === 1.5 ? '☆crítico' : ''} de dano no ${monstro.nome}.`);
            console.log("");
            await esperar(1000);
            break;

        case 'habilidade':
            console.log('Você escolheu usar uma habilidade!\n');
            let habilidade = escolherHabilidade(personagem);
            if(habilidade.custo > personagem.energia && personagem.classe !== 'Pirata') { // Falta de energia
                console.log(`${personagem.nome} não tem energia suficiente para usar ${habilidade.nome}.`);
                const novaAcao = escolherAcao(personagem);
                await fazerAcao(novaAcao, personagem, monstro);
                return;
            }

            if(personagem.ouro < habilidade.custo && personagem.classe === 'Pirata') { // Falta de ouro para pirata
                console.log(`${personagem.nome} não tem ouro suficiente para usar ${habilidade.nome}.`);
                const novaAcao = escolherAcao(personagem);
                await fazerAcao(novaAcao, personagem, monstro);
                return;
            }

            dano = calcularDanoHabilidade(personagem, monstro, habilidade);
            if(dano === 0) break; // Habilidades que não dão dano, como buffs ou cura, não mostram a mensagem de erro ou de acerto
            if(dano < 0) {
                console.log(`${personagem.nome} escolheu curar`);
                let aliado = Guilda.membros[escolhaPersonagem(Guilda.membros, 'Escolha um personagem para curar')]; 
                
                aliado.hp = Math.min(aliado.hpMax, aliado.hp - dano); // Dano negativo cura
                colorirTexto(cores.verdeLimao, `${aliado.nome} foi curado! (HP - ${aliado.hp}/${aliado.hpMax})`)
                return;
            }
            critico = chance(habilidade.chanceCritico) ? 1.5 : 1;
            monstro.hp -= dano * critico;
            console.log(`${personagem.nome} causou ${dano} ${critico === 1.5 ? '☆crítico' : ''} de dano no ${monstro.nome}.`);
            console.log("");
            await esperar(500);
            break;

        case 'defender':
            console.log('Você escolheu defender!\n');
            seDefender(personagem);
            console.log("");
            break;
        case 'item':
            let novaAcao: string;
            let item = consumirItem(personagem)
            switch(item?.tipo){
                case 'Poção':
                    let pocaoEnergia = item.efeito.energia || 0;
                    let pocaoHp = item.efeito.hp || 0;
                    personagem.energia = Math.min(personagem.energia + pocaoEnergia,personagem.energiaMax);
                    personagem.hp = Math.min(personagem.hp + pocaoHp, personagem.hpMax);
                    console.log(`${item.nome} foi usado`);
                    novaAcao = escolherAcao(personagem);
                    await fazerAcao(novaAcao, personagem, monstro);
                    break;

                case 'Equipamento':
                    personagem.ataque += item.efeito.ataque || 0;
                    personagem.defesa += item.efeito.defesa || 0;
                    console.log(`${item.nome} foi usado`);
                    novaAcao = escolherAcao(personagem);
                    await fazerAcao(novaAcao, personagem, monstro);

                    break;

                case 'Chave':
                    console.log("Não pode ser usada em batalha");
                    novaAcao = escolherAcao(personagem);
                    await fazerAcao(novaAcao, personagem, monstro);

                    break;

                default:
                    console.log("Você não adicionou o tipo no case 'item'");
                    novaAcao = escolherAcao(personagem);
                    await fazerAcao(novaAcao, personagem, monstro);
            }

            break;

        case 'fugir':
            console.log('Você escolheu fugir!\n');
            console.log('Fugir não é implementado ainda, mas em breve será possível escapar de batalhas difíceis!');
            console.log("");
            await esperar(1000);
            break;

        default:
            console.log('Não sei como vc chegou aqui, mas algo deu errado na escolha da ação.');
    } 
}

export { batalha };