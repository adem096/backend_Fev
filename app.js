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
var usersRouter = require('./routes/usersRouter.js');
var osRouter = require('./routes/osRouter.js');
var jobOfferRouter = require('./routes/jobOfferRouter.js');
var departmentRouter = require('./routes/departmentRouter.js');
var employeeRouter = require('./routes/employeeRouter.js');
var candidacyRouter = require('./routes/candidacyRouter.js');
const geminiChatRouter = require('./routes/geminiChatRouter.js');

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
app.use('/employees', employeeRouter);
app.use('/candidacies', candidacyRouter);
app.use('/gemini-chat', geminiChatRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const server = http.createServer(app);
server.listen(process.env.port, () => { 
  connectToMongoDb(),
  console.log("app is running on port 5000") 
});

