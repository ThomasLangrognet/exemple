const mongoose = require('mongoose');

const client = mongoose.connect('mongodb://localhost/models', function(err) {
  if (err) { throw err; }
});

module.exports = {
  client
};
