const EXPRESS = require('express')
const STORAGE = require('../models/storage.model.js')
var Router = EXPRESS.Router()

global.results = null

Router.get('/list', async (req, res) => {
  if (req.user) {
    try {
      STORAGE.find({}, function (err, result) {
        if (err) {
          res.send(err)
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''
          res.render('storage/storageList', { data: result, name: req.user.username, alert: alert })
          // res.send(JSON.stringify(result))
        }
      }).sort({ _id: -1 })
    } catch (error) {
      res.send(403)
    }
  } else {
    req.session.oldUrl = '/storage/list'
    res.redirect('/user/login')
  }
})
// to use with an ajax call
Router.post('/unit', async (req, res) => {
  console.log(req.body)
  if (req.user) {
    try {
      new STORAGE({
        location: req.body.location,
        name: req.body.name,
        nbLigne: req.body.nbLigne,
        nbColone: req.body.nbColone,
        nbPlace: req.body.nbPlace,
        description: req.body.description
      }).save()

      res.send('200')
    } catch (error) {
      res.send(403)
    }
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.get('/unit', async (req, res) => {
  if (req.user) {
    try {
      if (typeof req.body.id === 'undefined') {
        res.redirect('/storage/list')
      } else {
        STORAGE.find({ _id: req.body.id }, function (err, result) {
          if (err) {
            res.send(404)
          } else {
            // console.log('Result: ', result)
            res.render('storage/storageView', { data: result, name: req.user.username })
            // res.send(JSON.stringify(result))
          }
        })
      }
    } catch (error) {
      res.send(403)
    }
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

// to use with an ajax call
Router.patch('/unit', async (req, res) => {
  console.log(req.body)
  if (req.user) {
    try {
      var unit = STORAGE.find({ _id: req.body.id }, function (err, result) {
        if (err) {
          res.send('404')
        }
      })
      await unit.updateOne({
        $set: {
          location: req.body.location,
          name: req.body.name,
          nbLigne: req.body.nbLigne,
          nbColone: req.body.nbColone,
          nbPlace: req.body.nbPlace,
          description: req.body.description
        }
      }).exec()
      res.send('200')
    } catch (error) {
      res.send(403)
    }
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

// to use with an ajax call
Router.delete('/unit', async (req, res) => {
  if (req.user) {
    try {
      var unit = STORAGE.find({ _id: req.body.id }, function (err, result) {
        if (err) {
          res.send('404')
        }
      })
      await unit.deleteOne()
      res.send('200')
    } catch (error) {
      res.send(403)
    }
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

module.exports = Router
