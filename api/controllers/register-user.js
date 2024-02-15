const { registerUser } = require('@haakon/api-services')

module.exports = async (req, res, next) => {
  const { body: { name, username, password } } = req

  try {
    const userRegistered = await registerUser(name, username, password)

    res.status(201).json(userRegistered)
  } catch (error) {
    next(error)
  }
}
