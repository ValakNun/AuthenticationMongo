var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 5000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
const mongoString = "mongodb://sumit1729:123@cluster0-shard-00-00.noux0.mongodb.net:27017,cluster0-shard-00-01.noux0.mongodb.net:27017,cluster0-shard-00-02.noux0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xdh049-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(mongoString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

mongoose.connection.on("error", function(error) {
  console.log('error:');
  console.log(error);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
