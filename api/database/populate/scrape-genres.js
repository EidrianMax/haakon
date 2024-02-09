const axios = require('axios')
const { Genre } = require('../models')
const { RAWG_API_URL, RAWG_API_KEY } = process.env

module.exports = async () => {
  let hasMoreGenres = true
  let page = 1
  const genres = []

  while (hasMoreGenres) {
    const { data } = await axios.get(`${RAWG_API_URL}/genres?key=${RAWG_API_KEY}&page=${page}`)

    genres.push(...data.results)

    hasMoreGenres = Boolean(data.next)

    page++
  }

  const genresNames = genres.map(({ name }) => ({ name }))

  await Genre.insertMany(genresNames)
}
