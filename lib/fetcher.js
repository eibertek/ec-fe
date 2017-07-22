import fetch from 'isomorphic-fetch';

export const fetchGetData = (url) => {
  return fetch(url).then( data => data.json());
}

export const fetchPostData = (url, data) => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  } 
  return fetch(url, options).then( data => data.json());
}

export const fetchPutData = (url) => {
  return fetch(url).then( data => data.json());
}