const date = require('../utils/functions/get-date')
const connection = require('./connection')
const bcrypt = require('bcrypt')

const getAllUsers = async (id) => {
  const [admin] = await connection.execute('SELECT admin FROM users WHERE id = ?', [id])
  const comp = admin[0].admin === 'true'
  if (!comp) {
    const users = []
    return users
  }
  const [users] = await connection.execute('SELECT id, username, real_name, phone, email, admin, online FROM users')
  return users
}

const getByLogin = async (email, password) => {
  const [encryptedPass] = await connection.execute('SELECT user_password FROM users WHERE email = ?', [email])

  if (!encryptedPass[0]) {
    return null
  }

  const comp = await bcrypt.compare(password, encryptedPass[0].user_password)
  if (!comp) {
    return null
  }

  await connection.execute('UPDATE users SET online = ? WHERE email = ?', ['🟢', email])

  const [user] = await connection.execute('SELECT email, id, admin FROM users WHERE email = ? and user_password = ? LIMIT 1', [
    email,
    encryptedPass[0].user_password,
  ])

  return user
}

const createUser = async (user) => {
  const password = await bcrypt.hash(user.user_password, 10)
  const query =
    'INSERT INTO users(username, real_name, created, updated, phone, email, user_password, token, admin, online) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const [createdUser] = await connection.execute(query, [
    user.username,
    user.real_name,
    date.getDate(),
    date.getDate(),
    user.phone,
    user.email,
    password,
    'token',
    'false',
    '🔴',
  ])
  return { insertId: createdUser.insertId }
}

const getLogout = async (id) => {
  const [logout] = await connection.execute('UPDATE users SET online = ? WHERE id = ?', ['🔴', id])
  return logout
}

const getInvalidedToken = async (token) => {
  const [invalidedToken] = await connection.execute('SELECT token FROM tokens WHERE token = ?', [token])
  return invalidedToken
}

const invalidToken = async (token, id_user) => {
  const [invalidedToken] = await connection.execute('INSERT INTO tokens(token, created, id_user) VALUES (?, ?, ?)', [
    token,
    date.getDate(),
    id_user,
  ])
  return invalidedToken
}

const deleteUser = async (id, idAdmin) => {
  const [admin] = await connection.execute('SELECT admin FROM users WHERE id = ?', [idAdmin])

  const comp = admin[0].admin === 'true'
  if (!comp || id == idAdmin) {
    const removedUser = null
    return removedUser
  }

  await connection.execute('DELETE FROM tasks WHERE id_user = ?', [id])

  const [removedUser] = await connection.execute('DELETE FROM users WHERE id = ?', [id])
  return removedUser
}

module.exports = {
  getAllUsers,
  createUser,
  getByLogin,
  getLogout,
  deleteUser,
  invalidToken,
  getInvalidedToken,
}
