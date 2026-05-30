import { Personagem } from '../models/Personagem';
import { Monstro } from '../models/Monstros';
import { Habilidade } from '../models/Habilidade';
import { aleatorio } from './chances';
import { Guilda } from '../data/Ficha';
import { escolhaPersonagem } from './usuario';
import { colorirTexto } from './interface';
import { cores } from '../models/cores';

type Acao = (atacante: Personagem, alvo: Personagem | Monstro, habilidade: Habilidade) => number | null;

const habilidadesEspeciais: Record<string, Acao> = {
    'Avante': (atacante, alvo, habilidade) => {
        for(let membro of Guilda.membros) {
            membro.ataque += habilidade.buff?.ataque || 0;
            membro.defesa += habilidade.buff?.defesa || 0;
        }
        console.log(`${atacante.nome} usou Avante e aumentou o ataque e defesa de toda a guilda!`);
        return habilidade.dano;
    },

    'Melodia': (atacante, alvo, habilidade) => {
        let aliado = Guilda.membros[escolhaPersonagem(Guilda.membros, 'Escolha um personagem para curar')]; 
        aliado.ataque += habilidade.buff?.ataque || 0;
        aliado.defesa += habilidade.buff?.defesa || 0;
        console.log(`${atacante.nome} usou Melodia e aumentou o ataque e defesa do ${aliado.nome}!`);
        return habilidade.dano;
    },

    'Cypher': (atacante, alvo, habilidade) => {
        for(let membro of Guilda.membros) {
            membro.ataque += habilidade.buff?.ataque || 0;
            membro.defesa += habilidade.buff?.defesa || 0;
            membro.chanceCritico += habilidade.buff?.taxaCritica || 0;
        }
        console.log(`${atacante.nome} usou Cypher e aumentou a chance de crítico de toda a guilda!`);
        return habilidade.dano;
    },

    'Benção Pura': (atacante, alvo, habilidade) => {
        let aliado = Guilda.membros[escolhaPersonagem(Guilda.membros, 'Escolha um personagem para limpar os status negativos')]; 
        aliado.efeitosAplicados = aliado.efeitosAplicados.filter(e => e.tipo !== 'Veneno' && e.tipo !== 'Paralisia' && e.tipo !== 'Queimadura' && e.tipo !== 'Sangramento');
        console.log(`${atacante.nome} usou Benção Pura e limpou os status negativos do ${aliado.nome}!`);
        return habilidade.dano;
    },

    'Cura Total': (atacante, alvo, habilidade) => {
        for(let membro of Guilda.membros) {
            membro.hp = membro.hpMax;
            if(membro.efeitosAplicados.length > 0) membro.efeitosAplicados = [];
            if(habilidade.Efeito && habilidade.Efeito.chanceAplicar > aleatorio(1, 100)) membro.efeitosAplicados.push({...habilidade.Efeito, duracaoAtual: habilidade.Efeito.duracaoMax});
        }
        console.log(`${atacante.nome} usou Cura Total e curou todo o HP da guilda!`);
        return 0;
    },

    'Meditar': (atacante, alvo, habilidade) => {
        atacante.efeitosAplicados = atacante.efeitosAplicados
            .filter(e => e.tipo !== 'Veneno' && e.tipo !== 'Paralisia' && e.tipo !== 'Queimadura' && e.tipo !== 'Sangramento');
        console.log(`${atacante.nome} meditou e limpou os efeitos negativos!`);
        return habilidade.dano;
    },

    'Ganância': (atacante, alvo, habilidade) => {
        let ouroGanho = aleatorio(15, 25);
        atacante.ouro += ouroGanho;
        console.log(`${atacante.nome} usou Ganância e ganhou ${ouroGanho} de ouro!`);
        return habilidade.dano;
    },

    'Cassino': (atacante, alvo, habilidade) => {
        const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        let dado = aleatorio(1, 6);
        console.log(`${faces[dado - 1]} Saiu ${dado}!`);
        if(dado <= 2) return habilidade.dano;
        if(dado <= 4) { alvo.ataque -= 10; return 0; }
        return habilidade.dano * 2;
    },

    'Benção Divina': (atacante, alvo, habilidade) => {
        let aliado = Guilda.membros[escolhaPersonagem(Guilda.membros, 'Escolha um personagem para receber a benção divina')]; 
        aliado.ataque += habilidade.buff?.ataque || 0;
        aliado.defesa += habilidade.buff?.defesa || 0;
        aliado.chanceCritico += habilidade.buff?.taxaCritica || 0;
        console.log(`${atacante.nome} usou Benção Divina e aumentou o ataque, defesa e chance de crítico do ${aliado.nome}!`);
        return habilidade.dano;
    },

    'sugarSangue': (atacante, alvo, habilidade) => {
        let vidaRoubada = Math.min(20, alvo.hp);
        alvo.hp -= vidaRoubada;
        atacante.hp = Math.min(atacante.hp + vidaRoubada, atacante.hpMax);
        console.log(`${atacante.nome} usou Sugar Sangue e roubou ${vidaRoubada} de vida do ${alvo.nome}!`);
        return habilidade.dano;
    },

    'necromancia': (atacante, alvo, habilidade) => {
        console.log(`${atacante.nome} usou Necromancia e invocou um esqueleto para lutar ao seu lado!`);
        let esqueleto: Personagem = {
            nome: 'Esqueleto Invocado',
            classe: 'Guerreiro',
            nivel: atacante.nivel,
            xp: 0,
            xpNecessario: 100,
            hp: 80,
            hpMax: 80,
            ataque: 15,
            defesa: 5,
            energia: 0,
            energiaMax: 0,
            inventario: [],
            ouro: 0,
            habilidades: [],
            efeitosAplicados: [],
            chanceAcerto: 80,
            chanceEsquiva: 10,
            chanceCritico: 5
        };
        Guilda.membros.push(esqueleto);
        return habilidade.dano;
    },

    'banhoSangue': (atacante, alvo, habilidade) => {
        let vidaRoubada = Math.min(60, alvo.hp);
        alvo.hp -= vidaRoubada;
        atacante.hp = Math.min(atacante.hp + vidaRoubada, atacante.hpMax);
        colorirTexto(cores.vermelho, `${atacante.nome} usou Banho de Sangue e roubou ${vidaRoubada} de vida do ${alvo.nome}!`);
        return habilidade.dano;
    }
}

export { habilidadesEspeciais, Acao };