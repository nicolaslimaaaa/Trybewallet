import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <section
        className="flex flex-col justify-start w-full items-center text-green-lol"
      >
        <div
          className="flex w-full"
        >
          <p className="text-white">
            Usuário:
          </p>
          <p
            data-testid="email-field"
            className="mx-2"
          >
            { email }

          </p>
        </div>

        <div
          className="flex w-full"
        >
          <p
            className="text-white"
          >
            Despesa total:
          </p>
          <p
            data-testid="total-field"
            className="mx-2"
          >
            {
              (expenses.reduce((acc, cur) => (
                acc + (Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask))
              ), 0)).toFixed(2)
            }
          </p>

          <p
            data-testid="header-currency-field"
          >
            BRL

          </p>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.any,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
