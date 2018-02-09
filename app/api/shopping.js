let api = {};
let shoppingList = [{ name: 'TestAPI', amount: 2, id: 0 }];
let idCounter = 1;

api.getList = (req, res) => {
    res.json({'shoppingList': shoppingList});
}

api.getById = (req, res) => {
    const id = req.params.id;
    const item = shoppingList.find(item => item.id == id);
    if(item){
        res.json(item);
    }else{
        res.status(500).send('Item não encontrado');
    }
}

api.removeItem = (req, res) => {
    const id = req.params.id;
    shoppingList = shoppingList.filter(item => item.id != id);
    res.sendStatus(204);
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

api.updateItem = (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const index = shoppingList.findIndex(ingredient => ingredient.id == id);
    shoppingList[index] = item;
    res.json(item);
}

module.exports = api;