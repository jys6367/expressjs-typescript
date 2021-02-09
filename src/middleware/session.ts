import redis from 'redis'
import session from "express-session";
import connectredis from "connect-redis"
import connectFile from "session-file-store";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any },
    count: any
  }
}

const createRedisStore = () => {
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  })

  const RedisStore = connectredis(session)
  return new RedisStore({client: client,})
}

const createFileStore = () => {
  const fileStoreOptions = {}

  const FileStore = connectFile(session)
  return new FileStore(fileStoreOptions)
}

const store = process.env.NODE_ENV === 'production'
  ? createRedisStore()
  : createFileStore()

export default (app) => {
  app.use(session({
    name: 'bb_key',
    resave: true,
    saveUninitialized: true,
    secret: 'bb_key_secret_key!',
    cookie: {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    },
    store: store
  }))
}

