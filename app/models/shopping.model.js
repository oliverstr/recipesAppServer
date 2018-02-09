const mongoose = require('mongoose');

const ShoppingScheema = mongoose.Scheema({
    user: { type: Scheema.Types.ObjectId, required, ref: 'User' },
    ingredients: [{ type: Scheema.Types.ObjectId, ref: 'Ingredient' }]
});

mongoose.model('Shopping', ShoppingScheema);