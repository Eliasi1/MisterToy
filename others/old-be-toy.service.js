const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy, sort){
    // if (!filterBy) return Promise.resolve(toys) //TODO pass the filters to back
    return Promise.resolve(toys)
}

function getById(_id){
    const toy = toys.find((toy) => {toy._id === _id})
    return Promise.resolve(toy)
}

function remove(_id){
    const idx = toys.findIndex(toy => toy._id === _id)
    if (idx === -1) return Promise.reject(`Toy ${_id} was not found`)
    toys.splice(idx, 1);
    _saveToysToFile()
    return Promise.resolve(toys)
}

function save(toy){
    if (toy._id){
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = {...toys[idx], ...toy}
    } else {
        toy.createdAt = new Date(Date.now())
        toy.price = +toy.price
        toy._id = _makeId()
        toys.unshift(toy)
    }
    _saveToysToFile();
    return Promise.resolve(toy)
}

function _saveToysToFile(){
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2))
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}