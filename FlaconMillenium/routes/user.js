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
          if(PERSON.confirmStatus === 1){
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
          }
          else{
            res.render('user/confirm', { alert: 'Error : The account is not confirmed.' })
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
    var alert = req.session.alert
    req.session.alert = ''
    res.render('user/register', { alert: alert })
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
        BCRYPT.hash(req.body.password, SALT_ROUNDS, async function (err, passwordhash) {
          if (err) throw err

          await new USER({
            username: req.body.username,
            password: passwordhash,
            confirmStatus: 0,
            comfirmationCode: Math.floor(Math.random() * (10000 - 1000) + 1000),
            email: req.body.email
          }).save()
          // res.status(301).redirect('/user/confirm')
          // res.send('ok, user registered. Go <br/> <a href="/user/login">login</a>')
          USER.find({username: req.body.username }, function (error, result){
            if (err) throw err
            res.redirect('/user/confirm/?var=' + result[0]._id )
          })
        })
      } else {
        req.session.alert = 'The mail field is not valid.'
        res.redirect('/user/register')
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
    console.log('var : ' + req.query.var)
    res.render('user/confirm', { alert: alert, userID : req.query.var })
  }
})

Router.get('/confirmationForm', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    var alert = req.session.alert
    req.session.alert = ''
    res.render('user/confirmationForm', { alert: alert})
  }
})

Router.post('/confirm', async (req, res) => {
  if (req.user) {
    req.session.alert = 'You are already logged in.'
    res.status(301).redirect('/home')
  } else {
    var user = await USER.findById(req.body.id)
    if(user.confirmStatus === 0){
      console.log('code: '+ req.body.code)
      console.log('comfirmationCode: '+ user.comfirmationCode)
      if(req.body.code == user.comfirmationCode){
        user.confirmStatus = 1
        user.save()

        var alert = req.session.alert
        req.session.alert = ''
        res.render('user/login', { alert: alert})
      }else{
        res.status(400).send('Bad comfirmation')
      }
    }else{
      res.status(400).send('This account is already comfirmed')
    }
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
    req.session.oldUrl = '/user/unit/' + req.params.identification
    res.redirect('/user/login')
  }
})

Router.get('/list', async (req, res) => {
  try {
    if (req.user) {
      USER.find({}, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          notFound(req, res, 0)
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''

          res.format({
            'text/html': function () {
              res.status(200).render('user/userList', { data: result, name: req.user.username, alert: alert })
            },

            'application/json': function () {
              res.status(200).send(result)
            },

            default: function () {
              res.status(200).render('user/userView', { data: result, name: req.user.username })
            }
          })
        }
      }).sort({ _id: -1 })
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(403).send('There was an error with our server.')
  }
})

Router.get('/unit', async (req, res) => {
  try {
    if (req.user) {
      if (typeof req.query.id === 'undefined') {
        // console.log('The unit did not exist.')
        notFound(req, res, 0)
      } else {
        USER.findById({ _id: req.query.id }, function (error, result) {
          if (error) {
            // console.log('The unit did not exist.')
            notFound(req, res, 1)
          } else {
            if (result) {
              res.format({
                'text/html': function () {
                  res.status(200).render('user/userView', { data: result, name: req.user.username })
                },

                'application/json': function () {
                  res.status(200).send(result)
                },

                default: function () {
                  res.status(200).render('user/userView', { data: result, name: req.user.username })
                }
              })
            } else {
              notFound(req, res, 1)
            }
          }
        })
      }
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(520).send('There was an error with our server.')
  }
})

function notFound (req, res, alert) {
  res.format({
    'text/html': function () {
      if (alert) {
        req.session.alert = 'Error : The location was not found.'
      }
      res.status(404).redirect('/home')
    },

    'application/json': function () {
      res.status(404).send('Error : The location was not found.')
    },

    default: function () {
      if (alert) {
        req.session.alert = 'Error : The location was not found.'
      }
      res.status(404).redirect('/home')
    }
  })
}

module.exports = {
  Router,
  verifUserMiddleWare
}
