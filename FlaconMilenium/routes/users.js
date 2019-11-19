const express = require('express')

// chargement du modèle User
const User = require('../models/user.model.js')

var router = express.Router()

async function tokenToUserMiddleware (req, res, next) {
  console.log('midleWare')
  if (req.session && req.session.userId) {
    req.user = await User.findById(req.session.userId)
  }
  next()
}

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  const person = await User.findOne({ username: req.body.username })
  console.log(person)
  if (person == null) {
    res.send('Error, no such user')
  } else {
    if (req.body.password === person.password) {
      if (req.body.username === req.session.username) {
        req.session.username = person.username
        req.session.userId = person._id
        router.use(tokenToUserMiddleware)
        res.send('Bon retour parmi nous ' + req.body.username + ' !')
      } else {
        req.session.username = person.username
        req.session.userId = person._id
        router.use(tokenToUserMiddleware)
        res.send('Bienvenue ' + req.body.username)
      }
    } else {
      res.send('Error, wrong password')
    }
  }
})

router.get('/register', async (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const person = await User.findOne({ username: req.body.username })
  console.log(person)
  if (person == null) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    })

    await newUser.save()
    res.send('ok, user registered')
  } else {
    res.send('erreur 403, Username already taken')
  }
})

router.get('/logout', (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.send('Au revoir ' + req.user.username + '!')
  } else {
    res.send('Qui étiez-vous ?')
  }
  req.session.destroy()
})

module.exports = router
