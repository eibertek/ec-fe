const categoriesReducers = (state = {}, action) => {
  if(action.type === 'LOAD') {}
  if(action.type === 'FETCHING') {}    
  if(action.type === 'SUCCESS') {
    return Object.assign({}, state, {categories:action.categories});
  }  
  if(action.type === 'SAVE_SUCCESS') {
    return Object.assign({}, state, {'transaction_info':action.info});
  }    
  return state;
}

export default categoriesReducers;