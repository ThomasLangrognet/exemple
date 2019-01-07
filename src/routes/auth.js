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

export default router;
