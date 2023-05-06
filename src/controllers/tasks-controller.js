const tasksService = require('../services/tasks-services')

const getByIdUser = async (request, response) => {
  const tasks = await tasksService.getByIdUser(request.headers.user.id)
  return response.status(200).json(tasks)
}

const getById = async (request, response) => {
  const tasks = await tasksService.getById(request.params.id)
  return response.status(200).json(tasks)
}

const createTask = async (request, response) => {
  const createdTask = await tasksService.createTask(request.headers.user.id, request.body)
  return response.status(201).json(createdTask)
}

const deleteTask = async (request, response) => {
  await tasksService.deleteTask(request.params.id)
  return response.status(204).json()
}

const updateTask = async (request, response) => {
  const updatedTask = await tasksService.updateTask(request.params.id, request.body)
  return response.status(204).json(updatedTask)
}

module.exports = {
  getById,
  getByIdUser,
  createTask,
  deleteTask,
  updateTask,
}
