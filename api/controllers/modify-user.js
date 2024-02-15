const { modifyUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization }, body: data } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    await modifyUser(id, data)

    res.status(202).send()
  } catch (error) {
    next(error)
  }
}
