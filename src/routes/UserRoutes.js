
const express = require('express');
const UserController = require('../controllers/UserController')
const UsersRoutes = express.Router();

const userController = new UserController();

// CRUD

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Antonio
 *               surname:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: antonio@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário ou email já utilizado
 *       401:
 *         description: Não autorizado
 */
UsersRoutes.post('/v1/users', userController.criar);

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Antonio
 *               surname:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: antonio@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar usuário
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
UsersRoutes.put('/v1/users/:id', userController.atualizar);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
UsersRoutes.delete('/v1/users/:id', userController.deletar);

module.exports = UsersRoutes;
