const axios = require('axios')
const { Platform } = require('../models')
const { RAWG_API_URL, RAWG_API_KEY } = process.env

module.exports = async () => {
  let hasMorePlatforms = true
  let page = 1
  const platforms = []

  while (hasMorePlatforms) {
    const { data } = await axios.get(`${RAWG_API_URL}/platforms?key=${RAWG_API_KEY}&page=${page}`)

    platforms.push(...data.results)
    hasMorePlatforms = Boolean(data.next)
    page++
  }

  const platformsNames = platforms.map(({ name }) => ({ name }))
  await Platform.insertMany(platformsNames)
}
