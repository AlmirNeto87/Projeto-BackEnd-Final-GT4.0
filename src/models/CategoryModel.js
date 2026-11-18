
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/database');


class CategoryModel extends Model {

    static associate({
        ProductModel,
        ProductCategoryModel        
    }) {

        CategoryModel.belongsToMany(ProductModel, {
            through: ProductCategoryModel,
            foreignKey: 'category_id',
            otherKey: 'product_id',
            as: 'products'
        });


    };

};

CategoryModel.init(
    {
        
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
        }
       
    },
    {
        modelName: 'Category',
        tableName: 'categories',
        sequelize: connection,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = CategoryModel;
