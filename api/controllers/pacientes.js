import { Paciente } from "../models/paciente.js"
import Joi from "joi"

export const createPacient = async (req,res) => {
    try {
        const body = req.body
        if(!validate(body)) return res.sendStatus(400)
        await Paciente.create({
            name: body.name,
            last_name: body.last_name,
            cedula: body.cedula,
            eps: body.eps
        })
        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500)
    }
}
const validate = (body) => {
    const schema = Joi.object({
        name: Joi.string().max(50).trim().min(4).required(),
        last_name: Joi.string().max(80).trim().min(4).required(),
        cedula: Joi.string().max(20).trim().min(6).required(),
        eps: Joi.string().max(20).trim().min(4).required()
    })
    const { error } = schema.validate(body)
    if (error) return false
    return true
}