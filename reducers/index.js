import { combineReducers } from 'redux';
import categoriesReducers from './categories.js';

const reducers = combineReducers({
  categories : categoriesReducers
})

export default reducers