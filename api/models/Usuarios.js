import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Usuario = sequelize.define("usuarios",{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    user: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
}, { timestamps: false })
