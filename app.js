const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')
const generateShortUrl = require('./generateShortUrl')
const Url = require('./models/urls')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl
  Url.findOne({ originalUrl })  // 找到資料庫的第一筆符合的資料
    .then(url => {
      //做判斷，找不到時建立資料，並導向成功頁面
      if(!url) {
        const generateRandom = generateShortUrl()
        const shortUrl = `http://localhost:${PORT}/${generateRandom}`
        Url.create({ originalUrl, shortUrl })
          .then(() => res.render('success', { shortUrl, originalUrl }))
          .catch(error => console.log(error))
      //當找到資料時回傳已建立好的資料，並導向成功頁面
      } else {
        const shortUrl = url.shortUrl
        res.render('success', { shortUrl, originalUrl })
      }
    })
    .catch(error => console.log(error))
})

//動態路由，找到短網址的相對應原網址，並導向該網址
app.get('/:shortUrl', (req, res) => {
  const shortUrl = `http://localhost:${PORT}/${req.params.shortUrl}`
  console.log(shortUrl)
  Url.findOne({ shortUrl })
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`)
})