const {GridFSBucket} = require("mongodb");
const fs = require("node:fs");
const MongoClient = require("mongodb").MongoClient;

async function getAll(name) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        let res= await mongoClient.db("main").collection(name).find().toArray();
        await mongoClient.close()
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function getByTitle (name ,title) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        let res= await mongoClient.db("main").collection(name).findOne({title : title});
        await mongoClient.close();
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function getByNameGroup (name ,nameGroup) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        let res= await mongoClient.db("main").collection(name).findOne({"groups.nameGroup" : nameGroup});
        await mongoClient.close();
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function save(collectionName, saveObj) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        await  mongoClient.db("main").collection(collectionName).insertOne(saveObj).then(() => {
                mongoClient.close()
            })
    } catch (e) {
        console.log(e);
    }
}

async function saveAll(collectionName, saveObj) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        await  mongoClient.db("main").collection(collectionName).insertMany(saveObj).then(() => {
            mongoClient.close()
        })
    } catch (e) {
        console.log(e);
    }
}

async function deleteOne(collectionName, filter) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        await  mongoClient.db("main").collection(collectionName).deleteOne(filter).then(() => {
            mongoClient.close()
        })
    } catch (e) {
        console.log(e);
    }
}

async function update(collectionName, filter, saveObj) {
    try {
        let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
        await  mongoClient.db("main").collection(collectionName).replaceOne(filter, saveObj).then(() => {
            mongoClient.close()
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports.save = save;
module.exports.update = update;
module.exports.getAll = getAll;
module.exports.getByTitle = getByTitle;
module.exports.getByNameGroup = getByNameGroup;
module.exports.deleteOne = deleteOne;
module.exports.saveAll = saveAll;