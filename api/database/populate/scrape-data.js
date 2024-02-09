require('dotenv').config()
const mongoose = require('mongoose')
const { models: { Game, Platform, Genre } } = require('../index')
const scrapeGenres = require('./scrape-genres')
const scrapePlatforms = require('./scrape-platforms')
const scrapeGame = require('./scrape-game')

const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_DEV } = process.env

const URI = NODE_ENV === 'development'
  ? MONGO_DB_URI_DEV
  : MONGO_DB_URI

;(async () => {
  try {
    await mongoose.connect(URI)

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
