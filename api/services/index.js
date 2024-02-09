const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const searchGames = require('./search-games')
const retrieveAllGames = require('./retrieve-all-games')
const retrieveGame = require('./retrieve-game')
const toggleFavGame = require('./toggle-fav-game')
const retrieveFavGames = require('./retrieve-fav-games')
const togglePlayingGame = require('./toggle-playing-game')
const retrievePlayingGames = require('./retrieve-playing-games')
const togglePlayedGame = require('./toggle-played-game')
const retrievePlayedGames = require('./retrieve-played-games')

module.exports = {
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
}
