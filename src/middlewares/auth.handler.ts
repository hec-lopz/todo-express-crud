import { Request } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { JWT_SECRET } from '../config'
import boom from '@hapi/boom'

export interface AuthorizedRequest extends Request {
  locals?: { id: string }
}

export const protect = asyncHandler(
  async (req: AuthorizedRequest, res, next) => {
    const { authorization } = req.headers
    let token

    if (authorization && authorization.startsWith('Bearer')) {
      try {
        // Get token from headers
        token = authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload

        // Get user from the token
        req.locals = { id: decoded.id }

        next()
      } catch (error) {
        throw boom.unauthorized('Not authorized')
      }
    }

    if (!token) {
      throw boom.unauthorized('Not authorized, no token')
    }
  }
)
