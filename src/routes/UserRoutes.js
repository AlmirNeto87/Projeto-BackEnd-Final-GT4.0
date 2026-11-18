const express = require('express');
const UserController = require('../controllers/UserController')
const UsersRoutes = express.Router();

const userController = new UserController();
// CRUD

UsersRoutes.post('/v1/users', userController.criar)
UsersRoutes.put('/v1/users/:id', userController.atualizar)
UsersRoutes.delete('/v1/users/:id', userController.deletar)

module.exports = UsersRoutes;