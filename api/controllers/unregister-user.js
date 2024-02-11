const { unregisterUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization }, body: { password } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    unregisterUser(id, password)
      .then(() => res.status(201).send())
      .catch(next)
  } catch (error) {
    next(error)
  }
}
