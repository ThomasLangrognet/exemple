const database = process.env.DATABASE;
database_module = './' + database;
const modelsFunctions = require(database_module).modelsFunctions;// je fais appelle à la variable
//d'environnement pour require le module lié à la base donnée que je veux
// ici il n'y a que mongoDB car j'ai eu la flemme de faire MySQL :p
// c'est ici que je charge les fonction liée à la base donnée dans modelsFunctions et qui me permet cette abstraction matérielle

module.exports = {
  modelsFunctions
};
