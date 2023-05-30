import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import wallet from '../image/wallet.png';

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
      <div
        className="flex w-2/3 h-1/2 justify-center items-center"
      >
        <div
          className="flex justify-center items-center w-1/2"
        >
          <img
            src={ wallet }
            alt="Carteira"
            className="w-64 rounded-3xl"
          />
        </div>

        <div
          className="w-1/2 flex justify-center items-center border-l border-yellow-lol"
        >
          <form
            className="flex flex-col w-80 h-full
            justify-center items-center text-yellow-lol"
          >
            <label
              htmlFor="input-email"
            >
              <input
                type="email"
                name="email"
                id="input-email"
                placeholder="Email"
                onChange={ this.handleChange }
                data-testid="email-input"
                className="my-3 rounded text-center placeholder:text-yellow-lol
                placeholder:font-semibold focus:border-yellow-lol h-8"
              />
            </label>

            <label htmlFor="input-password">
              <input
                type="password"
                name="password"
                id="input-password"
                placeholder="Password"
                onChange={ this.handleChange }
                data-testid="password-input"
                className="my-3 rounded text-center placeholder:text-yellow-lol
                placeholder:font-semibold focus:border-yellow-lol h-8"
              />
            </label>

            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClickButton }
              className="bg-yellow-lol text-white px-5 py-2 mt-6 rounded
              hover:bg-green-lol
              disabled:bg-dark-blue-lol disabled:text-light-blue-lol h-10"
            >
              Entrar

            </button>
          </form>
        </div>
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
