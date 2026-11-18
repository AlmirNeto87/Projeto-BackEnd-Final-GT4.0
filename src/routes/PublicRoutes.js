const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');

const PublicRoutes = express.Router();

const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();

// Rotas GET públicas
PublicRoutes.get('/v1/user/:id', userController.listarPorId);
PublicRoutes.get('/v1/user/', userController.listar);

PublicRoutes.get('/v1/category/search', categoryController.index);
PublicRoutes.get('/v1/category/:id', categoryController.show);

PublicRoutes.get('/v1/product/search', productController.index);
PublicRoutes.get('/v1/product/:id', productController.show);

// Autenticação
PublicRoutes.post('/v1/user/token', AuthController.login);

module.exports = PublicRoutes;