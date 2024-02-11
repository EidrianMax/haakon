const { retrieveAllGames, retrieveGame, searchGames } = require('../controllers')

const gamesRouter = require('express').Router()

gamesRouter
  .get('/', searchGames)
  .get('/all', retrieveAllGames)
  .get('/:gameId', retrieveGame)

module.exports = gamesRouter
