import { Router } from 'express'
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller'

const router = Router()

router.get('/tasks', getTasks)

router.post('/tasks/add', createTask)

router.put('/tasks/:id/edit', updateTask)

router.delete('/tasks/:id/delete', deleteTask)

router.delete('/tasks/delete', deleteAllTasks)

export default router
