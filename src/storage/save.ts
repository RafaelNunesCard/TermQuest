import { db } from './db';

function salvar(nomeGuilda: string, andar: number, dificuldade: number, membros: any[]) {
    const total = db.prepare('SELECT COUNT(*) as count FROM save').get() as any;
    const jaExiste = db.prepare('SELECT * FROM save WHERE nome_guilda = ?').get(nomeGuilda);

    if(total.count >= 3 && !jaExiste) {
        console.log('Limite de 3 saves atingido! Delete um save para continuar.');
        return;
    }
    
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO save (id, nome_guilda, andar, dificuldade, membros)
        VALUES ( ?, ?, ?, ?)
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