const {
  registerUser,
  authenticateUser,
  retrieveUser,
  modifyUser,
  unregisterUser,
  toggleFavGame,
  retrieveFavGames,
  togglePlayingGame,
  retrievePlayingGames,
  togglePlayedGame,
  retrievePlayedGames
} = require('../controllers')

const usersRouter = require('express').Router()

usersRouter
  .post('/', registerUser)
  .post('/auth', authenticateUser)
  .get('/', retrieveUser)
  .patch('/', modifyUser)
  .delete('/', unregisterUser)
  .patch('/favs', toggleFavGame)
  .get('/favs', retrieveFavGames)
  .patch('/playing', togglePlayingGame)
  .get('/playing', retrievePlayingGames)
  .patch('/played', togglePlayedGame)
  .get('/played', retrievePlayedGames)

module.exports = usersRouter
