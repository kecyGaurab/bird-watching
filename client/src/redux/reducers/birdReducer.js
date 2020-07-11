import { ADD_BIRD, REMOVE_BIRD, INIT_BIRDS } from '../constants/action-types';
import birdService from '../../services/birds';

const INITIAL_STATE = {
  charis: [],
};

export const birdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_BIRDS:
      return {
        ...state,
        charis: action.payload,
      };
    case ADD_BIRD:
      return {
        ...state,
        charis: state.charis.concat(action.payload),
      };

    case REMOVE_BIRD:
      return {
        ...state,
        charis: state.charis.filter((chari) => chari.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export const createBird = (obs, image) => {
  return async (dispatch) => {
    const newObs = await birdService.create(obs, image);
    dispatch({
      type: ADD_BIRD,
      payload: newObs,
    });
  };
};

export const initializeBirds = () => {
  return async (dispatch) => {
    const charis = await birdService.getAll();
    dispatch({
      type: INIT_BIRDS,
      payload: charis,
    });
  };
};

export default birdReducer;
