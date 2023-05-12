import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import routeUsuario from './routes/usuario.js'
import routeMedicamentos from './routes/medicamentos.js'
import routeOrders from './routes/orders.js'
import  env  from "./config.js"
// app init
const app = express()

// settings
app.set('port', env.PORT )

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/api', routeOrders)
app.use('/api', routeUsuario)
app.use('/api', routeMedicamentos)

// Route Not Found
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found'
  })
})

export default app

