//import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

var JSX = require('node-jsx').install();

module.exports = {

  index: function (req, res) {
    var article = require('../models/article'),
        components = require('../components/article.js'),
        HelloMessage = React.createFactory(components.HelloMessage);

    article.find({}).exec()
        .then(function (articles) {
          var articlesHTML = ReactDOM.renderToString(HelloMessage({
            articles: articles
          }));

          res.render('index', {
            markup: articlesHTML,
            title: 'Express',
            state: JSON.stringify(articles)
          });
        });
  },

  article: function (req, res) {
    console.log(req.params.id);
    res.render('index', {
      title: 'Express ' + req.params.id
    });
  },

  save: function (req, res) {
    var Article = require('../models/article');
    var article = new Article();
    article.title = 'Title X';

    article.save(function(err) {
      if (err) res.send(err);

      console.log('SAVED!');
      res.json({ message: 'Bear created!' });
    });
  }
};
