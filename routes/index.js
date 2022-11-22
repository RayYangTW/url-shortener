const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const Url = require('../models/urls')

router.use('/', home)

module.exports = router