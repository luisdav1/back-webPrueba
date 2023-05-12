import { Router } from "express"
import { createMedicine,putMedicine,allMedicine,deleteMedicine } from "../controllers/medicamentos.js"
const route = Router()
route.get("/medicamentos", allMedicine)
route.post("/medicamentos", createMedicine)
route.put("/medicamentos/:id", putMedicine)
route.delete("/medicamentos/:id", deleteMedicine)

export default route
