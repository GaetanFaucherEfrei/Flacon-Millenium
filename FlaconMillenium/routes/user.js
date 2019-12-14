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
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    res.render('user/login')
  }
})

Router.post('/login', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    const PERSON = await USER.findOne({ username: req.body.username })
    // console.log(PERSON)
    if (PERSON == null) {
      res.render('user/login', { alert: 'Error : no such user.' })
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

            if (req.session.oldUrl && req.session.oldUrl !== '') {
              var newPath = req.session.oldUrl
              req.session.oldUrl = ''
              res.redirect(newPath)
            } else {
              res.status(200).redirect('/home')
            }
          }
        } else {
          res.render('user/login', { alert: 'Error : Wrong password.' })
        }
      })
    }
  }
})

Router.get('/register', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    res.render('user/register')
  }
})

Router.post('/register', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    const PERSON = await USER.findOne({ username: req.body.username })
    // console.log(PERSON)
    if (PERSON == null) {
      if (confirmEmail(req.body.email, req.body.email2)) {
        BCRYPT.hash(req.body.password, SALT_ROUNDS, function (err, passwordhash) {
          if (err) throw err

          new USER({
            username: req.body.username,
            password: passwordhash,
            email: req.body.email
          }).save()
          // res.status(301).redirect('/user/confirm')
          // res.send('ok, user registered. Go <br/> <a href="/user/login">login</a>')
          é
          res.redirect('/confirm')
        })
      }
    } else {
      res.send('erreur 403, Username already taken')
    }
  }
})

function confirmEmail (email, confemail) {
  console.log('email : ' + email)
  console.log('confemail : ' + confemail)
  if (validate(email)) {
    if (email !== confemail) {
      console.log('Email Not Matching!')
      return false
    } else {
      return true
    }
  } else {
    console.log('Email Not valid!')
    return false
  }
}

function validate (email) {
  var model = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (model.test(email)) {
    console.log(email + ' is valid')
    return true
  } else {
    console.log(email + ' is not a valid email.')
    return false
  }
}

Router.get('/confirm', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    var alert = req.session.alert
    req.session.alert = ''
    res.render('user/confirm', { alert: alert })
  }
})

Router.get('/logout', async (req, res) => {
  if (req.user) {
    req.session.destroy()
    res.render('user/logout', { name: req.user.username })
  } else {
    res.redirect('/user/login')
  }
})

Router.get('/delete/:identification', async (req, res) => {
  if (req.user) {
    var unit = USER.find({ _id: req.params.identification }, function (err, result) {
      if (err) {
        res.send(err)
      }
    })
    await unit.deleteOne()
    USER.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('user/userList', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    })
  } else {
    req.session.oldUrl = '/user/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.delete('/unit', async (req, res) => {
  if (req.user) {
    var unit = USER.find({ _id: req.body.id }, function (err, result) {
      if (err) {
        res.send('404')
      }
    })
    await unit.deleteOne()
    res.send('200')
  } else {
    req.session.oldUrl = '/storage/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.get('/list', async (req, res) => {
  if (req.user) {
    USER.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        // console.log('Result: ', result)

        res.render('user/userList', { data: result, name: req.user.username })
      // res.send(JSON.stringify(result))
      }
    }).sort({ _id: -1 }).limit(10)
  } else {
    req.session.oldUrl = '/user/list'
    res.redirect('/user/login')
  }
})

module.exports = {
  Router,
  verifUserMiddleWare
}
