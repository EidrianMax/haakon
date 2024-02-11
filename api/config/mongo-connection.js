const { mongo, enviroment } = require('./enviroment')
const mongoose = require('mongoose')
const logger = require('../utils/my-logger')

const URI = enviroment === 'development'
  ? mongo.databaseUriDev
  : mongo.databaseUri

mongoose.connect(URI)
  .then(() => {
    logger.info('Database connected')
  })
  .catch(e => {
    console.log(e)
    logger.error(e.message)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
