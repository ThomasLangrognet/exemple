const authService = require('../services').authService;
const userFunctions = require('../database').modelsFunctions.userFunctions;

const registerClient = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (!username || !password) {
    res.status(400).send({ Message: 'Invalid request' });
  }else{
    userFunctions.exists(username).then((exists) => {
      if(exists) {
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
