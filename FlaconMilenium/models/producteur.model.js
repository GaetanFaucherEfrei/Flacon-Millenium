const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var producteurSchema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: false },
  region: { type: String, required: false },
  pays: { type: String, required: false },
  commentaire: { type: String, required: false },
  telephone: { type: Number, required: false },
  email: { type: String, required: false },
  site: { type: String, required: false }
})

const Producteur = mongoose.model('Producteur', producteurSchema)

module.exports = Producteur
