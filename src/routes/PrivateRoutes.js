const express = require('express');

const AuthMiddleware = require('../middlewares/AuthMiddleware');

const UserRoutes = require('./UserRoutes');
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');

const PrivateRoutes = express.Router();

// Todas as rotas abaixo exigem JWT
PrivateRoutes.use(AuthMiddleware);

PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(CategoryRoutes);
PrivateRoutes.use(ProductRoutes);

module.exports = PrivateRoutes;