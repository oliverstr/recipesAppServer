api = {}
const asyncForEach = require('../helpers/async_foreach');
const mongoose = require('mongoose');
const ingredientModel = mongoose.model('Ingredient');

api.saveIngredients = function (ingredients) {
    return new Promise((resolve, reject) => {
        retorno = [];
        const start = async () => {
            await asyncForEach(ingredients, async (ingredient) => {
                if (ingredient._id) {
                    await ingredientModel.findByIdAndUpdate(ingredient._id, ingredient)
                    .lean()
                    .then(data => {
                        retorno.push(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
                } else {
                    console.log(ingredient);
                    await ingredientModel.create(ingredient)
                        .then(data => {
                            retorno.push(data);
                        })
                        .catch(error => {
                            reject(error);
                        })
                }
            })
            resolve(retorno);
        }
        start();
    })
}

api.deleteIngredients = function (ingredients) {
    return new Promise((resolve, reject) => {
        const start = async () => {
            await asyncForEach(ingredients, async (ingredient) => {
                await ingredientModel.findByIdAndRemove(ingredient._id)
                    .lean()
                    .catch(error => {
                        reject(error);
                    })
            })
            resolve();
        }
        start();
    })
}

module.exports = api;