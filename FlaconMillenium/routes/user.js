const EXPRESS = require('express')
const BCRYPT = require('bcryptjs')
const SALT_ROUNDS = 10
// chargement du modèle User
const USER = require('../models/user.model.js')

var Router = EXPRESS.Router()

async function tokenToUserMiddleware (req, res, next) {
  console.log('midleWare')
  if (req.session && req.session.userId) {
    req.user = await USER.findById(req.session.userId)
  }
  next()
}

Router.get('/login', (req, res) => {
  res.render('login')
})

Router.post('/login', async (req, res) => {
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
          Router.use(tokenToUserMiddleware)
          res.send('Welcome back ' + req.body.username + ' !')
        } else {
          req.session.username = PERSON.username
          req.session.userId = PERSON._id
          Router.use(tokenToUserMiddleware)
          res.send('<html> <body> Welcome  ' + req.body.username + '<br/> <a href="/forum/comment">Forum</a> </body> </html>')
        }
      } else {
        res.send('Error, wrong password')
      }
    })
  }
})

Router.get('/register', async (req, res) => {
  res.render('register')
})

Router.post('/register', async (req, res) => {
  const PERSON = await USER.findOne({ username: req.body.username })
  console.log(PERSON)
  if (PERSON == null) {
    BCRYPT.hash(req.body.password, SALT_ROUNDS, function (err, passwordhash) {
      if (err) throw err

      new USER({
        username: req.body.username,
        password: passwordhash
      }).save()
      res.send('ok, user registered')
    })
  } else {
    res.send('erreur 403, Username already taken')
  }
})

Router.get('/logout', (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.send('Goodbye ' + req.user.username + '!')
  } else {
    res.send('Who were you ?')
  }
  req.session.destroy()
})

module.exports = Router
