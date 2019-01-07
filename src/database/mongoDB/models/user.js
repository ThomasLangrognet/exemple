const client = require('./connect').client;

const userSchema = new client.Schema({
  username: String,
  password_hashedANDsalted: String,
  isAdmin: Boolean
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel
};
