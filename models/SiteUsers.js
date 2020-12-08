var mongoose = require('mongoose');

var SiteShchema = new mongoose.Schema({
    did: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    guilds: { type: Array, required: true },
    sitePremium: { type: String, required: false, default: 0 },
    local: { type: String, required: true },
    isAdmin: { type: String, required: true, default: false }
});

var Site = module.exports = mongoose.model('Site', SiteShchema);