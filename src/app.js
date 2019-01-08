require('dotenv').config(); //le module qui te permet de récupérer les variables d'envirennement
// stockée dans .env

// expres, LE PACKAGE indispensable, carrément un framework qui te permet de faire du réseau
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // indipensable
const session = require('express-session'); // le package qui te permet de faire des cookies pour l'authentification
const cors = require('cors');// indipensable
const helmet = require('helmet');// rajout de la sécurité
const morgan = require('morgan'); // indipensable pour le développement
const cookieParser = require('cookie-parser');// indipensable

const routes = require('./routes').router; //j'importe mes routes du fichier route

//active les modules importé en faisant via la variable app "express.use"
app.use(cors({origin: process.env.URL_FRONT, credentials: true}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public') );
app.use(bodyParser.json({ limit: '4096kb' }));
app.use(session({
    key: 'user_sid',
    cookie: 'exemple.sess.id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use('/back',routes);

//un middleware appelé à chaque route pour supprimer un cookie qui a été émis entre deux crash du serveur (pour la sécurité)
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.info) {
        res.clearCookie('user_sid');
    }
    next();
});

module.exports = app;
