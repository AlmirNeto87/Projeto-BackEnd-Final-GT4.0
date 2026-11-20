
const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');

const PublicRoutes = express.Router();

const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();
const authController = new AuthController();



// Rotas GET públicas

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
PublicRoutes.get('/v1/user/:id', userController.listarPorId);

/**
 * @swagger
 * /v1/user/:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       500:
 *         description: Erro interno ao listar usuários
 */
PublicRoutes.get('/v1/user/', userController.listar);

/**
 * @swagger
 * /v1/category/search:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Categorias
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *       500:
 *         description: Erro interno ao listar categorias
 */
PublicRoutes.get('/v1/category/search', categoryController.listar);

/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
PublicRoutes.get('/v1/category/:id', categoryController.listarPorId);

/**
 * @swagger
 * /v1/product/search:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *       500:
 *         description: Erro interno ao listar produtos
 */
PublicRoutes.get('/v1/product/search', productController.listar);

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
PublicRoutes.get('/v1/product/:id', productController.listarPorId);

// Autenticação

/**
 * @swagger
 * /v1/user/token:
 *   post:
 *     summary: Realiza o login e gera um token JWT
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 token:
 *                   type: string
 *                   description: Token JWT válido por uma hora
 *       400:
 *         description: Email ou senha não informados
 *       401:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Erro interno ao realizar login
 */
PublicRoutes.post('/v1/user/token', authController.login);

module.exports = PublicRoutes;
