const admTasksService = require('../services/adm-tasks-services')

const getAll = async (request, response) => {
  const tasks = await admTasksService.getAll(request.headers.user.id)
  return response.status(200).json(tasks)
}

const deleteAdmTask = async (request, response) => {
  await admTasksService.deleteAdmTask(request.params.id, request.headers.user.id)
  return response.status(204).json()
}

module.exports = {
  getAll,
  deleteAdmTask,
}
