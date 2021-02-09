import express, {Router} from 'express'
import AuthService from '../../service/authService'
import {AsyncHandler} from '@src/utils'
import {Container} from 'typedi'

const router = Router()

router.post(
  '/login',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
      id,
      password
    } = req.body
    const authService = Container.get(AuthService)
    const user = await authService.login(id, password)
    if (!user) {
      res.json({
        result: 'fail'
      })
      return
    }

    req.session.user = {
      id: user.id
    }

    res.json({
      result: 'success',
      data: true
    })
  })
)

router.get(
  '/',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {


    res.json({
      result: 'success',
      data: null
    })
  })
)

router.post(
  '/join',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
      id,
      password
    } = req.body

    const authService = Container.get(AuthService)

    if (await authService.existsId(id)) {
      return res.json({
        result: 'fail',
        data: {
          message: '이미 존재하는 아이디입니다.'
        }
      })
    }

    await authService.join(id, password)

    res.json({
      result: 'success',
      data: {
        id,
        password
      }
    })
  })
)

router.get(
  '/getUser',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.session.count = (req.session.count || 0) + 1

    if (!req.session.user) {
      return res.json({
        result: 'fail'
      })
    }

    res.json({
      result: 'sucucess',
      data: {
        id: req.session.user.id
      }
    })
  })
)

export default router