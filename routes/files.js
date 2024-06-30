const app = require("../app");
const {MongoClient, GridFSBucket} = require("mongodb");
const {getFile} = require("../mongoRepository");
//
// app.get('/file/:id', async (req, res) => {
//
// }