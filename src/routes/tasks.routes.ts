import { Router } from 'express'
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller'
import { protect } from '../middlewares/auth.handler'

const router = Router()

router.get('/', protect, getTasks)

router.post('/add', protect, createTask)

router.put('/:id/edit', protect, updateTask)

router.delete('/:id/delete', protect, deleteTask)

router.delete('/delete', protect, deleteAllTasks)

export default router
