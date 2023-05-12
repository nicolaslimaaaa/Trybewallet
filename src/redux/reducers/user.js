import { ADD_EMAIL } from '../actions';

const INITIAL_STATE_USER = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
