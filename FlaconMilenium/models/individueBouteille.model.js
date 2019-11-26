const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var individuBouteilleSchema = new Schema({
  note: { type: Number, required: false },
  consommer: { type: Boolean, required: false },
  commentaire: { type: String, required: false },
  IDbouteille: { type: String, required: true },
  IDindividue: { type: String, required: true }
})

const IndividuBouteille = mongoose.model('IndividuBouteille', individuBouteilleSchema)

module.exports = IndividuBouteille
