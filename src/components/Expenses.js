import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../services/api';
import { getCurrencyThunk, renderCoins } from '../actions/index';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
    };

    this.renderCoins = this.renderCoins.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchCoins();
  }

  async fetchCoins() {
    const data = await api();
    const response = Object.keys(data);
    response.splice(response.indexOf('USDT'), 1);
    const { dispatchCoins } = this.props;
    dispatchCoins(response);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    // event.preventDefault();
    const { dispatchThunk } = this.props;
    const { id } = this.state;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const expenses = { ...this.state, id };
    dispatchThunk(expenses);
  }

  renderCoins() {
    const { coins } = this.props;
    if (coins !== undefined) {
      return (
        <label htmlFor="currency" className="text-white">
          Moeda
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            id="currency"
            name="currency"
          >
            {coins.map((name, index) => (
              <option key={ index } value={ name }>{name}</option>
            ))}
          </select>
        </label>
      );
    } return null;
  }

  render() {
    return (
      <div className="navbar navbar-dark bg-dark">
        <label htmlFor="value" className="text-white ">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            onChange={ this.handleChange }
            type="text"
            name="value"
          />
        </label>
        { this.renderCoins() }
        <label onChange={ this.handleChange } className="text-white" htmlFor="method">
          Método de pagamento:
          <select data-testid="method-input" id="method" name="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="text-white">
          Tag:
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            id="tag"
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <input
          data-testid="description-input"
          id="description"
          type="text"
          placeholder="Descrição"
          name="description"
          onChange={ this.handleChange }
        />

        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </div>
    );
  }
}

Expenses.propTypes = {
  coins: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatchCoins: PropTypes.func.isRequired,
  dispatchThunk: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchThunk: (value) => dispatch(getCurrencyThunk(value)),
  dispatchCoins: (value) => dispatch(renderCoins(value)),
});

const mapStateToProps = (state) => ({
  coins: state.wallet.coins,
  expenses: state.wallet.expenses,
  id: state.wallet.expenses.length,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
