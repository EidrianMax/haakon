const mongoose = require('mongoose')
const logger = require('../utils/my-logger')

const { MONGO_DB_URI, MONGO_DB_URI_DEV, NODE_ENV } = process.env

const URI = NODE_ENV === 'development'
  ? MONGO_DB_URI_DEV
  : MONGO_DB_URI

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
