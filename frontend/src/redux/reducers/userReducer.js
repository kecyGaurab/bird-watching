import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../constants/actionTypes';

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
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export const setCurrentUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch({
      type: REMOVE_CURRENT_USER,
      payload: null,
    });
  };
};

export default userReducer;
