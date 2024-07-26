let db = require("./repositories/MongoRepository");
let CyrillicToTranslit = require('cyrillic-to-translit-js');

const cyrillicToTranslit = new CyrillicToTranslit();
/**
 * @param {Array} files 
 * @returns {Array}
 */
function packData(files) {
  return files.map(val => {
    return "/images/" +  cyrillicToTranslit.transform(val.filename, '_').toLowerCase();
  })
}

/**
 * @param {Object} files 
 * @returns {Array}
 */
function packData(files) {
  return files.map(val => {
    return "/images/" +  cyrillicToTranslit.transform(val.filename, '_').toLowerCase();
  })
}

/** 
 * @param {String} collectionName
 * @param {String} image
 * @param {ObjectId} _id
 * 
*/
async function uploadImage(collectionName, _id, image) {
    try {
      let context = await db.getById(collectionName, _id);
      if (context) {
        context.image = "/images/" +  cyrillicToTranslit.transform(val.filename, '_').toLowerCase();
        if (context != "photos") {
          db.save("photos", {image: image});
        }
        db.save(collectionName, context);
      } else {
        console.log("Error: передан неверный _id");
      }
      return 0;
    } catch {
      console.log("Error: Ошибка сохранения изображения");
      return 1;
    }
}

  
/**
 * @param {String} collectionName 
 * @param {Array.<String>} images
*/
async function uploadImages(collectionName, images) {
  try {
    images.map((val) => {
      //вычленяем имя файла и формируем новый список
      val.filename = "/images/" + cyrillicToTranslit.transform(val.filename, '_').toLowerCase();
      return {image: val.filename};
    })
    console.log(images)
    //сохраняем в галлерею и в целевую коллекцию
    if (collectionName != "photos") {
      db.saveAll("photos", {image: images});
    }
    db.saveAll(collectionName, {image: images});
    return 0;
  } catch {
    console.log("Error: Ошибка сохранения изображения");
    return 1;
  }
}

// function checkId() {
//   return db.
// }


  module.exports.uploadImage = uploadImage;
  module.exports.uploadImages = uploadImages;
  module.exports.packData = packData;