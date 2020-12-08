const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortURL');

router.get('/', async(req, res) => {
    const shorts = await ShortUrl.find()
    res.render("index", {
        shorts,
        req
    })
});
router.get('/:Poggers', async(req, res) => {
    console.log(req.params.Poggers)
    await ShortUrl.findOne({
        short: req.params.Poggers
    }, async(err, url) => {
        console.log(url)
        if (err) return res.send(err)
        if (url == null) return res.sendStatus(404);
        url.clicks++
            await url.save()
        res.redirect(url.full)
    })
});
module.exports = router