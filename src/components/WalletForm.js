import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="value-input"
            placeholder="Valor da Despesa"
          />

          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição"
          />

          <select
            data-testid="currency-input"
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

          <select
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
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
