const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var rangementSchema = new Schema({
  localisation: { type: String, required: true },
  nom: { type: String, required: true },
  etage: { type: Number, required: true },
  colone: { type: Number, required: true },
  place: { type: Number, required: true },
  description: { type: String, required: true }
})

const Rangement = mongoose.model('Rangement', rangementSchema)

module.exports = Rangement
