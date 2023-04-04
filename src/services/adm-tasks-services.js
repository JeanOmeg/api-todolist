const connection = require('./connection')

const getAll = async (id) => {
  const [admin] = await connection.execute('SELECT admin FROM users WHERE id = ?', [id])
  const comp = admin[0].admin === 'true'
  if (!comp) {
    const tasks = []
    return tasks
  }

  const [tasks] = await connection.execute(
    'SELECT tasks.*, users.username FROM tasks JOIN users ON users.id = tasks.id_user'
  )
  return tasks
}

const deleteAdmTask = async (id, idUser) => {
  const [admin] = await connection.execute('SELECT admin FROM users WHERE id = ?', [idUser])
  const comp = admin[0].admin === 'true'
  if (!comp) {
    const removedTask = []
    return removedTask
  }

  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
  return removedTask
}

module.exports = {
  getAll,
  deleteAdmTask,
}
