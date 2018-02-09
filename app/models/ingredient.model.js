const mongoose = require('mongoose');

var scheema = mongoose.Schema({

    name: { type: string, required: true },
    amount: { type: string, required: true }

});

mongoose.model('Ingredient', scheema);