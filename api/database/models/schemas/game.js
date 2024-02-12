const { Schema, Types: { ObjectId } } = require('mongoose')

const game = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  released: {
    type: Date
  },
  backgroundImage: {
    type: String
  },
  screenshots: [{
    type: String
  }],
  platforms: [
    {
      type: ObjectId,
      ref: 'Platform'
    }
  ],
  genres: [
    {
      type: ObjectId,
      ref: 'Genre'
    }
  ],
  score: {
    type: Number
  },
  website: {
    type: String
  },
  isFav: {
    type: Boolean
  }
})

game.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = game
