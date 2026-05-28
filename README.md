# ⚔️ TermQuest

RPG de batalha por turnos rodando no terminal, desenvolvido em TypeScript como projeto de aprendizado.

## 🎮 Sobre o Projeto

TermQuest é um RPG onde você monta uma guilda de 3 heróis e enfrenta masmorras com monstros progressivamente mais difíceis. O jogo conta com sistema de batalha por turnos, habilidades, efeitos de status, XP, evolução de personagens, loja e fogueira.

> Projeto que começou como um teste de fim de semana e cresceu. Ainda em desenvolvimento — novas funcionalidades a caminho.

## ✨ Funcionalidades

- **8 classes jogáveis** — Guerreiro, Mago, Arqueiro, Bardo, Curandeiro, Monge, Pirata e Paladino
- **Sistema de batalha por turnos** — ataque, habilidades, defesa, itens e fuga
- **Efeitos de status** — Veneno, Queimadura, Sangramento, Paralisia, Escudo e Cura
- **Sistema de XP e evolução** — cada classe evolui com atributos únicos
- **Masmorras progressivas** — dificuldade e monstros escalam por andar
- **Salvar Progresso** — consegue salvar o progresso da sua Guilda
- **Fogueira** — descanso, loja e treino entre batalhas
- **14 monstros** — do Slime ao Dragão, cada um com comportamento próprio

## 🗂️ Estrutura do Projeto

```
src/
  models/          ← interfaces e tipos (Personagem, Monstro, Habilidade...)
  data/            ← fichas prontas (personagens, monstros, habilidades, itens)
  functions/       ← lógica do jogo (batalha, cálculo, efeitos, loja...)
  storage/         ← lógica do banco de dados (db, save)
  main.ts          ← entrada do jogo
```

## 🚀 Como Rodar

**Pré-requisitos:** Node.js e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/RafaelNunesCard/TermQuest.git
cd TermQuest

# Instale as dependências
npm install

# Rode o jogo
npx ts-node src/main.ts
```

## 🛠️ Tecnologias

- **TypeScript** — tipagem estática, interfaces, union types, type guards e generics
- **Node.js** — execução no terminal
- **readline-sync** — input síncrono do jogador
- **SQLite** — salvamento dos dados dos saves

## 📚 Aprendizados

Projeto desenvolvido para praticar TypeScript na prática, explorando:

- Interfaces e tipos customizados
- Union types e type guards
- Generics
- Módulos e organização de projeto
- Programação assíncrona com async/await
- Arquitetura orientada a responsabilidades

## 🎯 Próximos passos
- [ ] Melhorar o sistema de Boss
- [ ] Adicionar um Vampiro
- [ ] Adicionar mais monstros
- [X] Adicionar opção de salvar (SQLite)
- [ ] Adicionar novos eventos 
