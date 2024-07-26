let express = require('express');
let router = express.Router();

router.get('/contacts', function(req, res) {
  res.render('contacts.hbs', {page: "contacts", admin: res.admin});
});

module.exports = router;