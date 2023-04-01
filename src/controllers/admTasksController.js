const admTasksModel = require('../models/admTasksModel');

// Pega do admTasksModel

const getAll = async (request, response) => {
  const tasks = await admTasksModel.getAll(request.headers.user.id);
  return response.status(200).json(tasks);
};

const deleteAdmTask = async (request, response) => {
  await admTasksModel.deleteAdmTask(request.params.id, request.headers.user.id);
  return response.status(204).json();
};

// EXPORTS -------------------------------------------------------------

module.exports = {
  getAll,
  deleteAdmTask,
};
