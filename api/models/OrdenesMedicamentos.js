import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Ordenes = sequelize.define("ordenes",{
    ordenes_medicamentos_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    medicamentos:{
        type: DataTypes.STRING(4000),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: false })
