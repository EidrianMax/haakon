require('dotenv').config()
const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { ConflictError, FormatError } = require('@haakon/api-errors')
const bcrypt = require('bcryptjs')

const { MONGO_URL } = process.env

describe('registerUser', () => {
  const user = {
    name: 'Jhon Doe',
    username: 'jhondoe',
    password: Math.random().toString(36).slice(2)
  }

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany()
  })

  it('should succeed when register new user', async () => {
    const name = 'Wendy Pan'
    const username = 'wendypan'
    const password = Math.random().toString(36).slice(2)

    const userRegistered = await registerUser(name, username, password)
    expect(userRegistered.name).toBe(name)
    expect(userRegistered.username).toBe(username)

    const user = await User.findOne({ username })
    expect(user.name).toBe(userRegistered.name)
    expect(user.username).toBe(userRegistered.username)

    const isMatchPassword = await bcrypt.compare(password, user.password)
    expect(isMatchPassword).toBe(true)
  })

  describe('when user already exists', () => {
    beforeEach(async () => {
      await User.create(user)
    })

    it('should fail when user already exists', async () => {
      const { name, username, password } = user

      try {
        await registerUser(name, username, password)

        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).toBeDefined()
        expect(error).toBeInstanceOf(ConflictError)
        expect(error.message).toBe(`user with username ${username} already exists`)
      }
    })
  })

  describe('when parameters are not valid', () => {
    describe('when name is not valid', () => {
      it('should fail when name is not a string', async () => {
        await expect(registerUser(true, 'wendypan', '123123123')).rejects.toThrow(TypeError, 'name is not a string')
        await expect(registerUser(123, 'wendypan', '123123123')).rejects.toThrow(TypeError, 'name is not a string')
        await expect(registerUser({}, 'wendypan', '123123123')).rejects.toThrow(TypeError, 'name is not a string')
        await expect(registerUser([], 'wendypan', '123123123')).rejects.toThrow(TypeError, 'name is not a string')
        await expect(registerUser(() => {}, 'wendypan', '123123123')).rejects.toThrow(TypeError, 'name is not a string')
      })

      it('should fail when name is empty', async () => {
        await expect(registerUser('', 'wendypan', '123123123')).rejects.toThrow(FormatError, 'name is empty or blank')
        await expect(registerUser('   ', 'wendypan', '123123123')).rejects.toThrow(FormatError, 'name is empty or blank')
      })

      it('should fail when name has spaces around', async () => {
        await expect(registerUser(' Wendy Pan ', 'wendypan', '123123123')).rejects.toThrow(FormatError, 'blank spaces around name')
      })
    })

    describe('when username is not valid', () => {
      it('should fail when username is not a string', async () => {
        await expect(registerUser('Wendy Pan', true, '123123123')).rejects.toThrow(TypeError, 'username is not a string')
        await expect(registerUser('Wendy Pan', 123, '123123123')).rejects.toThrow(TypeError, 'username is not a string')
        await expect(registerUser('Wendy Pan', {}, '123123123')).rejects.toThrow(TypeError, 'username is not a string')
        await expect(registerUser('Wendy Pan', () => { }, '123123123')).rejects.toThrow(TypeError, 'username is not a string')
        await expect(registerUser('Wendy Pan', [], '123123123')).rejects.toThrow(TypeError, 'username is not a string')
      })

      it('should fail when username is empty', async () => {
        await expect(registerUser('Wendy Pan', '', '123123123')).rejects.toThrow(FormatError, 'username is empty or blank')
        await expect(registerUser('Wendy Pan', '   ', '123123123')).rejects.toThrow(FormatError, 'username is empty or blank')
      })

      it('should fail when username has spaces', async () => {
        await expect(registerUser('Wendy Pan', ' wendypan ', '123123123')).rejects.toThrow(FormatError, 'username has blank spaces')
        await expect(registerUser('Wendy Pan', 'wendy pan', '123123123')).rejects.toThrow(FormatError, 'username has blank spaces')
      })

      it('should fail when username length is less that 4 characters', async () => {
        await expect(registerUser('Wendy Pan', 'wp', '123123123')).rejects.toThrow(FormatError, 'username has less than 4 characters')
      })
    })

    describe('when password is not valid', () => {
      it('should fail when password is not a string', async () => {
        await expect(registerUser('Wendy Pan', 'wendypan', true)).rejects.toThrow(TypeError, 'password is not a string')
        await expect(registerUser('Wendy Pan', 'wendypan', 123)).rejects.toThrow(TypeError, 'password is not a string')
        await expect(registerUser('Wendy Pan', 'wendypan', {})).rejects.toThrow(TypeError, 'password is not a string')
        await expect(registerUser('Wendy Pan', 'wendypan', () => { })).rejects.toThrow(TypeError, 'password is not a string')
        await expect(registerUser('Wendy Pan', 'wendypan', [])).rejects.toThrow(TypeError, 'password is not a string')
      })

      it('should fail when password is empty', async () => {
        await expect(registerUser('Wendy Pan', 'wendypan', '')).rejects.toThrow(FormatError, 'password is empty or blank')
        await expect(registerUser('Wendy Pan', 'wendypan', '   ')).rejects.toThrow(FormatError, 'password is empty or blank')
      })

      it('should fail when password has spaces', async () => {
        await expect(registerUser('Wendy Pan', 'wendypan', ' 123123123 ')).rejects.toThrow(FormatError, 'password has blank spaces')
        await expect(registerUser('Wendy Pan', 'wendypan', '123 123 123')).rejects.toThrow(FormatError, 'password has blank spaces')
      })

      it('should fail when password length is less that 8 characters', async () => {
        await expect(registerUser('Wendy Pan', 'wendypan', '123123')).rejects.toThrow(FormatError, 'password has less than 8 characters')
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
