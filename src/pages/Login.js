import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inputEmail } from '../actions';
import logo from '../assets/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value },
      this.handleValidation,
    );
  }

  handleValidation() {
    const { email, password } = this.state;

    // regex-> https://ui.dev/validate-email-address-javascript/
    const emailRegex = /\S+@\S+\.\S+/;
    const minLength = 6;
    if (emailRegex.test(email) && password.length >= minLength) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  handleClick() {
    // event.preventDefault();
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password, disableButton } = this.state;
    return (
      <div className="text-center form-control container py-5 mb-1 mt-5">
        <img src={ logo } width="15%" alt="logo" />
        <div className="h3 mb-3 fw-normal">
          <h3 className="mt-5">Login</h3>
          <div className="form-signin col-5 mx-auto">
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              value={ email }
              placeholder="Email"
              onChange={ this.handleChange }
              className="mt-5"
            />
            <input
              data-testid="password-input"
              id="password"
              type="password"
              value={ password }
              placeholder="Senha"
              name="password"
              onChange={ this.handleChange }
              className="mt-3"
            />
            <button
              id="submit"
              type="button"
              onClick={ this.handleClick }
              disabled={ disableButton }
              className="mt-5 btn btn-success btn-lg"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    sendData: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendData: (values) => dispatch(inputEmail(values)),
});

export default connect(null, mapDispatchToProps)(Login);
