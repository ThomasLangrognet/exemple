const mongoose = require('mongoose');//ce module est un ORM
//un framework fait pour node js qui te permet de te connecter à mongoDB

//ici je me connect à mongoDB
const client = mongoose.connect('mongodb://localhost/models', {useNewUrlParser: true}, function(err) {
  if (err) { throw err; }
});

module.exports = {
  client
};
