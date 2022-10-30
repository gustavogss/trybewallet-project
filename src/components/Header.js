import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let total = 0;
    if (expenses.length !== 0) {
      expenses.forEach((expense) => {
        total += Number(expense.value * expense.exchangeRates[expense.currency].ask);
      });
    }
    return (
      <header className="navbar container">
        <img src={ logo } width="15%" alt="logo" />
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
