require('dotenv').config()
const { expect } = require('chai')
const { models: { User }, mongoose } = require('@haakon/api-database')
const { FormatError } = require('@haakon/api-errors')
const retrieveFavGames = require('./retrieve-fav-games')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('retrieveFavGames', () => {
  before(() => mongoose.connect(MONGO_URL))

  let user, userId

  describe('Happy Path', () => {
    beforeEach(async () => {
      user = {
        name: 'Wendy Pan',
        username: 'wendypan',
        password: '123123123'
      }

      const _user = await User.create({ ...user, password: bcrypt.hashSync(user.password) })
      userId = _user.id

      const user2 = await User.findById(userId)

      user2.favGames.push('61f953b5c7c1cf74c3abf335', '61f953b5c7c1cf74c3abf333', '61f953b5c7c1cf74c3abf331')

      await user2.save()
    })

    it('shoul be good when retrieve fav games', async () => {
      const gameFavs = await retrieveFavGames(userId)
      expect(gameFavs).to.be.instanceOf(Array)
      expect(gameFavs).to.be.an('array')
      expect(gameFavs).to.be.length(3)

      gameFavs.forEach(gameFav => {
        const { id, name, backgroundImage, platforms, genres, score } = gameFav

        expect(gameFav).to.exist
        expect(gameFav).to.be.a('object')
        expect(gameFav).to.have.all.keys(
          'id',
          'name',
          'backgroundImage',
          'platforms',
          'genres',
          'score')
        expect(id).to.to.be.a('string')
        expect(name).to.to.be.a('string')
        expect(backgroundImage).to.to.be.a('string')
        expect(platforms).to.be.an('array')
        expect(platforms).to.be.instanceOf(Array)
        expect(genres).to.be.an('array')
        expect(genres).to.be.instanceOf(Array)
        expect(score).to.be.a('number')
      })
    })
  })

  describe('when parameters are not valid', () => {
    describe('when id is not valid', () => {
      it('should fail when id is not a string', () => {
        expect(() => retrieveFavGames(true)).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveFavGames(123)).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveFavGames({})).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveFavGames(() => { })).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveFavGames([])).to.throw(TypeError, 'id is not a string')
      })

      it('should fail when id is empty or blank', () => {
        expect(() => retrieveFavGames('')).to.throw(FormatError, 'id is empty or blank')
        expect(() => retrieveFavGames('   ')).to.throw(FormatError, 'id is empty or blank')
      })

      it('should fail when id has spaces', () => {
        expect(() => retrieveFavGames(' abcd1234abcd1234abcd1234 ')).to.throw(FormatError, 'id has blank spaces')
        expect(() => retrieveFavGames('abcd 1234abc d1234abc d1234')).to.throw(FormatError, 'id has blank spaces')
      })

      it('should fail when id is not valid', () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        expect(() => retrieveFavGames(wrongMongoId)).to.throw(FormatError, 'id is not valid')
      })
    })
  })

  after(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
