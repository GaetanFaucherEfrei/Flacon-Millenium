const express = require('express')
const session = require('express-session')
const users = require('./routes/users.js')
const forum = require('./routes/forum.js')
const bodyParser = require('body-parser') // pour parser les requêtes POST

var app = express()

app.use(bodyParser.urlencoded({ extended: false })) // for simple form posts
app.use(bodyParser.json()) // for API requests
app.use(express.static(__dirname + '/public')) // for css

app.use(session({
  secret: 'mydirtylittlesecret',
  name: 'sessId'
}))

app.use('/user', users)
app.use('/forum', forum)

const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(3000, () => {
  console.log('Application démarrée sur le port 3000!')
})

app.get('/', (req, res) => {
  res.send('ok')
})
