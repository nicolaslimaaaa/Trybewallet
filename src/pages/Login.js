import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  isDisabledButton = () => {
    const { password, email } = this.state;
    const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const five = 5;

    if (password.length > five && email.match(validEmail)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.isDisabledButton());
  };

  handleClickButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    history.push('/carteira');
    dispatch(addEmail(email));
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />

          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClickButton }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
