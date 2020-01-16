const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bottleSchema = new Schema({
  gift: { type: Boolean, required: true }, // 0 = NO, 1 = YES
  given: { type: Boolean, required: true }, // 0 = NO, 1 = YES
  price: { type: Number, required: true },
  corkscrew: { type: Boolean, required: true }, // 0 = LIEGE, 1 = PLASTIQUE
  dateInput: { type: Date, required: true }, // DATE D'ACQUISITION
  reasonInput: { type: String, required: true }, // CIRCONSTANCE D'ACQUISITION
  dateOutput: { type: Date, required: true }, // DATE DE DEGUSTATION
  reasonOutput: { type: String, required: true }, // CIRCONSTANCE DE DEGUSTATION
  observation: { type: String, required: true }, // AVIS SUR LA BOUTEILLE
  recomandation: { type: String, required: true }, // RECOMANDATIONS SUR LA BOUTEILLE
  IDwine: { type: String, required: true }, // ID VIN
  IDstatus: { type: String, required: true }, // ID STATUTS
  IDsize: { type: String, required: true }, // ID TAILLE
  IDlocation: { type: String, required: true }, // ID LOCALISATION
  IDowner: { type: String, required: true }, // ID PROPRIETAIRE
  IDgiver: { type: String, required: false }, // ID DONNEUR
  IDrecipient: { type: String, required: false }, // ID RECEVEUR
  IDdosage: { type: String, required: false }, // ID DOSAGE SUCRE
  IDservedWith: { type: String, required: false }// ID SERVIT AVEC
})

const Bottle = mongoose.model('Bottle', bottleSchema)

module.exports = Bottle
