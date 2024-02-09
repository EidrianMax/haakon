const { model } = require('mongoose')
const { user, game, platform, genre } = require('./schemas')

module.exports = {
  User: model('User', user),
  Game: model('Game', game),
  Platform: model('Platform', platform),
  Genre: model('Genre', genre)
}
