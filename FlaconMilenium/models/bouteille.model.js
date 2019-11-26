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
  recomandation: { type: String, required: true }, // RECOMANDATIONS SUR LA BOUTEILLE
  IDvin: { type: String, required: true }, // ID VIN
  IDstatus: { type: String, required: true }, // ID STATUTS
  IDtaille: { type: String, required: true }, // ID TAILLE
  IDlocalisation: { type: String, required: true }, // ID LOCALISATION
  IDproprietaire: { type: String, required: true }, // ID PROPRIETAIRE
  IDdonneur: { type: String, required: true }, // ID DONNEUR
  IDreceveur: { type: String, required: true }, // ID RECEVEUR
  IDdosage: { type: String, required: true }, // ID DOSAGE SUCRE
  IDservitavec: { type: String, required: true }// ID SERVIT AVEC
})

// DEFINITION DU MODELE "VIN"
var vinSchema = new Schema({

})

const Bouteille = mongoose.model('Bouteille', bouteilleSchema)
const Vin = mongoose.model('Vin', vinSchema)

module.exports = Bouteille
module.exports = Vin
