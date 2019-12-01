const express = require('express')
const session = require('express-session')
const users = require('./routes/users.js')
const forum = require('./routes/forum.js')
const bottle = require('./routes/bottle.js')
const bodyParser = require('body-parser') // pour parser les requêtes POST

var app = express()

app.use(bodyParser.urlencoded({ extended: false })) // for simple form posts
app.use(bodyParser.json()) // for API requests
app.use(express.static(__dirname + '/public')) // for css

app.use(session({
  secret: 'mydirtylittlesecret',
  name: 'sessId'
}))

app.use(function (req, res, next) {
  res.locals.user = req.session.username
  next()
})

app.use('/user', users)
app.use('/forum', forum)
app.use('/bottle', bottle)

const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(3000, () => {
  console.log('Application launched on port 3000!')
})

app.get('/', (req, res) => {
  res.send('ok')
})
