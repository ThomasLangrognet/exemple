//la racine du dossier où se trouve mes services 
//require('./service') importe
//automatiquement tout ce qui se trouve dans le fichier index.js du dossier appelé
//(léquivalent plus ou moins d'un __init__.py en python)

//=> j'importe donc tout les services liés à l'authentification définis dans auth.js
const authService = require('./auth');

module.exports = {
  authService
};
