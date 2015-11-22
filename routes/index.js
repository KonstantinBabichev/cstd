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

    save: function (req, res) {
        res.json({ message: 'Ssved!' });
    }
};
