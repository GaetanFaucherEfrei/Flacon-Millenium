const mongoose = require('mongoose')
const Schema = mongoose.Schema

var wineAccompanimentSchema = new Schema({
  IDaccompaniment: { type: String, required: true },
  IDwine: { type: String, required: true }
})

const WineAccompaniment = mongoose.model('WineAccompaniment', wineAccompanimentSchema)

module.exports = WineAccompaniment
