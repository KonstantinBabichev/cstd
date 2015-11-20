//import React from 'react';
//import ReactDOM from 'react-dom';
//// using an ES6 transpiler, like babel
//import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
////import { createHistory, useBasename } from 'history'
//import {ArticlePreview} from './components/article.js';

console.info('CStD : FE started');


//<ArticlePreview articles={initialState}/>


import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'

import {ArticlePreview, ArticleFull} from './components/article.js';

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

const history = useBasename(createHistory)({
    basename: '/'
})

class App extends React.Component {
    render() {
        const depth = this.props.routes.length

        return (
            <div>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/articles'}>Articles</Link></li>
                    <li><Link to={'/article/1'}>articlex</Link></li>
                </ul>
                <div className="content">
                    <h2>Content</h2>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

App.title = 'Home';
App.path = '/';

console.log(initialState);
console.log(initialState);

class Articles extends React.Component {
    render() {
        return (
            <div className="Page">
                <ArticlePreview articles={initialState}/>
                <h1>Products</h1>
            </div>
        )
    }
}

Articles.title = 'Articles';
Articles.path = '/articles';

class Article extends React.Component {
    componentDidMount() {
        console.log(' Article : componentDidMount ');
        console.log(' Article : componentDidMount ');
        console.log(' Article : componentDidMount ');

        // from the path `/inbox/messages/:id`
        const id = this.props.params.id;

        console.log(' id ' + id);
        console.log(' id ' + id);

        var self = this;
        var url = "/api/article/" + id;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (article) {
                console.log(article);
                self.setState({article: article});
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });

        //import {articles} from './models/article';

        //
        //articles
        //    .getById(id)
        //    .then(function (articles) {
        //        console.log(articles);
        //    });
    }

    render() {
        console.log(' Article : render ');
        console.log(this.state);

        var x = {
                _id : "3",
                title : "title 3",
                description : "Lorem ipsum 3"
            };

        if (this.state && this.state.article) x = this.state.article;


        console.log(x);
        return (
            <div className="Page">
                <ArticleFull article={x}/>
            </div>
        )
    }
}

Article.title = 'Article';
Article.path = '/article/:id';

render((
    <Router history={history}>
        <Route path={App.path} component={App}>
            <Route path={Articles.path} component={Articles} />
            <Route path={Article.path} component={Article} />
        </Route>
    </Router>
), document.getElementById('react-app'));