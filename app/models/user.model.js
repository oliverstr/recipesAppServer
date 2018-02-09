const mongoose = require('mongoose');

const UserScheema = mongoose.Scheema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
})

mongoose.model('User', UserScheema);