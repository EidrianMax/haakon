const { retrieveGame, searchGames } = require('../controllers')

const gamesRouter = require('express').Router()

gamesRouter
  .get('/', searchGames)
  .get('/:gameId', retrieveGame)

module.exports = gamesRouter
