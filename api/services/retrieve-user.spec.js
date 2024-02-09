require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')

const { env: { MONGO_URL } } = process

describe('retrieveUser', () => {
  before(() => mongoose.connect(MONGO_URL))

  beforeEach(() => User.deleteMany())

  let user, userId

  beforeEach(async () => {
    user = {
      name: 'Wendy Pan',
      username: 'wendypan',
      password: '123123123'
    }

    const _user = await User.create(user)
    userId = _user.id
  })

  it('should succeed with correct id for an already existing user', async () => {
    const { name, username } = user

    const _user = await retrieveUser(userId)
    expect(_user).to.exist
    expect(_user.name).to.equal(name)
    expect(_user.username).to.equal(username)
  })

  it('should fail with incorrect id', async () => {
    userId = new ObjectId().toString()

    try {
      await retrieveUser(userId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${userId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when id is not valid', () => {
      it('should fail when id is not a string', () => {
        expect(() => retrieveUser(true)).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveUser(123)).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveUser({})).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveUser(() => { })).to.throw(TypeError, 'id is not a string')
        expect(() => retrieveUser([])).to.throw(TypeError, 'id is not a string')
      })

      it('should fail when id is empty or blank', () => {
        expect(() => retrieveUser('')).to.throw(FormatError, 'id is empty or blank')
        expect(() => retrieveUser('   ')).to.throw(FormatError, 'id is empty or blank')
      })

      it('should fail when id has spaces', () => {
        expect(() => retrieveUser(' abcd1234abcd1234abcd1234 ')).to.throw(FormatError, 'id has blank spaces')
        expect(() => retrieveUser('abcd 1234abc d1234abc d1234')).to.throw(FormatError, 'id has blank spaces')
      })

      it('should fail when id is not valid', () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        expect(() => retrieveUser(wrongMongoId)).to.throw(FormatError, 'id is not valid')
      })
    })
  })

  after(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
