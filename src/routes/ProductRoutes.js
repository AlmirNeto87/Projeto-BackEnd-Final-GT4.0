const express = require('express');
const ProductController = require('../controllers/ProductController')
const ProductRoutes = express.Router();

const productController = new ProductController();
// CRUD

ProductRoutes.post('/v1/category', productController.criar)
ProductRoutes.put('/v1/category/:id', productController.atualizar)
ProductRoutes.delete('/v1/category/:id', productController.deletar)

module.exports = ProductRoutes;