const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Scheema.Types.ObjectId, required: true, ref: 'User' },
    ingredients: [{ type: Scheema.Types.ObjectId, ref: 'Ingredient' }]
});

mongoose.model('Shopping', schema);