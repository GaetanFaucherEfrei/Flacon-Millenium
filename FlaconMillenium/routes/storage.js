const EXPRESS = require('express')
const STORAGE = require('../models/storage.model.js')
var Router = EXPRESS.Router()

global.results = null

Router.post('/add', async (req, res) => {
  if (req.user) {
    new STORAGE({
      location: req.body.location,
      name: req.body.name,
      nbLigne: req.body.nbLigne,
      nbColone: req.body.nbColone,
      nbPlace: req.body.nbPlace,
      description: req.body.description
    }).save()

    // console.log('req.body.content', req.body.content)
    // console.log('req.body.author', req.body.author)

    res.redirect('/storage/list')
  } else {
    req.session.oldUrl = '/storage/add'
    res.redirect('/user/login')
  }
})

Router.get('/add', async (req, res) => {
  if (req.user) {
    res.render('storage/storageAdd', { name: req.user.username })
  } else {
    req.session.oldUrl = '/storage/add'
    res.redirect('/user/login')
  }
})

Router.get('/list', async (req, res) => {
  if (req.user) {
    STORAGE.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('storage/storageList', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    }).sort({ _id: -1 })
  } else {
    req.session.oldUrl = '/storage/list'
    res.redirect('/user/login')
  }
})

Router.get('/unit/:identification', async (req, res) => {
  if (req.user) {
    STORAGE.find({ _id: req.params.identification }, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('storage/storageView', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    })
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.get('/edit/:identification', async (req, res) => {
  if (req.user) {
    STORAGE.find({ _id: req.params.identification }, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('storage/storageEdit', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    })
  } else {
    req.session.oldUrl = '/storage/edit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.post('/edit/:identification', async (req, res) => {
  if (req.user) {
    STORAGE.where({ _id: req.params.identification }).updateOne({
      $set: {
        location: req.body.location,
        name: req.body.name,
        nbLigne: req.body.nbLigne,
        nbColone: req.body.nbColone,
        nbPlace: req.body.nbPlace,
        description: req.body.description
      }
    }).exec()

    var newPath = '/storage/unit/' + req.params.identification
    res.redirect(newPath)
  } else {
    req.session.oldUrl = '/storage/edit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.get('/delete/:identification', async (req, res) => {
  if (req.user) {
    var unit = STORAGE.find({ _id: req.params.identification }, function (err, result) {
      if (err) {
        res.send(err)
      }
    })
    await unit.deleteOne()
    STORAGE.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('storage/storageList', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    })
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

module.exports = Router
