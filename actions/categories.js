import {fetchGetData, fetchPostData} from '../lib/fetcher';

export const getCategories = () => {
   return dispatch => {
      fetchGetData('http://localhost:3000/categories').then(data => {
        dispatch(loadCategoriesSucess(data));
      });
   }
}

export const loadCategoriesSucess = data => {
  let categories = Array();
  Object.values(data).forEach( (v) => categories.push(v));
  return {type:'SUCCESS', categories}
};

export const saveCategory = data => {
  return (dispatch, getState) => {
    const saveData = {
        name: data.ctg_name,
        description: data.ctg_description,
        currency: data.ctg_currency
    };
    fetchPostData('http://localhost:3000/categories', saveData).then(info => {
        dispatch(saveCategorySuccess(info));
    })
  }
};

export const saveCategorySuccess = info => {
  return {type:'SAVE_SUCCESS', info}
}

