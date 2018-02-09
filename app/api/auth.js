module.exports = function(app){
    var api = {};
    var jwt = require('jsonwebtoken');
    var users =  [{ nome: 'Oliver', usuario: 'jair', senha: 'jairjair' }];
    var mongoose = require('mongoose');
    var model = mongoose.model('User');
    var status = require('../helpers/http_status')

    api.signUp = (req, res) => {
        let user = req.body;
        model.create(user)
            .then(data => res.json(data))
            .catch(error => res.status(status.InternalServerError).json(error))
    }
    
    api.signIn = (req, res) => {
        let login = req.body;
        model.findOne({ usuario: login.usuario, senha: login.senha })
            .then(data => {
                console.log(data);
                if(data){
                    const token = jwt.sign(logado, app.get('secret'), { expiresIn: 84600 });
                    res.set('x-access-token', token);
                    res.sendStatus(status.Ok);
                }else{
                    res.sendStatus(status.Forbidden);
                }
            })
            .catch(error => res.sendStatus(status.Forbidden))
    }
    
    api.verifyToken = (req, res, next) => {
        const token = req.headers['x-access-token'];
        if(token){
            jwt.verify(token, app.get('secret'), (error, decoded) => {
                if(error){
                    console.log('token rejeitado');
                    res.sendStatus(401);
                }
                req.usuario = decoded;
                next();
            })
        }else{
            console.log('Token não enviado.');
            res.sendStatus(401);
        }
    }
    
    return api;
}

