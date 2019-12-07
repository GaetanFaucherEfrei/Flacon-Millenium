const EXPRESS = require('express')
const SESSION = require('express-session')
const USER = require('./routes/user.js')
const FORUM = require('./routes/forum.js')
const BOTTLE = require('./routes/bottle.js')
const STORAGE = require('./routes/storage.js')
const CATEGORY = require('./routes/category.js')
const STATUS = require('./routes/status.js')
const DESIGNATION = require('./routes/designation.js')
const ACCOMPANIMENT = require('./routes/accompaniment.js')
const IMAGE = require('./routes/image.js')
const BODY_PARSER = require('body-parser') // pour parser les requêtes POST
const MONGOOSE = require('mongoose')
const PATH = require('path')
MONGOOSE.connect('mongodb://localhost/flaconMillenium', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

var App = EXPRESS()

App.use(BODY_PARSER.urlencoded({ extended: false })) // for simple form posts
App.use(BODY_PARSER.json()) // for API requests
App.use(EXPRESS.static(PATH.join(__dirname, '/public'))) // for css

App.use(SESSION({
  secret: 'mydirtylittlesecret',
  name: 'sessId',
  resave: false,
  saveUninitialized: false
}))

App.use(function (req, res, next) {
  res.locals.user = req.session.username
  next()
})

App.use('/user', USER.Router)
App.use(USER.verifUserMiddleWare)
App.use('/forum', FORUM)
App.use('/bottle', BOTTLE)
App.use('/storage', STORAGE)
App.use('/category', CATEGORY)
App.use('/status', STATUS)
App.use('/designation', DESIGNATION)
App.use('/accompaniment', ACCOMPANIMENT)
App.use('/image', IMAGE)

App.set('views', PATH.join(__dirname, 'views'))
App.set('view engine', 'ejs')

App.listen(3000, () => {
  console.log('Application launched on port 3000!')
})

App.get('/', (req, res) => {
  if (req.user) {
    res.status(301).redirect('/home')
  } else {
    res.status(401).redirect('/user/login')
  }
})

App.get('/home', (req, res) => {
  if (req.user) {
    var alert = req.session.alert
    req.session.alert = ''
    res.render('home', { name: req.user.username, alert: alert })
  } else {
    res.status(401).redirect('/user/login')
  }
})

App.all('*', (req, res) => {
  if (req.user) {
    req.session.alert = 'Error : ' + req.get('host') + req.originalUrl + ' does not exist.'
    res.status(301).redirect('/home')
  } else {
    req.session.oldUrl = req.originalUrl
    res.status(401).redirect(301, '/user/login')
  }
})
