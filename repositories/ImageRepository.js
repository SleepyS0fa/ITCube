const {MongoRepository} = require("./MongoRepository");

const MongoClient = require("mongodb").MongoClient;

class ImageRepository extends MongoRepository{
    constructor() {
        super("photos");
    }

    async getBySrc (imagePath) {
        try {
            let mongoClient = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
            let res= await mongoClient.db("main").collection(this.collection).findOne({image : imagePath});
            await mongoClient.close();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports.ImageRepository = ImageRepository;