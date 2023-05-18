import {Medicamentos} from "../models/Medicamentos.js"
import Joi from 'joi'

export const createMedicine = async (req,res) => {
    try{
        const body = req.body
        if(!validate(body)) return res.sendStatus(400)
        const medicine = await Medicamentos.findOne({
            where:{
                name_medicine: body.name_medicine
            }
        })
        if(medicine) return res.sendStatus(409)
        await Medicamentos.create({
            name_medicine: body.name_medicine,
            price_medicine: body.price_medicine,
            cantidad: body.cantidad
        })
        return res.sendStatus(201) 
    }catch(err){
        return res.sendStatus(500)
    }  
}
export const putMedicine = async (req,res) => {
    try{
        const medicine = await Medicamentos.findByPk(req.params.id) 
        const body = req.body
        if(!validate(body)) return res.sendStatus(400)
        medicine.name_medicine = body.name_medicine
        medicine.price_medicine = body.price_medicine
        medicine.cantidad = body.cantidad
        await medicine.save()
        return res.status(200).json({name_medicine:medicine.name_medicine})
    }catch(err){
        return res.sendStatus(500)
    }  
}
export const allMedicine = async (req,res) => {
    try {
        const medicines = await Medicamentos.findAll({ order: [['name_medicine', 'ASC']] })
        const medicineList = medicines.map(medicine => ({
          name_medicine: medicine.name_medicine,
          price_medicine: medicine.price_medicine,
            cantidad: medicine.cantidad
        }))
        res.status(200).json(medicineList)
    } catch (err) {
        res.sendStatus(500)
    }
}
export const deleteMedicine = async (req,res) => {
    try{
        const medicineId = req.params.id
        const medicine = await Medicamentos.findByPk(medicineId)
        if(!medicine) return res.sendStatus(400) 
        await Medicamentos.destroy({ where: { medicine_id: medicineId } })
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }
}

export const validate = body => {
    const schema = Joi.object({
        name_medicine: Joi.string().max(70).trim().min(0).required(),
        price_medicine: Joi.number().max(1000000).min(100).required(),
        cantidad: Joi.number().max(100000).min(1).required()
    });
    const { error } = schema.validate(body)
    if (error) return false
    return true
}
