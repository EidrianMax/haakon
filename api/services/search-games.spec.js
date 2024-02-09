require('dotenv').config()
const { expect } = require('chai')
const { mongoose } = require('@haakon/api-database')
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const searchGames = require('./search-games')

const { env: { MONGO_URL } } = process

describe('searchGames', () => {
  before(() => mongoose.connect(MONGO_URL))

  it('should succeed when found correct games', async () => {
    const query = 'grand'

    const games = await searchGames(query)

    expect(games).to.be.instanceOf(Array)

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

  it('should fail with doesn\'t found any game', async () => {
    const query = 'grandtheft'

    try {
      await searchGames(query)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('no game found with that match')
    }
  })

  describe('when parameter are not valid', () => {
    describe('when query is not valid', () => {
      it('should fail when query is not a string', () => {
        expect(() => searchGames(true)).to.throw(TypeError, 'query is not a string')
        expect(() => searchGames(123)).to.throw(TypeError, 'query is not a string')
        expect(() => searchGames({})).to.throw(TypeError, 'query is not a string')
        expect(() => searchGames(() => { })).to.throw(TypeError, 'query is not a string')
        expect(() => searchGames([])).to.throw(TypeError, 'query is not a string')
      })

      it('should fail when query is empty or blank', () => {
        expect(() => searchGames('')).to.throw(FormatError, 'query is empty or blank')
        expect(() => searchGames('   ')).to.throw(FormatError, 'query is empty or blank')
      })
    })
  })

  after(() =>
    mongoose.disconnect()
  )
})
