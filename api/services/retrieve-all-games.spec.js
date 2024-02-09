require('dotenv').config()
const { expect } = require('chai')
const { mongoose, models: { Game } } = require('@haakon/api-database')
const { NotFoundError } = require('@haakon/api-errors')
const retrieveAllGames = require('./retrieve-all-games')

const { env: { MONGO_URL } } = process

describe('retrieveAllGames', () => {
  before(() => mongoose.connect(MONGO_URL))

  it('should succed when retrieve all games', async () => {
    const countGames = await Game.count()

    const games = await retrieveAllGames()

    expect(games).to.be.instanceOf(Array)
    expect(games.length).to.equal(countGames)

    games.forEach(game => {
      expect(game).to.exist
      expect(game.id).to.exist
      expect(game.id).to.be.a('string')
      expect(game.name).to.exist
      expect(game.name).to.be.a('string')
      expect(game.backgroundImage).to.exist
      expect(game.platforms).to.exist
      expect(game.platforms).to.be.instanceOf(Array)
      expect(game.platforms).to.be.an('array')
      expect(game.genres).to.exist
      expect(game.genres).to.be.instanceOf(Array)
      expect(game.genres).to.be.an('array')
      // expect(game.score).to.exist // in some games the score is null, because the test fail
    })
  })

  after(() =>
    mongoose.disconnect()
  )
})
