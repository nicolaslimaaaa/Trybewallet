import { REQUEST_SUCCESSFUL } from '../actions';

const INITIAL_STATE_WALLET = {

  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: [...Object.keys(action.payload)].filter((coin) => coin !== 'USDT'),
    };
  default:
    return state;
  }
};

export default wallet;
