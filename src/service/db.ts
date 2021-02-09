import mysql from 'mysql'
import {Service} from "typedi";

const createPool = () => {
  return mysql.createPool({
    connectionLimit: 10, //default:10
    queueLimit: 0, // defualt:0(max)
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  })
}

const pool = createPool()

@Service()
class Db {
  pool = null

  constructor() {
    this.pool = pool
  }

  query(sql : string, params? : Object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.pool.query(sql, params, (error, results) => {
        if (error) {
          console.error('[QUERY ERROR]', error)
          return reject(error)
        }
        resolve(results)
      })
    })
  }

  getConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, conn) => {
        if (error) {
          console.error('[CONN ERROR]', error)
          return reject(error)
        }
        resolve(conn)
      })
    })
  }
}

export default Db