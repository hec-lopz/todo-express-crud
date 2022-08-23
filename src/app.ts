import express from 'express'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import { errorHandler } from './middlewares/error.handler'
import routerApi from './routes'
import { PORT } from './config'
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

routerApi(app)

app.use(errorHandler)

app.listen(PORT, () => console.log('Server on port', PORT))
