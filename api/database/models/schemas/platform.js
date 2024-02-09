const { Schema } = require('mongoose')

const platform = new Schema({
  name: {
    type: String,
    unique: true
  }
})

module.exports = platform
