const userModel = require('../models').userModel;

function addClient(username,password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    userModel.create({username: username, password_hashedANDsalted: password_hashedANDsalted, isAdmin: false}, function(err,result) {
      if (err) { throw err; }
      resolve(true)
    })
  })
}

function addAdmin(username,password_hashedANDsalted) {
  return new Promise((resolve, reject) => {
    userModel.create({username: username, password_hashedANDsalted: password_hashedANDsalted, isAdmin: true}, function(err,result) {
      if (err) { throw err; }
      resolve(true)
    })
  })
}

function exists(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({username: username}, function(err,result) {
      if (err) { throw err; }
      else {
        if(result){
          resolve(true)
        }else{
          resolve(false)
        }
      }
    })
  })
}

module.exports = {
  addClient,
  addAdmin,
  exists
}
