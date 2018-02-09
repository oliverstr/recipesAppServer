var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
})

mongoose.model('User', schema);