import { db } from './db';

function salvar(nomeGuilda: string, andar: number, dificuldade: number, membros: any[]) {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO save (id, nome_guilda, andar, dificuldade, membros)
        VALUES (1, ?, ?, ?, ?)
    `);
    stmt.run(nomeGuilda, andar, dificuldade, JSON.stringify(membros));
    console.log('Jogo salvo com sucesso! (^-^)');
}

function listarSaves() {
    return db.prepare('SELECT nome_guilda, andar FROM save').all();
}

function carregar(nomeGuilda: string) {
    return db.prepare('SELECT * FROM save WHERE nome_guilda = ?').get(nomeGuilda) as any;
}

export { salvar, carregar, listarSaves };