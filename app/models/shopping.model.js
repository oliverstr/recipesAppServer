const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient', default: [] }]
});

mongoose.model('Shopping', schema);