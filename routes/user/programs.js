const express = require('express');
const router = express.Router();
const uploadImage = require("../../upload").uploadImage;
const Repository = require("../../repositories/ProgramsRepository").ProgramsRepository;
const programsRepository = new Repository();

router.get("/", async function(req, res) {
    if(!req.query.about) {
      res.render('programs.hbs', {programs: await programsRepository.getAll(), page: "programs"});
      return;
    }
  
    let about = req.query.about;
    let content = await programsRepository.getBySrc(about);
    if (!content) {
      res.render("error.hbs");
      return;
    }
    res.render("aboutProgram.hbs", {content: content});
  });
  
  router.post("/add", uploadImage.array("image", 10), async function(req, res) {
    let context = await programsRepository.getById(req.body._id);
    context.images = [];
    
    req.files.forEach(val => {
      context.images.push("/images/" + val.filename);
    })
    context.mainText = req.body.mainText;
    context.docs = req.body.docs;
    context.requirements = req.body.requirements;
    
    programsRepository.update({src: req.body._id}, context).then(()=> {
      res.redirect(`/programs?about=${req.body._id}`);
    })
  })

  module.exports = router;