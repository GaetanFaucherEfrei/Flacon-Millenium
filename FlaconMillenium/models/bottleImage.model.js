const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bottleImageSchema = new Schema({
  IDimage: { type: String, required: true },
  IDbottle: { type: String, required: true }
})

const BottleImage = mongoose.model('BottleImage', bottleImageSchema)

module.exports = BottleImage
