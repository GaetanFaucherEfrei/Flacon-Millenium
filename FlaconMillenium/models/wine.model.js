const mongoose = require('mongoose')
const Schema = mongoose.Schema

var wineSchema = new Schema({
  name: { type: String, required: true },
  vintage: { type: Boolean, required: false },
  alcoholPercentage: { type: Number, required: true },
  bio: { type: Boolean, required: false },
  oakBarrel: { type: Boolean, required: false },
  conservationTime: { type: Date, required: false },
  temperatureConservation: { type: Number, required: false },
  consomationTime: { type: Date, required: false },
  temperatureConsomation: { type: Number, required: false },
  comment: { type: String, required: false },
  IDproducer: { type: String, required: true },
  IDcategory: { type: String, required: true },
  IDdesignation: { type: String, required: true }
})

const Wine = mongoose.model('Wine', wineSchema)

module.exports = Wine
