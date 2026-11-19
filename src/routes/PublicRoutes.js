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
PublicRoutes.get('/v1/user/:id', userController.listarPorId);
PublicRoutes.get('/v1/user/', userController.listar);

PublicRoutes.get('/v1/category/search', categoryController.listar);
PublicRoutes.get('/v1/category/:id', categoryController.listarPorId);

PublicRoutes.get('/v1/product/search', productController.listar);
PublicRoutes.get('/v1/product/:id', productController.listarPorId);

// Autenticação
PublicRoutes.post('/v1/user/token', authController.login);

module.exports = PublicRoutes;