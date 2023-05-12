import fetchApi from '../../assets/fetchApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_START = 'REQUEST_START';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestStart = () => ({
  type: REQUEST_START,
  isLoading: true,
});

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESSFUL,
  payload,
  isLoading: false,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
  isLoading: false,
});

export const fetchCoins = () => async (dispatch) => {
  const data = await fetchApi();
  dispatch(requestSuccess(data));
};
