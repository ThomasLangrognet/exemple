const bcrypt = require('bcryptjs'); // un module qui te fournit des fonctions liées à la sécurité
// comme notamment des fonctions de hash et de salt
// IMPORTANT pour savoir comment est fait une authentification tu dois savoir comment est
//stocké un mot de passe (jamais en clair mais hashé avec une fonction de hash + un salt)
//https://fr.wikipedia.org/wiki/Fonction_de_hachage
//https://fr.wikipedia.org/wiki/Salage_(cryptographie)

//IMPORTANT comme toute fonction que je définis, j'utilise massivement les promises
//pour gérer l'asynchrone engendré par node
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
// j'utilise les promises pour des fonctions comme ici un service qui doit retourner une valeur

//hash et salt un password
function hashANDsalt_password(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) { throw err; }
      bcrypt.hash(password, salt, function (err, password_hashedANDsalted) {
        if (err) { throw err; }
        resolve(password_hashedANDsalted);
      });
    });
  });
};

// compare un password recu en clair avec le password stocké hashé et salté
function comparePassword(candidate_password, password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidate_password,password_hashedANDsalted, function(err, same) {
      if (err) { throw err; }
      resolve(same)
    });
  });
};

module.exports = {
  hashANDsalt_password,
  comparePassword
};
