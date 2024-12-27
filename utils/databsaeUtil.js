const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@airbnb-project.8cfhr.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-project";

let _db;

const mongoConnect = (callback)=>{
MongoClient.connect(MONGO_URL)
.then(client =>{
    callback();
    _db = client.db('airbnb');
}).catch(err=>{
    console.log('Error while connecting',err);
});

}

const getDB = ()=>{
    if (!_db) {
        throw new Error('Mongo not Connected');
    }
    return _db;
}

exports.mongoConnect=mongoConnect;
exports.getDB=getDB;