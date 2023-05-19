import fetchApi from '../../assets/fetchApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_START = 'REQUEST_START';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXPENSE_IN_EDITION = 'EXPENSE_IN_EDITION';
export const EXPENSE_EDITED = 'EXPENSE_EDITED';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESSFUL,
  payload,
  isLoading: false,
});

export const fetchCoins = () => async (dispatch) => {
  const data = await fetchApi();
  dispatch(requestSuccess(data));
};

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const fetchExpense = (state) => async (dispatch) => {
  const data = await fetchApi();
  dispatch(saveExpense({ ...state, exchangeRates: data }));
};

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const expenseInEdition = (payload) => ({
  type: EXPENSE_IN_EDITION,
  payload,
});

export const expenseEdited = (payload) => ({
  type: EXPENSE_EDITED,
  payload,
});
