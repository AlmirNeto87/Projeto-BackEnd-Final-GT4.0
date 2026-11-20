
const express = require('express');
const CategoryController = require('../controllers/CategoryController')
const CategoryRoutes = express.Router();

const categoryController = new CategoryController();

// CRUD

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Cadastra uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eletrônicos
 *               slug:
 *                 type: string
 *                 example: eletronicos
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Categoria cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar categoria ou categoria já existente
 *       401:
 *         description: Não autorizado
 */
CategoryRoutes.post('/v1/category', categoryController.criar);

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Informática
 *               slug:
 *                 type: string
 *                 example: informatica
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar categoria
 *       401:
 *         description: Não autorizado
 */
CategoryRoutes.put('/v1/category/:id', categoryController.atualizar);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Categoria não encontrada
 */
CategoryRoutes.delete('/v1/category/:id', categoryController.deletar);

module.exports = CategoryRoutes;
