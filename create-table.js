import {sql} from './db.js'

sql `
    CREATE TABLE tasks (
        id TEXT,
        title TEXT
    )
`.then(() => {
    console.log('Tabela criada')
})