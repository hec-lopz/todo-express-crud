import { Request, Response } from 'express'
import { TaskService } from '../services/tasks.service'

const service = new TaskService()

type Middleware = (req: Request, res: Response) => void

export const getTasks: Middleware = async (req, res) => {
  const tasks = await service.getAll()
  res.json(tasks)
}

export const createTask: Middleware = async (req, res) => {
  try {
    console.log(req.body)
    const task = await service.create(req.body)
    res.json({
      message: 'created',
      data: task,
    })
  } catch (error) {
    res.status(422).send(error)
  }
}

export const updateTask: Middleware = async (req, res) => {
  const { id } = req.params

  await service.update(id, req.body)
  res.status(200).json({ message: 'Updated', id })
}

export const deleteTask: Middleware = async (req, res) => {
  const { id } = req.params

  await service.delete(id)

  res.status(204).send()
}

export const deleteAllTasks: Middleware = async (req, res) => {
  await service.deleteAll()

  res.status(204).send()
}
