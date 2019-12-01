const mongoose = require('mongoose')
const Schema = mongoose.Schema

var personBottleSchema = new Schema({
  note: { type: Number, required: false },
  consumed: { type: Boolean, required: false },
  comment: { type: String, required: false },
  IDbottle: { type: String, required: true },
  IDperson: { type: String, required: true }
})

const PersonBottle = mongoose.model('PersonBottle', personBottleSchema)

module.exports = PersonBottle
