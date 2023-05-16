import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, fetchExpense } from '../redux/actions';

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

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClickButton = async () => {
    const { dispatch } = this.props;

    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
    }));

    dispatch(fetchExpense(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            <input
              type="text"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              placeholder="Valor da Despesa"
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
            />
          </label>

          <label htmlFor="currency-input">
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
            >
              {
                currencies && currencies
                  .map((coin, index) => (
                    <option
                      key={ index }
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
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClickButton }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
