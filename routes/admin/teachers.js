let express = require('express');
let router = express.Router();
const uploadImage = require("../../upload").uploadImage;
let Repository = require("../../repositories/TeacherRepository").TeachersRepository;
let teacherRepository = new Repository();

router.get('/', async function (req, res) {
  res.render('teachers.hbs', {teachers: await teacherRepository.getAll(), page: "teacher", admin: res.admin});
});

router.post('/teachers/add', uploadImage.array("image", 1), async function (req, res) {
  let model = {};
  model.image = "/images/" + req.files[0].filename;
  model.fullName = req.body.name;
  model.aboutTeacher = req.body.description;
  await teacherRepository.save(model);
  res.redirect("/teachers");
});

router.get('/delete/:name', async function (req, res) {
  teacherRepository.deleteOne({fullName: req.params["name"]}).then(r => {
    res.redirect("/teachers")
  })
});

  module.exports = router;