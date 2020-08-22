import { SET_CURRENT_USER } from '../constants/action-types';
import userService from '../../services/login';

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export const setCurrentUser = (credentials) => {
  return async (dispatch) => {
    const response = await userService.login(credentials);
    dispatch({
      type: SET_CURRENT_USER,
      payload: response,
    });
  };
};

export default userReducer;
