const request = require('supertest')
const app = require('../src/app')
const tasksModel = require('../src/services/tasks-model')
const connection = require('../src/services/connection')
require('dotenv').config()

describe('Teste de delete de tarefas', () => {
  afterAll(() => {
    connection.end()
  })

  test('Deve deletar a tarefa e retornar um status 204, e fazer uma verificação se a task realmente foi deletada', async () => {
    const res = await request(app).delete('/tasks/96').set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)

    expect(res.statusCode).toBe(204)

    const task = await tasksModel.getById(96)
    expect(task.length).toBe(0)
  })

  test('Deve falhar na hora de deletar a tarefa, está passando um parametro errado', async () => {
    const res = await request(app).delete('/tasks/97asda   ~][{.,,,,;asd').set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ message: 'Invalid ID!' })
  })
})
