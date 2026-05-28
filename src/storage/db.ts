import Database from 'better-sqlite3';

const db = new Database('saves.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS save (
        id INTEGER PRIMARY KEY,
        nome_guilda TEXT,
        andar INTEGER,
        dificuldade INTEGER,
        membros TEXT
    )
`);

export { db };