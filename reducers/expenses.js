const expensesReducers = (state = {}, action) => {
  if(action.type === 'EXPENSES_LOAD') {}
  if(action.type === 'EXPENSES_FETCHING') {}    
  if(action.type === 'EXPENSES_SUCCESS') {
    return Object.assign({}, state, action.expenses);
  }  
  if(action.type === 'EXPENSES_SAVE_SUCCESS') {
    return Object.assign({}, state, {'transaction_info':action.info});
  }    
  //console.log('expenses action happen', action);
  return state;
}

export default expensesReducers;