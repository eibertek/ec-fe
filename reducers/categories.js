const categoriesReducers = (state = {}, action) => {
  if(action.type === 'CATEGORIES_LOAD') {}
  if(action.type === 'CATEGORIES_FETCHING') {}    
  if(action.type === 'CATEGORIES_SUCCESS') {
    return Object.assign({}, state, {categories:action.categories});
  }  
  if(action.type === 'CATEGORIES_SAVE_SUCCESS') {
    return Object.assign({}, state, {'transaction_info':action.info});
  }    
  return state;
}

export default categoriesReducers;