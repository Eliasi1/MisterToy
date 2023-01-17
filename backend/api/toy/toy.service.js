const fs = require('fs')
// const toys = require('../data/toy.json')

const { Logger } = require('mongodb')
const logger = require('../../services/logger.service.js')

const dbService = require('../../services/db.service.js')
const ObjectId = require('mongodb').ObjectId
module.exports = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy, sort) {
    try {
        // const criteria = _buildCriteria(filterBy)

    console.log("requesting toys in BE service")
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find().toArray()
        console.log("toys received from DB: ", toys)
        return toys
    } catch (err) {
        logger.error('cannot find cars', err)
        throw err
    }
}

async function getById(_id) {
    try {
        const collection = await dbService.getCollection('toys')
        var toy = await collection.findOne({ _id: ObjectId(_id) })
        return toy
    } catch (err) {
        // logger.error('cannot find this one', err) 
        throw err
    }
}

async function remove(_id) {
    try {
        const collection = await dbService.getCollection('toys')
        var toy = await collection.remove({ _id: ObjectId(_id) })
        return toy
    } catch (err) {
        // logger.error('cannot find this one', err) 
        throw err
    }
}

async function save(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        if (toy._id) {
            await collection.updateOne({ "_id": ObjectId(toy._id) }, { $set: { ...toy } })
            return toy
        } else {
            toy.createdAt = new Date(Date.now())
            toy.price = +toy.price
            await collection.insert({ ...toy })
            return toy
        }
    } catch (err) {
        throw err
    }

}

function _saveToysToFile() {
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

// function _buildCriteria(filterBy) {
//     let criteria
//     console.log(filterBy)
//     if (filterBy.name) {
//         criteria.name = { $regex: new RegExp(filterBy.name, 'ig') }
//     }
//     if (filterBy.inStock) {
//         criteria.inStock = filterBy.inStock
//     }
//     if (filterBy?.labels?.length) {
//         criteria.lables = { $all: filterBy.labels }
//     }
//     return criteria
// }