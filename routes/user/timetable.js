let express = require('express');
let router = express.Router();
let TimetableRepository = require("../../repositories/TimetableRepository").TimetableRepository;
let timetableRepository = new TimetableRepository();
let ProgramsRepository = require("../../repositories/ProgramsRepository").ProgramsRepository;
let programsRepository = new ProgramsRepository();
const {ObjectId} = require("mongodb");
  
  
router.get('/', async function(req, res) {
  res.render('timetable.hbs', {timetable: await timetableRepository.getAll(), programs: await programsRepository.getAll(), page: "timetable"});
});

router.post('/add', async function(req, res) {
  let model = await timetableRepository.getByTitle(req.body.title);
  let isNew = false;
  if (model === null) {
    isNew = true;
    model = {
      title: "",
      groups: []
    }
  }

  let curGroup = {lines:[]};
  let indGroup = null;
  let groups = model.groups;

  model.title = req.body.title;

  groups.forEach((val, i) => {
    if (val.nameGroup === req.body.nameGroup) {
      indGroup = i;
    }
  });

  curGroup.nameGroup = req.body.nameGroup;
  if (req.body.day instanceof Array) {
    req.body.day.forEach((val, i) => {
      curGroup.lines.push({day:val, time:req.body.time[i]})
    })
  } else {
    curGroup.lines.push({day:req.body.day, time: req.body.time})
  }

  if (indGroup != null) {
    groups[indGroup] = curGroup;
  } else {
    groups.push(curGroup);
  }

  model.groups = groups;
  if (isNew) {
    timetableRepository.save(model).then(r => {
      res.redirect('/timetable');
    })
  } else {
    timetableRepository.update({title:req.body.title}, model).then(r => {
      res.redirect('/timetable');
    });
  }
});

router.get('delete/:name', function (req, res) {

  timetableRepository.deleteOne({ "_id": new ObjectId(req.params["name"])}).then(r => {
    res.redirect("/timetable")
  })
});

  module.exports = router;