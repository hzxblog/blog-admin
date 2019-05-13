import { combineReducers } from 'redux';
import { UPDATE_USERNAME } from '../actions/user';

const initialState = {
  username: localStorage.getItem('username')
};

const userReducer  = (state = initialState, action) => {
  const { username, type } = action;
  switch (type) {
    case UPDATE_USERNAME:
      return Object.assign({}, state, {
        username
      });
    default:
      return state
  }
};

const rootReducer = combineReducers({
  userReducer: userReducer
});



export default rootReducer;
