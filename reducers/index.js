import { combineReducers } from 'redux';
import categoriesReducers from './categories.js';
import expensesReducers from './expenses.js';

const reducers = combineReducers({
  categories : categoriesReducers,
  expenses : expensesReducers
})

export default reducers