const {MongoRepository} = require("./MongoRepository");

const MongoClient = require("mongodb").MongoClient;

class DocsRepository extends MongoRepository{
    constructor() {
        super("docs");
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

module.exports.DocsRepository = DocsRepository;