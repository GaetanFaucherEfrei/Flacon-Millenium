const EXPRESS = require('express')
const SESSION = require('express-session')
const USER = require('./routes/user.js')
const FORUM = require('./routes/forum.js')
const BOTTLE = require('./routes/bottle.js')
const BODY_PARSER = require('body-parser') // pour parser les requêtes POST
const MONGOOSE = require('mongoose')
const PATH = require('path')
MONGOOSE.connect('mongodb://localhost/flaconMillenium')

var App = EXPRESS()

App.use(BODY_PARSER.urlencoded({ extended: false })) // for simple form posts
App.use(BODY_PARSER.json()) // for API requests
App.use(EXPRESS.static(PATH.join(__dirname, '/public'))) // for css

App.use(SESSION({
  secret: 'mydirtylittlesecret',
  name: 'sessId'
}))

App.use(function (req, res, next) {
  res.locals.user = req.session.username
  next()
})

App.use('/user', USER)
App.use('/forum', FORUM)
App.use('/bottle', BOTTLE)

App.set('views', PATH.join(__dirname, 'views'))
App.set('view engine', 'ejs')

App.listen(3000, () => {
  console.log('Application launched on port 3000!')
})

App.get('/', (req, res) => {
  res.send('ok')
})
