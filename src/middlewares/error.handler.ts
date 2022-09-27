import { ErrorRequestHandler } from 'express'
import { Boom } from '@hapi/boom'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

export const boomErrorHandler: ErrorRequestHandler = (
  err: Boom,
  req,
  res,
  next
) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
