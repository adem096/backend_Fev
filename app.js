var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session"); //session
const cors = require("cors");

const {connectToMongoDb} = require("./config/db");

require("dotenv").config();
const logMiddleware = require('./middlewares/logsMiddlewares.js'); //log

const http = require('http');

//var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
var jobOfferRouter = require('./routes/jobOfferRouter');
var departmentRouter = require('./routes/departmentRouter');
var GeminiRouter = require('./routes/GeminiRouter');
var employeeRouter = require('./routes/employeeRouter');
var candidacyRouter = require('./routes/candidacyRouter.js');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logMiddleware)  //log

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow DELETE requests
}));

app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/jobOffers', jobOfferRouter);
app.use('/departments', departmentRouter);
app.use('/Gemini', GeminiRouter);
app.use('/employees', employeeRouter);
app.use('/candidacies', candidacyRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(process.env.port, () => { 
  connectToMongoDb(),
  console.log("app is running on port 5000") 
});

