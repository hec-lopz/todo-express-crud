import { Schema, model } from 'mongoose'

export interface Task {
  text: string
  done: boolean
}

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const TaskModel = model('Task', taskSchema)

export default TaskModel
