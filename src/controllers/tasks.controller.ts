import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { AuthorizedRequest } from '../middlewares/auth.handler'
import { TaskService } from '../services/tasks.service'

const service = new TaskService()

type Middleware = (req: Request, res: Response) => void

export const getTasks = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (!req.locals) throw new Error('No user id at req.locals')
  const tasks = await service.getAll(req.locals.id)
  res.json(tasks)
})

export const createTask = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (!req.locals) throw new Error('No user id at req.locals')
  const task = await service.create({
    ...req.body,
    user: req.locals.id,
  })
  res.json({
    message: 'created',
    data: task,
  })
})

export const updateTask = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (!req.locals) throw new Error('No user id at req.locals')

  const { id: taskId } = req.params
  const { id: userId } = req.locals

  const task = await service.update(taskId, userId, req.body)
  res.status(200).json({ message: 'Updated', data: task })
})

export const deleteTask = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (!req.locals) throw new Error('No user id at req.locals')

  const { id: taskId } = req.params
  const { id: userId } = req.locals

  await service.delete(taskId, userId)

  res.status(204).send()
})

export const deleteAllTasks = asyncHandler(
  async (req: AuthorizedRequest, res) => {
    if (!req.locals) throw new Error('No user id at req.locals')
    const { id: userId } = req.locals
    await service.deleteAll(userId)

    res.status(204).send()
  }
)
