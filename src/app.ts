import express from 'express'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import indexRoutes from './routes/index.routes'
import './database'
import { ORIGIN } from './config'

const app = express()

const whitelist = ['http://localhost', 'https://heclopz-todo-app.netlify.app']
const options: CorsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('No permitido'))
      }
    }
  },
}

// Middlewares
app.use(cors(options))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(indexRoutes)

export default app
