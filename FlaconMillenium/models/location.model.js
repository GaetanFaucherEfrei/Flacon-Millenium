const mongoose = require('mongoose')
const Schema = mongoose.Schema

var locationSchema = new Schema({
  ligne: { type: Number, required: true },
  colone: { type: Number, required: true },
  place: { type: Number, required: true },
  description: { type: String, required: false },
  IDstorage: { type: String, required: true }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
