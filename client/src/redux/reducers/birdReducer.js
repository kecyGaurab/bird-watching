/* eslint-disable no-case-declarations */
import { ADD_BIRD, REMOVE_BIRD, INIT_BIRDS, EDIT_BIRD, GET_BIRD } from '../constants/action-types';
import birdService from '../../services/birds';

const INITIAL_STATE = {
  birds: [],
};

export const birdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BIRD:
      return {
        ...state,
        bird: action.payload,
      };
    case INIT_BIRDS:
      return {
        ...state,
        birds: action.payload,
      };
    case ADD_BIRD:
      return {
        ...state,
        birds: state.birds.concat(action.payload),
      };
    case EDIT_BIRD:
      const { id } = action.payload;
      return {
        ...state,
        birds: state.birds.filter((b) => b.id !== id).concat(action.payload),
      };

    case REMOVE_BIRD:
      return {
        ...state,
        birds: state.birds.filter((chari) => chari.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const getBird = (id) => {
  return async (dispatch) => {
    const bird = await birdService.get(id);
    dispatch({
      type: GET_BIRD,
      payload: bird,
    });
  };
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

export const editBird = (id, obs) => {
  return async (dispatch) => {
    const birdToEdit = await birdService.update(id, obs);
    dispatch({
      type: EDIT_BIRD,
      payload: birdToEdit,
    });
  };
};

export const removeBird = (id) => {
  return async (dispatch) => {
    const newObs = await birdService.remove(id);
    dispatch({
      type: REMOVE_BIRD,
      payload: newObs,
    });
  };
};

export const initializeBirds = () => {
  return async (dispatch) => {
    const birds = await birdService.getAll();
    dispatch({
      type: INIT_BIRDS,
      payload: birds,
    });
  };
};

export default birdReducer;
