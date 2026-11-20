const express = require('express');
const UserController = require('../controllers/UserController')
const UsersRoutes = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuários encontrados com sucesso
 *       401:
 *         description: Não autorizado
 */



const userController = new UserController();
// CRUD

UsersRoutes.post('/v1/users', userController.criar)
UsersRoutes.put('/v1/users/:id', userController.atualizar)
UsersRoutes.delete('/v1/users/:id', userController.deletar)

module.exports = UsersRoutes;