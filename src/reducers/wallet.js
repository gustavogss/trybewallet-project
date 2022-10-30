import {
  GET_EXPENSES,
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_ERROR,
  DELETE_EXPENSE,
  RENDER_COINS,
  SET_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  coins: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state,
    };
  case RENDER_COINS:
    return { ...state,
      coins: action.payload,
    };
  case GET_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.payload],
    };
  case GET_CURRENCY_SUCCESS:
    return { ...state,
      currencies: [action.payload],
    };
  case GET_CURRENCY_ERROR:
    return { ...state,
      error: action.payload.error,
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id) };
  case SET_EXPENSE:
    return { ...state,
      setexpenses: state.expenses.filter((expense) => expense.id !== action.payload.id) };

  default:
    return state;
  }
};
export default walletReducer;
