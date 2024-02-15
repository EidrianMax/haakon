require('dotenv').config()
const authenticateUser = require('./authenticate-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { CredentialsError, FormatError } = require('@haakon/api-errors')
const bcrypt = require('bcryptjs')

const { MONGO_URL } = process.env

describe('authenticateUser', () => {
  let userId
  const user = {
    name: 'Jhon Doe',
    username: 'jhondoe',
    password: Math.random().toString(36).slice(2)
  }

  beforeAll(async () => {
    mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany()

    const _user = await User.create({
      ...user,
      password: bcrypt.hashSync(user.password)
    })

    userId = _user.id
  })

  it('should succeed with correct credentials for an already existing user', async () => {
    const { username, password } = user

    const id = await authenticateUser(username, password)
    expect(id).toBe(userId)
  })

  it('should fail with incorrect password', async () => {
    const { username, password } = user

    try {
      await authenticateUser(username, password + '-wrong')

      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(CredentialsError)
      expect(error.message).toBe('wrong credentials')
    }
  })

  it('should fail with incorrect username', async () => {
    const { username, password } = user

    try {
      await authenticateUser(username + '-wrong', password)

      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(CredentialsError)
      expect(error.message).toBe('wrong credentials')
    }
  })

  it('should fail with incorrect username and password', async () => {
    const { username, password } = user

    try {
      await authenticateUser(username + '-wrong', password + '-wrong')

      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(CredentialsError)
      expect(error.message).toBe('wrong credentials')
    }
  })

  describe('when parameters are not valid', () => {
    describe('when username is not valid', () => {
      it('should fail when username is not a string', async () => {
        await expect(authenticateUser(true, '123123123')).rejects.toThrow(TypeError)
        await expect(authenticateUser(123, '123123123')).rejects.toThrow(TypeError)
        await expect(authenticateUser({}, '123123123')).rejects.toThrow(TypeError)
        await expect(authenticateUser(() => {}, '123123123')).rejects.toThrow(TypeError)
        await expect(authenticateUser([], '123123123')).rejects.toThrow(TypeError)
      })

      it('should fail when username is empty', async () => {
        await expect(authenticateUser('', '123123123')).rejects.toThrow(FormatError)
        await expect(authenticateUser('   ', '123123123')).rejects.toThrow(FormatError)
      })

      it('should fail when username has spaces', async () => {
        await expect(authenticateUser(' wendypan ', '123123123')).rejects.toThrow(FormatError)
        await expect(authenticateUser('wendy pan', '123123123')).rejects.toThrow(FormatError)
      })

      it('should fail when username length is less that 4 characters', async () => {
        await expect(authenticateUser('wp', '123123123')).rejects.toThrow(FormatError)
      })
    })

    describe('when password is not valid', () => {
      it('should fail when password is not a string', async () => {
        await expect(authenticateUser('wendypan', true)).rejects.toThrow(TypeError)
        await expect(authenticateUser('wendypan', 123)).rejects.toThrow(TypeError)
        await expect(authenticateUser('wendypan', {})).rejects.toThrow(TypeError)
        await expect(authenticateUser('wendypan', () => {})).rejects.toThrow(TypeError)
        await expect(authenticateUser('wendypan', [])).rejects.toThrow(TypeError)
      })

      it('should fail when password is empty', async () => {
        await expect(authenticateUser('wendypan', '')).rejects.toThrow(FormatError)
        await expect(authenticateUser('wendypan', '   ')).rejects.toThrow(FormatError)
      })

      it('should fail when password has spaces', async () => {
        await expect(authenticateUser('wendypan', ' 123123123 ')).rejects.toThrow(FormatError)
        await expect(authenticateUser('wendypan', '123 123 123')).rejects.toThrow(FormatError)
      })

      it('should fail when password length is less that 8 characters', async () => {
        await expect(authenticateUser('wendypan', '123123')).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
