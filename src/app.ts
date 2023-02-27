import express from 'express'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import { boomErrorHandler, errorHandler } from './middlewares/error.handler'
import routerApi from './routes'
import { PORT } from './config'
import './database'

const app = express()

const whitelist = [
  'http://localhost:5500',
  'https://heclopz-todo-app.netlify.app',
  'https://todo.heclopz.com',
]
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

routerApi(app)

app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => console.log('Server on port', PORT))
