let express = require('express');
let router = express.Router();

router.get("/",function (req, res) {
    res.render("contacts.hbs", {admin: res.admin});
})

module.exports = router;