
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/database');

class UserModel extends Model {

    static associate({
        
    }) {

        

    }

}

UserModel.init(
    {
        
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        surname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
       
    },
    {
        modelName: 'User',
        tableName: 'users',
        sequelize: connection,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = UserModel;
