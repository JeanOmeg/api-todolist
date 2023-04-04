const tasksModel = require('../services/tasks-services')

// Pega do tasksModel

const getByIdUser = async (request, response) => {
  const tasks = await tasksModel.getByIdUser(request.headers.user.id)
  return response.status(200).json(tasks)
}

const getById = async (request, response) => {
  const tasks = await tasksModel.getById(request.params.id)
  return response.status(200).json(tasks)
}

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.headers.user.id, request.body)
  return response.status(201).json(createdTask)
}

const deleteTask = async (request, response) => {
  await tasksModel.deleteTask(request.params.id)
  return response.status(204).json()
}

const updateTask = async (request, response) => {
  const updatedTask = await tasksModel.updateTask(request.params.id, request.body)
  return response.status(204).json(updatedTask)
}

module.exports = {
  getById,
  getByIdUser,
  createTask,
  deleteTask,
  updateTask,
}
