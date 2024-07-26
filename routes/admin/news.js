const express = require('express');
const router = express.Router();
const uploadImage = require("../../upload").uploadImage;
const moment = require("moment");
const Repository = require("../../repositories/NewsRepository").NewsRepository;
const newsRepository = new Repository();


  router.get('/', async function (req, res) {
    res.render('news.hbs', {news: await newsRepository.getAll(), page: "news", admin: res.admin});
  });
  
  router.get('/:title', async function (req, res) {
    res.render('selectNews.hbs', {content: await newsRepository.getByTitle(req.params["title"]), page: "news", admin: res.admin});
  });
  
  router.post('/add', uploadImage.array("image", 10), async function (req, res) {

    let model = {};
    if (req.files instanceof Array) {
      model.img = [];
      req.files.forEach((val) => {
        model.img.push({img:"/images/" + val.filename})
      })
    } else {
      model.img = "/images/" + req.files.filename;
    }
  
    if (req.body.save === "on") {
      await newsRepository.saveAll("photos", model.img)
    }
  
    model.title = req.body.title;
    model.text = req.body.text;
    let date = new Date();
    model.dateOfCreate = moment().format('MM.DD.YYYY, h:mm');
    //поиск первых двух предложений
    model.previewText = req.body.text.match("[^\.]+\.[^\.]+\.")[0] + ".."
    newsRepository.save(model).then(r => {
      res.redirect("/news")
    })
  });

  module.exports = router;