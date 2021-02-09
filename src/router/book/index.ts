import express, {Router} from 'express'
import AuthService from '../../service/authService'
import {AsyncHandler} from '@src/utils'
import {Container} from 'typedi'
import Db from "@src/service/db";
const router = Router()

router.get(
  '/',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const db = Container.get(Db)
    const books = await db.query("SELECT * FROM books")

    res.json({
      result: 'success',
      data : books
    })
  })
)

router.get(
  '/:id',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {id} = req.params

    const db = Container.get(Db);
    const [book] = await db.query(`
        SELECT b.id         as book_id,
               b.title      as title,
               b.image_url  as book_image,
               b.user_id    as user_id,
               b.view_count as view_count,
               b.reg_date   as reg_date,
               q.id         as question_id,
               q.step       as step,
               q.message    as question,
               q.image_url  as question_image,
               a.id         as answer_id,
               a.message    as answer,
               a.score      as score
        FROM books b
                 INNER JOIN questions q on b.id = q.book_id
                 INNER JOIN answers a on q.id = a.question_id
        where b.id = ? `
      , [id])

    res.json({
      result: 'success',
      data : book
    })
  })
)

export default router