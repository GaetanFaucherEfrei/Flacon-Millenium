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
  // ID VIN
  // ID STATUTS
  // ID TAILLE
  // ID LOCALISATION
  // ID PROPRIETAIRE
  // ID DONNEUR
  // ID RECEVEUR
  // ID DOSAGE SUCRE
  // ID SERVIT AVEC
})

// DEFINITION DU MODELE "VIN"
var vinSchema = new Schema({

})

const Bouteille = mongoose.model('Bouteille', bouteilleSchema)
const Vin = mongoose.model('Vin', vinSchema)

module.exports = Bouteille
module.exports = Vin
