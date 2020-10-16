import nunjucks from 'nunjucks'
import express from 'express'
import path, { dirname } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import sassMiddleware from 'node-sass-middleware'
import indexRouter from './routes/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

nunjucks.configure('views', {
  express: app
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public', 'stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  prefix: '/stylesheets'
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

export default app
