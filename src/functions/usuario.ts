import * as rl from 'readline-sync';
import { cores } from '../models/cores';
import { batalha } from './batalha';
import { monstros } from '../data/FichaMonstros';
import { fogueira } from './fogueira';
import { Personagem } from '../models/Personagem';
import { Guilda , opcoesPersonagem } from '../data/Ficha';
import { salvar, carregar, listarSaves } from '../storage/save';
import { colorirTexto, escreverDevagar, status, fichaPersonagem, fichaMonstros } from './interface';

async function hub() {
    await escreverDevagar('Bem-vindo ao TermQuest!');

    colorirTexto(cores.amarelo,'============ // ============');
    console.log('1. Começar Jogo!');
    console.log('2. Jogos salvos');
    console.log('3. Ver Personagens');
    console.log('4. Ver Monstros');
    console.log('5. Encerrar seção');
    const opcao = input('Selecione uma opção: ');

    switch(opcao) {
        case '1':   
            construirGuilda();
            await começar();
            return await hub();

        case '2':
            await savesList();
            return await hub();

        case '3':
            listarPersonagens();
            return await hub();

        case '4':
            listarMonstros();
            return await hub();

        case '5':
            console.log(`Obrigado por jogar!`);
            break;

        default:
            console.log('Digitou a opção errada!');
            return hub();
    }
}

async function começar(difSalva?: number, andarSalvo?: number){
    let dificuldade = difSalva || escolherDificuldade();
    let continuar = true;
    let andar = andarSalvo || 1;
    let ganhou: boolean;

    while (continuar) {
        if(andar === 1) console.log("Começando nosso jogo!");

        colorirTexto(cores.vermelho,`---- Andar ${andar} ----\n`);

        ganhou = await batalha(Guilda.nome, Guilda.membros, monstros, dificuldade, andar);
        if(!ganhou) return await escreverDevagar(`A ${Guilda.nome} foi derrotada no andar ${andar}!`);

        let resposta = input('Deseja continuar na masmorra? (s/n): ');
        if(resposta === 'n') {
            continuar = false;
            status(Guilda.membros, []);
            console.log(`Você derrotou muitos monstros nessa jornada`);
            break;
        }

        andar++;
        dificuldade += 5; // Aumenta a dificuldade a cada andar

        resposta = input('Deseja salvar a sua aventura? (s/n): ')
        if(resposta === 's') salvar(Guilda.nome, andar,dificuldade,Guilda.membros);

        console.log('\n-----------------------------------\n');

        console.log(`No meio da masmorra você encontra um lugar onde você pode descansar`)
        resposta = input("Deseja descansar? (s/n):")

        if(resposta === 's') await fogueira(Guilda.membros);
    }
}


function construirGuilda() {
    console.log('Antes de começar, você quer criar sua própria guilda ou jogar com uma pronta?\n');
    console.log('1. Criar minha guilda');
    console.log('2. Jogar com uma guilda pronta');
    console.log('3. Guilda aleatoria');

    const resposta = input('Sua escolha: ');
    switch(resposta) {
        case '1':
            const nomeGuilda = input('Digite o nome da Guilda: ');
            Guilda.nome = nomeGuilda;

            console.log('Agora selecione 3 heróis para a Guilda!');
            
            const indicesEscolhidos: number[] = [];

            for(let i = 0; i < Guilda.membros.length; i++) {
                const disponiveis = opcoesPersonagem.filter((_, index) => !indicesEscolhidos.includes(index));
                
                listarArray(disponiveis, (p, i) => `${i + 1}. ${p.classe}`);
                
                const escolha = parseInt(input(`Digite o ${i + 1}° herói: `)) - 1;
                const indexOriginal = opcoesPersonagem.indexOf(disponiveis[escolha]);
                
                indicesEscolhidos.push(indexOriginal);
                Guilda.membros[i] = disponiveis[escolha];
            }
            break;

        case '2':
            console.log('Essa opção é um time recomendado pelo criador\n');
            console.log('Boa sorte e bom jogo! (^-^)');
            break;

        case '3':
            const embaralhado = [...opcoesPersonagem].sort(() => Math.random() - 0.5);
            for(let i = 0; i < Guilda.membros.length; i++) {
                Guilda.membros[i] = embaralhado[i];
                console.log(`${i + 1}. ${Guilda.membros[i].classe}`);
            }
            console.log('Sua guilda foi gerada!');
            break;

        default:
            console.log('Digitou a opção errada!');
            construirGuilda();
    }
}

function listarPersonagens() {
    let continuar = true;
    let index = 0;
    colorirTexto(cores.laranja, 'Ficha de personagens');
    while(continuar) {
        fichaPersonagem(opcoesPersonagem[index]);
        colorirTexto(cores.laranja, `------------------------- (${index+1}/${opcoesPersonagem.length}) -------------------------`);
        console.log('1. Proxima');
        console.log('2. Voltar');
        console.log('3. Sair');

        const escolha = input('Selecione uma ação: ')
        switch(escolha) {
            case '1':
                if(index === opcoesPersonagem.length - 1)return console.log('Você já está na ultima página'); 
                index++;
                break;

            case '2':
                if(index === 0)return console.log('Você já está na primeira pagina página');
                index--;
                break;

            case '3':
                return;

            default:
                console.log('Digitou errado!');
        }
    }
}

function listarMonstros() {
    let continuar = true;
    let index = 0;
    colorirTexto(cores.laranja, 'Ficha dos Monstros')
    while(continuar) {
        fichaMonstros(monstros[index]);
        colorirTexto(cores.laranja, `------------------------- (${index+1}/${monstros.length}) -------------------------`);
        console.log('1. Proxima');
        console.log('2. Voltar');
        console.log('3. Sair');

        const escolha = input('Selecione uma ação: ')
        switch(escolha) {
            case '1':
                if(index === monstros.length - 1)return console.log('Você já está na ultima página'); 
                index++;
                break;

            case '2':
                if(index === 0)return console.log('Você já está na primeira pagina');
                index--;
                break;

            case '3':
                return;

            default:
                console.log('Digitou errado!');
        }
    }
}

async function savesList() {
    const saves = listarSaves() as any[];
    if (saves.length === 0) return colorirTexto(cores.vermelho,'Nenhum save encontrado.');
    colorirTexto(cores.verdeLimao, 'Saves disponiveis :')

    listarArray(saves, (s, i) => `${i + 1}. ${s.nome_guilda} - Andar ${s.andar}`);
    const escolha = parseInt(input('Qual save deseja carregar? : ')) - 1;

    if (escolha < 0 || escolha >= saves.length) {
        console.log('Escolha inválida!');
        return savesList();
    }

    const save = carregar(saves[escolha].nome_guilda);

    Guilda.nome = save.nome_guilda;
    Guilda.membros = JSON.parse(save.membros);
    let dificuldade = save.dificuldade;
    let andar = save.andar;
    console.log(`Save da ${Guilda.nome} carregado!`);
    return await começar( dificuldade, andar );
}

function escolherDificuldade(): number {
    colorirTexto(cores.amarelo,'Escolha a dificuldade da batalha:');
    console.log('1. Fácil');
    console.log('2. Médio');
    console.log('3. Difícil');
    console.log('4. Muito Difícil');

    const escolha = input('Qual dificuldade deseja enfrentar? : ');
    switch (escolha) {
        case '1':
            return 1;
        case '2':
            return 5;
        case '3':
            return 10;
        case '4':
            return 20;
        default:
            console.log('Escolha inválida, tente novamente.');
            return escolherDificuldade();
    }
}

function escolhaPersonagem(guilda: any[], texto: string) : number {
    console.log(texto);
    listarArray(guilda, (p,i) => `${i+1}. ${p.nome} `);
    let escolha = input("Selecione o personagem : ");
    const indice = parseInt(escolha) - 1;
    return indice;
}

function escolherAcao(personagem: Personagem): any {
    colorirTexto(cores.amarelo,`Escolha a ação para o ${ personagem.nome }: ${cores.reset}`);
    console.log('1. Atacar');
    console.log('2. Usar Habilidade');
    console.log('3. Defender');
    console.log('4. Usar Item')
    console.log('5. Fugir');

    const escolha = input('O que vc quer fazer? : ');
    console.log("");
    switch (escolha) {
        case '1':
            return 'atacar';
        case '2':
            return 'habilidade';
        case '3':
            return 'defender';
        case '4':
            return 'item';
        case '5':
            return 'fugir';
        default:
            console.log('Escolha inválida, tente novamente.');
            return escolherAcao(personagem);
    }
}

function escolherAlvo(personagem: any, alvos: any[]): any {
    colorirTexto(cores.amarelo ,'Escolha um alvo:');
    listarArray(alvos, (alvo, index) => `${index + 1}. ${alvo.nome} (HP: ${alvo.hp}/${alvo.hpMax})`);

    console.log("-----------------------------");

    const escolha = input('Qual alvo deseja atacar? : ');
    const indice = parseInt(escolha) - 1;

    if (indice >= 0 && indice < alvos.length) {
        return alvos[indice];
    } else {
        console.log('Escolha inválida, tente novamente.');
        return escolherAlvo(personagem, alvos);
    }
}

function escolherHabilidade(personagem: Personagem): any {
    if (!personagem.habilidades || personagem.habilidades.length === 0) {
        console.log('Nenhuma habilidade disponível.');
        return null;
    }

    colorirTexto(cores.amarelo ,'Escolha uma habilidade:');
    listarArray(personagem.habilidades, (p, i) => `${i + 1}. ${p.nome} (Custo: ${p.custo} energia)`);

    console.log("-----------------------------");
    
    const escolha = input('Qual habilidade deseja usar? : ');
    const indice = parseInt(escolha) - 1;

    if (indice >= 0 && indice < personagem.habilidades.length) {
        return personagem.habilidades[indice];
    } else {
        console.log('Escolha inválida, tente novamente.');
        return escolherHabilidade(personagem);
    }
}

function consumirItem(personagem: Personagem) {
    if(personagem.inventario?.length === 0 || personagem.inventario == undefined){
        colorirTexto(cores.vermelho, `${personagem.nome} não tem item disponivel`)
        console.log(`${personagem.nome} perdeu a vez`)
        return;
    }
    listarArray(personagem.inventario, (i,index)=> `${index + 1}. ${i.nome} (${i.descricao})`);

    let escolha = input('Qual item você vai usar : ');
    let indice = parseInt(escolha) - 1;

    if (indice >= 0 && indice < personagem.inventario.length) {
        return personagem.inventario[indice];
    } else {
        console.log('Escolha inválida, tente novamente.');
        return consumirItem(personagem);
    }
}

function input(texto: string) : string {
    return rl.question(texto);
}

function listarArray(array: any[], formato: (item: any, index: number) => string) {
    array.forEach((item, i) => {
        console.log(formato(item, i));
    });
}

export { hub, listarArray, escolhaPersonagem, consumirItem, input, escolherDificuldade, escolherAcao, escolherAlvo, escolherHabilidade };