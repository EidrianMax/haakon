const { Schema } = require('mongoose')

const genre = new Schema({
  name: {
    type: String,
    unique: true
  }
})

genre.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = genre
