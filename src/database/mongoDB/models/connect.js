const mongoose = require('mongoose');

const client = mongoose.connect('mongodb://localhost/models', {useNewUrlParser: true}, function(err) {
  if (err) { throw err; }
});

module.exports = {
  client
};
