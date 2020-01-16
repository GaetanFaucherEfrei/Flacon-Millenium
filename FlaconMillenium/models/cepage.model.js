const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cepageSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
  climate: { type: String, required: true },
  description: { type: String, required: false }
})

const Cepage = mongoose.model('Cepage', cepageSchema)

module.exports = Cepage
