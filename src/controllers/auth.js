const authService = require('../services').authService;
const userFunctions = require('../database').modelsFunctions.userFunctions;

const registerClient = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (!username || !password) {
    res.status(400).send({ Message: 'Invalid request' });
  }else{
    userFunctions.exists(username).then((exists) => {
      console.log(exists)
      if(exists === false) {
        authService.hashANDsalt_password(password).then((password_hashedANDsalted) => {
          userFunctions.addClient(username, password_hashedANDsalted).then(() => {
            res.status(200).send({Message: 'client successfully registered'})
          }).catch(err => {
            console.error(err);
            res.status(500).end();
          });
        }).catch(err => {
          console.error(err);
          res.status(500).end();
        });
      } else {
        res.status(401).send({Message: 'this client already exists'})
      }
    }).catch(err => {
      console.error(err);
      res.status(500).end();
    });
  }
};

const registerAdmin = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (!username || !password) {
    res.status(400).send({ Message: 'Invalid request' });
  }else{
    userFunctions.exists(username).then((exists) => {
      if(exists === false) {
        authService.hashANDsalt_password(password).then((password_hashedANDsalted) => {
          userFunctions.addAdmin(username, password_hashedANDsalted).then(() => {
            res.status(200).send({Message: 'admin successfully registered'})
          }).catch(err => {
            console.error(err);
            res.status(500).end();
          });
        }).catch(err => {
          console.error(err);
          res.status(500).end();
        });
      } else {
        res.status(401).send({Message: 'this admin already exists'})
      }
    }).catch(err => {
      console.error(err);
      res.status(500).end();
    });
  }
};

const login = (req, res) => {
  const username = req.body.username;
  const candidate_password = req.body.password;
  userFunctions.exists(username).then((exists) => {
    if(exists === true){
      userFunctions.findUser(username).then((user) => {
        password_hashedANDsalted = user.password_hashedANDsalted;
        authService.comparePassword(candidate_password, password_hashedANDsalted).then((same) => {
          if(same === true){
            let info = { username: user.username, status: user.isAdmin };
            req.session.info = info;
            res.status(200).send({Message: 'password valid'});
          }else{
            res.status(401).send({Message: 'password not valid'})
          }
        }).catch(err => {
          console.error(err);
          res.status(500).end();
        });
      }).catch(err => {
        console.error(err);
        res.status(500).end();
      });
    }else{
      res.status(401).send({Message: 'this client/admin does not exist'})
    }
  }).catch(err => {
    console.error(err);
    res.status(500).end();
  });
};

const deleteClient = (req, res) => {
}

const deleteAdmin = (req, res) => {
}

const isAuthenticated = (req, res) => {
    if (req.session.info) {
      res.status(200).send({
      Message: 'authenticated',
      isAuthenticated: true,
      isAdmin: req.session.info.status,
      username: req.session.info.username
      });
    }else{
      res.status(200).send({Message: 'not authenticated', isAuthenticated: false, isAdmin: false, username: 'none'});
    }
}

const isAuthenticatedChecker = (req, res, next) => {
    if (req.session.info) {
        next()
    } else {
        res.status(401).send({Message: 'not authenticated'})
    }
}

const adminChecker = (req, res, next) => {
    status = req.session.info.status;
    if (status === true) {
      next()
    }else{
      res.status(401).send({Message: 'not an admin'});
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send({Message: "logout"});
    });
};

module.exports = {
  registerClient,
  registerAdmin,
  login,
  isAuthenticated,
  isAuthenticatedChecker,
  adminChecker,
  logout,
  deleteClient,
  deleteAdmin
}
