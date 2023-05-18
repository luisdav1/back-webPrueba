import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Medicamentos = sequelize.define("medicamentos",{
    medicine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_medicine:{
        type: DataTypes.STRING(70),
        allowNull: false
    },
    price_medicine: {
        type: DataTypes.FLOAT(),
        allowNull: false
    },
    cantidad:{
        type: DataTypes.INTEGER(),
        allowNull: false
    }
}, { timestamps: false })
