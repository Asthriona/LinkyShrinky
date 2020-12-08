const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortURL');

router.get('/user', async(req, res) => {
    const shorts = await ShortUrl.find()
    res.render("back", {
        shorts
    })
});

module.exports = router