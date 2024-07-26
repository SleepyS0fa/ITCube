let express = require('express');
let router = express.Router();

let index = require('./index');
let docs = require('./documentation');
let news = require('./news');
let photo = require('./photo');
let programs = require('./programs');
let teachers = require('./teachers');
let timetable = require('./timetable');

router.use(function(req, res, next) {
    console.log("set user layout");
    res.app.locals.layout = "layout"
    next()
})

router.use('/', index);
router.use('/news', news);
router.use('/programs', programs);
router.use('/documentation', docs);
router.use('/teachers', teachers);
router.use('/timetable', timetable);
router.use('/gallery', photo);

module.exports = router;