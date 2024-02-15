const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const searchGames = require('./search-games')
const retrieveAllGames = require('./retrieve-all-games')
const retrieveGame = require('./retrieve-game')
const retrieveFavGames = require('./retrieve-fav-games')
const retrievePlayingGames = require('./retrieve-playing-games')
const retrievePlayedGames = require('./retrieve-played-games')
const addGameInUser = require('./add-game-in-user')
const deleteGameInUser = require('./delete-game-in-user')

module.exports = {
  registerUser,
  authenticateUser,
  retrieveUser,
  modifyUser,
  unregisterUser,
  searchGames,
  retrieveAllGames,
  retrieveGame,
  retrieveFavGames,
  retrievePlayingGames,
  retrievePlayedGames,
  addGameInUser,
  deleteGameInUser
}
