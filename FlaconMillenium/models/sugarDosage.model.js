const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION OF THE MODEL "SugarDosage"
var sugarDosageSchema = new Schema({
  name: { type: String, required: true },
  dosage: { type: Number, required: true },
  description: { type: String, required: false }
})

const SugarDosage = mongoose.model('SugarDosage', sugarDosageSchema)

module.exports = SugarDosage
