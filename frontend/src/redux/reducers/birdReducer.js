/* eslint-disable no-case-declarations */
import { ADD_BIRD, REMOVE_BIRD, INIT_BIRDS, EDIT_BIRD, GET_BIRD } from '../constants/actionTypes';
import birdService from '../../services/Birds';

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
        bird: action.payload,
      };

    case REMOVE_BIRD:
      return {
        ...state,
        birds: state.birds.filter((b) => b.id !== action.payload),
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

export const createBird = (obs, image, token) => {
  return async (dispatch) => {
    const newObs = await birdService.create(obs, image, token);
    dispatch({
      type: ADD_BIRD,
      payload: newObs,
    });
  };
};

export const editBird = (id, birdToEdit, imageToUpdate, token) => {
  return async (dispatch) => {
    const editedBird = await birdService.update(id, birdToEdit, imageToUpdate, token);
    dispatch({
      type: EDIT_BIRD,
      payload: editedBird,
    });
  };
};

export const removeBird = (id, token) => {
  return async (dispatch) => {
    await birdService.remove(id, token);
    dispatch({
      type: REMOVE_BIRD,
      payload: id,
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
