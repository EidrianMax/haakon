const { Schema } = require('mongoose')

const genre = new Schema({
  name: {
    type: String,
    unique: true
  }
})

module.exports = genre
