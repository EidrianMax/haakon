module.exports = {
  registerUser: require('./register-user'),
  authenticateUser: require('./authenticate-user'),
  retrieveUser: require('./retrieve-user'),
  modifyUser: require('./modify-user'),
  unregisterUser: require('./unregister-user'),
  searchGames: require('./retrieve-search-games'),
  retrieveSearchGames: require('./retrieve-search-games'),
  retrieveGame: require('./retrieve-game'),
  retrieveFavGames: require('./retrieve-fav-games'),
  addFavGame: require('./add-fav-game'),
  deleteFavGame: require('./delete-fav-game'),
  togglePlayingGame: require('./toggle-playing-game'),
  retrievePlayingGames: require('./retrieve-playing-games'),
  togglePlayedGame: require('./toggle-played-game'),
  retrievePlayedGames: require('./retrieve-played-games')
}
