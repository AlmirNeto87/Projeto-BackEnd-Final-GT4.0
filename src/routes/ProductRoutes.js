
const express = require('express');
const ProductController = require('../controllers/ProductController')
const ProductRoutes = express.Router();

const productController = new ProductController();

// CRUD

/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags:
 *       - Produtos
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
 *               - price
 *               - price_with_discount
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 example: true
 *               name:
 *                 type: string
 *                 example: Camiseta Básica
 *               slug:
 *                 type: string
 *                 example: camiseta-basica
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *               stock:
 *                 type: integer
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: Camiseta de algodão
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 79.90
 *               price_with_discount:
 *                 type: number
 *                 format: float
 *                 example: 59.90
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Tamanho
 *                     shape:
 *                       type: string
 *                       enum: [square, circle]
 *                       example: square
 *                     radius:
 *                       type: integer
 *                       example: 0
 *                     type:
 *                       type: string
 *                       enum: [text, color]
 *                       example: text
 *                     values:
 *                       type: string
 *                       example: P,M,G,GG
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     enabled:
 *                       type: boolean
 *                       example: true
 *                     path:
 *                       type: string
 *                       example: produtos/camiseta.jpg
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar produto ou categorias inválidas
 *       401:
 *         description: Não autorizado
 */
ProductRoutes.post('/v1/product', productController.criar);

/**
 * @swagger
 * /v1/product/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 example: true
 *               name:
 *                 type: string
 *                 example: Camiseta Básica
 *               slug:
 *                 type: string
 *                 example: camiseta-basica
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *               stock:
 *                 type: integer
 *                 example: 80
 *               description:
 *                 type: string
 *                 example: Camiseta de algodão atualizada
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 89.90
 *               price_with_discount:
 *                 type: number
 *                 format: float
 *                 example: 69.90
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     enabled:
 *                       type: boolean
 *                       example: true
 *                     path:
 *                       type: string
 *                       example: produtos/camiseta-nova.jpg
 *                     deleted:
 *                       type: boolean
 *                       example: false
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Tamanho
 *                     shape:
 *                       type: string
 *                       enum: [square, circle]
 *                       example: square
 *                     radius:
 *                       type: integer
 *                       example: 0
 *                     type:
 *                       type: string
 *                       enum: [text, color]
 *                       example: text
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [P, M, G, GG]
 *                     deleted:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou erro ao atualizar produto
 *       401:
 *         description: Não autorizado
 */
ProductRoutes.put('/v1/product/:id', productController.atualizar);

/**
 * @swagger
 * /v1/product/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
ProductRoutes.delete('/v1/product/:id', productController.deletar);

module.exports = ProductRoutes;
