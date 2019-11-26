const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var localisationSchema = new Schema({
  localisationRangement: { type: String, required: true },
  nomRangement: { type: String, required: true },
  etage: { type: Number, required: true },
  colone: { type: Number, required: true },
  place: { type: Number, required: true },
  description: { type: String, required: false }
})

const Localisation = mongoose.model('Localisation', localisationSchema)

module.exports = Localisation
