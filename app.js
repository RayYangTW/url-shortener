const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('dotenv').config()

const generateShortUrl = require('./generateShortUrl')

const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('monogodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body
  console.log(originalUrl)
  res.render('success')
})

app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`)
})