import { Schema, model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
}

export interface UserDTO extends Omit<IUser, 'password'> {
  _id: string
  token?: string
}

export interface LoginUserDTO extends Omit<IUser, 'name'> {
  _id: string
  token: string
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model<IUser>('User', userSchema)
