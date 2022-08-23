import { Application, Router } from 'express'
import tasksRouter from './tasks.routes'
import usersRouter from './users.routes'

const routerApi: (app: Application) => void = (app) => {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/tasks', tasksRouter)
  router.use('/users', usersRouter)
}

export default routerApi
