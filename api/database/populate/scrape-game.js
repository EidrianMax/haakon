/* eslint-disable camelcase */
const axios = require('axios')
const { Platform, Genre, Game } = require('../models')

const { RAWG_API_URL, RAWG_API_KEY } = process.env

module.exports = async () => {
  // scrape 100 games
  for (let i = 1; i <= 5; i++) {
    const res = await axios.get(`${RAWG_API_URL}/games?key=${RAWG_API_KEY}&page=${i}`)

    const { results } = res.data

    await Promise.all(
      results.map(async (gameInApi) => {
        const { id, name, released, background_image, metacritic, platforms, genres, short_screenshots } = gameInApi

        const platformsToGame = await Promise.all(platforms.map(async ({ platform: { name } }) => {
          const platformInDB = await Platform.findOne({ name })

          return platformInDB._id
        }))

        const genresToGame = await Promise.all(genres.map(async ({ name }) => {
          const genreInDB = await Genre.findOne({ name })

          return genreInDB._id
        }))

        const screenshots = short_screenshots.map(({ image }) => {
          const a = image

          return a
        })

        const { data: { website, description_raw } } = await axios.get(`${RAWG_API_URL}/games/${id}?key=${RAWG_API_KEY}`)

        const game = {
          name,
          released,
          backgroundImage: background_image,
          score: metacritic,
          screenshots,
          description: description_raw,
          website,
          platforms: platformsToGame,
          genres: genresToGame
        }

        await Game.create(game)
      }))
  }
}
