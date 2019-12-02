const mongoose = require('mongoose')
const Schema = mongoose.Schema

var commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
