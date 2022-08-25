import asyncHandler from 'express-async-handler'
import UserService from '../services/users.service'
import { AuthorizedRequest } from '../middlewares/auth.handler'

const service = new UserService()

export const registerUser = asyncHandler(async (req, res) => {
  const user = await service.register(req.body)
  res.status(201).json({ message: 'Registered user successfully', ...user })
})

export const loginUser = asyncHandler(async (req, res) => {
  const user = await service.login(req.body)
  res.status(201).json({ message: 'Login successful', ...user })
})

export const getMe = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (!req.locals) throw new Error('req.locals issue')
  const user = await service.getMe(req.locals.id)
  res.status(200).json({ message: 'Get a user', ...user })
})
