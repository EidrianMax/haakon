require('dotenv').config()
require('./config/mongo-connection')

const express = require('express')
const { usersRouter, gamesRouter } = require('./routes')
const logger = require('./utils/my-logger')
const cors = require('cors')

const corsOptions = {
  'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE']
}

const { env: { PORT, NODE_ENV }, argv: [, , port = PORT || 8000] } = process

logger.info('starting server')

const server = express()

server.use(cors(corsOptions))
server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/games', gamesRouter)

server.all('*', (req, res) => {
  res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
})

server.listen(port, () => {
  logger.info(`enviroment: ${NODE_ENV}`)
  logger.info(`server up and listening on port ${port}`)
})

process.on('SIGINT', () => {
  logger.info('stopping server')

  process.exit(0)
})
