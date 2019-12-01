const mongoose = require('mongoose')
const Schema = mongoose.Schema

var accompanimentSchema = new Schema({
  dishType: { type: String, required: true },
  description: { type: String, required: false }
})

const Accompaniment = mongoose.model('Accompaniment', accompanimentSchema)

module.exports = Accompaniment
