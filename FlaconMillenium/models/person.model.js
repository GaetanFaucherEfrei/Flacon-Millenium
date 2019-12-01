const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "Person"
var personSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  comment: { type: String, required: true },
  IDuser: { type: String, required: false }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
