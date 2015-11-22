//import { Route } from "react-router";
//import React from "react";
var React = require('react');
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var ArticlePreview = require('../components/article.js').ArticlePreview;
var ArticleFull = require('../components/article.js').ArticleFull;

//import {ArticlePreview, ArticleFull} from './components/article.js';

//import React from 'react'
//import { render } from 'react-dom'
//import { createHistory, useBasename } from 'history'
//import { Router, Route, Link } from 'react-router'
//var AppHandler = require('../components/AppHandler');

const ACTIVE = { color: 'red' }
class App extends React.Component {
  render() {
    console.log('App ==== Router');
    //var initialState = this.props.params.articles;
    //console.log(initialState);

    return (
        <div>
          <h1>APP!</h1>

          <ul>
            <li><Link      to="/"           activeStyle={ACTIVE}>Home</Link></li>
            <li><Link      to="/articles"   activeStyle={ACTIVE}>Articles</Link></li>
            <li><Link      to="/about"      activeStyle={ACTIVE}>About</Link></li>
          </ul>

          {this.props.children}
        </div>
    )
  }
}

module.exports = (
    <Router>
      <Route path={'/'} component={App}>
        <Route path={'/articles'} component={ArticlePreview}/>
        <Route path={'/articles/:id'} component={ArticleFull}/>
      </Route>
    </Router>
);