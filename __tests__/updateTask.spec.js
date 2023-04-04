const request = require('supertest')
const app = require('../src/app')
const connection = require('../src/services/connection')
require('dotenv').config()

describe('Teste de atualização de tarefas', () => {
  afterAll(() => {
    connection.end()
  })

  test('Deve atualizar a tarefa e retornar a task atualizada', async () => {
    const body = {
      title: 'updated title',
      status: 'Done!',
    }

    const res = await request(app).put(`/tasks/2`).set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`).send(body)

    expect(res.statusCode).toEqual(204)

    const [updatedTask] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [2])

    expect(updatedTask[0].title).toEqual('updated title')
    expect(updatedTask[0].status).toEqual('Done!')
  })
})
