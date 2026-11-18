
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/database');
const ProductCategoryModel = require('./ProductCategoryModel');



class ProductModel extends Model {

    static associate({
    ProductImageModel,
    ProductOptionModel,
    ProductCategoryModel,
    CategoryModel
}) {

    ProductModel.hasMany(ProductImageModel, {
        foreignKey: 'product_id',
        as: 'images'
    });

    ProductModel.hasMany(ProductOptionModel, {
        foreignKey: 'product_id',
        as: 'options'
    });

    ProductModel.belongsToMany(CategoryModel, {
        through: ProductCategoryModel,
        foreignKey: 'product_id',
        otherKey: 'category_id',
        as: 'categories'
    });

}
}

ProductModel.init(
    {
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        use_in_menu: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: true
        },
        stock:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true


        }, 
        description: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false

        }
       
    },
    {
        modelName: 'Product',
        tableName: 'products',
        sequelize: connection,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = ProductModel;
