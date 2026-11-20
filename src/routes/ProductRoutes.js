const express = require('express');
const ProductController = require('../controllers/ProductController')
const ProductRoutes = express.Router();

const productController = new ProductController();
// CRUD

ProductRoutes.post('/v1/product', productController.criar)
ProductRoutes.put('/v1/product/:id', productController.atualizar)
ProductRoutes.delete('/v1/product/:id', productController.deletar)

module.exports = ProductRoutes;