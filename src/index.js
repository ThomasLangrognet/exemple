//le fichier que tu executes avec node

require('dotenv').config();
const http = require('http');

// j'importe tous les parametres et réglage que j'ai initialisé dans app
const app = require('./app')

//j'en fait un serveur http avec le module http
const PORT = process.env.PORT; // variable qui pointe vers la valeure PORT stockée dans .env
const server = http.createServer(app);
server.listen({
    port: PORT
}, () => {
    console.log('Server is listening on port ' + PORT);
});
