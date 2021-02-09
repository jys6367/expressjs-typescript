import errorHandler from './errorHandler'
import auth from './auth'
import s3 from './s3'
import book from './book'
import {Container} from "typedi";
import AuthService from "@src/service/authService";
import {AsyncHandler} from "@src/utils";

export default (app) => {

  app.get('/', AsyncHandler(async (req, res) => {
    const authService = Container.get(AuthService);
    req.session.count = (req.session.count || 0) + 1
    res.json({
      a: "1",
      id: req.session.count,
      user: await authService.existsId('jys9962')
    })
  }));

  app.use('/auth', auth)
  app.use('/image', s3)
  app.use('/book', book)
  app.use(errorHandler)
}

