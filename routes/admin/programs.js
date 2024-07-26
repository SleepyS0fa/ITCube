const express = require('express');
const router = express.Router();
const uploadImage = require("../../upload").uploadImage;
const Repository = require("../../repositories/ProgramsRepository").ProgramsRepository;
const programsRepository = new Repository();

router.get("/", async function(req, res) {
    if(!req.query.about) {
      res.render('programs.hbs', {programs: await programsRepository.getAll(), page: "program", admin: res.admin});
      return;
    }
  
    let about = req.query.about;
    let content = await programsRepository.getBySrc(about);
    if (!content) {
      res.render("error.hbs");
      return;
    }
    res.render("aboutProgram.hbs", {content: content, admin: res.admin});
  });
  
  router.post("/add", uploadImage.array("image", 10), async function(req, res) {
    let model = {
      src: req.body.src,
      title: req.body.title,
      image: req.files[0],
      "card-body": req.body.card-body
    }

    programsRepository.save(model);
  })

  module.exports = router;