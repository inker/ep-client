

process.env.TZ = 'Europe/Moscow'

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
// var device = require('express-device');

const db = require('./db')

const app = express()

app.set('views', `${__dirname}/views`)
app.set('view cache', true)

app.use(require('compression')()) // should be first

app.use(bodyParser.urlencoded({ extended: false })) // to support URL-encoded bodies
app.use(bodyParser.json()) // to support JSON-encoded bodies

app.use('/', require('./routes'))

app.use(express.static(`${__dirname}/client`))

const server = http.createServer(app)

db().then(() => {
  server.listen(process.env.PORT, process.env.IP, () => console.log('http started!'))
})
