import api from '../services/api';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EXPENSE = 'SET_EXPENSE';
export const RENDER_COINS = 'RENDER_COINS';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const renderCoins = (payload) => ({
  type: RENDER_COINS,
  payload,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: {
    id,
  },
});

export const setExpense = (id) => ({
  type: SET_EXPENSE,
  payload: {
    id,
  },
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const getCurrency = () => ({
  type: GET_CURRENCY,
});

export const getCurrencySuccess = (payload) => ({
  type: GET_CURRENCY_SUCCESS,
  payload,
});

export const getCurrencyThunk = (expenses) => async (dispatch) => {
  const response = await api();
  if (expenses !== undefined) {
    const payload = { ...expenses, exchangeRates: response };
    dispatch(getExpenses(payload));
  } else {
    dispatch(getCurrencySuccess(response));
  }
};
