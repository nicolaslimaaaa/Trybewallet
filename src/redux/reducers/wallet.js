import {
  DELETE_EXPENSE,
  EXPENSE_EDITED,
  EXPENSE_IN_EDITION,
  REQUEST_SUCCESSFUL,
  SAVE_EXPENSE,
} from '../actions';

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

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload)],
    };

  case EXPENSE_IN_EDITION:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };

  case EXPENSE_EDITED:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .map((expense) => (expense.id === action.payload.id ? action.payload : expense)),
    };
  default:
    return state;
  }
};

export default wallet;
