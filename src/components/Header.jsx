import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          { email }

        </p>

        <p
          data-testid="total-field"
        >
          {
            (expenses.reduce((acc, cur) => (
              acc + (Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask))
            ), 0)).toFixed(2)
          }
        </p>

        <div
          data-testid="header-currency-field"
        >
          BRL

        </div>
      </div>
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
