const mongoose = require('mongoose')
const Schema = mongoose.Schema

var designationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }
})

const Designation = mongoose.model('Designation', designationSchema)

module.exports = Designation
