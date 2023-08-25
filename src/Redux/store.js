import { createStore } from 'redux';
import userReducer from './reducer';

function configureStore(state = { rotating: true }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
