const express = require('express');
const mongoose = require('mongoose');
const Config = require('./config.json')
const ShortUrl = require('./models/ShortURL');
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

mongoose.connect(Config.dblink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('open', () => console.log(`MongoDB: Connected to ${mongoose.connection.host}`));

app.get('/', async(req, res) => {
    const shorts = await ShortUrl.find()
    res.render("index", {
        shorts
    })
})
app.get('/:Poggers', async(req, res) => {
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
})
app.post('/', async(req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.listen(Config.port, console.log(`Running on ${Config.port}`))