let http = require('http');
var app = require('./config/express');
const port = process.env.PORT || 5000;
require('./config/database')(process.env.MONGO_ADDRESS);

http.createServer(app).listen(port, () => console.log('Servidor rodando na porta ' + port));