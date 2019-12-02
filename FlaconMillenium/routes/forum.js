const express = require('express')
const Forum = require('../models/forum.model.js')
const mongoose = require('mongoose')
var router = express.Router()

global.results = null

router.post('/comment', async (req, res) => {
  const DateSave = new Date()
  const Comment = await new Forum({
    content: req.body.content,
    author: req.session.username,
    date: DateSave
  })

  // console.log('req.body.content', req.body.content)
  // console.log('req.body.author', req.body.author)

  await Comment.save()
  console.log('global results', global.results)
  res.render('forum', { data: global.results })
})

router.get('/comment', async (req, res) => {
  const url = 'mongodb://127.0.0.1:27017/Forum'
  mongoose.connect(url, function (err, db) {
    if (err) throw err

    db.createCollection('comment', function (err, res) {
      if (err) throw err
      console.log('Collection created!')
    })
    var coll = db.collection('comments')

    coll.find({}).limit(10).sort({ _id: -1 }).toArray(function (err, result) {
      if (err) {
        res.send(err)
      } else {
        global.results = result
        // console.log('Result: ', result)
        res.render('forum', { data: global.results })
        // res.send(JSON.stringify(result))
      }
    })
  })
})

module.exports = router
