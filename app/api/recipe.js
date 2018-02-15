var api = {};
var mongoose = require('mongoose');
var recipeModel = mongoose.model('Recipe');
var status = require('../helpers/http_status');
var ingredientApi = require('./ingredient');

api.getListByUser = function(req, res){
    const id = req.params.id;
    recipeModel.find({ user:  mongoose.Types.ObjectId(id)})
        .lean()
        .populate('ingredients')
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            res.status(status.InternalServerError).json(error);
        })
}

api.create = function(req, res){
    const recipe = req.body;
    ingredientApi.saveIngredients(recipe.ingredients)
    .then(ingredients => {
        recipe.ingredients = ingredients;
        recipeModel.create(recipe)
            .then(data => res.json(data))
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error);
             })
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
     })
}

api.update = function(req, res){
    const id = req.params.id;
    const recipe = req.body;
    ingredientApi.saveIngredients(recipe.ingredients)
    .then(ingredients => {
        recipe.ingredients = ingredients;
        recipeModel.findByIdAndUpdate(id, recipe)
        .then(res.sendStatus(status.OkNoContent))
        .catch(error => {
            console.log(error);
            res.status(status.InternalServerError).json(error);
        })
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
    })
}

api.getById = function(req, res){
    const id = req.params.id;
    recipeModel.findById(id)
    .lean()
    .populate('ingredients')
    .then( data => res.json(data) )
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
    })
}

api.remove = function(req, res){
    const id = req.params.id;
    recipeModel.findById(id)
    .lean()
    .populate('ingredients')
    .then(recipe => {
        ingredientApi.deleteIngredients(recipe.ingredients)
        .then(() => {
            recipeModel.findByIdAndRemove(id)
            .then(res.sendStatus(status.OkNoContent))
            .catch(error => {
                console.log(error);
                res.status(status.InternalServerError).json(error);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(status.InternalServerError).json(error);
        })
    })
    .catch(error => {
        console.log(error);
        res.status(status.InternalServerError).json(error);
    })
}

module.exports = api;