module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    modifyUser: require('./modify-user'),
    unregisterUser: require('./unregister-user'),
    searchGames: require('./search-games'),
    retrieveAllGames: require('./retrieve-all-games'),
    retrieveGame: require('./retrieve-game'),
    toggleFavGame: require('./toggle-fav-game'),
    retrieveFavGames: require('./retrieve-fav-games'),
    togglePlayingGame: require('./toggle-playing-game'),
    retrievePlayingGames: require('./retrieve-playing-games'),
    togglePlayedGame: require('./toggle-played-game'),
    retrievePlayedGames: require('./retrieve-played-games')
}