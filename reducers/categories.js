const categoriesReducers = (state = {}, action) => {
  if(action.type === 'LOAD') {
    return Object.assign({}, state, {});
  }
  if(action.type === 'FETCHING') {
    return Object.assign({}, state, action.categories);
  }    
  if(action.type === 'SUCCESS') {
    return Object.assign({}, state, action.categories);
  }  
  return state;
}

export default categoriesReducers;