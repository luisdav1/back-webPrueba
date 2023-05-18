import { Router } from "express";
import { createPacient } from "../controllers/pacientes.js"
const route = Router()
route.post("/paciente", createPacient)


export default route