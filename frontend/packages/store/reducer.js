
import { combineReducers } from 'redux';
import appReducer from './modules';

const createReducer = () =>
  combineReducers(
    appReducer
  );

export default createReducer;
