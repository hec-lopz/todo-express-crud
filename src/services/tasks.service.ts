import { TaskModel, Task } from '../models/Task.model'
import { MongoServerError } from 'mongodb'

export class TaskService {
  async getAll() {
    const tasks = await TaskModel.find().lean()
    return tasks
  }

  async create(body: Task) {
    try {
      const task = new TaskModel(body)

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

  async update(id: string, body: Task) {
    await TaskModel.findByIdAndUpdate(id, body)
  }

  async delete(id: string) {
    await TaskModel.findByIdAndDelete(id)
  }

  async deleteAll() {
    await TaskModel.deleteMany({})
  }
}
