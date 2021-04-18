var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Medicine = require("./models/medicine");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var medicineRouter = require('./routes/medicine');
var starsRouter = require('./routes/stars');
var slotRouter = require('./routes/slot');
var resourceRouter = require('./routes/resource')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/medicine', medicineRouter);
app.use('/stars', starsRouter);
app.use('/slot', slotRouter);
app.use('/resource',resourceRouter);

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true, useUnifiedTopology: true});

// We can seed the collection if needed on server start


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded");});


async function recreateDB(){
  // Delete everything
  await Medicine.deleteMany();
  let instance1 = new Medicine({
    "type": "Herbal",
    "cost": 100,
    "name": "paracetmol"
});
  let instance2 = new Medicine({
    "type": "Nonherbal",
    "cost": 50,
    "name": "Azythromycin"
});
  let instance3 = new Medicine({
    "type": "Ayurvedic",
    "cost": 20,
    "name": "crocin"
});
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
  instance2.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("second object saved")
    });
    instance3.save( function(err,doc) {
      if(err) return console.error(err);
      console.log("Third object saved")
      });
   }
  // let reseed = true;
  // if (reseed) { recreateDB();}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
