import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { JWT_SECRET } from '../config'

export interface AuthorizedRequest extends Request {
  locals?: { id: string }
}

export const protect = asyncHandler(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (!JWT_SECRET) throw new Error('No JWT_SECTRET')

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
        throw new Error('Not authorized')
      }
    }

    if (!token) {
      throw new Error('Not authorized, no token')
    }
  }
)
