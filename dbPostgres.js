import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {
    async list(search){
        let tasks 

        if(search){
            tasks = await sql `select * from tasks where title ilike ${'%' + search + '%'}`
        } else{
            tasks = await sql `select * from tasks`
        }

        return tasks
    }

    async create(task){
        const taskId = randomUUID()
        const { title } = task

        await sql `insert into tasks (id, title) VALUES (${taskId}, ${title})`
    }

    async update(id, task){
        const { title } = task

        await sql `update tasks set title = ${title} WHERE id = ${id}`
    }

    async delete(id){
        await sql `delete from tasks where id = ${id}`
    }
}

