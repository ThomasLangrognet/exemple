const router = require('express').Router();
const authRouter = require('./auth').router;

router.use('/auth', authRouter);

router.get('*', (req, res) => {
    res.send('Not found !')
});

module.exports = {
  router
};
