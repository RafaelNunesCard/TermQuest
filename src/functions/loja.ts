import { cores } from "../models/cores";
import { colorirTexto, escreverDevagar } from "./interface";
import { Itens } from "../data/Itens";
import { Item } from "../models/item";
import { aleatorio } from "./chances";
import { input, listarArray, escolhaPersonagem } from "./usuario";

async function loja(membros: any[]) {
    let continuarCompra = true
    let ouroTotal = 0;    

    let item1 = itemAleatorio(Itens);
    let item2 = itemAleatorio(Itens);
    let item3 = itemAleatorio(Itens);
    let item4 = itemAleatorio(Itens);
    let item5 = itemAleatorio(Itens);

    let loja = [
        item1,
        item2,
        item3,
        item4,
        item5
    ]

    await escreverDevagar("Você viu uma pequena loja de um Rato!\n", 100);
    while(continuarCompra) {
        ouroTotal = 0;
        membros.forEach(p => { ouroTotal += p.ouro });
        
        colorirTexto(cores.amarelo, "Produtos da Loja: ");
        colorirTexto(cores.laranja, `Seu grupo tem ${ouroTotal}G`);
        listarArray(loja, (p,i) => `${i+1}. ${p.nome} (${p.valor}G)`);

        let itemEscolhido = loja[escolhaItem()];
        if(itemEscolhido.valor > ouroTotal) return console.log("Você não consegue comprar esse item!");
        if(itemEscolhido.nome === "Vendido") return console.log("Esse item já foi vendido ;~;");
        
        const texto = "Escolha um dos seus personagens que vai ganhar o item:"
        membros[escolhaPersonagem(membros, texto)].inventario.push(copiar(itemEscolhido));
        descontarPagamento(membros,itemEscolhido, ouroTotal); // Desconta o valor da compra para todos
        await escreverDevagar(`${itemEscolhido.nome} comprado com sucesso!`);
        itemEscolhido.nome = "Vendido";
        itemEscolhido.valor = 0;

        let continuar = input('Você deseja comprar mais alguma coisa na loja? (s/n) : ');

        if(continuar === 'n') continuarCompra = false;
    }
}

function copiar(original : any){
    return { ...original }
}

function descontarPagamento(membros: any[], item: Item, ouroTotal: number) {
    ouroTotal -= item.valor
    membros.forEach(m => {
        m.ouro = ouroTotal / 3
    });
}

function escolhaItem() {
    const escolha = input('Qual item deseja comprar? : ');
    const indice = parseInt(escolha) - 1;
    return indice;
}

function itemAleatorio(itens: any[]): Item {
    let item = itens[aleatorio(0,itens.length-1)];
    return { ...item };
}

export { loja }