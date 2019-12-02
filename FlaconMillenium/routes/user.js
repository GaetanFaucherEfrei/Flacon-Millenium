const EXPRESS = require('express')
const BCRYPT = require('bcryptjs')
const SALT_ROUNDS = 10
// chargement du modèle User
const USER = require('../models/user.model.js')

var Router = EXPRESS.Router()

var verifUserMiddleWare = async function (req, res, next) {
  if (req.session && req.session.userId) {
    req.user = await USER.findById(req.session.userId)
  }
  next()
}
Router.use(verifUserMiddleWare)

Router.get('/login', (req, res) => {
  // console.log('login')
  if (req.user) {
    res.render('menu', { name: req.user.username })
  } else {
    res.render('login')
  }
})

Router.post('/login', async (req, res) => {
  if (req.user) {
    res.render('menu', { name: req.user.username })
  } else {
    const PERSON = await USER.findOne({ username: req.body.username })
    console.log(PERSON)
    if (PERSON == null) {
      res.send('Error, no such user')
    } else {
      BCRYPT.compare(req.body.password, PERSON.password, function (err, result) {
        if (err) throw err

        if (result) {
          if (req.body.username === req.session.username) {
            req.session.username = PERSON.username
            req.session.userId = PERSON._id
            res.send('Welcome back ' + req.body.username + ' !')
          } else {
            req.session.username = PERSON.username
            req.session.userId = PERSON._id

            res.render('menu', { name: req.session.username })
          }
        } else {
          res.send('Error, wrong password')
        }
      })
    }
  }
})

Router.get('/register', async (req, res) => {
  if (req.user) {
    res.render('menu', { name: req.user.username })
  } else {
    res.render('register')
  }
})

Router.post('/register', async (req, res) => {
  if (req.user) {
    res.render('menu', { name: req.user.username })
  } else {
    const PERSON = await USER.findOne({ username: req.body.username })
    console.log(PERSON)
    if (PERSON == null) {
      BCRYPT.hash(req.body.password, SALT_ROUNDS, function (err, passwordhash) {
        if (err) throw err

        new USER({
          username: req.body.username,
          password: passwordhash
        }).save()
        res.send('ok, user registered. Go <br/> <a href="/user/login">login</a>')
      })
    } else {
      res.send('erreur 403, Username already taken')
    }
  }
})

Router.get('/logout', async (req, res) => {
  if (req.user) {
    req.session.destroy()
    res.render('logout', { name: req.user.username })
  } else {
    res.redirect('/user/login')
  }
})

module.exports = {
  Router,
  verifUserMiddleWare
}
