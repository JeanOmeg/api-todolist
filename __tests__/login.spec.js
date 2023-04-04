const request = require('supertest')
const app = require('../src/app')
const connection = require('../src/services/connection')

describe('Testes de login', () => {
  jest.setTimeout(25000)

  afterAll(() => {
    connection.end()
  })

  test('O sistema deve permitir login com email e senha corretos', async () => {
    const email = 'jeanomeg3@gmail.com'
    const password = '123'

    const response = await request(app).post('/login').send({ email, password })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('data.user')
    expect(response.body).toHaveProperty('data.token')
    expect(response.body).toHaveProperty('data.refreshToken')
  })

  test('O sistema deve negar login com email ou senha incorretos', async () => {
    const email = 'jeanomaeg3@gmail.com'
    const password = '1234'

    const response = await request(app).post('/login').send({ email, password })

    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Password or E-mail incorrect')
  })

  test('O sistema deve permitir vários logins simultâneos com email e senha corretos (500)', async () => {
    const logins = []

    for (let i = 0; i < 500; i++) {
      logins.push({
        email: 'jeanomeg3@gmail.com',
        password: '123',
      })
    }

    const loginPromises = logins.map((login) => {
      return request(app).post('/login').send(login)
    })

    const results = await Promise.all(loginPromises)

    results.forEach((result) => {
      expect(result.statusCode).toBe(200)
      expect(result.body).toHaveProperty('data.user')
      expect(result.body).toHaveProperty('data.token')
      expect(result.body).toHaveProperty('data.refreshToken')
    })
  })

  test('O sistema deve negar vários logins simultâneos com email ou senha incorretos (500)', async () => {
    const logins = []

    for (let i = 0; i < 500; i++) {
      logins.push({
        email: 'jean@gmail.com',
        password: '1234',
      })
    }

    const loginPromises = logins.map((login) => {
      return request(app).post('/login').send(login)
    })

    const results = await Promise.all(loginPromises)

    results.forEach((result) => {
      expect(result.statusCode).toBe(401)
      expect(result.text).toBe('Password or E-mail incorrect')
    })
  })

  test('O sistema deve permitir e negar vários logins simultâneos (1000)', async () => {
    const logins = []

    for (let i = 0; i < 500; i++) {
      logins.push(
        {
          email: 'jeanomeg3@gmail.com',
          password: '123',
        },
        {
          email: 'jean@gmail.com',
          password: '1234',
        }
      )
    }

    const loginPromises = logins.map((login) => {
      return request(app).post('/login').send(login)
    })

    const results = await Promise.all(loginPromises)

    results.forEach((result) => {
      if (result.statusCode == 401) {
        expect(result.text).toBe('Password or E-mail incorrect')
      } else {
        expect(result.statusCode).toBe(200)
        expect(result.body).toHaveProperty('data.user')
        expect(result.body).toHaveProperty('data.token')
        expect(result.body).toHaveProperty('data.refreshToken')
      }
    })
  })
})
