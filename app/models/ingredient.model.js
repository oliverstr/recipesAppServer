const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

var scheema = new Scheema({

    name: { type: String, required: true },
    amount: { type: String, required: true }

});

mongoose.model('Ingredient', scheema);