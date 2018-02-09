let http = require('http');
var app = require('./config/express');
const port = process.env.PORT || 5000;

http.createServer(app).listen(port, () => console.log('Servidor rodando na porta ' + port));