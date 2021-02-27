import { createStore } from 'redux';
import createReducer from './reducer';

export default createStore(
    createReducer()
)
