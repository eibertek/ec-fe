import fetch from 'isomorphic-fetch';

export const fetchGetData = (url) => {
  return fetch(url).then( data => data.json()).then(data2 => data2);
}