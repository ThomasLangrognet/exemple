const client = require('./connect').client;//j'importe le client pour l'éxecuter
//et connecter mongoose à mon serveur mongoDB
const mongoose = require('mongoose');//ce module est un ORM
//un framework fait pour node js qui te permet de te connecter à mongoDB

//ici je défini le model d'un username
//je suis dépendant de mongoDB
const userSchema = mongoose.Schema({
  username: String,
  password_hashedANDsalted: String,
  isAdmin: Boolean
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel
};
