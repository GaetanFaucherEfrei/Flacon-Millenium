const express = require('express')
const bcrypt = require('bcryptjs')
const saltRounds = 10

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
    bcrypt.compare(req.body.password, person.password, function (err, result) {
      if (err) throw err

      if (result) {
        if (req.body.username === req.session.username) {
          req.session.username = person.username
          req.session.userId = person._id
          router.use(tokenToUserMiddleware)
          res.send('Welcome back ' + req.body.username + ' !')
        } else {
          req.session.username = person.username
          req.session.userId = person._id
          router.use(tokenToUserMiddleware)
          res.send('<html> <body> Welcome  ' + req.body.username + '<br/> <a href="/forum/comment">Forum</a> </body> </html>')
        }
      } else {
        res.send('Error, wrong password')
      }
    })
  }
})

router.get('/register', async (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const person = await User.findOne({ username: req.body.username })
  console.log(person)
  if (person == null) {
    bcrypt.hash(req.body.password, saltRounds, function (err, passwordhash) {
      if (err) throw err

      const newUser = new User({
        username: req.body.username,
        password: passwordhash
      })
      newUser.save()
      res.send('ok, user registered')
    })
  } else {
    res.send('erreur 403, Username already taken')
  }
})

router.get('/logout', (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.send('Goodbye ' + req.user.username + '!')
  } else {
    res.send('Who were you ?')
  }
  req.session.destroy()
})

module.exports = router
