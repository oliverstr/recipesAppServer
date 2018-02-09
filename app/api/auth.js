module.exports = function(app){
    var api = {};
    var jwt = require('jsonwebtoken');
    var users =  [{ nome: 'Oliver', usuario: 'jair', senha: 'jairjair' }];

    api.signUp = (req, res) => {
        let user = req.body;
        users.push(user);
        console.log(users);
        res.sendStatus(200);
    }
    
    api.signIn = (req, res) => {
        let login = req.body;
        const logado = users.find(user => {
            return user.usuario == login.usuario && user.senha == login.senha
        });
        if(logado){
            const token = jwt.sign(logado, app.get('secret'), { expiresIn: 84600 });
            res.set('x-access-token', token);
            res.sendStatus(200);
        }else{
            console.log('Usuário não encontrado');
            res.sendStatus(401);
        }
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

