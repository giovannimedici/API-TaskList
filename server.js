import { fastify } from 'fastify'
import { DatabasePostgres } from './dbPostgres.js'
import cors from '@fastify/cors'

const server = fastify()
await server.register(cors, { 
  // put your options here
})

const database = new DatabasePostgres()



server.get('/tasks', async (request) => {
    const search = request.query.search

    const tasks = await database.list(search)

    return tasks

})

server.post('/tasks', async (request, reply) => {
    const {title} = request.body

    await database.create({
        title
    })

    return reply.status(201).send()
})

server.put('/tasks/:id', async (request, reply) => {
    const taskId = request.params.id
    const {title} = request.body

    await database.update(taskId, {
        title
    })

    return reply.status(204).send()
})

server.delete('/tasks/:id', async (request, reply) => {
    const taskId = request.params.id

    await database.delete(taskId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})