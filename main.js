import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import { Provider} from 'react-redux';
import reducers from './reducers';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as categoriesActions from './actions/categories';

const store = createStore(reducers, {categories:[]}, applyMiddleware(logger,thunk));

export const setReactDom = (containerId) => {
       ReactDOM.render(<Provider store={store}><AppComponent /></Provider>, document.getElementById(containerId));
}

setReactDom('app');
