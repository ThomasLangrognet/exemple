const userModel = require('../models').userModel;

function addClient(username,password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    userModel.create({username: username, password_hashedANDsalted: password_hashedANDsalted, isAdmin: false}, function(err,result) {
      if (err) { throw err; }
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
