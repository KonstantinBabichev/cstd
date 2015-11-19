import React from 'react';
import ReactDOM from 'react-dom';
import {HelloMessage} from './components/article.js';

console.info('CStD : FE started');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
ReactDOM.render(
    <HelloMessage articles={initialState}/>,
    document.getElementById('react-app')
);
