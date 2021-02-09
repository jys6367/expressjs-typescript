import logger from 'morgan'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import session from './session'

export default (app) => {
  app.disable('x-powered-by')
  // app.use(cors())
  // app.options('*', cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
  })
  app.use(logger('dev', {
    skip: () => app.get('env') === 'test'
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, '../public')))

  session(app)
}