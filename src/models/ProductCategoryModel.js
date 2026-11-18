
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/database');

class ProductCategoryModel extends Model {

    static associate({
        ProductModel,
        CategoryModel
    }) {

         ProductCategoryModel.belongsTo(ProductModel, {
            foreignKey: 'product_id',
            as: 'product'
        });

        ProductCategoryModel.belongsTo(CategoryModel, {
            foreignKey: 'category_id',
            as: 'category'
        });

    };

};

ProductCategoryModel.init(
    {
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
       
    },
    {
        modelName: 'ProductCategory',
        tableName: 'products_categorys',
        sequelize: connection,
        timestamps: false
       
    }
);

module.exports = ProductCategoryModel;
