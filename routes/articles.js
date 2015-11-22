var express = require('express');
var router = express.Router();
var reactRoutes = require('../shared/router.js');
var RoutingContext = require('react-router').RoutingContext;
var match = require('react-router').match;
var React = require('react');
var ReactDOM = require('react-dom/server');


//import { RoutingContext, match } from 'react-router';
//import reactRoutes from './shared/router.js'

router.get('/', function (req, res, next) {
  console.log('==== Articles Express ==== ');
  match({routes: reactRoutes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (typeof error == "undefined") return next();

    console.log('==== Articles Express Mapped ==== ');
    var articles = require('../models/article');

    articles
        .getAll()
        .then(function (articles) {
          renderProps.params.articles = articles;

          var articlesHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);

          res.render('index', {
            markup: articlesHTML,
            title: 'Case Studies Database',
            state: JSON.stringify(articles)
          });
        });
  });
});

router.get('/:id', function (req, res, next) {
  console.log('==== Article Express ==== ');
  match({routes: reactRoutes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (typeof error == "undefined") return next();

    console.log('==== Article Express Mapped ==== ');
    var articles = require('../models/article');

    articles
        .getById(req.params.id)
        .then(function (article) {
          renderProps.params.article = article;
          var articlesHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
          res.render('index', {
            markup: articlesHTML,
            title: 'Case Studies Database',
            state: JSON.stringify(article)
          });
        });
  });
});

module.exports = router;
