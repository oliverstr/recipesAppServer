var api = {};
var shoppingList = [{ name: 'TestAPI', amount: 2, id: 0 }];
var idCounter = 1;
const status = require('../helpers/http_status');
var mongoose = require('mongoose');
var shoppingModel = mongoose.model('Shopping');
var ingredientModel = mongoose.model('Ingredient');

api.getList = (req, res) => {
    console.log(shopping);
    shoppingModel.findOne(shopping)
    .lean()
    .then(data => {
        if(data){
            console.log(data);
            res.json({'shoppingList': data});
        } else {
            shoppingModel.create(shopping)
            .then(data => {
                console.log(data);
                res.json({'shoppingList': data});
            })
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error);
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
    })
}

api.getByUserId = (req, res) => {
    const id = req.params.id;
    const shopping = { user: mongoose.Types.ObjectId(id) }
    shoppingModel.findOne(shopping)
    .populate('ingredients')
    .lean()
    .then(data => {
        if(data){
            res.json({'shoppingList': data});
        } else {
            shoppingModel.create(shopping)
            .then(data => {
                res.json({'shoppingList': data});
            })
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error);
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
    })
}

api.removeItem = (req, res) => {
    const id = req.params.id;
    shoppingList = shoppingList.filter(item => item.id != id);
    res.sendStatus(status.OkNoContent);
}

api.addItem = (req, res) => {
    let item = req.body.item;
    if(typeof item == 'object'){
        item.id = idCounter++;
        shoppingList.push(item);
    }
    if(typeof item == 'array'){
        for(let ingredient of item){
            ingredient.id = item.id = idCounter++;
            shoppingList.push(ingredient);
        }
    }
    res.json(req.body);
}

api.saveShopping = (req, res) => {
    shopping = req.body;
    saveIngredients(shopping.ingredients)
    .then((data) => {
        shopping.ingredients = data;
        if(shopping._id){
            shoppingModel.findByIdAndUpdate(shopping._id, shopping)
            .populate('ingredients')
            .then((data) => {
                shopping = data;
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error); 
            });
        }else{
            shoppingModel.create(shopping)
            .then(data => {
                shopping = data;
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error); 
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error); 
    });
}


api.updateItem = (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const index = shoppingList.findIndex(ingredient => ingredient.id == id);
    shoppingList[index] = item;
    res.json(item);
}

function saveIngredients(ingredients) {
    return new Promise((resolve, reject) => {
        retorno = [];
        ingredients.forEach((ingredient, index) => {
            if(ingredient._id){
                ingredientModel.findByIdAndUpdate(ingredient._id, ingredient)
                .lean()
                .then(data => {
                    retorno.push(data);
                    if(index === ingredients.length - 1){
                        resolve(retorno);
                    }
                })
                .catch(error => {
                    reject(error);
                })
            }else{
                ingredientModel.create(ingredient)
                .then(data => {
                    retorno.push(data);
                    if(index === ingredients.length - 1){
                        resolve(retorno);
                    }
                })
                .catch(error => {
                    reject(error);
                })
            }
            
            // return ingredient;
        });
        // Promise.all(ingredients).then(completed => {
        //     console.log(completed);
        //     resolve(completed);
        // });
        // console.log(ingredients);
    })
}

module.exports = api;