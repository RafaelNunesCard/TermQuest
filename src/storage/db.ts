import Database from 'better-sqlite3';

const db = new Database('saves.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS save (
        nome_guilda TEXT PRIMARY KEY,
        andar INTEGER,
        dificuldade INTEGER,
        membros TEXT
    )
`);

export { db };