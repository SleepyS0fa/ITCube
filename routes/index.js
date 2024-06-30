let express = require('express');
let router = express.Router();
const urlencodedParser = express.urlencoded({extended: false});
let db = require("../mongoRepository");
const uploadImage = require("../upload").uploadImage;
const uploadDocs = require("../upload").uploadDocs;
const moment = require("moment");
const {ObjectId} = require("mongodb");
const req = require('express/lib/request');

router.get('/', function(req, res) {
  res.render('about.hbs');
});

router.get('/news', async function (req, res) {
  res.render('news.hbs', {news: await db.getAll("news")});
});

router.get('/news/:title', async function (req, res) {
  res.render('selectNews.hbs', {content: await db.getByTitle("news", req.params["title"])});
});

router.post('/news/create', uploadImage.array("image", 10), async function (req, res) {

  let model = {};
  if (req.files instanceof Array) {
    model.img = []
    req.files.forEach((val) => {
      model.img.push({img:"/images/" + val.filename})
    })
  } else {
    model.img = "/images/" + req.files.filename;
  }

  if (req.body.save === "on") {
    await db.saveAll("photos", model.img)
  }

  model.title = req.body.title;
  model.text = req.body.text;
  let date = new Date();
  model.dateOfCreate = moment().format('MM.DD.YYYY, h:mm');
  //поиск первых двух предложений
  model.previewText = req.body.text.match("[^\.]+\.[^\.]+\.")[0] + ".."
  db.save("news", model).then(r => {
    res.redirect("/news")
  })
});

router.get('/programs', async function (req, res) {
  res.render('programs.hbs',{content: await db.getAll("programs")} );
});

router.get("/more", function(req, res) {
  const about = req.query.about;
  
  res.render("aboutProgram.hbs");
})

router.get('/documentation', async function(req, res) {
  res.render('docs.hbs', {blocks: await db.getAll("docs")});
});

router.post('/documantation/createBlock', async function(req, res) {
  let model = {
    title: req.body.block,
    docs: {}
  };
  db.save("docs", model);
  res.redirect("/documentation")
});

router.post('/documentation/create', uploadDocs.array("file", 1), async function(req, res) {
  let model = await db.getByTitle("docs", req.body.block)
  console.log(model)
  model.docs.push({title:req.body.title, href: "/docs/" + req.files[0].filename})

  db.update("docs", {"title": req.body.block}, model);
  res.redirect("/documentation")
});

router.get('/documentation/delete/:groupName/:docName', async function (req, res) {
  let doc = await db.getByTitle("docs", req.params["groupName"]);
  
  let i = 0;
  doc.docs.forEach((val, ind) => {
    if (val.title === req.params["docName"]) {
      doc.docs = doc.docs.splice(ind, 1);
    }
  })

  db.update("docs", {title: req.params["groupName"]}, doc).then(r => {
    res.redirect("/documentation")
  })
});

router.get('/teachers', async function (req, res) {
  res.render('teachers.hbs', {teachers: await db.getAll("teachers")});
});

router.post('/teachers/create', uploadImage.array("image", 1), async function (req, res) {
  let model = {};
  model.image = "/images/" + req.files[0].filename;
  model.fullName = req.body.name;
  model.aboutTeacher = req.body.description;
  await db.save("teachers", model);
  res.redirect("/teachers");
});

router.get('/teachers/delete/:name', async function (req, res) {
  db.deleteOne("teachers", {fullName: req.params["name"]}).then(r => {
    res.redirect("/teachers")
  })
  
});

router.get('/timetable', async function(req, res) {
  res.render('timetable.hbs', {timetable: await db.getAll("timetable"), programs: await db.getAll("programs")});
});

router.post('/timetable/create', async function(req, res) {
  let model = await db.getByTitle("timetable", req.body.title);
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
    db.save("timetable", model).then(r => {
      res.redirect('/timetable');
    })
  } else {
    db.update("timetable", {title:req.body.title}, model).then(r => {
      res.redirect('/timetable');
    });
  }
});

router.get('/timetable/delete/:name', function (req, res) {

  db.deleteOne("timetable", { "_id": new ObjectId(req.params["name"])}).then(r => {
    res.redirect("/timetable")
  })
});

router.get('/events', function(req, res) {
  res.render('events.hbs');
});

router.get('/photos', async function(req, res) {
  let photos = await db.getAll("photos");
  photos = photos.sort((a,b) => {
    if (parseInt(a._id.toString(), 16) < parseInt(b._id.toString(), 16)) {
      return 1;
    }
    else if (parseInt(a._id.toString(), 16) > parseInt(b._id.toString(), 16)) {
      return -1;
    }
    return 0;
  })

  // TODO доработать распределение
  let image1 = [];
  let image2 = [];
  let image3 = [];
  photos.forEach((val, i) => {
    if (i % 3 === 0) {
      image1.push(val);
    } else if (i % 3 === 1) {
      image2.push(val)
    } else if (i % 3 === 2) {
      image3.push(val)
    }
  });


  res.render('photos.hbs', {
    image1: image1,
    image2: image2,
    image3: image3});
});

router.post('/photos/add', uploadImage.array("images", 10), async function(req,res) {
  let model = {};
  if (!req.files) {
    res.send("Error: ошибка отправки фото");
  } else {
    model.img = []
    req.files.forEach((val) => {
      model.img.push({img:"/images/" + val.filename})
    })
  }
  console.log(model.img)
  await db.saveAll("photos", model.img);
  return res.redirect('/photos')
});

router.get('/contacts', function(req, res) {
  res.render('contacts.hbs');
});

module.exports = router;
