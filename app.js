require('dotenv').config();
const Server = require('./models.js/server');

const server = new Server();
server.listen();