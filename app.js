// initialize 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mapRouter = require('./routes/map');
var graphqlRouter = require('./routes/graphql')

var app = express();

// set the view engine to jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this handles the different routes of the site: ex pandemicsmap.tk/news
// the handlers are in ./routes
app.use('/', indexRouter);
app.use('/map', mapRouter);
app.use('/graphql', graphqlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page (view engine is set to jade, see /views to see the error.jade file (which will act as html))
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
