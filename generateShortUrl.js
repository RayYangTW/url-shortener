const letters = "abcdefghijklmnopqrstuvwxyz"
const upperLetters = letters.toLocaleUpperCase()
const numbers = '0123456789'
const arr = letters.concat(upperLetters).concat(numbers).split('')

function generateShortUrl() {
  let shortUrl = ''
  for(let i = 0; i < 5; i++) {
    let arrIndex = Math.floor(Math.random()*arr.length) + 1
    shortUrl += arr[arrIndex]
  }
return shortUrl
}

module.exports = generateShortUrl