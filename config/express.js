var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var consign = require('consign');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors({ exposedHeaders: 'x-access-token', allowedHeaders: ['x-access-token', 'Content-Type']} ));
app.set('secret', 'betojamaica');

consign({ cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

module.exports = app;
