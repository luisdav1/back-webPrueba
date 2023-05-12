import { Router } from "express";
import { login, register, getNombre } from "../controllers/usuario.js"
const route = Router()
route.post("/", login)
route.post("/nombre",getNombre)
route.post("/register", register)

export default route