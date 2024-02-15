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
  retrievePlayingGames: require('./retrieve-playing-games'),
  addPlayingGame: require('./add-playing-game'),
  deletePlayingGame: require('./delete-playing-game')
}
