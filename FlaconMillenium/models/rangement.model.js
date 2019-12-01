const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var rangementSchema = new Schema({
  localisation: { type: String, required: true },
  nom: { type: String, required: true },
  nbEtage: { type: Number, required: true },
  nbColone: { type: Number, required: true },
  nbPlace: { type: Number, required: true },
  description: { type: String, required: false }
})

const Rangement = mongoose.model('Rangement', rangementSchema)

module.exports = Rangement
