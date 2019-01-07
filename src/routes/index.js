const router = require('express').Router();
const authRouter = require('./auth').router;

router.use('/auth', authRouter);

router.get('/',function(req,res){
  res.status(200).send('Hello World')
})

module.exports = {
  router
};
