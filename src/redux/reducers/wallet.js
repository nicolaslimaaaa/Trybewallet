const INITIAL_STATE_WALLET = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default wallet;
