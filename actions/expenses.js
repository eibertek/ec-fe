import {fetchGetData, fetchPostData} from '../lib/fetcher';

export const getExpenses = () => {
   return dispatch => {
      fetchGetData('http://localhost:3000/expenses').then(data => {
        dispatch(loadExpensesSucess(data));
      });
   }
}

export const loadExpensesSucess = data => {
  return {type:'EXPENSES_SUCCESS', expenses:data}
};

export const saveExpenses = data => {
  return (dispatch, getState) => {
    const saveData = {
        name: data.exp_name,
        description: data.exp_category,
        value: data.exp_value,
        date: data.exp_date
    };
    fetchPostData('http://localhost:3000/expenses', saveData).then(info => {
        dispatch(saveExpensesSuccess(info));
    })
  }
};

export const saveExpensesSuccess = info => {
  return {type:'EXPENSES_SAVE_SUCCESS', info}
}

