const bcrypt = require('bcryptjs');

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
