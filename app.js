<<<<<<< HEAD
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");

const models = require("./models");

//importing swagger file
const swagger = require("./swagger");

var app = express();

//swagger _setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//
app.use(
  session({
    secret: "benchmark",
    name: "_cart",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// index router
const indexRouter = require("./routes/index");
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var logger = require('morgan');
// const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const redisConn = require('./config/redis');

// const client = redis.createClient(redisConn.PORT , redisConn.HOST);

const models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({
  limit: '10mb'
}));
app.use(cors());
app.use(express.urlencoded({ 
  extended: false,
  limit: '10mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use(session({
  secret: 'benchmark',
  name:'_cart',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
  // store: new RedisStore({client: client})
}));

// index router
const indexRouter = require('./routes/index');
>>>>>>> 0f302c8cb5b4dc1d2d917f76e3f76345b11e798b
app.use("/api", indexRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
<<<<<<< HEAD
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
=======
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

//   models.errorLogger.create({
//     message: err.message,
//     url:req.url,
//     method:req.method,
//     host: req.hostname,
//     body:req.body,
//     userData:req.userData
// })
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
>>>>>>> 0f302c8cb5b4dc1d2d917f76e3f76345b11e798b
});

app.use(function (err, req, res, next) {
  res.status(500).send({ message: "something went wrong" });
});

module.exports = app;
