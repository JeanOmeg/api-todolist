const express = require('express')
const tasksController = require('./controllers/tasks-controller')
const admTasksController = require('./controllers/adm-tasks-controller')
const usersController = require('./controllers/users-controller')
const validate = require('./middlewares/validate')
const authorizationToken = require('./middlewares/authorization-token')
const router = express.Router()
require('dotenv').config()

router.get('/', (_req, res) => res.send('TodoList API!'))

router.post('/login', usersController.getByLogin)

router.post('/register', validate.validateUser, usersController.createUser)

router.use('*', authorizationToken.tokenValidated)

router.put('/logout', usersController.getLogout)

router.post('/refresh', usersController.refreshToken)

router.get('/tasks', tasksController.getByIdUser)

router.post('/tasks', validate.validateTitle, tasksController.createTask)

router.get('/tasks/:id', validate.validateId, tasksController.getById)

router.put('/tasks/:id', validate.validateId, validate.validateTitle, validate.validateStatus, tasksController.updateTask)

router.delete('/tasks/:id', validate.validateId, tasksController.deleteTask)

router.get('/admtasks', admTasksController.getAll)

router.delete('/admtasks/:id', validate.validateId, admTasksController.deleteAdmTask)

router.get('/users', usersController.getAllUsers)

router.delete('/users/:id', validate.validateId, usersController.deleteUser)

module.exports = router
