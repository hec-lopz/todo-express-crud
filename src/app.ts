import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRoutes from './routes/index.routes'
import './database'
import { ORIGIN } from './config'

const app = express()

// Middlewares
app.use(cors({ origin: ORIGIN }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(indexRoutes)

export default app
