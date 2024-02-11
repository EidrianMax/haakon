const { registerUser } = require('@haakon/api-services')

module.exports = (req, res, next) => {
  const { body: { name, username, password } } = req

  try {
    registerUser(name, username, password)
      .then(() => res.status(201).send())
      .catch(next)
  } catch (error) {
    next(error)
  }
}
