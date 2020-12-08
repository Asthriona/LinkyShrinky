const express = require('express');
const mongoose = require('mongoose');
const Config = require('./config.json')
const ShortUrl = require('./models/ShortURL');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
var passport = require('passport');
const DiscordStrategies = require('./strategies/discordstrategies');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(Config.dblink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('open', () => console.log(`MongoDB: Connected to ${mongoose.connection.host}`));

app.use(session({
    secret: Config.secret,
    cookie: {
        maxAge: 60000 * 60 * 72
    },
    saveUninitialized: false,
    name: 'Linky-chan',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.disable('x-powered-by')

const indexRouter = require('./router/index.js')
const apiRouter = require('./router/api.js')
const authRouter = require('./router/auth.js')

app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);

app.listen(Config.port, console.log(`Running on ${Config.port}`))