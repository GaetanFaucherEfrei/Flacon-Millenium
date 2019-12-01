const mongoose = require('mongoose')
const Schema = mongoose.Schema

var WineCepageSchema = new Schema({
  IDcepage: { type: String, required: true },
  IDwine: { type: String, required: true }
})

const WineCepage = mongoose.model('WineCepage', WineCepageSchema)

module.exports = WineCepage
