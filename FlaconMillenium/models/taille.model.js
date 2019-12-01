const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var tailleSchema = new Schema({
  nom: { type: String, required: true },
  taille: { type: Number, required: true },
  description: { type: String, required: false }
})

const Taille = mongoose.model('Taille', tailleSchema)

module.exports = Taille
