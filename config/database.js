module.exports = function(uri){

    const mongoose = require('mongoose');
    console.log(uri);
    mongoose.connect('mongodb://' + uri, { uri_decode_auth: true });

    mongoose.connection.on('connected', function(){
        console.log("Conectado ao mongodb");
    });
    
    mongoose.connection.on('error', function(error){
        console.log('Erro no mongodb: ' + error);
    })
    
    mongoose.connection.on('disconnected', function(){
        console.log("Desconectado do mongodb");
    });
    

    process.on('SIGINT',function(){
        mongoose.connection.close(function(){
            console.log('Conexão fechada pelo término da aplicação.');
            process.exit(0);
        })
    })

}