//import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

var JSX = require('node-jsx').install();

module.exports = {

    index: function (req, res) {
        console.log('index ==== ');
        var articles = require('../models/article'),
            components = require('../components/article.js'),
            ArticlePreview = React.createFactory(components.ArticlePreview);

        articles
            .getAll()
            .then(function (articles) {
                console.log(articles);

                var articlesHTML = ReactDOM.renderToString(ArticlePreview({
                    articles: articles
                }));

                console.log(articlesHTML);
                res.render('index', {
                    markup: articlesHTML,
                    title: 'Case Studies Database',
                    state: JSON.stringify(articles)
                });

            });
    },

    article: function (req, res) {
        console.log('article ==== ');
        var articles = require('../models/article'),
            components = require('../components/article.js'),
            ArticleFull = React.createFactory(components.ArticleFull);

        console.log(components.ArticleFull);
        articles
            .getById(req.params.id)
            .then(function (article) {
                console.log(article);

                var articlesHTML = ReactDOM.renderToString(ArticleFull({
                    article: article
                }));

                res.render('index', {
                    markup: articlesHTML,
                    title: 'Express',
                    state: JSON.stringify(article)
                });
            });
    },
    articleApi: function (req, res) {
        console.log('article ==== ');
        var articles = require('../models/article'),
            components = require('../components/article.js'),
            ArticleFull = React.createFactory(components.ArticleFull);

        console.log(components.ArticleFull);
        articles
            .getById(req.params.id)
            .then(function (article) {
                console.log(article);

                //var articlesHTML = ReactDOM.renderToString(ArticleFull({
                //    article: article
                //}));
                //
                //res.render('index', {
                //    markup: articlesHTML,
                //    title: 'Express',
                //    state: JSON.stringify(article)
                //});

                res.json(article);
            });
    },

    save: function (req, res) {
        //var Article = require('../models/article');
        //var article = new Article();
        //article.title = 'Title X';
        //
        //article.save(function(err) {
        //  if (err) res.send(err);
        //
        //  console.log('SAVED!');
        //  res.json({ message: 'Bear created!' });
        //});
    }
};
