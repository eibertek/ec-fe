const categoriesReducers = (state = {}, action) => {
  if(action.type === 'LOAD') {
    console.log(action);
    return Object.assign({}, state, action.categories);
  }
  return state;
}

export default categoriesReducers;