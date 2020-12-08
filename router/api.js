const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortURL');

router.post('/', async(req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    console.log(`Link created to ${req.body.fullUrl}`)
    res.redirect('/')
});

module.exports = router