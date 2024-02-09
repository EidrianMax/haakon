require('dotenv').config()

const express = require('express')
const { mongoose } = require('@haakon/api-database')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    searchGames,
    retrieveAllGames,
    retrieveGame,
    toggleFavGame,
    retrieveFavGames,
    togglePlayingGame,
    retrievePlayingGames,
    togglePlayedGame,
    retrievePlayedGames
} = require('./controllers')

const logger = require('./utils/my-logger')

const cors = require('cors')

const corsOptions = {
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE']
}

const { env: { PORT, MONGO_DB_URI }, argv: [, , port = PORT || 8000] } = process

logger.info('starting server')

mongoose.connect(MONGO_DB_URI)
    .then(() => {
        const server = express()

        server.use(cors(corsOptions))
        server.use(express.json())

        const api = express.Router()

        api.post('/users', registerUser)

        api.post('/users/auth', authenticateUser)

        api.get('/users', retrieveUser)

        api.patch('/users', modifyUser)

        api.delete('/users', unregisterUser)

        api.get('/games', searchGames)

        api.get('/games/all', retrieveAllGames)

        api.get('/games/:gameId', retrieveGame)

        api.patch('/users/favs', toggleFavGame)

        api.get('/users/favs', retrieveFavGames)

        api.patch('/users/playing', togglePlayingGame)

        api.get('/users/playing', retrievePlayingGames)

        api.patch('/users/played', togglePlayedGame)

        api.get('/users/played', retrievePlayedGames)

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
        })

        server.use('/api', api)

        server.listen(port, () => logger.info(`server up and listening on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('stopping server')

            process.exit(0)
        })
    })
    .catch(error => logger.error(error))