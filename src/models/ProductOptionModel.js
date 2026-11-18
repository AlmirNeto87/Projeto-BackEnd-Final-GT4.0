const { Model, DataTypes } = require('sequelize');
const connection = require('../config/database');

class ProductOptionModel extends Model {
    
    static associate({ ProductModel }) {

        ProductOptionModel.belongsTo(ProductModel, {
            foreignKey: 'product_id',
            as: 'product'
        });
    };


};

ProductOptionModel.init(
    {
        
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shape: {
            type: DataTypes.ENUM('square', 'circle'),
            defaultValue: 'square',
            allowNull: true
            
        },

        radius: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },

        type: {
            type: DataTypes.ENUM('text', 'color'),
            defaultValue: 'text',
            allowNull: true
            
        },

        values: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'ProductOption',
        tableName: 'product_options',
        sequelize: connection,
        timestamps: false    
    }
);

module.exports = ProductOptionModel;