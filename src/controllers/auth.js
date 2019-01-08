const authService = require('../services').authService;
const userFunctions = require('../database').modelsFunctions.userFunctions; //ici j'import les
//fonction que j'ai défini sur une base de donnée dans database ce qui me permet de m'affranchir
//de mon choix de base de donnée (mongoDB ou MySQL typiquement)
//=> cette couche d'abstraction permet plus de modularitée: si je veux passer de mongoDB à MySQL, je n'ai pas besoin de changer le code des controller
// juste besoin de changer les fonctions encapsulées dans userFunctions définies dans database
// => changer de logique de base de données n'influe pas sur la logique de tes controller
// => tu définies un fonction une fois et plus besoin de la recoder, juste d'y faire appelle

//la liste de mes controller d'authentification qui sont ni plus ni moins que des fonctions
//cependant un controller ne renvoit rien, il modifie des valeur ou envoit une
//réponse http en activant une fonction de res (status et send) passée en paramètre


//register un user sans les droits d'admin
const registerClient = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (!username || !password) {
    res.status(400).send({ Message: 'Invalid request' });
  }else{
    userFunctions.exists(username).then((exists) => {
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

//register un admin
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

//login
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
            req.session.info = info; //ici le back stock dans une session des données sur le user et
            //attache un cookie à la réponse. Ce cookie sera ensuite utilsé pour authentifier les futures requêtes
            //de l'utilisateurs
            //maintenant l'utilisateur est authentifié
            //https://fr.wikipedia.org/wiki/Cookie_(informatique)
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

//supprimer un user
const deleteClientOrAdmin = (req, res) => {
  const username = req.body.username;
  userFunctions.deleteClientOrAdmin(username).then(() => {
    res.status(200).send({Message: 'client/admin successfully deleted'})
  }).catch(err => {
    console.error(err);
    res.status(500).end();
  });
}

//te permet de savoir si qqun est authentifié et si oui quel est son status
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

//un checker qui te permet de savoir si l'utilisateur qui fait appelle à la route est authentifié
const isAuthenticatedChecker = (req, res, next) => {
    if (req.session.info) {
        next() // le fameux next
    } else {
        res.status(401).send({Message: 'not authenticated'})
    }
}

//un checker qui te permet de savoir si l'utilisateur qui fait appelle à la route est authentifié et est un admin
const adminChecker = (req, res, next) => {
    status = req.session.info.status;
    if (status === true) {
      next() //encore next
    }else{
      res.status(401).send({Message: 'not an admin'});
    }
}

//le controller qui logout, c'est à dire qui détruit la session et le cookie
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
  deleteClientOrAdmin
}
