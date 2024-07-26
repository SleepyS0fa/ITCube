let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let hbs = require("hbs")
const expressHbs = require("express-handlebars");

let user = require('./routes/user/user');
let admin = require('./routes/admin/admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", expressHbs.engine(
    {
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs",
      helpers: require('./HandlebarsHelpers')
    }
))
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "upload")));

//routers
app.use('/admin', admin);
app.use('/', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.get('*', function(req, res){
  res.status(404).send('what???');
});

module.exports = app;
