const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var cepageSchema = new Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, required: true },
  pays: { type: String, required: true },
  climat: { type: String, required: true },
  description: { type: String, required: true }
})

const Cepage = mongoose.model('Cepage', cepageSchema)

module.exports = Cepage
