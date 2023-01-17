const MongoClient = require('mongodb').MongoClient

//connection url: //TODO what is this?
const url = (false && process.env.NODE_ENV === 'production') ?
    'mongodb+srv://theDbUser:camay2019@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority' //put prod connection string
    : 'mongodb://localhost:27017'

//Database Name
const dbName = "toy_db"

var dbConn = null

async function _connect(){
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        dbConn = db
        return db
        } catch (err) {
            console.log('cannot connect to DB ', err)
            throw err
        }
}

async function getCollection(collectionName){
    const db = await _connect()
    return db.collection(collectionName)
}

module.exports = {
    getCollection
}