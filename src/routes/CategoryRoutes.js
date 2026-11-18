const express = require('express');
const CategoryController = require('../controllers/CategoryController')
const CategoryRoutes = express.Router();

const categoryController = new CategoryController();
// CRUD

CategoryRoutes.post('/v1/category', categoryController.criar)
CategoryRoutes.put('/v1/category/:id', categoryController.atualizar)
CategoryRoutes.delete('/v1/category/:id', categoryController.deletar)

module.exports = CategoryRoutes;