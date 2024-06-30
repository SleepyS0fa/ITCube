var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/about', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/news', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/programs', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/docs', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/teachers', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/timetable', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/events', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/photo', function(req, res, next) {
    res.render('admin/photos.hbs');
});
router.get('/contacts', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
