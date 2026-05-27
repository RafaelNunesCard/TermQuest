import { Personagem } from "../models/Personagem";
import { Monstro } from "../models/Monstros";
import { escreverDevagar } from "./interface";


function limparEfeitos(personagem: any){
    personagem.efeitosAplicados = [];
}

async function processarEfeitos(alvo: Personagem | Monstro) {
    if(alvo.efeitosAplicados.length === 0) return;
    console.log("");
    for(let efeito of alvo.efeitosAplicados){
        switch(efeito.tipo){
            case "Queimadura":
                await escreverDevagar(`${alvo.nome} sofreu ${efeito.valor} de dano de Queimadura!`, 50);
                alvo.hp -= efeito.valor;
                break;

            case "Veneno":
                await escreverDevagar(`${alvo.nome} sofreu ${efeito.valor} de dano de Veneno!`, 50);
                alvo.hp -= efeito.valor;
                break;

            case "Sangramento":
                await escreverDevagar(`${alvo.nome} sofreu ${efeito.valor} de dano de Sangramento!`, 50);
                alvo.hp -= efeito.valor;
                break;

            case "Escudo":
                if(efeito.duracaoAtual > 0){
                    alvo.defesa += efeito.valor;
                    break;
                }
                alvo.defesa -= efeito.valor;

                await escreverDevagar(`${alvo.nome} o ${efeito.nome} vai durar ${efeito.duracaoAtual} turnos`, 50);
                break;
            
            case "Paralisia":
                if(efeito.duracaoAtual === 2){
                    alvo.perderTurno = true;
                    break;
                }
                alvo.perderTurno = false;

                break;

            case "Cura":
                await escreverDevagar(`${alvo.nome} a cura do ${efeito.nome} recuperou ${efeito.valor}`, 50);
                alvo.hp += efeito.valor;
                break;
            
            case "Hipinose":
                console.log('Adicionar uma função ao efeito de Hipinose!');
                break;

            default:
                await escreverDevagar("Efeito não adicionado no processarEfeito", 50);
        }

        efeito.duracaoAtual--;
    }
    alvo.efeitosAplicados = alvo.efeitosAplicados.filter(e => e.duracaoAtual > 0);
}

export { processarEfeitos, limparEfeitos }