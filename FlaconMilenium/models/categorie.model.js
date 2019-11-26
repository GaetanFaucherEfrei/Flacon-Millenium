const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var categorieSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true }
})

const Categorie = mongoose.model('Categorie', categorieSchema)

module.exports = Categorie
