import { Monstro } from '../models/Monstros';
import { Personagem } from '../models/Personagem';
import { cores } from '../models/cores';

function colorirTexto(cor: string, texto: string) {
    console.log(`${cor}${texto}${cores.reset}`)
}

function barraProgresso(atual: number, total: number, tamanho: number = 10): string {

    const porcentagem = atual / total;
    const preenchido = Math.floor(porcentagem * tamanho);
    const vazio = tamanho - preenchido;

    const barra = '█'.repeat(preenchido) + '░'.repeat(vazio);
    return `[${barra}] ${Math.floor(porcentagem * 100)}%`;
}

async function status(personagens: Personagem[], monstros: Monstro[]) {
    let ouroTotal = 0;
    
    colorirTexto( cores.ciano ,"Status dos personagens:");
    personagens.forEach(p => {
        console.log(`${p.nome} - HP: ${Math.max(0,p.hp)}/${p.hpMax}, Energia: ${p.energia}/${p.energiaMax}`);
        ouroTotal += p.ouro;
    });
    colorirTexto( cores.laranja, `Ouro total da equipe: ${Math.floor(ouroTotal)}G`)
    await esperar(1000);
    console.log("-----------------------------");
    
    if (monstros.length === 0) return;
    await esperar(1000);
    
    colorirTexto( cores.vermelho ,"Status dos monstros:");
    monstros.forEach(m => {
        console.log(`${m.nome} - HP: ${m.hp}/${m.hpMax}`);
    });
    console.log("");
    await esperar(1000);
}

function fichaPersonagem(personagem: Personagem) {
    colorirTexto(cores.laranja, `======= ${personagem.classe} =======`);
    if(personagem.explicarPassiva){
        console.log(`Passiva: ${personagem.explicarPassiva}`);
    }
    console.log(`Nome: ${personagem.nome}`);
    console.log(`HP: ${personagem.hp}/${personagem.hpMax}`);
    console.log(`Energia: ${personagem.energia}/${personagem.energiaMax}`);
    console.log(`Ataque: ${personagem.ataque}`);
    console.log(`Defesa: ${personagem.defesa}`);
    colorirTexto(cores.amarelo ,`Habilidades: `);
    for(let habilidade of personagem.habilidades){
        console.log(`Nome da Habilidade: ${habilidade.nome}`);
        console.log(`Descrição: ${habilidade.descricao}`);
        colorirTexto(cores.ciano, `Custo: ${habilidade.custo}`);
    }
    console.log(`Taxa critica: ${personagem.chanceCritico}%`);
    console.log(`Taxa de acerto: ${personagem.chanceAcerto}%`);
    console.log(`Taxa de esquiva: ${personagem.chanceEsquiva}%`);
}

function fichaMonstros(monstro: Monstro) {
    console.log(`======= ${monstro.nome} =======`);
    console.log(`Descrição: ${monstro.descricao}`)
    console.log(`HP: ${monstro.hp}/${monstro.hpMax}`);
    console.log(`Energia: ${monstro.energia}/${monstro.energiaMax}`);
    console.log(`Ataque: ${monstro.ataque}`);
    console.log(`Defesa: ${monstro.defesa}`);
    console.log(`Taxa critica: ${monstro.chanceCritico}%`);
}

function esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function escreverDevagar(texto: string, ms: number = 200) {
    for (let letra of texto) {
        process.stdout.write(letra);
        await esperar(ms);
    }
    console.log();
}

export { status, fichaPersonagem, fichaMonstros, colorirTexto, barraProgresso, esperar, escreverDevagar };