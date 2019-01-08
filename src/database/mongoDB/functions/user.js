const userModel = require('../models').userModel;

// ici je défini les fameuses fonctions qui seront stockées dans userFunctions

//IMPORTANT comme toute fonction que je définis, j'utilise massivement les promises
//pour gérer l'asynchrone engendré par node
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
// j'utilise les promises pour des fonctions comme ici une fonction de userFunctions qui doit retourner une valeur

function addClient(username,password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    userModel.create({username: username, password_hashedANDsalted: password_hashedANDsalted, isAdmin: false}, function(err,result) {
      if (err) {reject()}
      resolve();
    })
  })
}

function addAdmin(username,password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    userModel.create({username: username, password_hashedANDsalted: password_hashedANDsalted, isAdmin: true}, function(err,result) {
      if (err) { throw err; }
      resolve();
    })
  })
}

function deleteClientOrAdmin(username) {
  return new Promise((resolve, reject) => {
    userModel.deleteOne({username: username}, function(err,result) {
      if (err) { throw err; }
      resolve();
    });
  });
}

function exists(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({username: username}, function(err,result) {
      if (err) { throw err; }
      else {
        if(result){
          resolve(true);
        }else{
          resolve(false);
        }
      }
    })
  })
}

function findUser(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({username: username}, function(err,user) {
      if (err) { throw err; }
      resolve(user);
    })
  })
}

function status(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({username: username}, 'isAdmin', function(err,status) {
      if (err) { throw err; }
      resolve(status);
    })
  })
}


module.exports = {
  addClient,
  addAdmin,
  exists,
  status,
  findUser
}
