import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expenseEdited, fetchCoins, fetchExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  componentDidUpdate(prevProps, prevState) {
    const { expenses, editor, idToEdit } = this.props;
    if (prevProps.editor !== editor && prevState.id !== idToEdit) {
      this.setState({
        ...expenses[idToEdit],
        // id: idToEdit,
        // value: expenses[idToEdit].value,
        // description: expenses[idToEdit].description,
        // currency: currencies[expenses[idToEdit].currency],
        // method: expenses[idToEdit].method,
        // tag: expenses[idToEdit].tag,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClickButtonAdd = async () => {
    const { dispatch } = this.props;

    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
    }));

    dispatch(fetchExpense(this.state));
  };

  handleClickButtonEdit = () => {
    const { dispatch } = this.props;
    dispatch(expenseEdited({ ...this.state }));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description } = this.state;
    return (
      <div
        className="text-black max-w-full my-20"
      >
        <form
          className="flex justify-between items-center w-full"
        >
          <label htmlFor="value-input">
            <input
              type="text"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              placeholder="Valor da Despesa"
              className="placeholder:text-black w-40 mr-5 text-center h-7 rounded
              focus:bg-green-lol"
            />
          </label>

          <label htmlFor="description-input">
            <input
              type="text"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
              placeholder="Descrição"
              className="placeholder:text-black w-40 mx-5 text-center h-7 rounded
              focus:bg-green-lol"
            />
          </label>

          <label htmlFor="currency-input">
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
              className="w-40 mx-5 text-center h-7 rounded focus:bg-green-lol"
            >
              {
                currencies && currencies
                  .map((coin, index) => (
                    <option
                      key={ index }
                      className=""
                    >
                      {coin}

                    </option>
                  ))
              }
            </select>
          </label>

          <label htmlFor="method-input">
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
              className="w-40 mx-5 text-center h-7 rounded focus:bg-green-lol"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              className="w-40 mx-5 text-center h-7 rounded focus:bg-green-lol"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
              <option>Outro</option>
            </select>
          </label>

          {
            editor ? (
              <button
                type="button"
                onClick={ this.handleClickButtonEdit }
                className=" w-44 h-7 ml-5 bg-yellow-lol text-black rounded
                hover:bg-green-lol
                disabled:bg-dark-blue-lol disabled:text-light-blue-lol focus:bg-green-lol"
              >
                Editar despesa

              </button>

            ) : (
              <button
                type="button"
                onClick={ this.handleClickButtonAdd }
                className=" w-44 h-7 ml-5 bg-yellow-lol text-black rounded
                hover:bg-green-lol
                disabled:bg-dark-blue-lol disabled:text-light-blue-lol focus:bg-green-lol"
              >
                Adicionar despesa

              </button>

            )
          }

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.bool,
  expenses: PropTypes.arrayOf({}),
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
