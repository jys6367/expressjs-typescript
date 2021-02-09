import * as bcrypt from 'bcrypt'
import { promisify } from 'util'

const genSalt = promisify(bcrypt.genSalt)
const getHash = promisify(bcrypt.hash)


export const AsyncHandler = (callback) => async (req, res, next) => {
  try {
    await callback(req, res)
  } catch (e) {
    next(e)
  }
}


export const bcryptHash = async (value, salt = null) => {
  salt = salt || await genSalt(2)
  const hash = await getHash(value, salt)
  return { salt, hash }
}