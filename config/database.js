module.exports = function(uri){

    const mongoose = require('mongoose');

    mongoose.connect('mongodb://' + uri);

    process.on('SIGINT',function(){
        mongoose.connection.close(function(){
            console.log('Conexão fechada pelo término da aplicação.');
            process.exit(0);
        })
    })

}