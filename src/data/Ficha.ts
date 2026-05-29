import { Personagem } from '../models/Personagem';
import { habilidades } from './Habilidades';

const personagemBase = {
    nivel: 1,
    ouro: 0,
    xp: 0,
    xpNecessario: 50,
    inventario: [],
    efeitosAplicados: [],
    perderTurno: false
}

const heroi: Personagem = {
    ...personagemBase,
    nome: 'Cauã',
    classe: 'Guerreiro',
    hp: 150,
    hpMax: 150,
    ataque: 25,
    defesa: 15,
    energia: 50,
    energiaMax: 50,
    habilidades: [
        habilidades.rage,
        habilidades.cortesRapidos,
        habilidades.avante
    ],
    chanceAcerto: 95,
    chanceEsquiva: 5,
    chanceCritico: 10
}

const mago: Personagem = {
    ...personagemBase,
    nome: 'Derek',
    classe: 'Mago',
    hp: 100,
    hpMax: 100,
    ataque: 18,
    defesa: 3,
    energia: 100,
    energiaMax: 100,
    habilidades: [
        habilidades.fireball,
        habilidades.trovao,
        habilidades.doom
    ],
    chanceAcerto: 85,
    chanceEsquiva: 1,
    chanceCritico: 5
}

const arqueiro: Personagem = {
    ...personagemBase,
    nome: 'Isaac',
    classe: 'Arqueiro',
    passiva: '%crit+',
    explicarPassiva: 'Aumenta a taxa crítica do time',
    hp: 120,
    hpMax: 120,
    ataque: 20,
    defesa: 7,
    energia: 70,
    energiaMax: 70,
    habilidades: [
        habilidades.eletroArrow,
        habilidades.tirosRapidos,
        habilidades.altaPrecisao
    ],
    chanceAcerto: 95,
    chanceEsquiva: 3,
    chanceCritico: 35
}

const bardo: Personagem = {
    ...personagemBase,
    nome: 'Marcos',
    classe: 'Bardo',
    passiva: '2xp',
    explicarPassiva: 'Duplica a quantidade de xp ganho pelo time',
    hp: 90,
    hpMax: 90,
    ataque: 12,
    defesa: 5,
    energia: 110,
    energiaMax: 110,
    habilidades: [
        habilidades.encanto,
        habilidades.musica,
        habilidades.cypher
    ],
    chanceAcerto: 100,
    chanceEsquiva: 1,
    chanceCritico: 5
}

const curandeiro: Personagem = {
    ...personagemBase,
    nome: 'Rafael',
    classe: 'Curandeiro',
    passiva: 'hp+',
    explicarPassiva: 'Aumenta a vida do time',
    hp: 80,
    hpMax: 80,
    ataque: 10,
    defesa: 10,
    energia: 150,
    energiaMax: 150,
    habilidades: [
        habilidades.cura,
        habilidades.limparStatus,
        habilidades.curaTotal
    ],
    chanceAcerto: 85,
    chanceEsquiva: 3,
    chanceCritico: 5
}

const monge: Personagem = {
    ...personagemBase,
    nome: 'Carlos',
    classe: 'Monge',
    passiva: 'atk+',
    explicarPassiva: 'Aumenta o ataque do time',
    hp: 125,
    hpMax: 125,
    ataque: 25,
    defesa: 25,
    energia: 150,
    energiaMax: 150,
    habilidades: [
        habilidades.meditar,
        habilidades.socoForte,
        habilidades.sabedoria
    ],
    chanceAcerto: 80,
    chanceEsquiva: 15,
    chanceCritico: 5
}

const pirata: Personagem = {
    ...personagemBase,
    nome: 'Izidio',
    classe: 'Pirata',
    passiva: '2gold',
    explicarPassiva: 'Duplica o dinheiro ganho pelo time, mas não tem energia usa dinheiro para habilidades',
    ouro: 20,
    hp: 100,
    hpMax: 100,
    ataque: 35,
    defesa: 7,
    energia: 0,
    energiaMax: 0,
    habilidades: [
        habilidades.ganacia,
        habilidades.canhao,
        habilidades.cassino
    ],
    chanceAcerto: 70,
    chanceEsquiva: 1,
    chanceCritico: 5
}

const paladino: Personagem = {
    ...personagemBase,
    nome: 'Caio',
    classe: 'Paladino',
    passiva: 'def+',
    explicarPassiva: 'Aumenta a defesa do time',
    hp: 200,
    hpMax: 200,
    ataque: 20,
    defesa: 25,
    energia: 60,
    energiaMax: 60,
    habilidades: [
        habilidades.escudoSagrado,
        habilidades.investidaMilagrosa,
        habilidades.bençãoDivina
    ],
    chanceCritico: 5,
    chanceEsquiva: 1,
    chanceAcerto: 90,
}

const cangaceiro: Personagem = {
    ...personagemBase,
    nome: 'Pedro',
    classe: 'Cangaceiro',
    passiva: 'steal',
    explicarPassiva: 'Rouba 10% do ouro do inimigo a cada ataque',
    hp: 110,
    hpMax: 110,
    ataque: 30,
    defesa: 10,
    energia: 50,
    energiaMax: 50,
    habilidades: [
        habilidades.facao,
        habilidades.escopeta,
        habilidades.dinamite
    ],
    chanceAcerto: 85,
    chanceEsquiva: 5,
    chanceCritico: 15
}


const personagensPrimairos: [Personagem, Personagem, Personagem] = [heroi, mago, arqueiro]
const opcoesPersonagem: Personagem[] = [heroi, mago, arqueiro, bardo, curandeiro, monge, pirata, paladino, cangaceiro]

const Guilda = {
    nome: 'Guilda dos Heróis',
    membros: personagensPrimairos,
}

export { Guilda , opcoesPersonagem}