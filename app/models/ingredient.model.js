var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    name: { type: String, required: true },
    amount: { type: String, required: true }

});

mongoose.model('Ingredient', schema);