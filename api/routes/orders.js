import { Router } from "express"
import { createOrders, putOrders, detailOrder, allOrders, deleteOrder, filterDateOrders } from "../controllers/orders.js"

const route = Router()

route.get("/ordenes/date", filterDateOrders)
route.get("/ordenes", allOrders)
route.get("/ordenes/:id", detailOrder)
route.post("/ordenes", createOrders)
route.put("/ordenes/:id", putOrders)
route.delete("/ordenes/:id", deleteOrder)

export default route