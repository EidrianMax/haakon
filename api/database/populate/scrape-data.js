require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`
})
const mongoose = require('mongoose')
const { models: { Game, Platform, Genre } } = require('../index')
const scrapeGenres = require('./scrape-genres')
const scrapePlatforms = require('./scrape-platforms')
const scrapeGame = require('./scrape-game')

const { MONGO_DB_URI } = process.env

;(async () => {
  try {
    await mongoose.connect(MONGO_DB_URI)

    await Platform.deleteMany()
    await Game.deleteMany()
    await Genre.deleteMany()

    await scrapePlatforms()
    await scrapeGenres()
    await scrapeGame()
    console.log('🚀 scrape successfully, check your database')
  } catch (error) {
    console.log(error)
  } finally {
    mongoose.disconnect()
  }
})()
