//la racine du dossier où se trouve mes routes (qui gère les vues,
//c'est à dire ce que récupère l'utilisateur en appelant une route)
//require('./routes') importe
//automatiquement tout ce qui se trouve dans le fichier index.js du dossier appelé
//(léquivalent plus ou moins d'un __init__.py en python)

//=> j'importe donc toutes les routes liées à l'authentification définis dans auth.js


const router = require('express').Router();
const authRouter = require('./auth').router;

// renseigne toi sur le module router de express

router.use('/auth', authRouter);

router.get('/',function(req,res){
  res.status(200).send('Hello World')
})

module.exports = {
  router
};
