const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortURL');

router.post('/', async(req, res) => {
    console.log(req.body.slug)
    if(!req.body.slug){
        await ShortUrl.create({ full: req.body.fullUrl })
    }else{
        const slug = req.body.slug
        ShortUrl.findOne({
            short: slug
        }, async (err, sluggy)=>{
            console.log(err)
            if(!sluggy){
                const newLink = new ShortUrl({
                    full: req.body.fullUrl,
                    short: req.body.slug
                })
                await newLink.save()
                .then(res.redirect("/"))
            }else{
                res.status(400).send({message: "this slug is already in use."})
            }
            
        })
        
        const shortWithSlug = await ShortUrl.create({

        })
        shortWithSlug.save()
    }
    console.log(`Link created to ${req.body.fullUrl}`)
    res.redirect('/')
});

module.exports = router