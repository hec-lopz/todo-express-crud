import bcrypt from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { IUser, LoginUserDTO, UserDTO } from '../models/User.model'
import User from '../models/User.model'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

interface IUserService {
  register(body: IUser): Promise<UserDTO | undefined>
  login(body: LoginUserDTO): Promise<UserDTO | undefined>
  getMe(id: UserDTO['_id']): Promise<UserDTO | undefined>
  generateToken(id: UserDTO['_id']): string
}

class UserService implements IUserService {
  async register(body: IUser): Promise<UserDTO | undefined> {
    const { name, email, password } = body

    if (!name || !email || !password) {
      throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user: HydratedDocument<IUser> = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    if (user) {
      return {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateToken(user.id),
      }
    }
  }

  async login(body: LoginUserDTO): Promise<UserDTO | undefined> {
    const { email, password } = body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateToken(user.id),
      }
    } else {
      throw new Error('Invalid credentials')
    }
  }

  async getMe(id: UserDTO['_id']): Promise<UserDTO | undefined> {
    try {
      const user = await User.findById(id).select('-password')

      if (user) return { _id: user.id, email: user.email, name: user.name }
    } catch (error) {
      throw new Error('Not found')
    }
  }

  generateToken(id: UserDTO['_id']) {
    if (!JWT_SECRET) throw new Error('JWT_SECRET not valid')
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: '30d',
    })
  }
}

export default UserService
