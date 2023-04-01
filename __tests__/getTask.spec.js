const request = require('supertest');
const app = require('../src/app');
const connection = require('../src/models/connection');
require('dotenv').config();

describe('Testes de get por id de usuário ou parametro de url', () => {

  afterAll(() => {
    connection.end();
  });

  test('getByIdUser deve retornar todas as tarefas do usuario, o id está no token', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toBeTruthy();
  });

  test('getById deve retornar a tarefa pelo parametro da url', async () => {
    const res = await request(app)
      .get('/tasks/58')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toBeTruthy();
  });
});
