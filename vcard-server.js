var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

var emailSender = require('./routes/emailSender');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.use('/css', express.static(__dirname + '/www/css'));
app.use('/font', express.static(__dirname + '/www/font'));
app.use('/fonts', express.static(__dirname + '/www/fonts'));
app.use('/img', express.static(__dirname + '/www/img'));
app.use('/js', express.static(__dirname + '/www/js'));
app.use('/min', express.static(__dirname + '/www/min'));

app.use('/' , emailSender);

app.all('/*', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile(__dirname + '/www/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
