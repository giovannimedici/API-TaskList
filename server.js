import { fastify } from 'fastify'

const server = fastify()

const tasks = [
    {
        id: 1,
        description: 'Oi'
    },
    {
        id: 2,
        description: 'Boa noite'
    }
]

server.get('/tasks', async => {
    return tasks;
})

server.post('/tasks', async (request, reply) => {
    const {id, description} = request.body

    await tasks.push({
        id,
        description
    })

    return reply.status(201).send()
})

server.listen({
    port: 3333,
})