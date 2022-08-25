import Task, { ITask } from '../models/Task.model'
import { HydratedDocument } from 'mongoose'
import boom from '@hapi/boom'

export class TaskService {
  async getAll(userId: string) {
    const tasks = await Task.find({ user: userId }).lean()
    return tasks
  }

  async create(body: ITask) {
    const task: HydratedDocument<ITask> = new Task(body)

    await task.save()

    return task
  }

  async update(taskId: string, userId: string, body: ITask) {
    let task
    try {
      task = await Task.findById(taskId)
    } catch (error) {
      throw boom.notFound('Task not found')
    }

    if (!task) throw boom.notFound('Task not found')

    if (!userId) throw boom.badData('UserId not provided')

    if (task.user.toString() !== userId)
      throw boom.unauthorized('User not authorized')

    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    }).lean()

    return updatedTask
  }

  async delete(taskId: string, userId: string) {
    try {
      const task = await Task.findById(taskId)

      if (!task) throw boom.notFound('Task not found')
      if (task.user.toString() !== userId)
        throw boom.unauthorized('User not authorized')

      await task.remove()
    } catch (error) {
      throw boom.notFound('Task not found')
    }
  }

  async deleteAll(userId: string) {
    await Task.deleteMany({ user: userId })
  }
}
