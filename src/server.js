'use strict'
/*
 * Thin express server, this module is for bootstrapping the application.
 * Bootstrap process consists of fetching config, defining app dependencies
 * and express server to a host and port
 */
require('dotenv').config()
const path = require('path')
const async = require('async')

const commons = require('node-commons')
const mongooseConnector = commons.db.mongoose
const logger = commons.logger

/*
 * Get configuration and start application.
 */
const config = require('./config')
const app = require('./app')

/*
 * START LOGGING THE APPLICATION.
 */
logger.initialize(path.resolve('./logs'), config.logs.debug_level)

function start () {
  logger.info('starting express app in ' + config.environment + ' environment...')

  async.parallel({
    connect_db: function (callback) {
      /*
       * Connect to mongoDB through mongoose
       */
      mongooseConnector.connectToMongoDb(config.mongodb.uri, config.mongodb.options, function (error) {
        if (error) {
          return callback('Unable to connect to mongo', error)
        } else {
          return callback(null)
        }
      })
    },
    start_server: function (callback) {
      /*
       * Listening to server, binding to a port and host.
       */
      app.expressApp.listen(config.express.port, config.express.ip, function (error) {
        if (error) {
          logger.error('Unable to listen for connections', error)
          process.exit(-1)
          return callback(error)
        }

        logger.info('Server is listening on ' + config.express.url)
        return callback(null)
      })
    }
  }, function (error) {
    if (error) {
      logger.error(error)
    } else {
      logger.info('myCity is ready!')
    }
  })
}

/*
 * Start the application
 */
start()
