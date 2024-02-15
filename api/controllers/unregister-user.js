const { unregisterUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization }, body: { password } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    await unregisterUser(id, password)

    res.status(201).send()
  } catch (error) {
    next(error)
  }
}
