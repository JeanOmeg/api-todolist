const request = require('supertest')
const app = require('../src/app')
const connection = require('../src/services/connection')
require('dotenv').config()

describe('Testes de criação de tarefas', () => {
  afterAll(() => {
    connection.end()
  })

  test('createTask deve criar uma nova task', async () => {
    const body = {
      title: 'Test task',
    }
    const res = await request(app).post('/tasks').set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`).send(body)

    expect(res.statusCode).toEqual(201)
    expect(res.body.insertId).toBeDefined()
    expect(res.body.insertId).toBeTruthy()
  })

  test('Erro na criação da tarefa, string vazia', async () => {
    const body = {
      title: '',
    }
    const res = await request(app).post('/tasks').set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`).send(body)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ message: 'Title cannot be empty!' })
  })

  test('Erro na criação da tarefa, tarefa indefinida', async () => {
    const body = {}
    const res = await request(app).post('/tasks').set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`).send(body)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ message: 'Title is required!' })
  })

  test('Erro na criação da tarefa, token invalido', async () => {
    const body = {
      title: 'Task',
    }
    const res = await request(app).post('/tasks').set('Authorization', `Bearer ${process.env.AUTH_ERROR}`).send(body)

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({ message: 'Invalid token' })
  })
})
