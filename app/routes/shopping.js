module.exports = function(app){

    let api = app.api.shopping;
    
    app.route('/shopping/:id')
        .get(api.getById)
        .put(api.updateItem)
        .delete(api.removeItem);
        
    app.route('/shopping')
        .get(api.getList)
        .post(api.addItem);


}