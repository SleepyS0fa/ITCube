const multer = require("multer");

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const storageDocs = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/docs");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadImage = multer({
    storage: storageImage,
});

const uploadDocs = multer({
    storage: storageDocs,
});

module.exports.uploadImage = uploadImage;
module.exports.uploadDocs = uploadDocs;