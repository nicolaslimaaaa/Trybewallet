import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          { email }

        </p>
        <div
          data-testid="total-field"
        >
          0
        </div>
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
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Header);
