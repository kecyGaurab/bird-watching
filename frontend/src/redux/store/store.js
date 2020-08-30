/* eslint-disable import/no-extraneous-dependencies */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { birdReducer } from '../reducers/birdReducer';
import userReducer from '../reducers/userReducer';

const reducer = combineReducers({
  observations: birdReducer,
  user: userReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
 