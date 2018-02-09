const mongoose = require('mongoose');
const Scheema = mongoose.scheema;

const UserScheema = new Scheema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
})

mongoose.model('User', UserScheema);