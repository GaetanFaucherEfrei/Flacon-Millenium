const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "BOUTEILLE"
var bouteilleSchema = new Schema({
  cadeau: { type: Boolean, required: true }, // 0 = NO, 1 = YES
  donne: { type: Boolean, required: true }, // 0 = NO, 1 = YES
  prix: { type: Number, required: true },
  bouchon: { type: Boolean, required: true }, // 0 = LIEGE, 1 = PLASTIQUE
  dateInput: { type: Date, required: true }, // DATE D'ACQUISITION
  reasonInput: { type: String, required: true }, // CIRCONSTANCE D'ACQUISITION
  dateOutput: { type: Date, required: true }, // DATE DE DEGUSTATION
  reasonOutput: { type: String, required: true }, // CIRCONSTANCE DE DEGUSTATION
  observation: { type: String, required: true }, // AVIS SUR LA BOUTEILLE
  recomandation: { type: String, required: true } // RECOMANDATIONS SUR LA BOUTEILLE
})

const Bouteille = mongoose.model('Bouteille', bouteilleSchema)

module.exports = Bouteille
