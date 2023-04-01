const jsonwebtoken = require('jsonwebtoken')
const usersModel = require('../models/usersModel')

require('dotenv').config()

// Pega do usersModel

const getAllUsers = async (request, response) => {
  const users = await usersModel.getAllUsers(request.headers.user.id)
  return response.status(200).json(users)
}

const getByLogin = async (request, response) => {
  try {
    const user = await usersModel.getByLogin(request.body.email, request.body.password)
    const correctPassword = user && user.length > 0
    if (!correctPassword) return response.status(401).send('Password or E-mail incorrect')
    const token = jsonwebtoken.sign({ user: user[0] }, process.env.PRIVATE_KEY, {
      expiresIn: Number(process.env.TOKEN_E),
    })
    const refreshToken = jsonwebtoken.sign({ user: user[0] }, process.env.PRIVATE_KEY, {
      expiresIn: Number(process.env.TOKEN_R),
    })
    return response.status(200).json({ data: { user: user[0], token, refreshToken } })
  } catch (error) {
    console.log(error)
    return response.send(error)
  }
}

const refreshToken = async (request, response) => {
  const [, oldToken] = request.headers.authorization?.split(' ') || [' ', ' ']
  const id_user = request.headers.user.id
  try {
    await usersModel.invalidToken(oldToken, id_user)

    const user = request.headers.user
    const token = jsonwebtoken.sign({ user: user }, process.env.PRIVATE_KEY, {
      expiresIn: Number(process.env.TOKEN_E),
    })

    const refreshToken = jsonwebtoken.sign({ user: user }, process.env.PRIVATE_KEY, {
      expiresIn: Number(process.env.TOKEN_R),
    })
    return response.status(200).json({ data: { user: user, token, refreshToken } })
  } catch (error) {
    await usersModel.invalidToken(oldToken)
    console.log(error)
    return response.send(error)
  }
}

const createUser = async (request, response) => {
  const createdUser = await usersModel.createUser(request.body)
  return response.status(201).json(createdUser)
}

const getLogout = async (request, response) => {
  const [, oldToken] = request.headers.authorization?.split(' ') || [' ', ' ']
  const id_user = request.headers.user.id
  await usersModel.invalidToken(oldToken, id_user)
  const logout = await usersModel.getLogout(request.headers.user.id)

  return response.status(204).json(logout)
}

const deleteUser = async (request, response) => {
  const deletedUser = await usersModel.deleteUser(request.params.id, request.headers.user.id)

  return response.status(200).json(deletedUser)
}

module.exports = {
  getAllUsers,
  getByLogin,
  createUser,
  deleteUser,
  refreshToken,
  getLogout,
}
