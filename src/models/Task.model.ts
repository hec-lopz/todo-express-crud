import { Schema, model, Types } from 'mongoose'

export interface ITask {
  text: string
  done: boolean
  user: Types.ObjectId
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
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('Task', taskSchema)
