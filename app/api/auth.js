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
        var login = req.body;
        model.findOne(login)
            .lean()
            .then(data => {
                if(data){
                    const token = jwt.sign(data, app.get('secret'), { expiresIn: 84600 });
                    res.set('x-access-token', token);
                    res.sendStatus(status.Ok);
                }else{
                    console.log('Usuario não encontrado.');
                    res.sendStatus(status.Forbidden);
                }
            })
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error);
            })
    }
    
    api.verifyToken = (req, res, next) => {
        const token = req.headers['x-access-token'];
        if(token){
            jwt.verify(token, app.get('secret'), (error, decoded) => {
                if(error){
                    console.log('token rejeitado');
                    res.sendStatus(status.Forbidden);
                }
                req.usuario = decoded;
                next();
            })
        }else{
            console.log('Token não enviado.');
            res.sendStatus(status.Forbidden);
        }
    }
    
    return api;
}

