import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';

export const setReactDom = (containerId) => {
       ReactDOM.render(<AppComponent />, document.getElementById(containerId));
}

setReactDom('app');
