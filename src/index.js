require('dotenv').config();
const http = require('http');
const app = require('./app')

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen({
    port: PORT
}, () => {
    console.log('Server is listening on port ' + PORT);
});
