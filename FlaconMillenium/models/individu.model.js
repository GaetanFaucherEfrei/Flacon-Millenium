const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var individuSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  commentaire: { type: String, required: true },
  IDuser: { type: String, required: false }
})

const Individu = mongoose.model('Individu', individuSchema)

module.exports = Individu
