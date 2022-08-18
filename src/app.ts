import express from 'express'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import indexRoutes from './routes/index.routes'
import './database'

const app = express()

const whitelist = ['http://localhost', 'https://heclopz-todo-app.netlify.app']
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS no permitido'))
    }
  },
}
// Middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(indexRoutes)

export default app
