
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/database');

class ProductImageModel extends Model {

    static associate({ ProductModel }) {

        ProductImageModel.belongsTo(ProductModel, {
            foreignKey: 'product_id',
            as: 'product'
        });
    };

};

ProductImageModel.init(
    {
        
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue:0,
            allowNull: true
        },

        path: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
       
    },
    {
        modelName: 'ProductImage',
        tableName: 'products_images',
        sequelize: connection,
        timestamps: false
                
    }
);

module.exports = ProductImageModel;
