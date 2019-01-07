const router = require('express').Router();
const auth = require('./auth');

router.use('/auth', authRouter);

router.get('*', (req: Express.Request, res: Express.Response) => {
    res.send('Not found !')
});

module.exports = {
  router
};
