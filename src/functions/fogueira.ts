import { status , barraProgresso, escreverDevagar, esperar, colorirTexto } from './interface';
import { evoluirPersonagem } from './calculo';
import { loja } from './loja';
import { cores } from '../models/cores';
import { input } from './usuario';
import { Personagem } from '../models/Personagem';

async function fogueira( guilda: any[] ) {
    status(guilda, []);
    colorirTexto(cores.laranja, "\nVocê acendeu uma fogueira. O que deseja fazer?");
    console.log("1. Descansar (recupera HP e Energia)");
    console.log("2. Loja (5 itens que você pode comprar)");
    console.log("3. Treinar (ganha experiência)");

    console.log("-----------------------------\n");
    
    let acao = input('O que você deseja fazer na fogueira? (descansar/loja/treinar): ');

    switch (acao) {
        case 'descansar':
            console.log("O calor da fogueira te aquece, recuperando HP e Energia.");
            await esperar(1000);
            await escreverDevagar("Zzz... Zzz...");
            await descansar(guilda); // Fução de descanço
            await escreverDevagar("Todos os membros da guilda estão completamente recuperados!", 50);
            break;

        case 'loja':
            await loja(guilda);
            break;

        case 'treinar':
            console.log("Você treinou suas habilidades na fogueira, ganhando experiência.");
            treinar(guilda);
            break;

        default:
            console.log("Ação inválida. Você apenas ficou sentado ao redor da fogueira.");
    }
}

async function descansar(guilda: Personagem[]) {
    for (let personagem of guilda) {
        personagem.hp = personagem.hpMax;
        personagem.energia = personagem.energiaMax;
        personagem.efeitosAplicados = [];
        await escreverDevagar(`${personagem.nome} foi recuperado!`, 50);
        await esperar(500);
    }
}

function treinar(guilda: Personagem[]) {
    for(let personagem of guilda) {
        let experienciaGanha = (personagem.xpNecessario / 4); // Valor fixo de experiência ganha
        evoluirPersonagem(personagem, experienciaGanha);
        console.log(`${personagem.nome} ganhou ${experienciaGanha} de xp`)
        console.log(`${personagem.nome} barra XP: ${barraProgresso(personagem.xp, personagem.xpNecessario)}\n`)
    }
}

export { fogueira };