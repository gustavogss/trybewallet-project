import { INPUT_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: 'alguem@email.com',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_EMAIL:
    return { ...state,
      email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
