var express = require('express');
var router = express.Router();

router.post('/admin', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/admin/about', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/news', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/programs', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/docs', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/teachers', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/timetable', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/events', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/photo', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/admin/contacts', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;