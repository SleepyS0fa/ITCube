let cookie = require("cookie-parser");
let express = require('express');
let router = express.Router();
const {createHash} = require('crypto');

let contacts = require('./contacts');
let docs = require('./documentation');
let news = require('./news');
let photo = require('./photo');
let programs = require('./programs');
let teachers = require('./teachers');
let timetable = require('./timetable');
let Repository = require("../../repositories/ProgramsRepository").ProgramsRepository;
let programsRepository = new Repository();


let key = Date.now;
router.use(cookie(key.toString(10)));

router.get("/",function (req, res) {
    if (!req.signedCookies.admin_token) {
        res.render("admin/loginForm.hbs")
    } else {
        renderStartPage(req, res)
    }
})

async function auth(login, pass) {
    return (login == "111" && pass == "111");
    // return await userRepository.getByLogin(login).password == pass ? true : false;
}

router.post("/", async function (req, res) {
    if (req.signedCookies.admin_token && auth(req.body.login, req.body.pass)) {
        res.render("about.hbs")
    } else if (auth(req.body.login, req.body.pass)) {
        console.log("login & pass");
        let hash = createHash('sha256').update('111').digest('base64');
        res.cookie('admin_token', hash, {
            signed: true,
            // secure: true,
            httpOnly: true,
            // maxAge: 1000 * 60,
            maxAge: 1000 * 60 * 60,
            path: "/admin"
            }
        );
        renderStartPage(req, res)
    }
})

async function renderStartPage(req, res) {
    res.admin = true;
    res.app.locals.layout = "adminlayout";
    res.render("about.hbs", {programs: await programsRepository.getAll(), page: "", admin: res.admin});
}

router.use(function (req, res, next) {
    if (!req.signedCookies.admin_token) {
        res.redirect("/admin");
    }
    res.admin = true;
    res.app.locals.layout = "adminlayout"
    next()
})

router.use('/contacts', contacts);
router.use('/news', news);
router.use('/programs', programs);
router.use('/documentation', docs);
router.use('/teachers', teachers);
router.use('/timetable', timetable);
router.use('/gallery', photo);

module.exports = router;