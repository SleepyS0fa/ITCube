const {MongoRepository} = require("./MongoRepository");

const MongoClient = require("mongodb").MongoClient;

class TimetableRepository extends MongoRepository{
    constructor() {
        super("timetable");
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

    async getByNameGroup (nameGroup) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne({"groups.nameGroup" : nameGroup});
            await mongoClient.close();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports.TimetableRepository = TimetableRepository;