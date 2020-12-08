var DiscordStrategies = require('passport-discord').Strategy;
var passport = require('passport');
var Site = require('../models/SiteUsers')
const Config = require('../config.json');

passport.serializeUser((user, done) => {
    console.log("Serializing user");
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    console.log("Deserializing user");
    var user = await Site.findById(id);
    if (user) done(null, user)
});

passport.use(new DiscordStrategies({
    clientID: Config.client_ID,
    clientSecret: Config.client_secret,
    callbackURL: '/auth/redirect',
    scope: ['identify']
}, async(accessToken, refreshToken, profile, done) => {
    try {
        var user = await Site.findOne({ did: profile.id });
        if (user) {
            var updatedUser = await Site.findOneAndUpdate({ did: profile.id }, {
                username: profile.username,
                avatar: profile.avatar,
                guilds: profile.guilds,
                local: profile.locale,
            });
            var savedUser = await updatedUser.save();
            done(null, savedUser);
        } else {
            var newUser = await Site.create({
                did: profile.id,
                username: profile.username,
                avatar: profile.avatar,
                guilds: profile.guilds,
                sitePremium: "0",
                local: profile.locale,
            });
            var savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (error) {
        console.log(error);
        done(error, null);
    }
}));