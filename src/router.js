// IMPORTS -------------------------------------------------------------

const express = require('express');
const tasksController = require('./controllers/tasksController');
const admTasksController = require('./controllers/admTasksController');
const usersController = require('./controllers/usersController');
const validate = require('./middlewares/validate');
const authorizationToken = require('./middlewares/authorizationToken');
const router = express.Router();
require('dotenv').config();

// ROTAS ---------------------------------------------------------------

// Rota root de teste
router.get('/', (_req, res) => res.send('TodoList API!'));

// Rota de login login
router.post('/login', usersController.getByLogin);

// Rota de criação de usuário
router.post('/register', validate.validateUser, usersController.createUser);

// Daqui para baixo, todas as rotas precisam de um token valido
router.use('*', authorizationToken.tokenValidated);

// Rota de logout
router.put('/logout', usersController.getLogout);

// Rota de refresh do token
router.post('/refresh', usersController.refreshToken);

// Rota que pega todas as tarefas pelo ID do usuario logado
router.get('/tasks', tasksController.getByIdUser);

// Rota de criação de tarefa
router.post('/tasks', validate.validateTitle, tasksController.createTask);

// Rota que pega pelo params.id, usado no update do front
router.get('/tasks/:id', validate.validateId, tasksController.getById);

// Rota que edita tarefa
router.put(
  '/tasks/:id',
  validate.validateId,
  validate.validateTitle,
  validate.validateStatus,
  tasksController.updateTask
);

// Rota que deleta tarefa
router.delete('/tasks/:id', validate.validateId, tasksController.deleteTask);

// Rota que pega todas as tarefas da plataforma
router.get('/admtasks', admTasksController.getAll);

// Rota que deleta tarefa quando esta na rota de adm
router.delete(
  '/admtasks/:id',
  validate.validateId,
  admTasksController.deleteAdmTask
);

// Rota que pega todos os usuarios
router.get('/users', usersController.getAllUsers);

// Rota que deleta usuario
router.delete('/users/:id', validate.validateId, usersController.deleteUser);

// EXPORTS -------------------------------------------------------------

module.exports = router;
