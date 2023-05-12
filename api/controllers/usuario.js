import { Usuario } from '../models/Usuarios.js'
import { v4 as uuidv4 } from 'uuid'
import Joi from "joi"
export const login = async (req, res) => {
  try {
    const body = req.body
    console.log(body)
    if (!validateLogin(body)) return res.sendStatus(400)
    const { email, password } = body
    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    })
    if (!usuario) return res.status(400).json({msg:"No se encuentra registrado"})
    if(password !== usuario.password) return res.status(400).json({msg:"Contraseña Invalida"})
    const token = usuario.token
    res.status(200).json({ token: token })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
export const getNombre = async (req,res) => {
  try{
    if (!validateToken(req.body)) return res.sendStatus(400)
    const {token} = req.body
    const usuario = await Usuario.findOne({
      where: {
        token: token,
      }
    })
    if (!usuario) return res.sendStatus(400)
    const nombre = usuario.name
    res.status(200).json({ nombre: nombre })
  }catch (err) {
    res.SendStatus(500)
  }
}
export const register = async (req, res) => {
    try {
      const newUser = req.body
      if (!validateRegister(newUser)) return res.sendStatus(400)
      const userLogin = await Usuario.findOne({
        where:{
            email: newUser.email
        }
      })
      if (userLogin) return res.status(400).json({msg:"Su correo ya esta registrado"})
      const token = uuidv4()
      await Usuario.create({
        name: newUser.name,
        email: newUser.email,
        user: newUser.user,
        password: newUser.password,
        token: token  // Asignar el token generado al campo correspondiente en la tabla de usuarios
      })
      return res.status(201).json({token})
    } catch (err) {
    return res.status(500)
    }
}
const validateLogin = body => {
  const schema = Joi.object({
    email: Joi.string().email().max(60).trim().min(0).required(),
    password: Joi.string().max(40).trim().min(0).required()
  })
  
  const { error } = schema.validate(body)
  if(error) return false
  return true
}
const validateRegister = body => {
  const schema = Joi.object({
    name: Joi.string().max(50).trim().min(0).required(),
    email: Joi.string().email().max(60).trim().min(0).required(),
    user: Joi.string().max(70).trim().min(0).required(),
    password: Joi.string().max(40).trim().min(0).required(),
  })
  const { error } = schema.validate(body)
  if(error) return false
  return true
}

const validateToken = body => {
  const schema = Joi.object({
    token: Joi.string().max(40).trim().min(0).required()
  })
  const { error } = schema.validate(body)
  if(error) return false
  return true
} 