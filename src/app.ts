import 'module-alias/register';
import 'reflect-metadata';
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import setMiiddleware from './middleware'
import setRouter from "./router";


const {PORT} = process.env

const app = express()

setMiiddleware(app)
setRouter(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
}) // eslint-disable-line no-console
