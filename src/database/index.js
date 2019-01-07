const database = process.env.DATABASE;
database_module = './' + database;
const modelsFunctions = require(database_module).modelsFunctions;

module.exports = {
  modelsFunctions
};
