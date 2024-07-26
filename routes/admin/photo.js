const express = require('express');
const router = express.Router();
const uploadImage = require("../../upload").uploadImage;
const uploadTools = require("../../uploadTools");
const Repository = require("../../repositories/ImageRepository").ImageRepository;
const imageRepository = new Repository();
const {ObjectId} = require("mongodb")

router.get('/', async function(req, res) {
  let photos = await imageRepository.getAll();
  photos = photos.sort((a,b) => {
    if (parseInt(a._id.toString(), 16) < parseInt(b._id.toString(), 16)) {
      return 1;
    }
    else if (parseInt(a._id.toString(), 16) > parseInt(b._id.toString(), 16)) {
      return -1;
    }
    return 0;
  })

  // TODO доработать распределение
  let image1 = [];
  let image2 = [];
  let image3 = [];
  photos.forEach((val, i) => {
    if (i % 3 === 0) {
      image1.push(val);
    } else if (i % 3 === 1) {
      image2.push(val)
    } else if (i % 3 === 2) {
      image3.push(val)
    }
  });

  res.render('photos.hbs', {
    image1: image1,
    image2: image2,
    image3: image3,
    page: "gallery",
    admin: res.admin
  });
  });

router.post("/delete", async function(req, res) {
  let _id = new ObjectId(req.body._id);
  if (await imageRepository.getById(_id)) {
    imageRepository.delete({"_id": _id})
    .then(() => {
      res.json({"success": 1})
    })
    .catch(() => {
      res.json({"success": 0})
    })
  } else {
    res.json({"success": 0})
  }
})
  
router.post('/add', uploadImage.array("images", 10), async function(req,res) {
  
  console.log(uploadTools.packData(req.files));
  return res.redirect('/gallery')
});
    
//добавление изображений от editorJS
router.post("/uploadImageEditor", uploadImage.array("image", 1), async function(req, res) {
  uploadTools.uploadImage("photos", req.files[0].filename)
  .then(() => {
    res.json({
        "success" : 1,
        "file": {
            "url": `/images/${req.files[0].filename}`,
        }
    })
  })
  .catch(() => {
    res.json({"success": 0})
  })
})

//editirJS исключение загрузки по url
router.post("/uploadImageEditorUrl", uploadImage.array("image", 2), async function(req, res) {
  res.json({"success": 0})
})

router.post("/uploadImage", uploadImage.array("image", 10), async function(req, res) {
  let model = await imageRepository.getBySrc({src: req.body.src})
  model.images = []

  req.files.forEach((val) => {
    model.images.push("/images/"  + val.filename);
  })

  imageRepository.update({src: req.body.src}, model);
})
  
module.exports = router;