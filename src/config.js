
const express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: process.env.EXPRESS_IP || 'localhost',
  protocol: process.env.EXPRESS_PROTOCOL || 'http'
}
module.exports = {

  // ENVIRONMENT
  environment: process.env.NODE_ENV || 'local',

  // EXPRESS APP
  express: {
    port: express.port,
    ip: express.ip,
    url: express.protocol + '://' + express.ip + ':' + express.port
  },
  // MONGODB
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myCity',
    options: {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: 10000,
      poolSize: 20,
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },

  // REDIS
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
    db: process.env.REDIS_DB || 0
  },

  // ELASTIC SEARCH
  elasticSearch: {
    host: process.env.ES_HOST || 'localhost',
    port: process.env.ES_PORT || 9200,
    protocol: process.env.ES_PROTOCOL || 'http',
    auth: process.env.ES_AUTH || ''
  },

  // LOGS
  logs: {
    debug_level: process.env.LOGS_DEBUG_LEVEL || 'debug'
  }

}