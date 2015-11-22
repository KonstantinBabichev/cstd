import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes/index';
import articles from './routes/articles';
import users from './routes/users';
import api from './routes/api';

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

//app.get('/', routes.index);

import React from 'react';
import ReactDOM from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import reactRoutes from './shared/router.js'

function reactRouterMapping (location, next, cb) {
  match({ routes : reactRoutes, location: location  }, (error, redirectLocation, renderProps) => {
    if (typeof error == "undefined") return next();
    cb(error, redirectLocation, renderProps);
  })
}

app.use('/api', api);
app.use('/articles', articles);

app.use(function(req, res, next) {
  console.log('=========== ' + req.url + ' ===========');
  reactRouterMapping(req.url, next, function(error, redirectLocation, renderProps){

    var articles = require('./models/article');

    console.log('==========');
    console.log(52);
    console.log('==========');

    articles
        .getAll()
        .then(function (articles) {
          renderProps.params.articles = articles;

          console.log('==========');
          console.log(71);
          console.log('==========');


          var articlesHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);

          console.log(articlesHTML);
          res.render('index', {
            markup: articlesHTML,
            title: 'Case Studies Database',
            state: JSON.stringify(articles)
          });
        });
  });

  //match({ routes : reactRoutes, location: location  }, (error, redirectLocation, renderProps) => {
  //
  //})
});


app.use('/users', users);

/*
app.get('/', function (req, res) {
  match({ routes : reactRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    var articles = require('./models/article');

    console.log('==========');
    console.log(error);
    console.log('==========');
    console.log('==========');
    console.log(redirectLocation);
    console.log('==========');
    console.log('==========');
    console.log(renderProps);
    console.log('==========');

    articles
        .getAll()
        .then(function (articles) {
          renderProps.params.articles = articles;

          var articlesHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);

          console.log(articlesHTML);
          res.render('index', {
            markup: articlesHTML,
            title: 'Case Studies Database',
            state: JSON.stringify(articles)
          });
        });
  })
});

app.get('/article/:id', function (req, res) {
  match({ routes : reactRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    var articles = require('./models/article');

    articles
        .getById(req.params.id)
        .then(function (articles) {
          console.log('/article/:id');
          console.log(articles);
          renderProps.params.articles = articles;

          var articlesHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);

          console.log(articlesHTML);
          res.render('index', {
            markup: articlesHTML,
            title: 'Case Studies Database',
            state: JSON.stringify(articles)
          });
        });
  })
});
*/


app.get('/save', routes.save);




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
