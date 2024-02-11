const { port, enviroment } = require('./config/enviroment')
require('./config/mongo-connection')

const express = require('express')
const { usersRouter, gamesRouter } = require('./routes')
const logger = require('./utils/my-logger')
const cors = require('cors')
const { errorHandler } = require('./middlewares')

const corsOptions = {
  'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE']
}

logger.info('starting server')

const server = express()

server.use(cors(corsOptions))
server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/games', gamesRouter)

server.all('*', (req, res) => {
  res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
})

server.use(errorHandler)

server.listen(port, () => {
  logger.info(`enviroment: ${enviroment}`)
  logger.info(`server up and listening on port ${port}`)
})

process.on('SIGINT', () => {
  logger.info('stopping server')

  process.exit(0)
})
