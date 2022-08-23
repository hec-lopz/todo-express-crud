import Task, { ITask } from '../models/Task.model'
import { MongoServerError } from 'mongodb'
import { HydratedDocument } from 'mongoose'

export class TaskService {
  async getAll() {
    const tasks = await Task.find().lean()
    return tasks
  }

  async create(body: ITask) {
    try {
      const task: HydratedDocument<ITask> = new Task(body)

      await task.save()

      return task
    } catch (error) {
      if (error instanceof MongoServerError) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          const entries = Object.entries(error.keyValue)
          throw new Error(`Value ${entries[0]} is duplicated`)
        }
      }
      throw error
    }
  }

  async update(id: string, body: ITask) {
    await Task.findByIdAndUpdate(id, body)
  }

  async delete(id: string) {
    await Task.findByIdAndDelete(id)
  }

  async deleteAll() {
    await Task.deleteMany({})
  }
}
