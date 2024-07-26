const express = require('express');
const router = express.Router();
const uploadDocs = require("../../upload").uploadDocs;
const Repository = require("../../repositories/DocsRepository").DocsRepository;
const docsRepository = new Repository();

router.get('/', async function(req, res) {
  res.render('docs.hbs', {blocks: await docsRepository.getAll("docs"), page: "documentation", admin: res.admin});
});
  
router.post('/createBlock', async function(req, res) {
  let model = {
    title: req.body.block,
    docs: {}
  };
  docsRepository.save(model);
  res.redirect("/documentation")
});

router.post('/add', uploadDocs.array("file", 1), async function(req, res) {
  let model = await docsRepository.getByTitle(req.body.block)
  model.docs.push({title:req.body.title, href: "/docs/" + req.files[0].filename})

  docsRepository.update({"title": req.body.block}, model);
  res.redirect("/documentation")
});

router.get('/delete/:nameGroup/:nameDoc', async function (req, res) {
  let doc = await docsRepository.getByTitle(req.params["nameGroup"]);
  
  doc.docs.forEach((val, ind) => {
    if (val.title === req.params["nameDoc"]) {
      doc.docs = doc.docs.splice(ind, 1);
    }
  })

  docsRepository.update({title: req.params["nameGroup"]}, doc).then(r => {
    res.redirect("/documentation")
  })
});

  module.exports = router;