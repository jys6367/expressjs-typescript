import Db from './db'
import {bcryptHash} from '../utils'
import {Service} from "typedi";

@Service()
class AuthService {

  constructor(
    private db: Db
  ) {
  }

  async existsId(id) {
    const [existsUSer] = await this.db.query(
      `SELECT *
       FROM user
       WHERE id = ?`,
      [id]
    )

    return !!existsUSer
  }

  async join(id, password) {
    const {
      salt,
      hash
    } = await bcryptHash(password)

    return this.db.query(`
                INSERT INTO user (id, password, salt)
                VALUES (?, ?, ?) `,
      [id, hash, salt]
    )
  }

  async login(id, password) {
    const [user] = await this.db.query(`
                SELECT *
                FROM user
                where id = ? `,
      [id]
    )

    const {hash: userPassword} = await bcryptHash(password, user.salt)
    console.log([user.salt, userPassword])

    return userPassword === user.password
      ? user
      : null
  }
}

export default AuthService