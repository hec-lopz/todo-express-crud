import { Schema, model } from 'mongoose'

export interface ITask {
  text: string
  done: boolean
}

const taskSchema = new Schema<ITask>(
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

export default model('Task', taskSchema)
