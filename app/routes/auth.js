module.exports = function(app){

    var api = app.api.auth;

    app.post('/autenticar', api.signIn);
    app.post('/signup', api.signUp);
    app.use('/*', api.verifyToken);

}