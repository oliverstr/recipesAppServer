var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient', default: [] }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

mongoose.model('Recipe', schema);