import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes/index';
import users from './routes/users';

var app = express();

// Set handlebars as the templating engine
var hbs = exphbs.create({ defaultLayout: 'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Connect to our mongo database
//mongoose.connect('mongodb://localhost/cstd');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.get('/article/:id', routes.article);
app.get('/api/article/:id', routes.articleApi);

app.get('/save', routes.save);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRR 50');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRR 62');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
