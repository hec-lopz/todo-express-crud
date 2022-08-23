import { config } from 'dotenv'

config()

export const MONGODB_URI: string =
  process.env.MONGODB_URI || 'mongodb://localhost/test'

export const ORIGIN: string | undefined = process.env.ORIGIN

export const PORT: string | number = process.env.PORT || 3000

export const JWT_SECRET: string | undefined = process.env.JWT_SECRET
