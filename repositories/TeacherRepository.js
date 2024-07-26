const {MongoRepository} = require("./MongoRepository");

const MongoClient = require("mongodb").MongoClient;

class TeachersRepository extends MongoRepository{
    constructor() {
        super("teachers");
    }

    async getByName (fullName) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne({fullName : fullName});
            await mongoClient.close();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports.TeachersRepository = TeachersRepository;