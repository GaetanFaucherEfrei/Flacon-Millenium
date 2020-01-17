const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bottleSchema = new Schema({
  gift: { type: Boolean, required: false }, // 0 = NO, 1 = YES
  given: { type: Boolean, required: false }, // 0 = NO, 1 = YES
  price: { type: Number, required: false },
  corkscrew: { type: Boolean, required: false }, // 0 = LIEGE, 1 = PLASTIQUE
  dateInput: { type: Date, required: false }, // DATE D'ACQUISITION
  reasonInput: { type: String, required: false }, // CIRCONSTANCE D'ACQUISITION
  dateOutput: { type: Date, required: false }, // DATE DE DEGUSTATION
  reasonOutput: { type: String, required: false }, // CIRCONSTANCE DE DEGUSTATION
  observation: { type: String, required: false }, // AVIS SUR LA BOUTEILLE
  recomandation: { type: String, required: false }, // RECOMANDATIONS SUR LA BOUTEILLE
  IDwine: { type: String, required: false }, // ID VIN
  IDstatus: { type: String, required: false }, // ID STATUTS
  IDsize: { type: String, required: false }, // ID TAILLE
  IDlocation: { type: String, required: false }, // ID LOCALISATION
  IDowner: { type: String, required: false }, // ID PROPRIETAIRE
  IDgiver: { type: String, required: false }, // ID DONNEUR
  IDrecipient: { type: String, required: false }, // ID RECEVEUR
  IDsugarDosage: { type: String, required: false }, // ID DOSAGE SUCRE
  IDservedWith: { type: String, required: false }// ID SERVIT AVEC
})

const Bottle = mongoose.model('Bottle', bottleSchema)

module.exports = Bottle
