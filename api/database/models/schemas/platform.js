const { Schema } = require('mongoose')

const platform = new Schema({
  name: {
    type: String,
    unique: true
  }
})

platform.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = platform
