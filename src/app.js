/*
 * Define express application, register
 * any required middleware and expose
 * all available routes.
 */
const path = require('path')
const express = require('express')
const layout = require('express-layout')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const validator = require('express-validator')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./schema.json')

const commons = require('node-commons')
const logger = commons.logger
const routes = require('./routes')

// SETUP APPLICATION MIDDLEWARE
const expressApp = express()

expressApp.set('views', path.join(__dirname, 'views'))
expressApp.set('view engine', 'ejs')

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded(),
  cookieParser(),
  validator(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
  }),
  flash()
]
expressApp.use(middlewares)

// ETUP APPLICATION ROUTES
// ROUTES
expressApp.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// expressApp.use('/health', healthController.getHealth)

expressApp.use('/', routes)

expressApp.use((req, res, next) => {
  res.status(404).send('Sorry can\'t find that!')
})

expressApp.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).send('Something broke!')
})

// EXPORT THE APPLICATION
module.exports = {
  expressApp
}
