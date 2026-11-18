const CategoryModel = require("./CategoryModel");
const ProductCategoryModel = require("./ProductCategoryModel");
const ProductImageModel = require("./ProductImageModel");
const ProductModel = require("./ProductModel");
const ProductOptionModel = require("./ProductOptionModel");

// Centralizando os models
const models = {
   CategoryModel,
   ProductCategoryModel,
   ProductImageModel,
   ProductModel,
   ProductOptionModel
   
};

// Configurando os relacionamentos
Object.values(models

).forEach(model => 
    {
        if (typeof model.associate === 'function') 
            {
                model.associate(models
                
                );
            }
    }
);

module.exports = models;
