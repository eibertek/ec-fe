import {fetchGetData} from '../lib/fetcher';

export const getCategories = () => {
  fetchGetData('http://localhost:3000/categories').then(data => {
      return {type:'LOAD', categories: data};    
  });
  return {type:'LOAD', categories: []};      
}