const {
  registerUser,
  authenticateUser,
  retrieveUser,
  modifyUser,
  unregisterUser,
  retrieveFavGames,
  addFavGame,
  deleteFavGame,
  retrievePlayingGames,
  addPlayingGame,
  deletePlayingGame,
  retrievePlayedGames,
  addPlayedGame,
  deletePlayedGame
} = require('../controllers')

const usersRouter = require('express').Router()

usersRouter
  .post('/', registerUser)
  .post('/auth', authenticateUser)
  .get('/', retrieveUser)
  .patch('/', modifyUser)
  .delete('/', unregisterUser)
  .get('/favs', retrieveFavGames)
  .post('/favs/:gameId', addFavGame)
  .delete('/favs/:gameId', deleteFavGame)
  .get('/playing', retrievePlayingGames)
  .post('/playing/:gameId', addPlayingGame)
  .delete('/playing/:gameId', deletePlayingGame)
  .get('/played', retrievePlayedGames)
  .post('/played/:gameId', addPlayedGame)
  .delete('/played/:gameId', deletePlayedGame)

module.exports = usersRouter
