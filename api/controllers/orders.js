import { Ordenes } from "../models/OrdenesMedicamentos.js"
import Joi from 'joi'
import { Op } from 'sequelize';

export const createOrders = async (req,res) => {
    try{
        const body = req.body
        if (!validateOrders(body)) return res.sendStatus(400)
        const medicines = JSON.stringify(body.medicamentos) 
        const date = new Date()
        date.setHours(0, 0, 0, 0)
        await Ordenes.create({
            name: body.name,
            medicamentos: medicines,
            date: date
        })
        return res.sendStatus(201)
    } catch(err){
        return res.sendStatus(500)
    }
}
export const putOrders = async (req,res) => {
    try{
        const body = req.body
        if (!validateOrders(body)) return res.sendStatus(400)
        const id = req.params.id
        const order = await Ordenes.findByPk(id)
        if (!order) return res.sendStatus(400)
        const date = new Date()
        date.setHours(0, 0, 0, 0)
        const { name, medicamentos } = body
        order.date = date
        order.name = name
        order.medicamentos = JSON.stringify(medicamentos)
        await order.save()
        return res.sendStatus(200)
    } catch(err){
        return res.sendStatus(500)
    }
}
export const detailOrder = async (req,res) => {
    try{
        const id = req.params.id
        const order = await Ordenes.findByPk(id)
        if(!order) return res.sendStatus(400)
        return res.status(200).json({
            name:order.name,
            medicamentos:JSON.parse(order.medicamentos),
            date:order.date
        })
    } catch(err){
        return res.sendStatus(500)
    }
}
export const allOrders = async (req,res) => {
    try{
        const orders = Ordenes.findAll({ order: [['name', 'ASC']] })
        const listOrders = (await orders).map(order => ({
            name: order.name,
            medicamentos: JSON.parse(order.medicamentos),
            date: order.date
        }))
        res.status(200).json(listOrders)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}
export const deleteOrder = async (req,res) => {
    try{
        const orderId = req.params.id
        const order = await Ordenes.findByPk(orderId)
        if(!order) return res.sendStatus(400) 
        await Ordenes.destroy({ where: { ordenes_medicamentos_id : orderId } })
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }
}
export const filterDateOrders = async (req, res) => {
    try {
      const startDate = req.query.start_date
      const endDate = req.query.end_date
      
      const orders = await Ordenes.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate]
          }
        }
      })
      res.status(200).json(orders)
    } catch (error) {
      res.sendStatus(500)
    }
}
  
export const validateOrders = body => {
    const schema = Joi.object({
        name: Joi.string().max(50).trim().min(0).required(),
        medicamentos: Joi.object().min(1).max(30).required(),
    })
    const { error } = schema.validate(body)
    if (error) return false
    return true
}
