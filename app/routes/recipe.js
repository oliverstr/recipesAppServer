module.exports = function(app){

    var api = app.api.recipe;

    app.route('/recipe/user/:id')
        .get(api.getListByUser);

    app.route('/recipe/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);

    app.route('/recipe')
        .post(api.create);


}