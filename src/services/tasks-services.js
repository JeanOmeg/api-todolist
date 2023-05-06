const connection = require('./connection')
const getDate = require('../utils/functions/get-date')

const getByIdUser = async (id) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id_user = ?', [id])
  return tasks
}

const getById = async (id) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id])
  return tasks
}

const createTask = async (id, task) => {
  const query = 'INSERT INTO tasks(title, status, created, updated, id_user) VALUES (?, ?, ?, ?, ?)'
  const [createdTask] = await connection.execute(query, [task.title, 'Not started!', getDate.getDate(), 'Not updated!', id])
  return { insertId: createdTask.insertId }
}

const deleteTask = async (id) => {
  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
  return removedTask
}

const updateTask = async (id, task) => {
  const query = 'UPDATE tasks SET title = ?, updated = ?, status = ? WHERE id = ?'
  const [updateTask] = await connection.execute(query, [task.title, getDate.getDate(), task.status, id])
  return updateTask
}

module.exports = {
  getById,
  getByIdUser,
  createTask,
  deleteTask,
  updateTask,
}
