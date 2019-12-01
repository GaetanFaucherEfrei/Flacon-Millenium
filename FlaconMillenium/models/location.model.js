const mongoose = require('mongoose')
const Schema = mongoose.Schema

var locationSchema = new Schema({
  locationStorage: { type: String, required: true },
  nameStorage: { type: String, required: true },
  ligne: { type: Number, required: true },
  colone: { type: Number, required: true },
  place: { type: Number, required: true },
  description: { type: String, required: false }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
