//la liste de mes routes qui gère l'authentification et qui font appelle aux controllers d'authentification

// IMPORTANT req et res sont des objet fourni par express
// dans req tu as accès aux paramètres des requêtes http
// et res te permet de resume un requête http (d'y répondre)
// express te fourni aussi next que j'utilise dans mes checker qui sont des controllers qui vérifient
// si un propriétée est vrai, comme si tu est admin par exemple, et font next si tu est admin et renvoit
// une réponde négativ si tu n el'ai pas. next sert à "passer à la suite", donc "autoriser la suite de la fonction"

//https://expressjs.com/fr/guide/routing.html

const router = require('express').Router();
const authController = require('../controllers').authController;

router.post('/login', function (req, res) {
    authController.login(req, res);
});

router.post('/logout', function (req, res) {
    authController.logout(req, res);
});

router.post('/registerClient', function (req, res) {
    authController.registerClient(req, res);
});

router.post('/registerAdmin', function (req, res) {
    authController.registerAdmin(req, res);
});

router.post('/deleteClient', function (req, res) {
    authController.deleteClient(req, res);
});

router.post('/deleteAdmin', function (req, res) {
    authController.deleteAdmin(req, res);
});

router.get('/isAuthenticated', function (req, res) {
    authController.isAuthenticated(req, res);
});

module.exports = {
  router
};
