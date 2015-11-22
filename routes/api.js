var express = require('express');
var router = express.Router();

router.get('/articles', function(req, res, next) {
  var articles = require('../models/article');

  articles
      .getAll()
      .then(function (article) {
        res.json(article);
      });
});

router.get('/articles/:id', function(req, res, next) {
  var articles = require('../models/article');

  articles
      .getById(req.params.id)
      .then(function (article) {
        res.json(article);
      });
});

module.exports = router;
