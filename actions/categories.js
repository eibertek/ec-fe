import {fetchGetData} from '../lib/fetcher';

export const getCategories = () => {
   return dispatch => {
      dispatch(requestCategories());
      fetchGetData('http://localhost:3000/categories').then(data => {
        dispatch(loadCategoriesSucess(data));
      });

   }
  //return { type:'LOAD'}
}

export const loadCategoriesSucess = data => ( {type:'SUCCESS', categories:data});
export const requestCategories = () => ( {type:'LOAD'});