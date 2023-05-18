import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Paciente = sequelize.define("paciente",{
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING(80),
        allowNull: false
    },
    cedula:{
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey:true
    },
    eps:{
        type: DataTypes.STRING(20),
        allowNull: false
    }

})