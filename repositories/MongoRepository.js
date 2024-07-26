const MongoClient = require("mongodb").MongoClient;

class MongoRepository {
    constructor(collection) {
        this.collection = collection;
    }        
        
    async getAll() {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).find().toArray();
            await mongoClient.close()
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async getById(_id) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne(_id);
            await mongoClient.close()
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async save(saveObj) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            await  mongoClient.db("main").collection(this.collection).insertOne(saveObj).then(() => {
                    mongoClient.close()
                })
        } catch (e) {
            console.log(e);
        }
    }

    async saveAll(saveObj) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            await  mongoClient.db("main").collection(this.collection).insertMany(saveObj).then(() => {
                mongoClient.close()
            })
        } catch (e) {
            console.log(e);
        }
    }

    async delete(filter) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            await  mongoClient.db("main").collection(this.collection).deleteOne(filter).then(() => {
                mongoClient.close()
            })
        } catch (e) {
            console.log(e);
        }
    }

    async deleteAll(filter) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            await  mongoClient.db("main").collection(this.collection).deleteMany(filter).then(() => {
                mongoClient.close()
            })
        } catch (e) {
            console.log(e);
        }
    }

    async update(filter, saveObj) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            await  mongoClient.db("main").collection(this.collection).replaceOne(filter, saveObj).then(() => {
                mongoClient.close()
            })
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports.MongoRepository = MongoRepository;