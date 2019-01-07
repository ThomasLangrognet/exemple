require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const routes = require('./routes/index').router;

const PORT = process.env.PORT;
const server = http.createServer();
server.listen({
    port: PORT
}, () => {
    console.log('Server is listening on port ' + PORT);
});

app.use(cors({origin: process.env.URL_FRONT, credentials: true}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public') );
app.use(bodyParser.json({ limit: '4096kb' }));
app.use(session({
    key: 'user_sid',
    cookie: 'coldpad.sess.id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.info) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use('/back',routes);


module.exports = app;
