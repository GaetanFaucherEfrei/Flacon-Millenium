const mongoose = require('mongoose')
const Schema = mongoose.Schema

var servedWithSchema = new Schema({
  dishName: { type: String, required: true },
  description: { type: String, required: false },
  IDaccompaniment: { type: String, required: true }
})

const ServedWith = mongoose.model('ServedWith', servedWithSchema)

module.exports = ServedWith
