const {MongoRepository} = require("./MongoRepository");
const MongoClient = require("mongodb").MongoClient;

class ProgramsRepository extends MongoRepository{
    constructor() {
        super("programs");
    }

    async getBySrc (src) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne({src : src});
            await mongoClient.close();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async getByTitle (title) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne({title : title});
            await mongoClient.close();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports.ProgramsRepository = ProgramsRepository;