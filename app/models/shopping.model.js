const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const ShoppingScheema = new Scheema({
    user: { type: Scheema.Types.ObjectId, required: true, ref: 'User' },
    ingredients: [{ type: Scheema.Types.ObjectId, ref: 'Ingredient' }]
});

mongoose.model('Shopping', ShoppingScheema);