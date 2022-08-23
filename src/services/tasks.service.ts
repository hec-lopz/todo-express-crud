import Task, { ITask } from '../models/Task.model'
import { HydratedDocument } from 'mongoose'

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
    const task = await Task.findById(taskId)

    if (!task) throw new Error('Tasks not found')

    if (!userId) throw new Error('User id not provided')

    if (task.user.toString() !== userId) throw new Error('User not authorized')

    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    }).lean()

    return updatedTask
  }

  async delete(taskId: string, userId: string) {
    const task = await Task.findById(taskId)

    if (!task) throw new Error('Task not found')
    if (task.user.toString() !== userId) throw new Error('User not authorized')

    await task.remove()
  }

  async deleteAll(userId: string) {
    await Task.deleteMany({ user: userId })
  }
}
