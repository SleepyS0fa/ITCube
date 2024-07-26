let express = require('express');
let router = express.Router();
let Repository = require("../../repositories/ProgramsRepository").ProgramsRepository;
let programsRepository = new Repository();

router.get('/', async function(req, res) {
  res.render('about.hbs', {programs: await programsRepository.getAll(), page: ""});
});

router.get('/contacts', function(req, res) {
  res.render('contacts.hbs', {page: "contacts"});
});

module.exports = router;